import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Dashboard() {
  const [tier, setTier] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userTier = localStorage.getItem('userTier');
    if (!userTier) {
      navigate('/login');
    } else {
      setTier(userTier);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userTier');
    navigate('/login');
  };

  if (!tier) return null;

  const isLowTicket = tier === 'low';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center font-black text-black">VG</div>
            <span className="font-bold tracking-widest uppercase text-sm hidden md:block">Viral Gamer Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-emerald-400 uppercase border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded">
              Plano: {isLowTicket ? 'O Guia Viral' : 'Mentoria Elite'}
            </span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition-colors">Sair</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-black mb-8">Sua Base de Operações</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area - Always Accessible */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-emerald-400 border-b border-gray-800 pb-2">O Guia Viral (Treinamento)</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div whileHover={{ y: -5 }} key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group cursor-pointer transition-colors hover:border-emerald-500/50">
                  <div className="h-32 bg-black relative flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600')] bg-cover bg-center group-hover:opacity-40 transition-opacity"></div>
                    <svg className="w-12 h-12 text-emerald-500 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase">Módulo {i}</p>
                    <h3 className="font-bold text-gray-200">A Estrutura do Vídeo Viral</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium Sidebar - Conditionally Locked */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-lime-400 border-b border-gray-800 pb-2">Área Elite</h2>
            
            <div className={`relative rounded-xl overflow-hidden border ${isLowTicket ? 'border-gray-800 bg-gray-900/50' : 'border-lime-500/30 bg-lime-950/20'}`}>
              
              {isLowTicket && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-6 text-center">
                  <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-2 opacity-50">Sinal Desativado</h3>
                  <p className="text-xs text-gray-500 mb-4">Acesso exclusivo à Mentoria Elite.</p>
                  <button className="bg-gradient-to-r from-emerald-600 to-lime-600 text-black text-xs font-bold px-4 py-2 rounded uppercase tracking-wider hover:scale-105 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                    Desbloquear Acesso
                  </button>
                </div>
              )}

              <div className={`p-6 ${isLowTicket ? 'opacity-20 grayscale filter' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-lime-500/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                </div>
                <h3 className="text-lg font-black mb-2 text-white">Mentoria ao Vivo</h3>
                <p className="text-sm text-gray-400 mb-6">Call de escalonamento e análise de métricas diretamente comigo.</p>
                
                <button className="w-full bg-lime-500 hover:bg-lime-400 text-black font-black uppercase py-3 rounded transition-colors" disabled={isLowTicket}>
                  Agendar Aula
                </button>
              </div>
            </div>

            {/* Bônus Box */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 relative overflow-hidden group">
               <div className="absolute -right-6 -top-6 text-gray-800 opacity-20 group-hover:text-emerald-900 transition-colors">
                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
               </div>
               <h3 className="font-bold text-emerald-400 mb-1 relative z-10">Bônus: Caixa Misteriosa</h3>
               <p className="text-xs text-gray-500 mb-4 relative z-10">Reivindique seu jogo grátis.</p>
               <button className="text-xs uppercase font-bold tracking-wider text-white border border-gray-600 px-4 py-2 rounded hover:border-emerald-500 hover:text-emerald-400 transition-colors relative z-10">
                 Resgatar
               </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
