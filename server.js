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
  const cid = process.env.DICE_CLIENT_ID;
  const csk = process.env.DICE_CLIENT_SECRET;
  
  console.log('Diagnostic - ID (prefix):', cid ? cid.substring(0, 8) : 'MISSING');
  console.log('Diagnostic - SECRET (prefix):', csk ? csk.substring(0, 8) : 'MISSING');

  if (diceToken && tokenExpiry && Date.now() < tokenExpiry) {
    return diceToken;
  }

  try {
    const response = await axios.post('https://api.use-dice.com/api/v1/auth/login', {
      client_id: cid,
      client_secret: csk
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
  let { name, email, document, amount, product_name } = req.body;
  
  if (!amount || !product_name || !document) {
    return res.status(400).json({ error: 'Dados insuficientes' });
  }

  // Limpar CPF (deixar apenas números)
  const cleanDocument = document.replace(/\D/g, '');

  const token = await getDiceToken();
  if (!token) {
    console.error('Falha ao obter token Dice');
    return res.status(500).json({ error: 'Erro de conexão com gateway (Token)' });
  }

  const external_id = `order_${Date.now()}`;
  const baseUrl = 'https://hrt-dun.vercel.app';

  try {
    console.log('Solicitando PIX para:', { email, amount, product_name });
    
    const response = await axios.post('https://api.use-dice.com/api/v2/payments/deposit', {
      product_name: product_name,
      amount: parseFloat(amount),
      payer: { name, email, document: cleanDocument },
      external_id,
      clientCallbackUrl: `${baseUrl}/webhook/dice`
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Resposta Dice:', response.data);

    // Registrar transação pendente no Supabase
    const { error: dbError } = await supabase.from('transactions').insert({
      email,
      amount: parseFloat(amount),
      status: 'PENDING',
      transaction_id: response.data.transaction_id,
      external_id
    });

    if (dbError) {
      console.error('Erro Supabase Insert:', dbError);
      // Mesmo com erro no banco, vamos retornar o PIX para o usuário não travar
    }

    res.json(response.data);
  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error('Erro detalhado Dice V2:', JSON.stringify(errorData));
    res.status(400).json({ error: errorData });
  }
});

// 2. Consulta de Status (Polling)
app.get('/api/payments/status/:id', async (req, res) => {
  const { id } = req.params;
  const token = await getDiceToken();

  try {
    const response = await axios.get(`https://api.use-dice.com/api/v1/transactions/getStatusTransac/${id}`, {
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
