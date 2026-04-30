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
      
      {/* HEADER ULTRA COMPACTO */}
      <header className="h-[25vh] shrink-0 parchment-texture border-b-2 border-arcane-gold shadow-xl relative z-20 flex flex-col items-center justify-center px-4 py-2">
        <div className="w-full max-w-4xl flex items-center gap-4">
          <div className="flex flex-col gap-1 shrink-0 bg-black/5 p-2 rounded-lg border border-black/5">
            {[selectedCore, selectedVector, selectedModulator].map((rune, i) => (
              <div key={i} className="flex items-center gap-2">
                {React.createElement(ICON_MAP[rune.id], { size: 14, style: { color: i === 0 ? rune.color : '#c5a059' } })}
                <span className="text-[7px] font-bold text-zinc-900 uppercase tracking-tighter">{rune.name}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 text-zinc-900 border-l border-zinc-900/10 pl-4">
            <h3 className="text-xl md:text-4xl font-power tracking-tighter text-red-950 leading-none uppercase line-clamp-1 mb-1">
              {spellResult.title}
            </h3>
            <p className="text-[9px] md:text-sm font-medium leading-tight line-clamp-2 italic opacity-80">
              {spellResult.power}
            </p>
          </div>
        </div>
      </header>

      {/* SELETOR DE CATEGORIA HORIZONTAL */}
      <nav className="bg-zinc-950 border-b border-white/5 flex p-1 gap-1 z-10">
        {[
          { id: 'core', label: 'NÚCLEO', color: selectedCore.color },
          { id: 'vector', label: 'VETOR', color: '#c5a059' },
          { id: 'modulator', label: 'MODULADOR', color: '#c5a059' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all border ${
              activeCategory === cat.id 
              ? 'bg-arcane-gold text-black border-white font-bold' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 text-xs'
            }`}
          >
            <span className="text-[10px] md:text-xs tracking-widest">{cat.label}</span>
            {activeCategory === cat.id && <div className="w-1 h-1 bg-black rounded-full" />}
          </button>
        ))}
      </nav>

      {/* ÁREA DE SELEÇÃO COMPACTA */}
      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#080808]">
        <div className="p-3 md:p-6 max-w-4xl mx-auto pb-24">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {(activeCategory === 'core' ? CORE_RUNES : activeCategory === 'vector' ? VECTOR_RUNES : MODULATOR_RUNES).map(rune => (
              <button
                key={rune.id}
                onClick={() => {
                  if (activeCategory === 'core') setSelectedCore(rune);
                  if (activeCategory === 'vector') setSelectedVector(rune);
                  if (activeCategory === 'modulator') setSelectedModulator(rune);
                }}
                className={`p-4 md:p-6 rounded-xl border transition-all flex flex-col items-center gap-2 group relative ${
                  (activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id 
                  ? 'bg-zinc-800 border-arcane-gold shadow-lg' 
                  : 'bg-zinc-900/20 border-white/5'
                }`}
              >
                {React.createElement(ICON_MAP[rune.id], { 
                  size: 24, 
                  className: (activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id ? '' : 'grayscale opacity-30',
                  style: { color: rune.color }
                })}
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter text-center truncate w-full">{rune.name}</span>
                
                {(activeCategory === 'core' ? selectedCore.id : activeCategory === 'vector' ? selectedVector.id : selectedModulator.id) === rune.id && (
                  <motion.div layoutId="active-ind" className="absolute inset-0 border border-arcane-gold rounded-xl pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER ULTRA CLEAN */}
      <footer className="p-3 bg-black border-t border-white/5 z-20">
        <button 
          onClick={saveSpell}
          disabled={isSaving}
          className="w-full bg-arcane-gold text-black font-display font-bold py-3 rounded-lg hover:bg-white transition-all disabled:opacity-50 text-sm md:text-lg uppercase tracking-widest shadow-lg active:scale-95"
        >
          {isSaving ? 'FORJANDO...' : 'VINCULAR AO GRIMÓRIO'}
        </button>
      </footer>
    </div>
  );
};

export default RuneBuilder;
