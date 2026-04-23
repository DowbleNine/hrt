import {Ghost, Gamepad, ArrowDownNarrowWide} from 'lucide-react';
import {motion} from 'motion/react';

const painPoints = [
  {
    icon: Ghost,
    text: "Quer viver de internet, mas não quer aparecer diante das câmeras."
  },
  {
    icon: Gamepad,
    text: "Ama games e quer transformar esse hobby em uma fonte de renda real."
  },
  {
    icon: ArrowDownNarrowWide,
    text: "Já posta vídeos com frequência, mas seu alcance está travado em '200 views'."
  }
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl mb-16">
          Este método é <span className="text-neon-green">exatamente</span> para você que...
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, scale: 0.95}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              className="card p-10 flex flex-col items-center group hover:border-neon-green transition-all"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-900/40 flex items-center justify-center mb-8 border border-white/5 group-hover:neon-border transition-all">
                <item.icon className="neon-text w-8 h-8" />
              </div>
              <p className="text-xl font-medium leading-relaxed text-slate-200">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
