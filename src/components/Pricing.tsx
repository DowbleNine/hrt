import {Check, Star, Zap} from 'lucide-react';
import {motion} from 'motion/react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl mb-8">Nossas Ofertas</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-16">
          Estamos atualizando nossos planos para oferecer a melhor experiência. Volte em breve para conferir as novidades.
        </p>
        
        <div className="h-[400px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center bg-black/20">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Zap className="text-gray-600" />
          </div>
          <span className="text-gray-600 font-bold uppercase tracking-widest text-sm">Aguardando Novas Ofertas</span>
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
