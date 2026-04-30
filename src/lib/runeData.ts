export interface RuneBase {
  id: string;
  name: string;
  description: string;
  image?: string;
  color: string;
  category: 'core' | 'vector' | 'modulator';
}

export interface CoreRune extends RuneBase {
  category: 'core';
  element: string;
}

export interface VectorRune extends RuneBase {
  category: 'vector';
  action: string;
}

export interface ModulatorRune extends RuneBase {
  category: 'modulator';
  property: string;
}

export const RUNE_DATA = {
  cores: {
    fire: {
      id: 'fire',
      name: 'Fogo',
      element: 'Fogo',
      description: 'Canaliza calor intenso e combustão elemental.',
      color: '#ff4d00',
      category: 'core',
      image: '/assets/runes/pyros.png'
    },
    water: {
      id: 'water',
      name: 'Água',
      element: 'Água',
      description: 'Manipula fluidos e energias regenerativas.',
      color: '#00d4ff',
      category: 'core',
      image: '/assets/runes/hydros.png'
    },
    earth: {
      id: 'earth',
      name: 'Terra',
      element: 'Terra',
      description: 'Manifesta força telúrica e solidez mineral.',
      color: '#4ade80',
      category: 'core',
      image: '/assets/runes/geos.png'
    },
    air: {
      id: 'air',
      name: 'Ar',
      element: 'Ar',
      description: 'Domina correntes atmosféricas e agilidade.',
      color: '#a5f3fc',
      category: 'core',
      image: '/assets/runes/fulgor.png'
    }
  } as Record<string, CoreRune>,

  vectors: {
    direction: {
      id: 'direction',
      name: 'Direção',
      action: 'Direção',
      description: 'Guia a energia em trajetórias lineares.',
      color: '#c5a059',
      category: 'vector',
      image: '/assets/runes/impetus.png'
    },
    speed: {
      id: 'speed',
      name: 'Velocidade',
      action: 'Velocidade',
      description: 'Acelera a propagação do efeito elemental.',
      color: '#c5a059',
      category: 'vector',
      image: '/assets/runes/kinesis.png'
    },
    range: {
      id: 'range',
      name: 'Alcance',
      action: 'Alcance',
      description: 'Expande a distância de influência da magia.',
      color: '#c5a059',
      category: 'vector',
      image: '/assets/runes/vertex.png'
    },
    curve: {
      id: 'curve',
      name: 'Curva',
      action: 'Curva',
      description: 'Dobra a realidade para atingir alvos ocultos.',
      color: '#c5a059',
      category: 'vector',
      image: '/assets/runes/trajeto.png'
    }
  } as Record<string, VectorRune>,

  modulators: {
    intensity: {
      id: 'intensity',
      name: 'Intensidade',
      property: 'Intensidade',
      description: 'Amplifica a potência bruta do efeito.',
      color: '#facc15',
      category: 'modulator',
      image: '/assets/runes/magnus.png'
    },
    duration: {
      id: 'duration',
      name: 'Duração',
      property: 'Duração',
      description: 'Mantém o efeito ativo por ciclos prolongados.',
      color: '#facc15',
      category: 'modulator',
      image: '/assets/runes/haemus.png'
    },
    volume: {
      id: 'volume',
      name: 'Volume',
      property: 'Volume',
      description: 'Aumenta a massa física da manifestação.',
      color: '#facc15',
      category: 'modulator',
      image: '/stone-texture.png'
    },
    secondary: {
      id: 'secondary',
      name: 'Secundário',
      property: 'Secundário',
      description: 'Adiciona uma ressonância harmônica extra.',
      color: '#facc15',
      category: 'modulator',
      image: '/stone-texture.png'
    }
  } as Record<string, ModulatorRune>
};
