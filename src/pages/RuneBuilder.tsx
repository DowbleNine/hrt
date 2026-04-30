import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Settings, 
  Flame, Droplet, Wind, Mountain, Zap, Moon, Aperture, Droplets,
  ArrowUpRight, Circle, Shield, Shrink, RefreshCw, Target,
  PlusCircle, FastForward, Timer, Anchor, Link, Cloud, ArrowDownCircle, ShieldAlert
} from 'lucide-react';
import { CORE_RUNES, VECTOR_RUNES, MODULATOR_RUNES, getSpellResult, Rune } from '../lib/runeData';
import './RuneBuilder.css';

// Icon Mapping for all 22 runes
const ICON_MAP: Record<string, any> = {
  pyros: Flame, hydros: Droplet, aethel: Wind, geos: Mountain,
  haemus: Droplets, fulgor: Zap, skotos: Moon, kinesis: Aperture,
  impetus: ArrowUpRight, sphera: Circle, murus: Shield, 
  axis: Shrink, vertex: RefreshCw, trajectum: Target,
  magnus: PlusCircle, velox: FastForward, aeterna: Timer, 
  fixus: Anchor, sincron: Link, levitas: Cloud, 
  gravis: ArrowDownCircle, fragilis: ShieldAlert
};

const GLOW_MAP: Record<string, string> = {
  pyros: 'rune-glow-fire', hydros: 'rune-glow-ice', aethel: 'rune-glow-air', geos: 'rune-glow-earth',
  haemus: 'rune-glow-fire', fulgor: 'rune-glow-lightning', skotos: 'rune-glow-shadow', kinesis: 'rune-glow-gravity'  
};

const RuneBuilder: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'core' | 'vector' | 'modulator'>('core');
  const [selectedCore, setSelectedCore] = useState<Rune>(CORE_RUNES[0]);
  const [selectedVector, setSelectedVector] = useState<Rune>(VECTOR_RUNES[0]);
  const [selectedModulator, setSelectedModulator] = useState<Rune>(MODULATOR_RUNES[0]);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isSaving, setIsSaving] = useState(false);

  const spellResult = useMemo(() => getSpellResult(selectedCore, selectedVector, selectedModulator), [selectedCore, selectedVector, selectedModulator]);

  const saveSpell = async () => {
    if (!userEmail) { alert('Por favor, insira seu e-mail.'); return; }
    setIsSaving(true);
    try {
      const response = await fetch('/api/runes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, core: selectedCore.id, vector: selectedVector.id, modulator: selectedModulator.id, title: spellResult.title, power: spellResult.power }),
      });
      if (response.ok) alert('Magia salva!');
      else throw new Error('Falha ao salvar');
    } catch (error) { alert('Erro ao conectar.'); } finally { setIsSaving(false); }
  };

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-zinc-300 font-sans overflow-hidden select-none">
      
      {/* HEADER RESULTADO (ESTILO CÓDICE) */}
      <header className="h-[35vh] md:h-[30vh] shrink-0 parchment-texture border-b-4 border-arcane-gold shadow-2xl relative z-20 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-2 left-4 flex gap-2 items-center opacity-30">
          <Home size={12} className="text-zinc-900" />
          <span className="text-[8px] text-zinc-900 font-bold tracking-[0.2em]">CÓDICE RÚNICO</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-10 w-full max-w-5xl relative">
          {/* ICONE CENTRAL RESPONSIVO */}
          <div className="relative shrink-0">
             <div className="w-24 h-24 md:w-40 md:h-40 bg-black/5 rounded-full flex items-center justify-center border border-zinc-950/10 shadow-inner">
               <AnimatePresence mode="wait">
                 <motion.div key={selectedCore.id} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    {React.createElement(ICON_MAP[selectedCore.id], {
                        size: window.innerWidth < 768 ? 56 : 96,
                        style: { color: selectedCore.color },
                        className: GLOW_MAP[selectedCore.id]
                    })}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>
          
          <div className="flex-1 text-zinc-900">
            <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-50 block mb-1">PODER DESCOBERTO</span>
            <h3 className="text-xl md:text-5xl font-power tracking-tighter text-red-950 leading-none uppercase mb-1 line-clamp-2">
              {spellResult.title}
            </h3>
            <p className="text-[10px] md:text-lg font-medium leading-tight line-clamp-3 italic opacity-70 border-l-2 border-zinc-950/20 pl-3">
              {spellResult.power}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR DE NAVEGAÇÃO */}
        <nav className="w-20 md:w-28 bg-zinc-950 border-r border-white/5 flex flex-col items-center py-6 gap-6 z-10 shadow-[5px_0_15px_rgba(0,0,0,0.5)]">
          {[
            { id: 'core', icon: ICON_MAP[selectedCore.id], label: 'NÚCLEO', color: selectedCore.color },
            { id: 'vector', icon: ICON_MAP[selectedVector.id], label: 'VETOR', color: '#c5a059' },
            { id: 'modulator', icon: ICON_MAP[selectedModulator.id], label: 'MODUL.', color: '#c5a059' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border-2 relative ${
                activeCategory === cat.id 
                ? 'bg-arcane-gold text-black border-white shadow-[0_0_20px_rgba(197,160,89,0.4)] scale-105' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
              }`}
            >
              {React.createElement(cat.icon, { size: 28, style: { color: activeCategory === cat.id ? 'black' : cat.color } })}
              <span className="text-[7px] md:text-[9px] font-bold tracking-tighter">{cat.label}</span>
              {activeCategory === cat.id && <div className="absolute -right-1 w-2 h-8 bg-white rounded-full" />}
            </button>
          ))}
        </nav>

        {/* ÁREA DE SELEÇÃO DINÂMICA */}
        <section className="flex-1 flex flex-col bg-[#050505] overflow-hidden">
          <div className="p-4 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 flex justify-between items-end">
                <div>
                  <h2 className="text-arcane-gold font-display text-3xl md:text-5xl tracking-widest uppercase">
                    {activeCategory === 'core' ? 'NÚCLEO' : activeCategory === 'vector' ? 'VETOR' : 'MODULADOR'}
                  </h2>
                  <p className="text-zinc-600 text-xs md:text-base font-medium italic">
                    {activeCategory === 'core' ? 'A essência elemental da magia.' : activeCategory === 'vector' ? 'A forma física da projeção.' : 'O refinamento da energia.'}
                  </p>
                </div>
                <div className="text-arcane-gold/40 font-power text-4xl md:text-6xl opacity-10">0{activeCategory === 'core' ? '1' : activeCategory === 'vector' ? '2' : '3'}</div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-32">
                {(activeCategory === 'core' ? CORE_RUNES : activeCategory === 'vector' ? VECTOR_RUNES : MODULATOR_RUNES).map(rune => (
                  <button
                    key={rune.id}
                    onClick={() => {
                      if (activeCategory === 'core') setSelectedCore(rune);
                      if (activeCategory === 'vector') setSelectedVector(rune);
                      if (activeCategory === 'modulator') setSelectedModulator(rune);
                    }}
                    className={`p-6 md:p-10 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 group relative overflow-hidden ${
                      (activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id 
                      ? 'bg-zinc-800 border-arcane-gold ring-4 ring-arcane-gold/10 shadow-[0_0_30px_rgba(197,160,89,0.2)]' 
                      : 'bg-zinc-900/40 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {React.createElement(ICON_MAP[rune.id], { 
                      size: window.innerWidth < 768 ? 36 : 56, 
                      className: (activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id ? '' : 'grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0',
                      style: { color: rune.color }
                    })}
                    <span className="text-[11px] md:text-base font-bold uppercase tracking-widest text-center">{rune.name}</span>
                    
                    {(activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id && (
                      <motion.div layoutId="active-indicator" className="absolute inset-0 border-2 border-arcane-gold rounded-[2rem] pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BARRA DE AÇÃO FIXA */}
          <div className="p-4 md:p-6 bg-black border-t border-white/10 flex flex-col md:flex-row items-center gap-4 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
            <div className="flex-1 flex items-center gap-3 w-full bg-zinc-900/50 px-5 py-4 rounded-2xl border border-white/5 focus-within:border-arcane-gold/50 transition-all">
              <input 
                type="email" 
                placeholder="E-mail para vincular ao Grimório..." 
                className="flex-1 bg-transparent border-none outline-none text-white font-sans text-sm md:text-lg"
                value={userEmail}
                onChange={(e) => { setUserEmail(e.target.value); localStorage.setItem('userEmail', e.target.value); }}
              />
            </div>
            <button 
              onClick={saveSpell}
              disabled={isSaving}
              className="w-full md:w-80 bg-arcane-gold text-black font-display font-bold py-4 md:py-5 rounded-2xl hover:bg-white transition-all disabled:opacity-50 text-lg md:text-2xl shadow-[0_10px_20px_rgba(197,160,89,0.3)] active:scale-95 flex items-center justify-center gap-3"
            >
              {isSaving ? 'FORJANDO...' : 'VINCULAR AO GRIMÓRIO'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RuneBuilder;
