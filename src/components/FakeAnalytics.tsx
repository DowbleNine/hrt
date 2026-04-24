import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

function Counter({ target, duration, isCurrency = false }: { target: number, duration: number, isCurrency?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing out curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  if (isCurrency) {
    return <span>US$ {count.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>;
  }
  return <span>{count.toLocaleString('pt-BR')}</span>;
}

export default function FakeAnalytics() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-3xl border border-[#333] bg-[#1a1a1a] rounded-lg p-6 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-green/50" />
      
      <h2 className="text-xl font-medium text-white mb-1">Estatísticas do Canal</h2>
      <p className="text-sm text-slate-300 mb-8 font-medium">
        Seu canal obteve <span className="text-white font-bold"><Counter target={1036432} duration={2500} /> visualizações</span> nos últimos 28 dias
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#333] border-b border-[#333] pb-6 mb-6">
        
        {/* Visualizações */}
        <div className="flex flex-col px-4 py-2 hover:bg-white/5 transition-colors cursor-default">
          <span className="text-slate-400 text-sm mb-2">Visualizações</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-white">
              <Counter target={1036432} duration={2500} />
            </span>
            <div className="bg-green-500/20 rounded-full p-1">
              <TrendingUp className="text-neon-green w-4 h-4" />
            </div>
          </div>
          <span className="text-slate-500 text-xs mt-2 font-mono">960k a mais que o normal</span>
        </div>

        {/* Inscritos */}
        <div className="flex flex-col px-4 py-2 hover:bg-white/5 transition-colors cursor-default">
          <span className="text-slate-400 text-sm mb-2">Inscritos</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-white">
              +<Counter target={37850} duration={2500} />
            </span>
            <div className="bg-green-500/20 rounded-full p-1">
              <TrendingUp className="text-neon-green w-4 h-4" />
            </div>
          </div>
          <span className="text-slate-500 text-xs mt-2 font-mono">13.5k a mais que o normal</span>
        </div>

        {/* Receita */}
        <div className="flex flex-col px-4 py-2 hover:bg-white/5 transition-colors cursor-default">
          <span className="text-slate-400 text-sm mb-2">Receita Estimada</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-white">
              <Counter target={4850.50} duration={3000} isCurrency={true} />
            </span>
            <div className="bg-green-500/20 rounded-full p-1">
              <TrendingUp className="text-neon-green w-4 h-4" />
            </div>
          </div>
          <span className="text-slate-500 text-xs mt-2 font-mono">Alta retenção gringa</span>
        </div>

      </div>

      {/* Line Chart Falso */}
      <div className="w-full h-32 relative flex items-end">
        {/* Linhas de grade de fundo falsas */}
        <div className="absolute inset-0 flex flex-col justify-between">
            <div className="w-full h-[1px] bg-[#333]/50"></div>
            <div className="w-full h-[1px] bg-[#333]/50"></div>
            <div className="w-full h-[1px] bg-[#333]/50"></div>
            <div className="w-full h-[1px] bg-[#333]/50"></div>
        </div>
        
        <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d relative z-10 drop-shadow-[0_0_8px_rgba(0,255,157,0.8)]">
          <motion.path 
            d="M 0 35 L 5 32 L 15 31 L 20 15 L 25 25 L 35 30 L 45 28 L 50 32 L 60 29 L 65 28 L 70 8 L 75 22 L 85 27 L 90 26 L 95 28 L 100 27" 
            fill="none" 
            stroke="#00ff9d" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 2.5, ease: "easeOut" }} 
          />
          {/* Sombra de preenchimento em gradiente abaixo da linha */}
          <motion.path 
             d="M 0 35 L 5 32 L 15 31 L 20 15 L 25 25 L 35 30 L 45 28 L 50 32 L 60 29 L 65 28 L 70 8 L 75 22 L 85 27 L 90 26 L 95 28 L 100 27 L 100 40 L 0 40 Z" 
             fill="url(#gradient)"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 1.5 }}
          />
          <defs>
             <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
             </linearGradient>
          </defs>
        </svg>

        {/* Labels falsas no eixo X */}
        <div className="absolute -bottom-6 w-full flex justify-between text-[#666] text-[10px] uppercase font-mono">
           <span>1 Jun</span>
           <span>5 Jun</span>
           <span>10 Jun</span>
           <span>15 Jun</span>
           <span>20 Jun</span>
           <span>28 Jun</span>
        </div>
      </div>

    </motion.div>
  );
}
