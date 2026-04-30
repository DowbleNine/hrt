import React, { useState, useEffect } from 'react';
import { RUNE_DATA, CoreRune, VectorRune, ModulatorRune } from '../lib/runeData';
import './RuneBuilder.css';

const RuneBuilder: React.FC = () => {
  const [selectedCore, setSelectedCore] = useState<CoreRune | null>(null);
  const [selectedVector, setSelectedVector] = useState<VectorRune | null>(null);
  const [selectedModulators, setSelectedModulators] = useState<ModulatorRune[]>([]);
  const [spellName, setSpellName] = useState('Aguardando Núcleo...');
  const [spellDesc, setSpellDesc] = useState('A geometria rúnica aguarda sua escrita...');
  const [power, setPower] = useState(0);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    updateSpellInfo();
  }, [selectedCore, selectedVector, selectedModulators]);

  const updateSpellInfo = () => {
    if (!selectedCore) {
      setSpellName('Aguardando Núcleo...');
      setSpellDesc('A geometria rúnica aguarda sua escrita...');
      setPower(0);
      return;
    }

    const name = `${selectedCore.name}${selectedVector ? ' ' + selectedVector.name : ''}${selectedModulators.length > 0 ? ' ' + selectedModulators.map(m => m.name).join(' ') : ''}`;
    setSpellName(name);

    const actions: Record<string, string> = {
      "Ímpetus": `dispara um projétil concentrado de ${selectedCore.element}`,
      "Sphera": `libera uma onda expansiva de ${selectedCore.element} em todas as direções`,
      "Murus": `ergue uma barreira impenetrável de ${selectedCore.element}`,
      "Axis": `manifesta uma lâmina afiada de ${selectedCore.element}`,
      "Vertex": `gera um vórtice giratório de ${selectedCore.element}`,
      "Trajectum": `lança um rastro teleguiado de ${selectedCore.element}`
    };

    const vectorDesc = selectedVector ? actions[selectedVector.name] : `manifesta a essência de ${selectedCore.element}`;
    const modText = selectedModulators.length > 0 ? ` refinado por propriedades de ${selectedModulators.map(m => m.name).join(' e ')}` : "";
    
    setSpellDesc(`A runa ${selectedCore.name} ${vectorDesc}${modText}.`);
    
    const powerLevel = (1 + (selectedVector ? 2 : 0) + (selectedModulators.length * 1.5));
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
          modulator_ids: selectedModulators.map(m => m.id),
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

  const toggleModulator = (mod: ModulatorRune) => {
    if (selectedModulators.find(m => m.id === mod.id)) {
      setSelectedModulators(selectedModulators.filter(m => m.id !== mod.id));
    } else {
      setSelectedModulators([...selectedModulators, mod]);
    }
  };

  const getSyntaxLevel = () => {
    const score = (selectedCore ? 1 : 0) + (selectedVector ? 1 : 0) + selectedModulators.length;
    if (score <= 2) return { level: "Simples", color: "#2d5a27" }; // Darker green
    if (score <= 4) return { level: "Composta", color: "#8b5a2b" }; // Brown/Gold
    return { level: "Complexa", color: "#7c2214" }; // Dark red
  };

  return (
    <div className="rune-builder-page">
      <header className="rb-header">
        <div className="rb-logo">
          <h1>REINOS RÚNICOS</h1>
          <span className="rb-subtitle">CÓDICE DE GEOMETRIA MÁGICA</span>
        </div>
        <div className="status-bar">
          <div className="status-item">
            <span className="rb-subtitle">Sintaxe: </span>
            <span style={{ color: getSyntaxLevel().color, fontWeight: 'bold' }}>{getSyntaxLevel().level}</span>
          </div>
        </div>
      </header>

      <main className="rb-main">
        <aside className="rb-panel">
          <section className="rb-section">
            <h2>NÚCLEO</h2>
            <div className="rb-grid">
              {Object.values(RUNE_DATA.cores).map(core => (
                <div 
                  key={core.id} 
                  className={`rb-item ${selectedCore?.id === core.id ? 'active' : ''}`}
                  onClick={() => setSelectedCore(selectedCore?.id === core.id ? null : core)}
                >
                  <div className="rb-item-icon">
                    <svg viewBox="0 0 100 100">
                      <path d={core.path} strokeWidth={core.strokeWidth} />
                    </svg>
                  </div>
                  <span className="rb-item-name">{core.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rb-section" style={{ marginTop: '2rem' }}>
            <h2>VETOR</h2>
            <div className="rb-grid">
              {Object.values(RUNE_DATA.vectors).map(vector => (
                <div 
                  key={vector.id} 
                  className={`rb-item ${selectedVector?.id === vector.id ? 'active' : ''}`}
                  onClick={() => setSelectedVector(selectedVector?.id === vector.id ? null : vector)}
                >
                  <div className="rb-item-icon">
                    <svg viewBox="0 0 100 100">
                      <path d={vector.path} strokeWidth="3" />
                    </svg>
                  </div>
                  <span className="rb-item-name">{vector.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rb-section" style={{ marginTop: '2rem' }}>
            <h2>MODULADORES</h2>
            <div className="rb-grid">
              {Object.values(RUNE_DATA.modulators).map(mod => (
                <div 
                  key={mod.id} 
                  className={`rb-item ${selectedModulators.find(m => m.id === mod.id) ? 'active' : ''}`}
                  onClick={() => toggleModulator(mod)}
                >
                  <div className="rb-item-icon">
                    <svg viewBox="0 0 100 100">
                      <path d={mod.path} strokeWidth="2" />
                    </svg>
                  </div>
                  <span className="rb-item-name">{mod.name}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section className="rb-workspace">
          <div className="rb-glow" style={{ 
            background: `radial-gradient(circle, ${selectedCore ? (selectedCore.id === 'pyros' ? 'rgba(255, 100, 0, 0.2)' : 'rgba(0, 242, 255, 0.2)') : 'rgba(255,255,255,0.05)'} 0%, transparent 70%)` 
          }}></div>
          
          <div className="rb-canvas-container">
            <svg id="rb-svg" viewBox="0 0 100 100">
              {selectedCore && (
                <g className="core-group" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))' }}>
                  <path d={selectedCore.path} className="path-core" strokeWidth={selectedCore.strokeWidth} stroke="#2c1e14" />
                  
                  {selectedVector && (
                    <g transform={`translate(${selectedCore.anchors[selectedVector.attachTo][0]}, ${selectedCore.anchors[selectedVector.attachTo][1]})`}>
                      <path d={selectedVector.path} className="path-vector" strokeWidth="4" stroke="#8b5a2b" />
                    </g>
                  )}

                  {selectedModulators.map((mod, i) => {
                    const anchor = selectedCore.anchors[mod.position];
                    const offset = i * 12;
                    return (
                      <g key={mod.id} transform={`translate(${anchor[0] + (mod.position === 'right' ? offset : -offset)}, ${anchor[1]})`}>
                        <path d={mod.path} className="path-modulator" stroke="#4a3728" />
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>

          <div className="rb-action-bar">
            <button className="btn-conjurar" onClick={saveSpell} disabled={isSaving}>
              {isSaving ? 'SALVANDO...' : 'SALVAR NO GRIMÓRIO'}
            </button>
            <button className="btn-secondary" style={{ background: 'transparent', color: '#fff', border: '1px solid #333', padding: '1rem 2rem', borderRadius: '50px' }} onClick={() => {
              setSelectedCore(null);
              setSelectedVector(null);
              setSelectedModulators([]);
            }}>LIMPAR</button>
          </div>
        </section>

        <aside className="rb-panel">
          <div className="rb-card">
            <h3>IDENTIFICAÇÃO ARCANA</h3>
            <input 
              type="email" 
              placeholder="Seu e-mail de Bruxo..." 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', padding: '10px', borderRadius: '8px', color: '#fff' }}
            />
          </div>

          <div className="rb-card">
            <h3>PERFIL DA MAGIA</h3>
            <div className="rb-spell-name">{spellName}</div>
            <div className="rb-power-meter">
              <span className="rb-subtitle">Poder:</span>
              <div className="rb-power-bar">
                <div className="rb-power-fill" style={{ width: `${(power / 12) * 100}%` }}></div>
              </div>
              <span className="value">{power.toFixed(1)}</span>
            </div>
          </div>

          <div className="rb-card">
            <h3>MANIFESTAÇÃO</h3>
            <p className="manifest-content">{spellDesc}</p>
          </div>

          <div className="rb-card">
            <h3>ANATOMIA RÚNICA</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              {selectedCore && <li style={{ marginBottom: '10px' }}><span style={{ color: '#00f2ff' }}>[Núcleo]</span> {selectedCore.name}</li>}
              {selectedVector && <li style={{ marginBottom: '10px' }}><span style={{ color: '#ff00ff' }}>[Vetor]</span> {selectedVector.name}</li>}
              {selectedModulators.map(m => (
                <li key={m.id} style={{ marginBottom: '10px' }}><span style={{ color: '#fff' }}>[Modulador]</span> {m.name}</li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default RuneBuilder;
