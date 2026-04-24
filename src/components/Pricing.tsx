import {Check, Star, Zap} from 'lucide-react';
import {motion} from 'motion/react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl mb-16">Escolha o seu plano de ação</h2>
        
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
          {/* Box 1 - Guia Viral */}
          <div className="w-full max-w-sm p-8 card flex flex-col h-[600px]">
            <div className="mb-8 text-left">
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">O GUIA VIRAL</h3>
              <p className="text-slate-400 text-sm">O ponto de partida ideal para quem está começando.</p>
            </div>
            
            <div className="mb-8 text-left">
              <span className="text-sm text-slate-500 line-through block mb-1">De R$ 197</span>
              <span className="text-4xl font-black text-slate-text">R$ 47,00</span>
              <span className="text-slate-500 text-sm italic"> / Acesso Vitalício</span>
            </div>
            
            <ul className="space-y-4 mb-auto text-left">
              <ListItem text="Curso em Vídeo Completo" />
              <ListItem text="PDF Checklist de Postagem" />
              <ListItem text="Acesso Vitalício às Aulas" />
              <ListItem text="Atualizações Mensais" />
            </ul>
            
            <a 
              href="https://go.use-dice.com/5LEEzq0LYc5x9EonF9qTU04TBq-TNwFE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 w-full py-4 bg-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors text-center inline-block"
            >
              COMPRAR AGORA
            </a>
          </div>
          
          {/* Box 2 - Mentoria Elite (Highlighted) */}
          <motion.div 
            initial={{scale: 0.95}}
            whileInView={{scale: 1}}
            viewport={{once: true}}
            className="w-full max-w-sm p-8 card elite-card neon-border flex flex-col h-[640px] relative transform scale-105"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-green text-dark-bg px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 uppercase tracking-tighter">
              <Star size={10} fill="currentColor" /> MAIS VENDIDO
            </div>
            
            <div className="mb-8 text-left">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">MENTORIA ELITE</h3>
                <Zap className="text-neon-green fill-neon-green" size={20} />
              </div>
              <p className="text-slate-300 text-sm">Acompanhamento premium para resultados exponenciais.</p>
            </div>
            
            <div className="mb-8 text-left">
              <span className="text-sm text-slate-400 line-through block mb-1">De R$ 497</span>
              <span className="text-4xl font-black neon-text">R$ 97,00</span>
              <span className="text-slate-400 text-sm italic"> / 1 Ano de Acesso</span>
            </div>
            
            <ul className="space-y-4 mb-auto text-left">
              <ListItem text="Tudo do Guia Viral" highlighted />
              <ListItem text="Call Individual Estratégica" highlighted />
              <ListItem text="Grupo VIP no Discord" highlighted />
              <ListItem text="Acesso Exclusivo ao SaaS de Mineração" highlighted />
              <ListItem text="Suporte 24/7 Direto com Mentor" highlighted />
            </ul>
            
            <a 
              href="https://go.use-dice.com/5LEEzq0LYc5x9EonF9qTU04TBq-TNwFE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 w-full neon-bg py-4 rounded-xl font-bold text-center inline-block text-black uppercase tracking-widest pulse"
            >
              QUERO A MENTORIA COMPLETA
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ListItem({ text, highlighted = false }: { text: string; highlighted?: boolean }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${highlighted ? 'bg-neon-green' : 'bg-gray-800'}`}>
        <Check size={12} className={highlighted ? 'text-black' : 'text-gray-400'} strokeWidth={3} />
      </div>
      <span className={highlighted ? 'text-white' : 'text-gray-400'}>{text}</span>
    </li>
  );
}
