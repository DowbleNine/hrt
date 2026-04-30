import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Globe, Youtube, Settings, 
  Flame, Droplet, Wind, Mountain, Zap, Moon, Aperture, Droplets,
  ArrowUpRight, Circle, Shield, Shrink, RefreshCw, Target,
  PlusCircle, FastForward, Timer, Anchor, Link, Cloud, ArrowDownCircle, ShieldAlert
} from 'lucide-react';
import { CORE_RUNES, VECTOR_RUNES, MODULATOR_RUNES, getSpellResult, Rune } from '../lib/runeData';
import './RuneBuilder.css';

// Icon Mapping for all 22 runes
const ICON_MAP: Record<string, any> = {
  // Cores
  pyros: Flame, hydros: Droplet, aethel: Wind, geos: Mountain,
  haemus: Droplets, fulgor: Zap, skotos: Moon, kinesis: Aperture,
  // Vectors
  impetus: ArrowUpRight, sphera: Circle, murus: Shield, 
  axis: Shrink, vertex: RefreshCw, trajectum: Target,
  // Modulators
  magnus: PlusCircle, velox: FastForward, aeterna: Timer, 
  fixus: Anchor, sincron: Link, levitas: Cloud, 
  gravis: ArrowDownCircle, fragilis: ShieldAlert
};

const GLOW_MAP: Record<string, string> = {
  pyros: 'rune-glow-fire',
  hydros: 'rune-glow-ice',
  aethel: 'rune-glow-air',
  geos: 'rune-glow-earth',
  haemus: 'rune-glow-fire', 
  fulgor: 'rune-glow-lightning', 
  skotos: 'rune-glow-shadow', 
  kinesis: 'rune-glow-gravity'  
};

const RuneBuilder: React.FC = () => {
  const [selectedCore, setSelectedCore] = useState<Rune>(CORE_RUNES[0]);
  const [selectedVector, setSelectedVector] = useState<Rune>(VECTOR_RUNES[0]);
  const [selectedModulator, setSelectedModulator] = useState<Rune>(MODULATOR_RUNES[0]);
  
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isSaving, setIsSaving] = useState(false);

  const spellResult = useMemo(() => {
    return getSpellResult(selectedCore, selectedVector, selectedModulator);
  }, [selectedCore, selectedVector, selectedModulator]);

  const saveSpell = async () => {
    if (!userEmail) {
      alert('Por favor, insira seu e-mail para salvar.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/runes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          core: selectedCore.id,
          vector: selectedVector.id,
          modulator: selectedModulator.id,
          title: spellResult.title,
          power: spellResult.power
        }),
      });

      if (response.ok) {
        alert('Magia salva no seu Grimório!');
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden bg-[#0a0a0a] text-zinc-300">
      <div className="absolute -top-20 -left-20 w-96 h-96 candle-light opacity-30" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] candle-light opacity-20" style={{ animationDelay: '1.5s' }} />

      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-md"><Home size={20} /></button>
          <h1 className="text-xl md:text-2xl text-arcane-gold font-display font-bold">
            FORJA DE RUNAS <span className="text-zinc-500 font-normal ml-2">- Atlas Alquímico</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Globe size={18} className="text-zinc-400 cursor-pointer hover:text-white" />
          <Youtube size={18} className="text-zinc-400 cursor-pointer hover:text-white" />
          <Settings size={18} className="text-zinc-400 cursor-pointer hover:text-white" />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden relative z-10">
        
        {/* RESULT SECTION (GRIMOIRE) */}
        <section className="flex-1 lg:max-w-2xl xl:max-w-3xl h-full">
          <motion.div 
            initial={{ rotateY: -10, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            className="parchment-texture w-full h-full p-12 md:p-20 relative rounded-sm text-zinc-900 flex flex-col justify-between magical-border shadow-2xl"
          >
            <div className="absolute top-6 right-6 w-16 h-16 bg-red-800 rounded-full shadow-2xl flex items-center justify-center -rotate-12 border-2 border-red-900 border-dashed z-20">
              <span className="text-white font-display text-xs">CÓDICE</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-5xl font-display font-bold mb-14 border-b-4 border-zinc-400/30 pb-6 w-full tracking-tighter">RESULTADO DA COMBINAÇÃO</h2>
              
              <div className="relative w-[450px] h-[450px] flex items-center justify-center mb-14">
                <svg className="absolute w-full h-full text-arcane-gold/30" viewBox="0 0 100 100">
                  <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="63.3" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCore.id}
                    initial={{ scale: 0, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    className="z-10 bg-white/20 p-8 rounded-full backdrop-blur-md border border-white/40 shadow-2xl"
                  >
                    {React.createElement(ICON_MAP[selectedCore.id], {
                      size: 160,
                      style: { color: selectedCore.color },
                      className: GLOW_MAP[selectedCore.id] || 'rune-glow-ice'
                    })}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-0 flex flex-col items-center">
                  <div className="w-16 h-16 bg-black/95 rounded-full flex items-center justify-center border-2 border-arcane-gold/60 shadow-2xl">
                    {React.createElement(ICON_MAP[selectedCore.id], { size: 32, style: { color: selectedCore.color } })}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                   <div className="w-16 h-16 bg-black/95 rounded-full flex items-center justify-center border-2 border-arcane-gold/60 shadow-2xl">
                    {React.createElement(ICON_MAP[selectedVector.id], { size: 32, style: { color: selectedVector.color } })}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-16 h-16 bg-black/95 rounded-full flex items-center justify-center border-2 border-arcane-gold/60 shadow-2xl">
                    {React.createElement(ICON_MAP[selectedModulator.id], { size: 32, style: { color: selectedModulator.color } })}
                  </div>
                </div>
              </div>

              <div className="w-full text-left font-sans italic space-y-12">
                <div>
                  <span className="font-bold block text-xl not-italic uppercase tracking-widest opacity-80 mb-3 text-zinc-700">COMBINAÇÃO:</span>
                  <p className="uppercase font-bold text-4xl text-zinc-900 leading-none tracking-tight">
                    {selectedCore.name} + {selectedVector.name} + {selectedModulator.name}
                  </p>
                </div>
                <div>
                  <span className="font-bold block text-xl not-italic uppercase tracking-widest opacity-80 mb-3 text-zinc-700">PODER GERADO:</span>
                  <p className="text-zinc-900 text-3xl leading-tight font-medium">{spellResult.power}</p>
                </div>
              </div>
            </div>

            <div className="mt-20 border-t-4 border-zinc-400/20 pt-10 text-center w-full">
              <span className="font-bold block text-xl not-italic uppercase tracking-[0.5em] opacity-80 mb-6 text-zinc-700">NOME EM PORTUGUÊS</span>
              <h3 className="text-8xl font-power tracking-tighter text-red-950 leading-none drop-shadow-2xl uppercase break-words px-4">
                {spellResult.title}
              </h3>
            </div>
          </motion.div>
        </section>

        {/* WORKBENCH SECTION (LIBRARY) */}
        <section className="flex-[1.5] flex flex-col gap-6 h-full overflow-hidden">
          <div className="bg-zinc-900/60 p-8 rounded-sm magical-border flex-1 flex flex-col relative overflow-hidden backdrop-blur-sm">
            <h2 className="text-arcane-gold font-display text-4xl mb-8 tracking-widest uppercase border-b border-arcane-gold/20 pb-4 w-full text-center">Bancada de Alquimia</h2>
            
            <div className="flex-1 w-full overflow-y-auto custom-scrollbar px-4 space-y-10">
              {/* NUCLEOS */}
              <div className="space-y-4">
                <h3 className="text-zinc-500 text-sm uppercase tracking-widest font-bold">1. Escolha o Núcleo (O Tronco)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {CORE_RUNES.map(rune => (
                    <button
                      key={rune.id}
                      onClick={() => setSelectedCore(rune)}
                      className={`p-6 rounded-lg border-2 transition-all flex flex-col items-center gap-3 group ${
                        selectedCore.id === rune.id 
                        ? 'bg-white/10 border-arcane-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' 
                        : 'bg-black/40 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {React.createElement(ICON_MAP[rune.id], { 
                        size: 32, 
                        className: selectedCore.id === rune.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400',
                        style: { color: selectedCore.id === rune.id ? rune.color : undefined }
                      })}
                      <span className="text-xs font-bold uppercase tracking-tighter">{rune.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* VETORES */}
              <div className="space-y-4">
                <h3 className="text-zinc-500 text-sm uppercase tracking-widest font-bold">2. Defina o Vetor (Os Ramos)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {VECTOR_RUNES.map(rune => (
                    <button
                      key={rune.id}
                      onClick={() => setSelectedVector(rune)}
                      className={`p-6 rounded-lg border-2 transition-all flex flex-col items-center gap-3 group ${
                        selectedVector.id === rune.id 
                        ? 'bg-white/10 border-arcane-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' 
                        : 'bg-black/40 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {React.createElement(ICON_MAP[rune.id], { 
                        size: 32, 
                        className: selectedVector.id === rune.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                      })}
                      <span className="text-xs font-bold uppercase tracking-tighter">{rune.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* MODULADORES */}
              <div className="space-y-4">
                <h3 className="text-zinc-500 text-sm uppercase tracking-widest font-bold">3. Refine com o Modulador (As Ramificações)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {MODULATOR_RUNES.map(rune => (
                    <button
                      key={rune.id}
                      onClick={() => setSelectedModulator(rune)}
                      className={`p-6 rounded-lg border-2 transition-all flex flex-col items-center gap-3 group ${
                        selectedModulator.id === rune.id 
                        ? 'bg-white/10 border-arcane-gold shadow-[0_0_20px_rgba(197,160,89,0.3)]' 
                        : 'bg-black/40 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {React.createElement(ICON_MAP[rune.id], { 
                        size: 32, 
                        className: selectedModulator.id === rune.id ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                      })}
                      <span className="text-xs font-bold uppercase tracking-tighter">{rune.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 w-full p-4 bg-black/60 border border-white/10 rounded-sm flex items-center gap-4">
              <input 
                type="email" 
                placeholder="Seu e-mail arcano para salvar..." 
                className="flex-1 bg-transparent border-none outline-none text-white font-sans italic"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  localStorage.setItem('userEmail', e.target.value);
                }}
              />
              <button 
                onClick={saveSpell}
                disabled={isSaving}
                className="bg-arcane-gold text-black font-display font-bold px-6 py-2 rounded-sm hover:bg-white transition-all disabled:opacity-50"
              >
                {isSaving ? 'SALVANDO...' : 'VINCULAR AO GRIMÓRIO'}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-8 text-center text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">
        SISTEMA DE MAGIA RÚNICA © 2026 - REINOS RÚNICOS - TODOS OS DIREITOS RESERVADOS
      </footer>
    </div>
  );
};

export default RuneBuilder;
