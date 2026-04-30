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
  const titles: Record<string, string> = {
    // Cores
    pyros: 'ÍGNEO', hydros: 'AQUÁTICO', aethel: 'ETÉREO', geos: 'TELÚRICO',
    haemus: 'VITAL', fulgor: 'ELÉTRICO', skotos: 'ABISSAL', kinesis: 'GRAVITACIONAL',
    // Vetores
    impetus: 'DE PROJEÇÃO', sphera: 'DE EXPANSÃO', murus: 'DE RETENÇÃO',
    axis: 'DE COMPRESSÃO', vertex: 'DE VÓRTICE', trajectum: 'DE GUIA',
    // Moduladores
    magnus: 'MASSIVO', velox: 'ACELERADO', aeterna: 'ETERNO',
    fixus: 'ESTÁVEL', sincron: 'CONVERGENTE', levitas: 'LEVE',
    gravis: 'PESADO', fragilis: 'DISRUPTIVO'
  };

  const actions: Record<string, string> = {
    impetus: 'dispara um feixe', sphera: 'libera uma onda', murus: 'ergue um muro',
    axis: 'colapsa um ponto', vertex: 'gera um ciclone', trajectum: 'lança um projétil'
  };

  const effects: Record<string, string> = {
    magnus: 'devastador', velox: 'instantâneo', aeterna: 'contínuo',
    fixus: 'impenetrável', sincron: 'harmonizado', levitas: 'flutuante',
    gravis: 'esmagador', fragilis: 'perfurante'
  };

  const coreName = core.name.toUpperCase();
  const vectorAction = actions[vector.id];
  const modEffect = effects[modulator.id];

  return {
    title: `${titles[modulator.id]} ${coreName} ${titles[vector.id]}`,
    power: `Esta combinação ${vectorAction} de ${core.description.toLowerCase()} com um efeito ${modEffect}, resultando em uma manifestação mágica de alta complexidade.`
  };
};
