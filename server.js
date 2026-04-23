import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Mímica de uma base de dados simples em memória para controle de acessos
const acessosLiberados = new Set();

// Endpoint do Webhook para receber a notificação do Gateway (Ex: Kiwify, PerfectPay)
app.post('/webhook/pix', (req, res) => {
  console.log('Webhook recebido:', req.body);
  
  // Exemplo de payload esperado: { status: "approved", payment_method: "pix", email: "aluno@email.com" }
  const { status, payment_method, email } = req.body;

  if (status === 'approved' || status === 'paid') {
    console.log(`[+] Pagamento Aprovado (${payment_method}) para: ${email}`);
    acessosLiberados.add(email);
    // Aqui você implementaria o disparo de e-mail ou a integração final pro Frontend
    return res.status(200).json({ message: 'Acesso liberado com sucesso.' });
  }

  return res.status(400).json({ message: 'Pagamento não aprovado ou status invalido.' });
});

// Endpoint pro Frontend verificar se liberou
app.get('/api/check-access', (req, res) => {
  const { email } = req.query;
  if (acessosLiberados.has(email)) {
    return res.status(200).json({ access: true });
  }
  return res.status(404).json({ access: false });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`Aguardando Webhooks em http://localhost:${PORT}/webhook/pix`);
});
