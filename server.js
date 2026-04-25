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
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Cache do Token Dice
let diceToken = null;
let tokenExpiry = null;

async function getDiceToken() {
  if (diceToken && tokenExpiry && Date.now() < tokenExpiry) {
    return diceToken;
  }

  try {
    const response = await axios.post('https://dev.use-dice.com/api/v1/auth/login', {
      client_id: process.env.DICE_CLIENT_ID,
      client_secret: process.env.DICE_CLIENT_SECRET
    });
    
    diceToken = response.data.token;
    tokenExpiry = Date.now() + 3500 * 1000; // Expira em ~1h
    return diceToken;
  } catch (error) {
    console.error('Erro Autenticação Dice:', error.response?.data || error.message);
    return null;
  }
}

// 1. Gerar Cobrança PIX V2
app.post('/api/payments/create', async (req, res) => {
  const { name, email, document, amount, product_name } = req.body;
  
  if (!amount || !product_name) {
    return res.status(400).json({ error: 'Dados insuficientes' });
  }

  const token = await getDiceToken();
  if (!token) return res.status(500).json({ error: 'Erro de conexão com gateway' });

  const external_id = `order_${Date.now()}`;
  const baseUrl = 'https://hrt-dun.vercel.app'; // URL do seu site

  try {
    const response = await axios.post('https://dev.use-dice.com/api/v2/payments/deposit', {
      product_name: product_name,
      amount: parseFloat(amount),
      payer: { name, email, document },
      external_id,
      clientCallbackUrl: `${baseUrl}/webhook/dice`
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Registrar transação pendente
    await supabase.from('transactions').insert({
      email,
      amount: parseFloat(amount),
      status: 'PENDING',
      transaction_id: response.data.transaction_id,
      external_id
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erro Criar PIX:', error.response?.data || error.message);
    res.status(400).json({ error: 'Erro ao gerar cobrança' });
  }
});

// 2. Consulta de Status (Polling)
app.get('/api/payments/status/:id', async (req, res) => {
  const { id } = req.params;
  const token = await getDiceToken();

  try {
    const response = await axios.get(`https://dev.use-dice.com/api/v1/transactions/getStatusTransac/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Transação não encontrada' });
  }
});

// 3. Webhook (Confirmação Automática)
app.post('/webhook/dice', async (req, res) => {
  const { transaction_id, status, amount, external_id } = req.body;

  if (status === 'COMPLETED') {
    try {
      // 1. Buscar e-mail da transação
      const { data: tx } = await supabase
        .from('transactions')
        .select('email')
        .eq('transaction_id', transaction_id)
        .single();

      if (tx) {
        // 2. Definir Tier baseado no valor
        // R$ 97 ou mais = High Ticket (Mentoria Elite)
        // Abaixo de R$ 97 = Low Ticket (Guia Viral)
        const tier = amount >= 90 ? 'high' : 'low';

        // 3. Upsert no perfil para liberar acesso
        await supabase.from('profiles').upsert({
          email: tx.email,
          tier: tier,
          updated_at: new Date()
        }, { onConflict: 'email' });

        // 4. Atualizar status da transação
        await supabase
          .from('transactions')
          .update({ status: 'COMPLETED' })
          .eq('transaction_id', transaction_id);
      }
    } catch (error) {
      console.error('Erro no Webhook:', error.message);
    }
  }

  res.sendStatus(200); // Sempre retornar 200 para a Dice
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Viral Gamer rodando na porta ${PORT}`);
});
