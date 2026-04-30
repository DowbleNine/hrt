import React, { useState, useEffect } from 'react';
import { RUNE_DATA, CoreRune, VectorRune, ModulatorRune } from '../lib/runeData';
import './RuneBuilder.css';

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

  return (
    <div className="rune-builder-page">
      <main className="rb-ritual-area">
        {/* TRIAD SLOTS */}
        <div className="ritual-triad">
          <div className="ritual-slot-container core">
            <div className="slot-label">NÚCLEO</div>
            <div className={`ritual-slot ${selectedCore ? 'filled' : ''}`} onClick={() => setSelectedCore(null)}>
              {selectedCore?.image ? (
                <img src={selectedCore.image} alt={selectedCore.name} />
              ) : (
                <div className="slot-placeholder">+</div>
              )}
            </div>
            {selectedCore && <div className="slot-desc">{selectedCore.description}</div>}
          </div>

          <div className="ritual-slot-container vector">
            <div className="slot-label">VETOR</div>
            <div className={`ritual-slot ${selectedVector ? 'filled' : ''}`} onClick={() => setSelectedVector(null)}>
              {selectedVector?.image ? (
                <img src={selectedVector.image} alt={selectedVector.name} />
              ) : (
                <div className="slot-placeholder">+</div>
              )}
            </div>
            {selectedVector && <div className="slot-desc">{selectedVector.description}</div>}
          </div>

          <div className="ritual-slot-container modulator">
            <div className="slot-label">MODULADOR</div>
            <div className={`ritual-slot ${selectedModulator ? 'filled' : ''}`} onClick={() => setSelectedModulator(null)}>
              {selectedModulator?.image ? (
                <img src={selectedModulator.image} alt={selectedModulator.name} />
              ) : (
                <div className="slot-placeholder">+</div>
              )}
            </div>
            {selectedModulator && <div className="slot-desc">{selectedModulator.description}</div>}
          </div>
        </div>

        {/* CENTRAL SCROLL */}
        <div className="manifestation-scroll book-page">
          <div className="scroll-content">
            <h2 className="spell-name-pt">{spellName}</h2>
            <div className="power-indicator">
              <span>PODER: {power.toFixed(1)}</span>
              <div className="power-mini-bar">
                <div className="fill" style={{ width: `${(power / 10) * 100}%` }}></div>
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
        </div>

        {/* SELECTION GRIDS */}
        <div className="selection-grids-container">
          <section className="grid-section">
            <h3>NÚCLEOS</h3>
            <div className="ritual-grid">
              {Object.values(RUNE_DATA.cores).map(core => (
                <div 
                  key={core.id} 
                  className={`grid-item ${selectedCore?.id === core.id ? 'active' : ''}`}
                  onClick={() => setSelectedCore(core)}
                >
                  <img src={core.image || '/stone-texture.png'} alt={core.name} />
                  <span>{core.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid-section">
            <h3>VETORES</h3>
            <div className="ritual-grid">
              {Object.values(RUNE_DATA.vectors).map(vector => (
                <div 
                  key={vector.id} 
                  className={`grid-item ${selectedVector?.id === vector.id ? 'active' : ''}`}
                  onClick={() => setSelectedVector(vector)}
                >
                  <img src={vector.image || '/stone-texture.png'} alt={vector.name} />
                  <span>{vector.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid-section">
            <h3>MODULADORES</h3>
            <div className="ritual-grid">
              {Object.values(RUNE_DATA.modulators).map(mod => (
                <div 
                  key={mod.id} 
                  className={`grid-item ${selectedModulator?.id === mod.id ? 'active' : ''}`}
                  onClick={() => setSelectedModulator(mod)}
                >
                  <img src={mod.image || '/stone-texture.png'} alt={mod.name} />
                  <span>{mod.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RuneBuilder;
