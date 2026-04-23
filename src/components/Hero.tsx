import {Play, Sparkles} from 'lucide-react';
import {motion} from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-neon-green/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{opacity: 0, x: -50}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.6}}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-green/10 border border-neon-green/20 rounded-full text-neon-green text-xs font-bold mb-6">
            <Sparkles size={14} />
            <span>METODOLOGIA REVELADA</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl leading-tight mb-6 uppercase">
            DOMINE O JOGO: <br />
            <span className="neon-text italic">2.5 MILHÕES DE VIEWS</span> E MONETIZE SUA PAIXÃO
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
            Descubra o método exato de mineração e edição magnética que transforma seu hobby em uma máquina de lucro orgânico, sem precisar aparecer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn-primary w-full sm:w-auto animate-pulse-neon whitespace-nowrap lg:text-lg">
              QUERO COMEÇAR MINHA JORNADA VIRAL
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.6, delay: 0.2}}
          className="relative group"
        >
          <div className="aspect-video bg-dark-surface rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Placeholder Thumbnail */}
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
              alt="Video Thumbnail"
              className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-neon-green rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.6)] group-hover:scale-110 transition-transform">
                <Play className="text-black fill-black ml-1 w-8 h-8" />
              </button>
            </div>
            
            {/* Glass decoration */}
            <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
                <div className="space-y-1">
                  <div className="w-24 h-3 bg-gray-700 rounded animate-pulse" />
                  <div className="w-16 h-2 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
              <div className="text-neon-green font-bold text-xs">LIVE NOW</div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-neon-green/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-neon-green/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
