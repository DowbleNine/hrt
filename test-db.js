import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runDiagnostic() {
  console.log('🚀 Iniciando Diagnóstico Viral Gamer Academy...');
  
  const testEmail = `test_${Date.now()}@viralgamer.com`;
  
  // 1. Testar Conexão
  console.log('\n1. Verificando conexão com Supabase...');
  const { data: connectionData, error: connError } = await supabase.from('profiles').select('count').limit(1);
  
  if (connError) {
    console.error('❌ Erro de Conexão:', connError.message);
    return;
  }
  console.log('✅ Conexão estabelecida com sucesso!');

  // 2. Simular Criação de Transação (O que o Webhook faria)
  console.log('\n2. Simulando entrada de novo aluno (Webhook)...');
  const { error: insertError } = await supabase.from('profiles').insert([
    { 
      email: testEmail, 
      tier: 'low', 
      full_name: 'Aluno de Teste'
    }
  ]);

  if (insertError) {
    console.error('❌ Erro ao inserir perfil:', insertError.message);
  } else {
    console.log(`✅ Perfil [${testEmail}] criado com sucesso!`);
  }

  // 3. Validar Acesso
  console.log('\n3. Validando permissões de acesso...');
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', testEmail)
    .single();

  if (profile && profile.tier === 'low') {
    console.log('✅ Validação de Tier: Aluno identificado como "GUIA VIRAL"');
  } else {
    console.error('❌ Erro na validação de Tier');
  }

  console.log('\n--- DIAGNÓSTICO CONCLUÍDO ---');
  console.log('Se todos os "✅" apareceram, seu sistema está pronto para vender!');
}

runDiagnostic();
