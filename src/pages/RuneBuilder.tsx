import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Globe, 
  Youtube, 
  Settings, 
  Sparkles
} from 'lucide-react';
import { RUNE_DATA, CoreRune, VectorRune, ModulatorRune } from '../lib/runeData';
import './RuneBuilder.css';

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

    // Exact logic from forja-de-runas model
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
      alert('Por favor, insira seu e-mail no Grimório para salvar.');
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
          power: 5 // Default power for transferred structure
        })
      });

      const result = await response.json();
      if (result.status === 'success') {
        alert('Magia salva no seu Grimório!');
        localStorage.setItem('userEmail', userEmail);
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro de conexão com o Grande Códice.');
    } finally {
      setIsSaving(false);
    }
  };

  const auraColor = selectedCore?.color || '#c5a059';

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden bg-[#1a1a1a] text-zinc-300 antialiased">
      {/* Ambient Lighting */}
      <div className="absolute -top-20 -left-20 w-96 h-96 candle-light" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] candle-light" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[600px] h-[600px] candle-light opacity-30" style={{ animationDelay: '3s' }} />

      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-md transition-colors"><Home size={20} /></button>
          <div className="h-4 w-[1px] bg-white/20" />
          <h1 className="text-xl md:text-2xl text-arcane-gold font-display font-bold">
            FORJA DE RUNAS <span className="text-zinc-500 font-normal ml-2">- Grimório Arcano</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          <input 
            type="email" 
            placeholder="Grimório de: seu@email.com" 
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="bg-black/40 border border-zinc-700 px-3 py-1 rounded text-xs font-mono focus:border-arcane-gold outline-none w-48"
          />
          <Globe size={18} className="text-zinc-400 cursor-pointer hover:text-white transition-colors" />
          <Youtube size={18} className="text-zinc-400 cursor-pointer hover:text-white transition-colors" />
          <Settings size={18} className="text-zinc-400 cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden relative z-10">
        
        <section className="flex-1 lg:max-w-md xl:max-w-lg perspective-1000">
          <motion.div 
            initial={{ rotateY: -10, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            className="parchment-texture w-full h-full p-8 md:p-12 relative rounded-sm text-zinc-900 flex flex-col justify-between magical-border"
          >
            <div className="absolute top-4 right-4 w-12 h-12 bg-red-800 rounded-full shadow-lg flex items-center justify-center -rotate-12 border-2 border-red-900 border-dashed">
              <span className="text-white font-display text-[10px]">CÓDICE</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-800 rounded-full shadow-lg flex items-center justify-center rotate-12 border-2 border-red-900 border-dashed">
              <div className="w-12 h-12 border border-red-400/30 rounded-full flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-display font-bold mb-8 border-b-2 border-zinc-400/30 pb-2 w-full">RESULTADO DA COMBINAÇÃO</h2>
              
              <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                <svg className="absolute w-full h-full text-arcane-gold/40" viewBox="0 0 100 100">
                  <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="63.3" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="50" cy="63.3" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                  <motion.path 
                    d="M 50 20 L 80 75 L 20 75 Z" 
                    fill="none" 
                    stroke={auraColor} 
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                </svg>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCore?.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="z-10 bg-white/20 p-4 rounded-full backdrop-blur-sm border border-white/40 shadow-xl"
                  >
                    <img 
                      src={selectedCore?.image} 
                      alt={selectedCore?.name} 
                      className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute top-0 flex flex-col items-center">
                  <div className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center border border-arcane-gold/40 shadow-lg">
                    <img src={selectedCore?.image} className="w-6 h-6 object-contain" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                   <div className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center border border-arcane-gold/40 shadow-lg">
                    {selectedVector && <img src={selectedVector.image} className="w-6 h-6 object-contain" />}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-10 h-10 bg-black/80 rounded-full flex items-center justify-center border border-arcane-gold/40 shadow-lg">
                    {selectedModulator && <img src={selectedModulator.image} className="w-6 h-6 object-contain" />}
                  </div>
                </div>
              </div>

              <div className="w-full text-left font-sans italic text-sm space-y-4">
                <div>
                  <span className="font-bold block text-xs not-italic uppercase tracking-tighter opacity-70">Nomes das Runas:</span>
                  <p className="uppercase font-bold text-zinc-900/80 leading-tight">
                    {selectedCore?.name} | VETOR DE {selectedVector?.name || '---'} | MODULADOR DE {selectedModulator?.name || '---'}
                  </p>
                </div>

                <div>
                  <span className="font-bold block text-xs not-italic uppercase tracking-tighter opacity-70">Poder Gerado:</span>
                  <p className="text-zinc-800 leading-tight">{spellResult?.power}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-end">
              <div>
                <span className="font-bold block text-xs not-italic uppercase tracking-tighter opacity-70 mb-1">Nome em Português:</span>
                <h3 className="text-xl font-display font-bold tracking-tight text-red-900/90">{spellResult?.title}</h3>
              </div>
              <button 
                onClick={saveSpell}
                disabled={isSaving}
                className="bg-red-900 text-white font-display px-4 py-2 rounded-sm shadow-lg hover:bg-red-800 transition-colors disabled:opacity-50 text-xs"
              >
                {isSaving ? 'INVOCANDO...' : 'SALVAR'}
              </button>
            </div>
          </motion.div>
        </section>

        <section className="flex-[1.5] flex flex-col">
          <div className="bg-zinc-900/40 p-8 rounded-sm magical-border flex-1 flex flex-col items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none parchment-texture" />
            <h2 className="text-xl font-display font-bold text-arcane-gold mb-12 relative z-10 tracking-[0.3em]">MAPA DE RUNAS</h2>
            
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center z-10">
              <svg className="absolute w-full h-full text-arcane-gold/30" viewBox="0 0 100 100">
                <path d="M 50 15 L 85 85 L 15 85 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M 50 15 L 15 85 M 50 15 L 85 85 M 15 85 L 85 85" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 1" />
              </svg>

              <div className="absolute top-0 flex flex-col items-center gap-3 w-48 text-center">
                <RuneSlot rune={selectedCore} color={auraColor} />
                <div className="space-y-1">
                  <span className="text-xs font-display text-arcane-gold uppercase tracking-widest">Runa de {selectedCore?.name}:</span>
                  <p className="text-[10px] text-zinc-400 px-4 leading-tight">{selectedCore?.description}</p>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 flex flex-col items-center gap-3 w-48 text-center">
                 <RuneSlot rune={selectedVector} color="#c5a059" />
                <div className="space-y-1">
                  <span className="text-xs font-display text-arcane-gold uppercase tracking-widest">Vetor de {selectedVector?.name}:</span>
                  <p className="text-[10px] text-zinc-400 px-4 leading-tight">{selectedVector?.description}</p>
                </div>
              </div>

              <div className="absolute bottom-8 right-0 flex flex-col items-center gap-3 w-48 text-center">
                <RuneSlot rune={selectedModulator} color="#c5a059" />
                <div className="space-y-1">
                  <span className="text-xs font-display text-arcane-gold uppercase tracking-widest">Runa Moduladora:</span>
                  <p className="text-[10px] text-zinc-400 px-4 leading-tight">{selectedModulator?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-80 flex flex-col gap-4">
          <div className="bg-zinc-950 border-l-4 border-r-4 border-zinc-900 p-6 flex-1 rounded-sm flex flex-col gap-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/black-linen.png)' }} />

            <h2 className="text-center text-xs font-display font-bold text-zinc-500 border-b border-zinc-800 pb-4 mb-2 tracking-[0.2em] relative z-10">
              BIBLIOTECA DE PEDRAS RÚNICAS
            </h2>

            <LibrarySection 
              title="NÚCLEOS" 
              items={Object.values(RUNE_DATA.cores)} 
              selected={selectedCore}
              onSelect={setSelectedCore}
            />

            <LibrarySection 
              title="VETORES" 
              items={Object.values(RUNE_DATA.vectors)} 
              selected={selectedVector}
              onSelect={setSelectedVector}
            />

            <LibrarySection 
              title="MODULADORES" 
              items={Object.values(RUNE_DATA.modulators)} 
              selected={selectedModulator}
              onSelect={setSelectedModulator}
            />
          </div>
        </section>
      </main>

      <footer className="mt-8 text-center text-zinc-600 text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 relative z-10">
        <span>Fragmentos de Éter: 1024</span>
        <div className="h-1 w-1 bg-zinc-700 rounded-full" />
        <span>Magia Estável</span>
        <div className="h-1 w-1 bg-zinc-700 rounded-full" />
        <span>Sincronia Arcanista: 100%</span>
      </footer>
    </div>
  );
};

function RuneSlot({ rune, color }: { rune: any; color: string }) {
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute w-full h-full text-arcane-gold scale-125" viewBox="0 0 100 100">
        <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="rgba(0,0,0,0.6)" stroke="currentColor" strokeWidth="1" />
        <path d="M50 12 L88 50 L50 88 L12 50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <motion.div
        key={rune?.id}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 p-2"
      >
        <img 
          src={rune?.image || '/stone-texture.png'} 
          alt={rune?.name} 
          className="w-16 h-16 object-contain drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" 
        />
      </motion.div>
    </div>
  );
}

function LibrarySection({ title, items, selected, onSelect }: { title: string; items: any[]; selected: any; onSelect: any }) {
  return (
    <div className="space-y-4 relative z-10">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <h3 className="text-[9px] font-display font-bold text-zinc-600 tracking-widest">{title}</h3>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`
              relative aspect-square flex flex-col items-center justify-center p-2 rounded border
              transition-all group
              ${selected?.id === item.id 
                ? 'bg-zinc-900 border-arcane-gold shadow-[0_0_10px_rgba(197,160,89,0.2)]' 
                : 'bg-black border-zinc-800 hover:border-zinc-700'}
            `}
          >
            <img 
              src={item.image || '/stone-texture.png'} 
              className={`w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110 ${selected?.id === item.id ? '' : 'grayscale opacity-50'}`} 
            />
            <span className="text-[7px] mt-1 font-display opacity-40 group-hover:opacity-100 uppercase">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RuneBuilder;
