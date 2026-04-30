import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RUNE_DATA, CoreRune, VectorRune, ModulatorRune } from '../lib/runeData';
import './RuneBuilder.css';

// Subtle Particles Background Component
const ParticlesBG: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/10 rounded-full blur-[2px]"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 0.5, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const RuneBuilder: React.FC = () => {
  const [selectedCore, setSelectedCore] = useState<CoreRune | null>(null);
  const [selectedVector, setSelectedVector] = useState<VectorRune | null>(null);
  const [selectedModulator, setSelectedModulator] = useState<ModulatorRune | null>(null);
  const [spellName, setSpellName] = useState('Aguardando Invocação...');
  const [spellDesc, setSpellDesc] = useState('Combine as runas para manifestar o poder...');
  const [power, setPower] = useState(0);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    updateSpellInfo();
  }, [selectedCore, selectedVector, selectedModulator]);

  const updateSpellInfo = () => {
    if (!selectedCore) {
      setSpellName('Aguardando Núcleo...');
      setSpellDesc('A geometria rúnica aguarda sua escrita...');
      setPower(0);
      return;
    }

    const name = `${selectedCore.name}${selectedVector ? ' ' + selectedVector.name : ''}${selectedModulator ? ' ' + selectedModulator.name : ''}`;
    setSpellName(name);

    const actions: Record<string, string> = {
      "Ímpetus": `dispara um projétil concentrado de ${selectedCore.element}`,
      "Sphera": `libera uma onda expansiva de ${selectedCore.element} em todas as direções`,
      "Murus": `ergue uma barreira impenetrável de ${selectedCore.element}`,
      "Axis": `manifesta uma lâmina afiada de ${selectedCore.element}`,
      "Vertex": `gera um vórtice giratório de ${selectedCore.element}`,
      "Trajeto": `lança um rastro teleguiado de ${selectedCore.element}`
    };

    const vectorDesc = selectedVector ? actions[selectedVector.name] : `manifesta a essência de ${selectedCore.element}`;
    const modText = selectedModulator ? ` refinado por propriedades de ${selectedModulator.name}` : "";
    
    setSpellDesc(`A runa ${selectedCore.name} ${vectorDesc}${modText}. O fluxo de energia se estabiliza em uma forma ${getSyntaxLevel().level.toLowerCase()}.`);
    
    const powerLevel = (1 + (selectedVector ? 2 : 0) + (selectedModulator ? 1.5 : 0));
    setPower(powerLevel);
  };

  const saveSpell = async () => {
    if (!selectedCore) return;
    if (!userEmail) {
      alert('Por favor, insira seu e-mail para salvar no Códice.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/runes/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: userEmail,
          spell_name: spellName,
          core_id: selectedCore.id,
          vector_id: selectedVector?.id,
          modulator_ids: selectedModulator ? [selectedModulator.id] : [],
          power: power
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

  const getSyntaxLevel = () => {
    const score = (selectedCore ? 1 : 0) + (selectedVector ? 1 : 0) + (selectedModulator ? 1 : 0);
    if (score <= 1) return { level: "Primária", color: "#2d5a27" };
    if (score === 2) return { level: "Binária", color: "#8b5a2b" };
    return { level: "Trinitária", color: "#7c2214" };
  };

  const auraColor = selectedCore?.color || 'rgba(184, 134, 11, 0.2)';

  return (
    <div className="rune-builder-page relative">
      <ParticlesBG />
      
      <main className="rb-ritual-area z-10">
        {/* TRIAD SLOTS WITH FRAMER MOTION */}
        <div className="ritual-triad">
          <motion.div 
            className="ritual-slot-container core"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="slot-label">NÚCLEO</div>
            <motion.div 
              className={`ritual-slot ${selectedCore ? 'filled' : ''}`} 
              onClick={() => setSelectedCore(null)}
              whileHover={{ scale: 1.05 }}
              animate={selectedCore ? { 
                boxShadow: `0 0 40px ${auraColor}`,
                borderColor: auraColor 
              } : {}}
            >
              <AnimatePresence mode="wait">
                {selectedCore ? (
                  <motion.img 
                    key={selectedCore.id}
                    src={selectedCore.image} 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                ) : (
                  <motion.div key="placeholder" className="slot-placeholder" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>+</motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {selectedCore && (
                <motion.div 
                  className="slot-desc glass"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {selectedCore.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="ritual-slot-container vector"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="slot-label">VETOR</div>
            <motion.div 
              className={`ritual-slot ${selectedVector ? 'filled' : ''}`} 
              onClick={() => setSelectedVector(null)}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence mode="wait">
                {selectedVector ? (
                  <motion.img 
                    key={selectedVector.id}
                    src={selectedVector.image} 
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -20 }}
                  />
                ) : (
                  <div className="slot-placeholder">+</div>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {selectedVector && (
                <motion.div className="slot-desc glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {selectedVector.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="ritual-slot-container modulator"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="slot-label">MODULADOR</div>
            <motion.div 
              className={`ritual-slot ${selectedModulator ? 'filled' : ''}`} 
              onClick={() => setSelectedModulator(null)}
              whileHover={{ scale: 1.05 }}
            >
              <AnimatePresence mode="wait">
                {selectedModulator ? (
                  <motion.img 
                    key={selectedModulator.id}
                    src={selectedModulator.image || '/stone-texture.png'} 
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  />
                ) : (
                  <div className="slot-placeholder">+</div>
                )}
              </AnimatePresence>
            </motion.div>
            <AnimatePresence>
              {selectedModulator && (
                <motion.div className="slot-desc glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {selectedModulator.description}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CENTRAL SCROLL WITH UNROLL ANIMATION */}
        <motion.div 
          className="manifestation-scroll book-page"
          initial={{ opacity: 0, scaleY: 0, originY: 0 }}
          animate={selectedCore ? { opacity: 1, scaleY: 1 } : { opacity: 0.3, scaleY: 0.1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <div className="scroll-content">
            <motion.h2 
              className="spell-name-pt"
              animate={selectedCore ? { color: auraColor } : { color: '#3d2b1f' }}
            >
              {spellName}
            </motion.h2>
            <div className="power-indicator">
              <span>PODER: {power.toFixed(1)}</span>
              <div className="power-mini-bar">
                <motion.div 
                  className="fill" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(power / 10) * 100}%` }}
                  style={{ backgroundColor: auraColor }}
                ></motion.div>
              </div>
            </div>
            <p className="spell-manifestation">{spellDesc}</p>
            <div className="syntax-tag" style={{ color: getSyntaxLevel().color, fontFamily: 'Cinzel', letterSpacing: '4px' }}>
              Geometria {getSyntaxLevel().level}
            </div>
          </div>
          <button className="btn-wax mt-10" onClick={saveSpell} disabled={isSaving}>
            {isSaving ? 'INVOCANDO...' : 'SALVAR NO GRIMÓRIO'}
          </button>
        </motion.div>

        {/* SELECTION GRIDS */}
        <div className="selection-grids-container">
          <section className="grid-section glass">
            <h3>NÚCLEOS</h3>
            <div className="ritual-grid">
              {Object.values(RUNE_DATA.cores).map(core => (
                <motion.div 
                  key={core.id} 
                  className={`grid-item ${selectedCore?.id === core.id ? 'active' : ''}`}
                  onClick={() => setSelectedCore(core)}
                  whileHover={{ scale: 1.1, brightness: 1.5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={core.image || '/stone-texture.png'} alt={core.name} />
                  <span>{core.name}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid-section glass">
            <h3>VETORES</h3>
            <div className="ritual-grid">
              {Object.values(RUNE_DATA.vectors).map(vector => (
                <motion.div 
                  key={vector.id} 
                  className={`grid-item ${selectedVector?.id === vector.id ? 'active' : ''}`}
                  onClick={() => setSelectedVector(vector)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={vector.image || '/stone-texture.png'} alt={vector.name} />
                  <span>{vector.name}</span>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="grid-section glass">
            <h3>MODULADORES</h3>
            <div className="ritual-grid">
              {Object.values(RUNE_DATA.modulators).map(mod => (
                <motion.div 
                  key={mod.id} 
                  className={`grid-item ${selectedModulator?.id === mod.id ? 'active' : ''}`}
                  onClick={() => setSelectedModulator(mod)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={mod.image || '/stone-texture.png'} alt={mod.name} />
                  <span>{mod.name}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RuneBuilder;
