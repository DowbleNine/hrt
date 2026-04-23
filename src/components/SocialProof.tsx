import {TrendingUp, Youtube, Music2, Instagram} from 'lucide-react';
import {motion} from 'motion/react';

const stats = [
  { icon: Music2, platform: 'TikTok', views: '1.2M', label: 'Views em 48h', color: 'text-pink-500' },
  { icon: Instagram, platform: 'Reels', views: '850K', label: 'Engajamento Orgânico', color: 'text-purple-500' },
  { icon: Youtube, platform: 'Shorts', views: '450K', label: 'Novos Inscritos', color: 'text-red-500' },
];

export default function SocialProof() {
  return (
    <section className="bg-dark-card py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-neon-green font-bold tracking-widest uppercase text-sm mb-4">A MÁQUINA DE RESULTADOS</p>
          <h2 className="text-3xl md:text-5xl italic">
            "Não é sorte, é algoritmo. <span className="text-white not-italic font-bold">+2.5 milhões</span> de visualizações orgânicas em 3 redes simultâneas."
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.platform}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.1}}
              className="card p-8 flex flex-col items-center text-center group hover:border-neon-green transition-all"
            >
              <div className="mb-6 p-1 bg-slate-900/50 rounded-lg">
                 <div className={`p-4 rounded-lg bg-dark-bg border border-white/10 group-hover:scale-110 transition-transform`}>
                   <stat.icon className={`w-8 h-8 ${stat.color}`} />
                 </div>
              </div>
              <h3 className="text-4xl font-black mb-2">{stat.views}</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">{stat.platform}</p>
              <span className="text-slate-500 text-[10px] uppercase tracking-tighter">{stat.label}</span>
              
              <div className="mt-6 flex items-center gap-2 neon-text font-black text-[10px] uppercase tracking-[0.2em]">
                <TrendingUp size={12} />
                <span>+124% ATIVO</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
