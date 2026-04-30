import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Droplet, Wind, Mountain, Zap, Moon, Aperture, Droplets,
  ArrowUpRight, Circle, Shield, Shrink, RefreshCw, Target,
  PlusCircle, FastForward, Timer, Anchor, Link, Cloud, ArrowDownCircle, ShieldAlert
} from 'lucide-react';
import { CORE_RUNES, VECTOR_RUNES, MODULATOR_RUNES, getSpellResult, Rune } from '../lib/runeData';
import './RuneBuilder.css';

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
  const [isSaving, setIsSaving] = useState(false);

  const spellResult = useMemo(() => getSpellResult(selectedCore, selectedVector, selectedModulator), [selectedCore, selectedVector, selectedModulator]);

  const saveSpell = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/runes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ core: selectedCore.id, vector: selectedVector.id, modulator: selectedModulator.id, title: spellResult.title, power: spellResult.power }),
      });
      if (response.ok) alert('Magia arquivada!');
      else throw new Error('Falha');
    } catch (error) { alert('Conexão falhou.'); } finally { setIsSaving(false); }
  };

  return (
    <div className="h-screen flex flex-col bg-[#050505] text-zinc-300 font-sans overflow-hidden select-none">
      
      {/* HEADER RESULTADO - AUMENTADO E MAIS ESPAÇADO */}
      <header className="h-[30vh] md:h-[35vh] shrink-0 parchment-texture border-b-2 border-arcane-gold shadow-xl relative z-20 flex flex-col items-center justify-center px-4 py-4 overflow-hidden">
        <div className="w-full max-w-5xl flex items-center gap-6">
          {/* ICONES DE STATUS MAIORES */}
          <div className="flex flex-col gap-2 shrink-0 bg-black/10 p-3 rounded-xl border border-black/10 shadow-inner">
            {[selectedCore, selectedVector, selectedModulator].map((rune, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                  {React.createElement(ICON_MAP[rune.id], { size: 20, style: { color: i === 0 ? rune.color : '#c5a059' } })}
                </div>
                <span className="text-[10px] md:text-xs font-bold text-zinc-900 uppercase tracking-widest">{rune.name}</span>
              </div>
            ))}
          </div>

          {/* TITULO E DESCRIÇÃO MAIORES */}
          <div className="flex-1 text-zinc-900 border-l-2 border-zinc-900/10 pl-6">
            <h3 className="text-2xl md:text-6xl font-power tracking-tighter text-red-950 leading-none uppercase mb-2">
              {spellResult.title}
            </h3>
            <p className="text-[11px] md:text-xl font-medium leading-relaxed italic opacity-90 max-w-2xl">
              {spellResult.power}
            </p>
          </div>
        </div>
      </header>

      {/* SELETOR DE CATEGORIA HORIZONTAL - REFINADO */}
      <nav className="bg-zinc-950 border-b border-white/5 flex p-2 gap-2 z-10 shadow-lg">
        {[
          { id: 'core', label: 'NÚCLEO', color: selectedCore.color },
          { id: 'vector', label: 'VETOR', color: '#c5a059' },
          { id: 'modulator', label: 'MODULADOR', color: '#c5a059' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`flex-1 py-4 md:py-6 rounded-xl flex items-center justify-center gap-3 transition-all border-2 ${
              activeCategory === cat.id 
              ? 'bg-arcane-gold text-black border-white shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
            }`}
          >
            <span className="text-[11px] md:text-base font-bold tracking-[0.2em]">{cat.label}</span>
          </button>
        ))}
      </nav>

      {/* ÁREA DE SELEÇÃO - PREENCHIMENTO OTIMIZADO */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#080808]">
        <div className="p-4 md:p-10 max-w-5xl mx-auto pb-32">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {(activeCategory === 'core' ? CORE_RUNES : activeCategory === 'vector' ? VECTOR_RUNES : MODULATOR_RUNES).map(rune => (
              <button
                key={rune.id}
                onClick={() => {
                  if (activeCategory === 'core') setSelectedCore(rune);
                  if (activeCategory === 'vector') setSelectedVector(rune);
                  if (activeCategory === 'modulator') setSelectedModulator(rune);
                }}
                className={`p-6 md:p-10 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 group relative ${
                  (activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id 
                  ? 'bg-zinc-800 border-arcane-gold shadow-[0_0_20px_rgba(197,160,89,0.2)] ring-4 ring-arcane-gold/5' 
                  : 'bg-zinc-900/30 border-white/5 hover:border-white/10'
                }`}
              >
                {React.createElement(ICON_MAP[rune.id], { 
                  size: window.innerWidth < 768 ? 36 : 48, 
                  className: (activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id ? '' : 'grayscale opacity-25 group-hover:opacity-100 group-hover:grayscale-0',
                  style: { color: rune.color }
                })}
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-center">{rune.name}</span>
                
                {(activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id && (
                  <motion.div layoutId="active-ind" className="absolute inset-0 border-2 border-arcane-gold rounded-2xl pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER - COMPACTO E LIMPO */}
      <footer className="p-4 bg-black border-t border-white/5 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button 
          onClick={saveSpell}
          disabled={isSaving}
          className="w-full bg-arcane-gold text-black font-display font-bold py-5 rounded-2xl hover:bg-white transition-all disabled:opacity-50 text-base md:text-2xl uppercase tracking-[0.2em] shadow-xl active:scale-[0.98]"
        >
          {isSaving ? 'FORJANDO...' : 'VINCULAR AO GRIMÓRIO'}
        </button>
      </footer>
    </div>
  );
};

export default RuneBuilder;
