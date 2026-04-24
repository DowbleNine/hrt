import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Configuração Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Usar Service Role no backend para bypass de RLS
);

// Cache do Token JWT da Use-Dice
let diceToken = null;
let tokenExpiry = 0;

// Função para autenticar na Use-Dice
async function getDiceToken() {
  const now = Date.now();
  if (diceToken && now < tokenExpiry) return diceToken;

  try {
    const response = await axios.post('https://dev.use-dice.com/api/v1/auth/login', {
      client_id: process.env.DICE_CLIENT_ID,
      client_secret: process.env.DICE_CLIENT_SECRET
    });

    diceToken = response.data.token;
    tokenExpiry = now + (25 * 60 * 1000); // Token expira em 30min, renovamos com 25min
    console.log('--- Dice Token Renovado ---');
    return diceToken;
  } catch (error) {
    console.error('Erro ao autenticar na Dice:', error.response?.data || error.message);
    return null;
  }
}

// 1. Gerar Cobrança PIX (Frontend chama isso no checkout)
app.post('/api/payments/create', async (req, res) => {
  const { name, email, document, amount, product_name } = req.body;
  
  const token = await getDiceToken();
  if (!token) return res.status(500).json({ error: 'Falha na conexão com gateway' });

  try {
    const response = await axios.post('https://dev.use-dice.com/api/v2/payments/deposit', {
      product_name: product_name || "Acesso Viral Gamer Academy",
      amount: amount || 47.00,
      payer: { name, email, document },
      external_id: `order_${Date.now()}`,
      clientCallbackUrl: `${process.env.BASE_URL}/webhook/dice`
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Salvar transação pendente no Supabase
    await supabase.from('transactions').insert({
      email,
      amount,
      status: 'PENDING',
      transaction_id: response.data.transaction_id
    });

    res.json(response.data); // Retorna qr_code_text e transaction_id
  } catch (error) {
    res.status(400).json({ error: error.response?.data || 'Erro ao gerar PIX' });
  }
});

// 2. Webhook da Use-Dice (Recebe aviso de pagamento)
app.post('/webhook/dice', async (req, res) => {
  console.log('--- Webhook Dice Recebido ---', req.body);
  const { transaction_id, status, email, amount } = req.body;

  if (status === 'COMPLETED') {
    // 1. Atualizar transação
    await supabase.from('transactions')
      .update({ status: 'COMPLETED' })
      .eq('transaction_id', transaction_id);

    // 2. Liberar acesso do aluno (Update ou Insert na tabela de perfis)
    const tier = amount >= 97 ? 'high' : 'low';
    
    await supabase.from('profiles').upsert({
      email,
      tier,
      updated_at: new Date()
    }, { onConflict: 'email' });

    console.log(`[+] Acesso ${tier} liberado para: ${email}`);
  }

  res.sendStatus(200);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Viral Gamer rodando na porta ${PORT}`);
});
