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
            <a href="#pricing" className="btn-primary w-full sm:w-auto animate-pulse-neon whitespace-nowrap lg:text-lg text-center flex items-center justify-center">
              QUERO COMEÇAR MINHA JORNADA VIRAL
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{opacity: 0, scale: 0.9}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.6, delay: 0.2}}
          className="relative group"
        >
          <div className="aspect-video bg-dark-surface rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            {/* O vídeo foi removido. Aqui ficará a sua imagem. */}
            <img 
              src="/assets/vsl-imagem.png" 
              alt="Imagem Principal"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-neon-green/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-neon-green/20 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
