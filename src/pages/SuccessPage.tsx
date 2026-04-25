import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export default function SuccessPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const email = searchParams.get('email') || '';
  const tier = searchParams.get('tier') || 'low'; // Pega o tier da URL (low ou high)

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if(password !== confirmPassword) return alert("As senhas não coincidem.");
    if(password.length < 6) return alert("A senha deve ter pelo menos 6 caracteres.");

    setLoading(true);
    try {
      // 1. Criar usuário no Supabase Auth
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      // Se o erro for que o usuário já existe, apenas ignoramos e seguimos
      if (authError && !authError.message.includes('already registered')) {
        throw authError;
      }

      // 2. Criar ou atualizar o perfil com o Tier correto no banco
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          email, 
          tier,
          full_name: email.split('@')[0] 
        });

      if (profileError) console.warn("Erro ao atualizar perfil:", profileError.message);

      localStorage.setItem('userTier', tier);
      navigate('/dashboard');
    } catch (err: any) {
      alert(err.message || "Erro ao processar sua conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-900/10 z-0"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-emerald-500/50 p-8 rounded-xl z-10 shadow-[0_0_40px_rgba(16,185,129,0.15)] text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        
        <h1 className="text-2xl font-black text-white uppercase mb-2">Pagamento Aprovado!</h1>
        <p className="text-gray-400 text-sm mb-8">Sua vaga na Viral Gamer Academy foi garantida. Crie sua senha de acesso abaixo para entrar na plataforma agora mesmo.</p>

        <form onSubmit={handleCreateAccount} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-400 text-xs uppercase mb-1">Nova Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-black/50 border border-gray-700 focus:border-emerald-500 p-3 rounded text-white outline-none" />
          </div>
          <div>
            <label className="block text-gray-400 text-xs uppercase mb-1">Confirmar Senha</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-black/50 border border-gray-700 focus:border-emerald-500 p-3 rounded text-white outline-none" />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-black font-bold uppercase py-4 rounded-lg mt-4 transition-all hover:scale-105 disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Acessar Aulas'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
