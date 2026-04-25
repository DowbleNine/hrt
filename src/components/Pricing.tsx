import { useState } from 'react';
import {Check, Star, Zap, Crown} from 'lucide-react';
import {motion} from 'motion/react';
import CheckoutModal from './CheckoutModal';

export default function Pricing() {
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: number} | null>(null);

  return (
    <section id="pricing" className="py-24 bg-dark-bg relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-neon-green/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-green/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">
            Escolha o seu <span className="neon-text">Plano de Ação</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Selecione o nível de acesso que você deseja para começar sua jornada na Viral Gamer Academy.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {/* Plano 1 - O Guia Viral */}
          <motion.div 
            initial={{opacity: 0, x: -30}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            className="w-full max-w-sm p-8 card bg-dark-surface/50 backdrop-blur-sm flex flex-col border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="mb-8 text-left">
              <div className="inline-block px-3 py-1 bg-slate-800/50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border border-white/5">
                STARTING POINT
              </div>
              <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter text-white group-hover:text-neon-green transition-colors">O GUIA VIRAL</h3>
              <p className="text-slate-400 text-sm leading-relaxed">O ponto de partida ideal para quem está começando do zero no orgânico.</p>
            </div>
            
            <div className="mb-8 text-left py-6 border-y border-white/5">
              <span className="text-sm text-slate-500 line-through block mb-1 font-medium">De R$ 197</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">R$ 47,00</span>
                <span className="text-slate-500 text-xs italic font-medium">/ Acesso Vitalício</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-10 text-left">
              <ListItem text="Curso em Vídeo Completo" />
              <ListItem text="PDF Checklist de Postagem" />
              <ListItem text="Acesso Vitalício às Aulas" />
              <ListItem text="Atualizações Mensais" />
            </ul>
            
            <button 
              onClick={() => setSelectedProduct({name: 'O GUIA VIRAL', price: 47.00})}
              className="mt-auto w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
            >
              COMPRAR AGORA
            </button>
          </motion.div>
          
          {/* Plano 2 - Mentoria Elite */}
          <motion.div 
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="w-full max-w-sm p-8 card elite-card neon-border bg-dark-surface/80 backdrop-blur-md flex flex-col relative transform scale-105 shadow-[0_0_50px_rgba(16,185,129,0.1)] group"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-green text-black px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 uppercase tracking-widest shadow-lg shadow-neon-green/20">
              <Crown size={12} fill="currentColor" /> MAIS VENDIDO
            </div>
            
            <div className="mb-8 text-left">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">MENTORIA ELITE</h3>
                <Zap className="text-neon-green fill-neon-green animate-pulse" size={24} />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">Acompanhamento premium para quem busca escala e resultados exponenciais.</p>
            </div>
            
            <div className="mb-8 text-left py-6 border-y border-neon-green/10">
              <span className="text-sm text-slate-400 line-through block mb-1 font-medium">De R$ 497</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black neon-text drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">R$ 97,00</span>
                <span className="text-slate-400 text-xs italic font-medium">/ 1 Ano de Acesso</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-10 text-left">
              <ListItem text="Tudo do Guia Viral" highlighted />
              <ListItem text="Call Individual Estratégica" highlighted />
              <ListItem text="Grupo VIP no Discord" highlighted />
              <ListItem text="Acesso Exclusivo ao SaaS de Mineração" highlighted />
              <ListItem text="Suporte 24/7 Direto com Mentor" highlighted />
            </ul>
            
            <button 
              onClick={() => setSelectedProduct({name: 'MENTORIA ELITE', price: 97.00})}
              className="mt-auto w-full neon-bg py-5 rounded-2xl font-black text-center text-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-neon-green/20 pulse"
            >
              QUERO A MENTORIA COMPLETA
            </button>
          </motion.div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        productName={selectedProduct?.name || ''}
        amount={selectedProduct?.price || 0}
      />
    </section>
  );
}

function ListItem({ text, highlighted = false }: { text: string; highlighted?: boolean }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${highlighted ? 'bg-neon-green/20 border border-neon-green/50' : 'bg-white/5 border border-white/10'}`}>
        <Check size={12} className={highlighted ? 'text-neon-green' : 'text-slate-500'} strokeWidth={3} />
      </div>
      <span className={`font-medium ${highlighted ? 'text-white' : 'text-slate-400'}`}>{text}</span>
    </li>
  );
}
