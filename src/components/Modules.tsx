import {Search, Scissors, Cpu, Coins} from 'lucide-react';
import {motion} from 'motion/react';

const modules = [
  {
    icon: Search,
    title: "A Mina de Ouro",
    description: "Como encontrar as reviews virais e produtos ocultos na Steam que ninguém percebeu."
  },
  {
    icon: Scissors,
    title: "Edição Magnética",
    description: "O passo a passo no CapCut/Premiere para prender a atenção nos primeiros 3 segundos."
  },
  {
    icon: Cpu,
    title: "Hackeando o Algoritmo",
    description: "Configurações de SEO, horários estratégicos e como usar sons em alta a seu favor."
  },
  {
    icon: Coins,
    title: "Monetização Além do Ads",
    description: "Como integrar Mystery Boxes e parcerias para lucrar sem depender de visualizações."
  }
];

export default function Modules() {
  return (
    <section className="py-24 bg-dark-surface relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">O que você vai aprender</h2>
          <p className="text-gray-400">Do zero ao avançado na criação de conteúdo gamer viral.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, idx) => (
            <motion.div
              key={module.title}
              initial={{opacity: 0, x: idx % 2 === 0 ? -20 : 20}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className="card p-8 hover:border-neon-green transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 neon-text pointer-events-none">
                <module.icon size={80} />
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center mb-6 border border-white/5 group-hover:neon-border transition-all">
                <module.icon className="neon-text w-6 h-6" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic group-hover:neon-text transition-colors">{module.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {module.description}
              </p>
              

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
