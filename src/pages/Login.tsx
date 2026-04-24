import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Buscar o Tier do aluno no banco (Tabela profiles)
      const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('email', email)
        .single();

      localStorage.setItem('userTier', profile?.tier || 'low');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Matrix/Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/40 backdrop-blur-md border border-emerald-500/30 p-8 rounded-xl z-10 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-500 tracking-tighter uppercase mb-2">
            Acesso Restrito
          </h1>
          <p className="text-gray-400 text-sm">Insira suas credenciais da Academia.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-emerald-500 text-xs font-bold mb-2 uppercase tracking-wider">E-mail de Cadastro</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-gray-800 focus:border-emerald-500 text-white p-3 rounded outline-none transition-colors"
              placeholder="seu@email.com (tente low@teste.com ou high@teste.com)"
              required
            />
          </div>

          <div>
            <label className="block text-lime-500 text-xs font-bold mb-2 uppercase tracking-wider">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-gray-800 focus:border-lime-500 text-white p-3 rounded outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 rounded text-sm text-center"
            >
              {error} <br/>
              <button type="button" onClick={() => navigate('/boss-room')} className="underline mt-1 font-bold">Comprar Agora</button>
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-black uppercase tracking-widest py-4 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Autenticando...' : 'Inicializar Sessão'}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#050505] px-2 text-gray-500 tracking-widest">Ou acessar via</span></div>
          </div>

          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Entrar com Google
          </button>
        </form>
      </motion.div>
    </div>
  );
}
