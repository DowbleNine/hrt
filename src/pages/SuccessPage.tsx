import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const email = searchParams.get('email');
  const tier = searchParams.get('tier');

  useEffect(() => {
    if (!email || !tier) {
      navigate('/');
    }
  }, [email, tier, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Criar usuário no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email!,
        password: password,
      });

      if (authError) throw authError;

      // 2. O Webhook já deve ter criado o perfil, mas vamos garantir o tier aqui
      // No caso do Supabase, o Auth e o Profiles podem estar vinculados por Trigger ou ID
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ tier: tier })
        .eq('email', email);

      if (profileError) throw profileError;

      // 3. Salvar tier localmente para acesso imediato
      localStorage.setItem('userTier', tier!);
      
      alert('Conta criada com sucesso! Você será redirecionado.');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-900/5 z-0"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl z-10 shadow-2xl text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 size={40} className="text-black" />
        </div>
        
        <h1 className="text-3xl font-black text-white uppercase mb-2 tracking-tighter">Pagamento Aprovado!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Para acessar sua área de aluno, crie uma senha para o e-mail: <br />
          <span className="text-neon-green font-bold">{email}</span>
        </p>

        <form onSubmit={handleSignUp} className="space-y-4 text-left">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-lg text-red-500 text-xs text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Nova Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Confirmar Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-neon-green transition-colors outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-neon-green text-black font-black uppercase py-4 rounded-xl mt-6 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Acessar Área de Aluno <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
