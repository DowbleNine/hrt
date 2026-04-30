import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RUNE_DATA, CoreRune, VectorRune, ModulatorRune } from '../lib/runeData';
import './RuneBuilder.css';

const RuneBuilder: React.FC = () => {
  const [selectedCore, setSelectedCore] = useState<CoreRune | null>(RUNE_DATA.cores.pyros);
  const [selectedVector, setSelectedVector] = useState<VectorRune | null>(RUNE_DATA.vectors.impetus);
  const [selectedModulator, setSelectedModulator] = useState<ModulatorRune | null>(RUNE_DATA.modulators.magnus);
  
  const [spellName, setSpellName] = useState('');
  const [spellDesc, setSpellDesc] = useState('');
  const [power, setPower] = useState(0);

  useEffect(() => {
    if (!selectedCore) return;

    const name = `${selectedCore.name}${selectedVector ? ' ' + selectedVector.name : ''}${selectedModulator ? ' ' + selectedModulator.name : ''}`;
    setSpellName(name.toUpperCase());

    const actions: Record<string, string> = {
      "ÍMPETUS": `Rajada Elemental de Calor Expansivo`,
      "SPHERA": `Liberação Esférica de Energia`,
      "MURUS": `Manifestação de Barreira Sólida`,
      "AXIS": `Lâmina de Corte Dimensional`,
      "VERTEX": `Vórtice de Sucção Elemental`,
      "TRAJETO": `Projeção Teleguiada de Fluxo`
    };

    setSpellDesc(selectedVector ? actions[selectedVector.name.toUpperCase()] || 'Manifestação Arcana' : 'Manifestação Arcana');
    setPower(1 + (selectedVector ? 2 : 0) + (selectedModulator ? 1.5 : 0));
  }, [selectedCore, selectedVector, selectedModulator]);

  const auraColor = selectedCore?.color || '#b8860b';

  return (
    <div className="rune-builder-page">
      {/* FORGE HEADER */}
      <header className="forge-header">
        <div className="flex items-center gap-4">
          <button className="text-white opacity-50 hover:opacity-100">☰</button>
          <button className="text-white opacity-50 hover:opacity-100">🏠</button>
          <div className="forge-title">FORJA DE RUNAS - Grimório Arcano</div>
        </div>
        <div className="header-icons">
          <span>🌐</span>
          <span>📺</span>
          <span>🚪</span>
        </div>
      </header>

      <div className="forge-container">
        {/* LEFT: THE BOOK (GRIMORIO) */}
        <section className="grimorio-section">
          <h2 className="grimorio-title">RESULTADO DA COMBINAÇÃO</h2>
          
          <div className="magic-circle-container">
            <div className="transmutation-circle"></div>
            
            {/* TRINITY GLOW CIRCLE */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute z-10">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Connection Lines */}
              <motion.path 
                d="M 50 20 L 80 75 L 20 75 Z" 
                fill="none" 
                stroke={auraColor} 
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                style={{ filter: 'url(#glow)' }}
              />

              {/* RUNE NODES */}
              <g transform="translate(50, 20)">
                <circle r="8" fill="#1a1a1a" stroke={auraColor} strokeWidth="1" />
                {selectedCore?.image && <image href={selectedCore.image} x="-6" y="-6" width="12" height="12" />}
              </g>

              <g transform="translate(80, 75)">
                <circle r="8" fill="#1a1a1a" stroke={selectedVector ? auraColor : '#333'} strokeWidth="1" />
                {selectedVector?.image && <image href={selectedVector.image} x="-6" y="-6" width="12" height="12" />}
              </g>

              <g transform="translate(20, 75)">
                <circle r="8" fill="#1a1a1a" stroke={selectedModulator ? auraColor : '#333'} strokeWidth="1" />
                {selectedModulator?.image && <image href={selectedModulator.image || '/stone-texture.png'} x="-6" y="-6" width="12" height="12" />}
              </g>

              {/* CENTER GLOW */}
              <motion.circle 
                cx="50" cy="56" r="5" 
                fill={auraColor} 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ filter: 'url(#glow)' }}
              />
            </svg>
          </div>

          <div className="spell-info-book text-[#3d2b1f] w-full text-left space-y-4">
            <div>
              <div className="font-bold text-xs uppercase opacity-70">Nomes das Runas:</div>
              <div className="font-serif text-lg">{selectedCore?.name} | {selectedVector?.name || '---'} | {selectedModulator?.name || '---'}</div>
            </div>
            <div>
              <div className="font-bold text-xs uppercase opacity-70">Poder Gerado:</div>
              <div className="font-serif text-lg">{spellDesc}</div>
            </div>
            <div>
              <div className="font-bold text-xs uppercase opacity-70">Nome em Português:</div>
              <div className="font-serif text-xl font-bold tracking-tight">{spellName || '---'}</div>
            </div>
          </div>
        </section>

        {/* MIDDLE: THE MAP (PAPIRO) */}
        <section className="mapa-section">
          <div className="papiro-scroll">
            <div className="candle top-[-40px] left-[-20px]"><div className="candle-flame"></div></div>
            <div className="candle top-[-40px] right-[-20px]"><div className="candle-flame"></div></div>
            
            <h2 className="mapa-title">MAPA DE RUNAS</h2>

            <div className="ritual-triangle">
              {/* RUNE LABELS & ICONS */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-4 border-[#b8860b] p-1 bg-[#1a1a1a] shadow-xl">
                  <img src={selectedCore?.image} className="w-full h-full object-contain" />
                </div>
                <div className="mt-4 text-center">
                  <div className="font-bold text-[#3d2b1f] text-sm underline">RUNA DE {selectedCore?.element.toUpperCase()}:</div>
                  <div className="text-[10px] text-[#3d2b1f] max-w-[150px] leading-tight">{selectedCore?.description}</div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#3d2b1f] p-1 bg-[#1a1a1a] opacity-80">
                  {selectedVector && <img src={selectedVector.image} className="w-full h-full object-contain" />}
                </div>
                <div className="mt-2 text-center">
                  <div className="font-bold text-[#3d2b1f] text-[10px] uppercase">RUNA DE VETOR {selectedVector?.action}:</div>
                  <div className="text-[9px] text-[#3d2b1f] max-w-[120px]">{selectedVector?.description}</div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-[#3d2b1f] p-1 bg-[#1a1a1a] opacity-80">
                  {selectedModulator && <img src={selectedModulator.image || '/stone-texture.png'} className="w-full h-full object-contain" />}
                </div>
                <div className="mt-2 text-center">
                  <div className="font-bold text-[#3d2b1f] text-[10px] uppercase">RUNA MODULADORA:</div>
                  <div className="text-[9px] text-[#3d2b1f] max-w-[120px]">{selectedModulator?.description}</div>
                </div>
              </div>

              {/* Connection Triangle SVG */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-20" viewBox="0 0 100 100">
                <path d="M 50 15 L 85 85 L 15 85 Z" fill="none" stroke="#3d2b1f" strokeWidth="0.5" />
                <path d="M 50 15 L 15 85 M 50 15 L 85 85 M 15 85 L 85 85" stroke="#3d2b1f" strokeWidth="0.2" strokeDasharray="1 1" />
              </svg>
            </div>

            <div className="candle bottom-[-40px] left-1/2 -translate-x-1/2"><div className="candle-flame"></div></div>
          </div>
        </section>

        {/* RIGHT: THE LIBRARY (STONE) */}
        <section className="biblioteca-section">
          <h2 className="biblioteca-title">BIBLIOTECA DE PEDRAS RÚNICAS</h2>

          <div className="shelf-group">
            <h3 className="shelf-title">Núcleos</h3>
            <div className="shelf-grid">
              {Object.values(RUNE_DATA.cores).map(core => (
                <div 
                  key={core.id} 
                  className={`stone-item ${selectedCore?.id === core.id ? 'active' : ''}`}
                  onClick={() => setSelectedCore(core)}
                >
                  <img src={core.image} alt={core.name} />
                  <span className="stone-label">{core.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shelf-group">
            <h3 className="shelf-title">Vetores</h3>
            <div className="shelf-grid">
              {Object.values(RUNE_DATA.vectors).map(vector => (
                <div 
                  key={vector.id} 
                  className={`stone-item ${selectedVector?.id === vector.id ? 'active' : ''}`}
                  onClick={() => setSelectedVector(vector)}
                >
                  <img src={vector.image} alt={vector.name} />
                  <span className="stone-label">{vector.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shelf-group">
            <h3 className="shelf-title">Moduladores</h3>
            <div className="shelf-grid">
              {Object.values(RUNE_DATA.modulators).map(mod => (
                <div 
                  key={mod.id} 
                  className={`stone-item ${selectedModulator?.id === mod.id ? 'active' : ''}`}
                  onClick={() => setSelectedModulator(mod)}
                >
                  <img src={mod.image || '/stone-texture.png'} alt={mod.name} />
                  <span className="stone-label">{mod.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RuneBuilder;
