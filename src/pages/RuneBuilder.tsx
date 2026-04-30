import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Globe, 
  Youtube, 
  Settings, 
  Sparkles,
  Flame, 
  Droplets, 
  Mountain, 
  Wind, 
  Compass, 
  Zap, 
  Hourglass, 
  Diamond, 
  Sparkles as SparklesIcon,
  MoveUpRight,
  Maximize
} from 'lucide-react';
import { RUNE_DATA, CoreRune, VectorRune, ModulatorRune } from '../lib/runeData';
import './RuneBuilder.css';

// Icon Mapping based on forja-de-runas structure
const ICON_MAP: Record<string, any> = {
  // Cores
  'fire': Flame,
  'water': Droplets,
  'earth': Mountain,
  'air': Wind,
  // Vectors
  'direction': Compass,
  'speed': Zap,
  'range': MoveUpRight,
  'curve': Maximize,
  // Modulators
  'intensity': SparklesIcon,
  'duration': Hourglass,
  'volume': Maximize,
  'secondary': Diamond
};

const GLOW_MAP: Record<string, string> = {
  'fire': 'rune-glow-fire',
  'water': 'rune-glow-ice',
  'earth': 'rune-glow-earth',
  'air': 'rune-glow-air'
};

const RuneBuilder: React.FC = () => {
  const [selectedCore, setSelectedCore] = useState<CoreRune | null>(RUNE_DATA.cores.fire);
  const [selectedVector, setSelectedVector] = useState<VectorRune | null>(RUNE_DATA.vectors.direction);
  const [selectedModulator, setSelectedModulator] = useState<ModulatorRune | null>(RUNE_DATA.modulators.intensity);
  
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isSaving, setIsSaving] = useState(false);

  const spellResult = useMemo(() => {
    if (!selectedCore || !selectedVector || !selectedModulator) return null;

    const coreName = selectedCore.name.toUpperCase();
    const vectorName = selectedVector.name.toUpperCase();
    const modName = selectedModulator.name.toUpperCase();

    const results: Record<string, { title: string; power: string }> = {
      'fire-direction-intensity': {
        title: 'IMPACTO ÍGNEO EXPLOSIVO',
        power: 'Rajada Elemental de Calor Expansivo. Causa dano em área com chamas vibrantes.'
      },
      'water-speed-duration': {
        title: 'VORTÉX AQUÁTICO ETERNO',
        power: 'Redemoinho persistente que aprisiona inimigos em correntes de alta velocidade.'
      },
      'earth-range-volume': {
        title: 'MONOLITO TELÚRICO GIGANTE',
        power: 'Ergue uma barreira de pedra maciça a longas distâncias, bloqueando passagens.'
      },
      'air-curve-secondary': {
        title: 'BRISA DE LÂMINAS OCULTAS',
        power: 'Lâminas de vento invisíveis que contornam obstáculos para atingir pontos vitais.'
      }
    };

    const key = `${selectedCore.id}-${selectedVector.id}-${selectedModulator.id}`;
    
    const defaultResult = {
      title: `${coreName} ${vectorName} ${modName}`,
      power: `Uma combinação harmônica de ${selectedCore.name.toLowerCase()} guiada por ${selectedVector.name.toLowerCase()} e amplificada por ${selectedModulator.name.toLowerCase()}.`
    };

    return results[key] || defaultResult;
  }, [selectedCore, selectedVector, selectedModulator]);

  const saveSpell = async () => {
    if (!selectedCore || !spellResult) return;
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
          user_email: userEmail,
          spell_name: spellResult.title,
          core_id: selectedCore.id,
          vector_id: selectedVector?.id,
          modulator_ids: selectedModulator ? [selectedModulator.id] : [],
          power: 5
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Magia salva!');
        localStorage.setItem('userEmail', userEmail);
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão.');
    } finally {
      setIsSaving(false);
    }
  };

  const auraColor = selectedCore?.color || '#c5a059';

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden bg-[#1a1a1a] text-zinc-300">
      <div className="absolute -top-20 -left-20 w-96 h-96 candle-light" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] candle-light" style={{ animationDelay: '1.5s' }} />

      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-md"><Home size={20} /></button>
          <h1 className="text-xl md:text-2xl text-arcane-gold font-display font-bold">
            FORJA DE RUNAS <span className="text-zinc-500 font-normal ml-2">- Grimório Arcano</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <Globe size={18} className="text-zinc-400 cursor-pointer hover:text-white" />
          <Youtube size={18} className="text-zinc-400 cursor-pointer hover:text-white" />
          <Settings size={18} className="text-zinc-400 cursor-pointer hover:text-white" />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden relative z-10">
        
        <section className="flex-1 lg:max-w-2xl xl:max-w-3xl h-full">
          <motion.div 
            initial={{ rotateY: -10, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            className="parchment-texture w-full h-full p-12 md:p-20 relative rounded-sm text-zinc-900 flex flex-col justify-between magical-border"
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
                    key={selectedCore?.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="z-10 bg-white/20 p-6 rounded-full backdrop-blur-sm border border-white/40 shadow-xl"
                  >
                    {selectedCore && React.createElement(ICON_MAP[selectedCore.id], {
                      size: 160,
                      style: { color: selectedCore.color },
                      className: GLOW_MAP[selectedCore.id]
                    })}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-0 flex flex-col items-center">
                  <div className="w-16 h-16 bg-black/95 rounded-full flex items-center justify-center border-2 border-arcane-gold/60 shadow-2xl">
                    {selectedCore && React.createElement(ICON_MAP[selectedCore.id], { size: 32, style: { color: selectedCore.color } })}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                   <div className="w-16 h-16 bg-black/95 rounded-full flex items-center justify-center border-2 border-arcane-gold/60 shadow-2xl">
                    {selectedVector && React.createElement(ICON_MAP[selectedVector.id], { size: 32, style: { color: selectedVector.color } })}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-16 h-16 bg-black/95 rounded-full flex items-center justify-center border-2 border-arcane-gold/60 shadow-2xl">
                    {selectedModulator && React.createElement(ICON_MAP[selectedModulator.id], { size: 32, style: { color: selectedModulator.color } })}
                  </div>
                </div>
              </div>

              <div className="w-full text-left font-sans italic space-y-12">
                <div>
                  <span className="font-bold block text-xl not-italic uppercase tracking-widest opacity-80 mb-3">Nomes das Runas:</span>
                  <p className="uppercase font-bold text-4xl text-zinc-900 leading-none tracking-tight">
                    {selectedCore?.name} | VETOR DE {selectedVector?.name} | MODULADOR DE {selectedModulator?.name}
                  </p>
                </div>
                <div>
                  <span className="font-bold block text-xl not-italic uppercase tracking-widest opacity-80 mb-3">Poder Gerado:</span>
                  <p className="text-zinc-900 text-3xl leading-tight font-medium">{spellResult?.power}</p>
                </div>
              </div>
            </div>

            <div className="mt-20 border-t-4 border-zinc-400/20 pt-10 text-center w-full">
              <span className="font-bold block text-xl not-italic uppercase tracking-[0.5em] opacity-80 mb-6">NOME EM PORTUGUÊS</span>
              <h3 className="text-8xl font-power tracking-tighter text-red-950 leading-none drop-shadow-2xl uppercase break-words px-4">
                {spellResult?.title}
              </h3>
            </div>
          </motion.div>
        </section>

        <section className="flex-[1.5] flex flex-col">
          <div className="bg-zinc-900/40 p-8 rounded-sm magical-border flex-1 flex flex-col items-center relative overflow-hidden">
            <h2 className="text-xl font-display font-bold text-arcane-gold mb-12 relative z-10 tracking-[0.3em]">MAPA DE RUNAS</h2>
            
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center z-10">
              <svg className="absolute w-full h-full text-arcane-gold/30" viewBox="0 0 100 100">
                <path d="M 50 20 L 80 75 L 20 75 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="55" r="10" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <path d="M50 20 Q50 55 20 75" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <path d="M50 20 Q50 55 80 75" fill="none" stroke="currentColor" strokeWidth="0.2" />
                <path d="M20 75 Q50 55 80 75" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </svg>

              <div className="absolute top-0 flex flex-col items-center gap-3 w-48 text-center">
                <RuneSlot rune={selectedCore} />
                <div className="space-y-1">
                  <span className="text-[10px] font-display text-arcane-gold uppercase tracking-widest">Runa de {selectedCore?.name}:</span>
                  <p className="text-[9px] text-zinc-400 px-4 leading-tight">{selectedCore?.description}</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 flex flex-col items-center gap-3 w-48 text-center">
                 <RuneSlot rune={selectedVector} />
                <div className="space-y-1">
                  <span className="text-[10px] font-display text-arcane-gold uppercase tracking-widest">Vetor de {selectedVector?.name}:</span>
                  <p className="text-[9px] text-zinc-400 px-4 leading-tight">{selectedVector?.description}</p>
                </div>
              </div>

              <div className="absolute bottom-8 right-0 flex flex-col items-center gap-3 w-48 text-center">
                <RuneSlot rune={selectedModulator} />
                <div className="space-y-1">
                  <span className="text-[10px] font-display text-arcane-gold uppercase tracking-widest">Runa Moduladora:</span>
                  <p className="text-[9px] text-zinc-400 px-4 leading-tight">{selectedModulator?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-80 flex flex-col gap-4">
          <div className="bg-zinc-950 border-l-4 border-r-4 border-zinc-900 p-6 flex-1 rounded-sm flex flex-col gap-6 shadow-2xl relative overflow-hidden">
            <h2 className="text-center text-[10px] font-display font-bold text-zinc-500 border-b border-zinc-800 pb-4 mb-2 tracking-[0.2em] relative z-10">
              BIBLIOTECA DE PEDRAS RÚNICAS
            </h2>

            <LibrarySection title="NÚCLEOS" items={Object.values(RUNE_DATA.cores)} selected={selectedCore} onSelect={setSelectedCore} />
            <LibrarySection title="VETORES" items={Object.values(RUNE_DATA.vectors)} selected={selectedVector} onSelect={setSelectedVector} />
            <LibrarySection title="MODULADORES" items={Object.values(RUNE_DATA.modulators)} selected={selectedModulator} onSelect={setSelectedModulator} />
          </div>
        </section>
      </main>
    </div>
  );
};

function RuneSlot({ rune }: { rune: any }) {
  const Icon = ICON_MAP[rune?.id] || Sparkles;
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute w-full h-full text-arcane-gold scale-125" viewBox="0 0 100 100">
        <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="rgba(0,0,0,0.6)" stroke="currentColor" strokeWidth="1" />
        <path d="M50 12 L88 50 L50 88 L12 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <motion.div key={rune?.id} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="relative z-10">
        <Icon size={40} style={{ color: rune?.color }} className={GLOW_MAP[rune?.id]} />
      </motion.div>
    </div>
  );
}

function LibrarySection({ title, items, selected, onSelect }: { title: string; items: any[]; selected: any; onSelect: any }) {
  return (
    <div className="space-y-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-zinc-800" />
        <h3 className="text-[8px] font-display font-bold text-zinc-600 tracking-widest">{title}</h3>
        <div className="flex-1 h-[1px] bg-zinc-800" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => {
          const Icon = ICON_MAP[item.id] || Sparkles;
          return (
            <button key={item.id} onClick={() => onSelect(item)}
              className={`relative aspect-square flex items-center justify-center rounded border transition-all ${selected?.id === item.id ? 'bg-zinc-900 border-arcane-gold' : 'bg-black border-zinc-800 hover:border-zinc-700'}`}
            >
              <Icon size={20} style={{ color: item.color }} className={selected?.id === item.id ? '' : 'grayscale opacity-50'} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RuneBuilder;
