import { Flame, Droplet, Wind, Mountain, Zap, Moon, Aperture, Droplets, ArrowUpRight, Circle, Shield, Shrink, RefreshCw, Target, PlusCircle, FastForward, Timer, Anchor, Link, Cloud, ArrowDownCircle, ShieldAlert } from 'lucide-react';

export interface Rune {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const CORE_RUNES: Rune[] = [
  { id: 'pyros', name: 'Fogo', description: 'Energia térmica primordial', color: '#ff4d00' },
  { id: 'hydros', name: 'Água', description: 'Fluidez e adaptação', color: '#00a2ff' },
  { id: 'aethel', name: 'Ar', description: 'Leveza e movimento etéreo', color: '#00f2ff' },
  { id: 'geos', name: 'Terra', description: 'Estabilidade e resistência', color: '#8b5a2b' },
  { id: 'haemus', name: 'Sangue', description: 'Vitalidade e sacrifício', color: '#ff0033' },
  { id: 'fulgor', name: 'Raio', description: 'Energia elétrica súbita', color: '#ffcc00' },
  { id: 'skotos', name: 'Sombra', description: 'Ocultação e vazio', color: '#6a0dad' },
  { id: 'kinesis', name: 'Gravidade', description: 'Atração e distorção espacial', color: '#4b0082' },
];

export const VECTOR_RUNES: Rune[] = [
  { id: 'impetus', name: 'Projeção', description: 'Direciona a energia para frente', color: '#c5a059' },
  { id: 'sphera', name: 'Expansão', description: 'Expande a energia em todas as direções', color: '#c5a059' },
  { id: 'murus', name: 'Retenção', description: 'Cria uma barreira estática', color: '#c5a059' },
  { id: 'axis', name: 'Compressão', description: 'Concentra a energia em um ponto', color: '#c5a059' },
  { id: 'vertex', name: 'Vórtice', description: 'Gira a energia em espiral', color: '#c5a059' },
  { id: 'trajectum', name: 'Guia', description: 'Torna a energia autoguiada', color: '#c5a059' },
];

export const MODULATOR_RUNES: Rune[] = [
  { id: 'magnus', name: 'Potência', description: 'Aumenta a força bruta', color: '#c5a059' },
  { id: 'velox', name: 'Aceleração', description: 'Aumenta a velocidade de execução', color: '#c5a059' },
  { id: 'aeterna', name: 'Duração', description: 'Aumenta o tempo de persistência', color: '#c5a059' },
  { id: 'fixus', name: 'Estabilidade', description: 'Torna a magia imutável', color: '#c5a059' },
  { id: 'sincron', name: 'Convergência', description: 'Sincroniza múltiplos efeitos', color: '#c5a059' },
  { id: 'levitas', name: 'Leveza', description: 'Reduz a massa do efeito', color: '#c5a059' },
  { id: 'gravis', name: 'Peso', description: 'Aumenta a densidade do efeito', color: '#c5a059' },
  { id: 'fragilis', name: 'Ruptura', description: 'Foca em quebrar defesas', color: '#c5a059' },
];

export interface SpellResult {
  title: string;
  power: string;
}

export const getSpellResult = (core: Rune, vector: Rune, modulator: Rune): SpellResult => {
  const dictionary: Record<string, { adj: string; action: string; effect: string; desc: string }> = {
    // NUCLEOS
    pyros: { adj: 'Ígneo', action: 'Incinera', effect: 'Combustão', desc: 'chamas de alta temperatura' },
    hydros: { adj: 'Glacial', action: 'Purifica', effect: 'Congelamento', desc: 'água sob alta pressão' },
    aethel: { adj: 'Celeste', action: 'Corta', effect: 'Vácuo', desc: 'correntes de ar cortantes' },
    geos: { adj: 'Telúrico', action: 'Esmaga', effect: 'Solidificação', desc: 'massa mineral densa' },
    haemus: { adj: 'Escarlate', action: 'Drena', effect: 'Sacrifício', desc: 'energia vital pulsante' },
    fulgor: { adj: 'Galvânico', action: 'Eletrocuta', effect: 'Choque', desc: 'descargas de plasma elétrico' },
    skotos: { adj: 'Umbral', action: 'Oculta', effect: 'Vazio', desc: 'matéria negra abissal' },
    kinesis: { adj: 'Cósmico', action: 'Atrai', effect: 'Colapso', desc: 'campos de distorção gravitacional' },
    
    // VETORES
    impetus: { adj: 'Lança', action: 'Projeta', effect: 'Direcionado', desc: 'em um feixe linear de longo alcance' },
    sphera: { adj: 'Aura', action: 'Expande', effect: 'Omnidirecional', desc: 'em uma onda de impacto circular' },
    murus: { adj: 'Bastião', action: 'Ergue', effect: 'Defensivo', desc: 'como uma estrutura sólida e impenetrável' },
    axis: { adj: 'Singularidade', action: 'Colapsa', effect: 'Implosivo', desc: 'para um ponto central de alta densidade' },
    vertex: { adj: 'Ciclone', action: 'Gira', effect: 'Espiral', desc: 'em um vórtice furioso e turbulento' },
    trajectum: { adj: 'Seta', action: 'Persegue', effect: 'Guiado', desc: 'em uma trajetória inteligente até o alvo' },

    // MODULADORES
    magnus: { adj: 'Soberano', action: 'Amplifica', effect: 'Massivo', desc: 'com potência titânica e devastadora' },
    velox: { adj: 'Fugaz', action: 'Acelera', effect: 'Instantâneo', desc: 'com velocidade de execução relâmpago' },
    aeterna: { adj: 'Perpétuo', action: 'Mantém', effect: 'Eterno', desc: 'com duração prolongada e persistente' },
    fixus: { adj: 'Inabalável', action: 'Estabiliza', effect: 'Rígido', desc: 'com coesão inquebrável' },
    sincron: { adj: 'Harmônico', action: 'Sincroniza', effect: 'Ressonante', desc: 'em perfeita convergência rítmica' },
    levitas: { adj: 'Grácil', action: 'Alivia', effect: 'Volátil', desc: 'com massa reduzida e leveza extrema' },
    gravis: { adj: 'Monumental', action: 'Oprime', effect: 'Pesado', desc: 'com densidade esmagadora e opressiva' },
    fragilis: { adj: 'Disruptivo', action: 'Rompe', effect: 'Penetrante', desc: 'focado na destruição total de defesas' }
  };

  const c = dictionary[core.id];
  const v = dictionary[vector.id];
  const m = dictionary[modulator.id];

  // Naming Logic: [Refiner] [Core Adjective] [Vector Action]
  // Example: Soberano Ciclone Ígneo
  const title = `${m.adj} ${v.adj} ${c.adj}`.toUpperCase();

  // Description Logic: Combines technical and thematic elements
  const powerDescription = `Esta manifestação rúnica ${v.action} ${c.desc} ${v.desc}. O efeito é refinado por uma modulação ${m.effect.toLowerCase()}, tornando-o ${m.desc}. Na prática, ${c.action.toLowerCase()} o alvo através de ${c.effect.toLowerCase()} ${m.action.toLowerCase()}da.`;

  return {
    title,
    power: powerDescription
  };
};
