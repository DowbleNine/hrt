import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Play, Video, Discord, Trophy, Star, Zap } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-neon-green selection:text-black">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-neon-green to-emerald-600 flex items-center justify-center font-black text-black">VG</div>
            <span className="font-bold tracking-widest uppercase text-sm hidden md:block">Viral Gamer Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-black uppercase border px-3 py-1 rounded-full ${isLowTicket ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' : 'border-neon-green/30 text-neon-green bg-neon-green/10'}`}>
              Plano: {isLowTicket ? 'Guia Viral' : 'Mentoria Elite'}
            </span>
            <button onClick={handleLogout} className="text-gray-500 hover:text-white text-xs font-bold transition-colors">SAIR</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">Base de Operações</h1>
            <p className="text-gray-500 font-medium">Bem-vindo de volta, soldado. Sua jornada viral continua aqui.</p>
          </div>
          {!isLowTicket && (
            <div className="flex items-center gap-3 bg-neon-green/5 border border-neon-green/20 px-4 py-2 rounded-xl">
              <Trophy className="text-neon-green" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-neon-green">STATUS: ELITE ATIVADO</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white/50 mb-6 flex items-center gap-2">
                <Video size={18} /> Treinamento: O Guia Viral
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div whileHover={{ y: -5 }} key={i} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden group cursor-pointer transition-all hover:border-white/20">
                    <div className="h-40 bg-black relative flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600')] bg-cover bg-center group-hover:opacity-40 transition-opacity"></div>
                      <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green/30 group-hover:scale-110 transition-transform">
                        <Play className="text-neon-green fill-neon-green ml-1" size={20} />
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[10px] text-gray-500 font-black uppercase">Módulo 0{i}</p>
                        <span className="text-[8px] text-neon-green font-bold px-2 py-0.5 bg-neon-green/10 rounded">DISPONÍVEL</span>
                      </div>
                      <h3 className="font-bold text-white group-hover:text-neon-green transition-colors">A Estrutura do Vídeo Viral</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Sidebar */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-lime-400/50 mb-6 flex items-center gap-2">
                <Star size={18} /> Área Elite
              </h2>
              
              <div className={`relative rounded-2xl overflow-hidden border ${isLowTicket ? 'border-white/5 bg-[#111]/50' : 'border-lime-500/30 bg-lime-950/10'}`}>
                
                {isLowTicket && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-8 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                      <Lock className="text-gray-600" size={24} />
                    </div>
                    <h3 className="font-black text-white uppercase tracking-tighter mb-2">ACESSO BLOQUEADO</h3>
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">Este recurso é exclusivo para membros da Mentoria Elite.</p>
                    <button 
                      onClick={() => window.location.href = '/#pricing'}
                      className="bg-gradient-to-r from-neon-green to-emerald-600 text-black text-[10px] font-black px-6 py-3 rounded-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      Fazer Upgrade Agora
                    </button>
                  </div>
                )}

                <div className={`p-8 ${isLowTicket ? 'opacity-20 grayscale' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-lime-500/10 flex items-center justify-center mb-6 border border-lime-500/20">
                    <Discord className="text-lime-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-tighter">Comunidade VIP</h3>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed">Networking direto com grandes players e suporte individual 24/7.</p>
                  
                  <button className="w-full bg-lime-500 hover:bg-lime-400 text-black font-black uppercase py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(132,204,22,0.4)]" disabled={isLowTicket}>
                    Entrar no Discord
                  </button>
                </div>
              </div>

              {/* Mentoria Card */}
              <div className={`mt-8 p-8 rounded-2xl border ${isLowTicket ? 'border-white/5 bg-[#111]/50 grayscale opacity-20' : 'border-neon-green/20 bg-neon-green/5'}`}>
                 <div className="flex items-center gap-3 mb-4">
                   <Zap className="text-neon-green" size={20} />
                   <h3 className="font-black text-white uppercase tracking-widest text-sm">Mentoria Mensal</h3>
                 </div>
                 <p className="text-xs text-gray-500 mb-6 leading-relaxed">Call em grupo para análise de canais e estratégias de mineração.</p>
                 <button className="text-[10px] uppercase font-black tracking-widest text-neon-green border border-neon-green/30 px-6 py-3 rounded-xl hover:bg-neon-green hover:text-black transition-all" disabled={isLowTicket}>
                   Ver Calendário
                 </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
