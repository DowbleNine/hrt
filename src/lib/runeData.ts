export interface RuneBase {
  id: string;
  name: string;
  path: string;
  description: string;
  image?: string;
}

export interface CoreRune extends RuneBase {
  element: string;
  adjective: string;
  strokeWidth: number;
  anchors: {
    top: [number, number];
    bottom: [number, number];
    left: [number, number];
    right: [number, number];
  };
}

export interface VectorRune extends RuneBase {
  action: string;
  attachTo: 'top' | 'bottom' | 'left' | 'right';
}

export interface ModulatorRune extends RuneBase {
  mod: string;
  position: 'left' | 'right';
}

export const RUNE_DATA = {
  cores: {
    pyros: {
      id: "pyros",
      name: "Pyros",
      element: "Fogo",
      adjective: "Ígneo",
      description: "Calor, combustão e luz.",
      path: "M 50 20 L 50 80 M 50 50 L 80 30 M 50 50 L 80 70",
      strokeWidth: 6,
      anchors: { top: [50, 20], bottom: [50, 80], left: [40, 50], right: [60, 50] },
      image: "/assets/runes/pyros.png"
    },
    hydros: {
      id: "hydros",
      name: "Hydros",
      element: "Água",
      adjective: "Aquático",
      description: "Fluidez, cura e gelo.",
      path: "M 50 20 L 50 80",
      strokeWidth: 8,
      anchors: { top: [50, 20], bottom: [50, 80], left: [40, 50], right: [60, 50] },
      image: "/assets/runes/hydros.png"
    },
    haemus: {
      id: "haemus",
      name: "Haemus",
      element: "Sangue",
      adjective: "Sanguíneo",
      description: "Vitalidade, sacrifício e controle orgânico.",
      path: "M 30 20 L 30 80 L 70 80 L 70 20",
      strokeWidth: 6,
      anchors: { top: [50, 20], bottom: [50, 80], left: [30, 50], right: [70, 50] },
      image: "/assets/runes/haemus.png"
    },
    aethel: {
      id: "aethel",
      name: "Aethel",
      element: "Ar",
      adjective: "Etéreo",
      description: "Vento, pressão e som.",
      path: "M 40 20 L 40 80 M 40 30 L 70 45 M 40 50 L 70 65",
      strokeWidth: 5,
      anchors: { top: [40, 20], bottom: [40, 80], left: [30, 50], right: [70, 50] },
      image: "/assets/runes/aethel.png"
    },
    fulgor: {
      id: "fulgor",
      name: "Fulgor",
      element: "Raio",
      adjective: "Elétrico",
      description: "Eletricidade e magnetismo.",
      path: "M 40 20 L 60 40 L 40 60 L 60 80",
      strokeWidth: 5,
      anchors: { top: [50, 20], bottom: [50, 80], left: [40, 50], right: [60, 50] },
      image: "/assets/runes/fulgor.png"
    },
    skotos: {
      id: "skotos",
      name: "Skotos",
      element: "Sombra",
      adjective: "Sombrio",
      description: "Escuridão, ocultamento e vazio.",
      path: "M 50 20 L 50 80 M 30 50 L 70 50",
      strokeWidth: 4,
      anchors: { top: [50, 20], bottom: [50, 80], left: [30, 50], right: [70, 50] },
      image: "/assets/runes/skotos.png"
    },
    kinesis: {
      id: "kinesis",
      name: "Kinesis",
      element: "Gravidade",
      adjective: "Gravitacional",
      description: "Peso, atração e repulsão.",
      path: "M 30 30 L 70 70 M 70 30 L 30 70",
      strokeWidth: 7,
      anchors: { top: [50, 30], bottom: [50, 70], left: [30, 50], right: [70, 50] },
      image: "/assets/runes/kinesis.png"
    },
    geos: {
      id: "geos",
      name: "Geos",
      element: "Terra",
      adjective: "Pétreo",
      description: "Rocha, metal e estabilidade.",
      path: "M 30 80 L 70 80 M 50 20 L 50 80 M 35 70 L 65 70",
      strokeWidth: 7,
      anchors: { top: [50, 20], bottom: [50, 80], left: [30, 50], right: [70, 50] },
      image: "/assets/runes/geos.png"
    }
  } as Record<string, CoreRune>,
  vectors: {
    impetus: {
      id: "impetus",
      name: "Ímpetus",
      action: "Disparo",
      description: "Dispara em linha reta.",
      path: "M -15 15 L 0 0 L 15 15 M 0 0 L 0 10",
      attachTo: "top",
      image: "/assets/runes/impetus.png"
    },
    sphera: {
      id: "sphera",
      name: "Sphera",
      action: "Explosão",
      description: "Libera em 360°.",
      path: "M -20 0 A 20 20 0 1 1 20 0",
      attachTo: "top",
      image: "/assets/runes/sphera.png"
    },
    murus: {
      id: "murus",
      name: "Murus",
      action: "Barreira",
      description: "Cria barreiras ou armaduras.",
      path: "M -25 0 L 25 0 M -25 5 L 25 5",
      attachTo: "bottom",
      image: "/assets/runes/murus.png"
    },
    axis: {
      id: "axis",
      name: "Axis",
      action: "Corte",
      description: "Lâminas ou pontas perfurantes.",
      path: "M -15 -10 L 0 5 L 15 -10",
      attachTo: "bottom",
      image: "/assets/runes/axis.png"
    },
    vertex: {
      id: "vertex",
      name: "Vertex",
      action: "Vórtice",
      description: "Giro em alta velocidade.",
      path: "M -15 -15 A 15 15 0 1 1 15 15",
      attachTo: "top",
      image: "/assets/runes/vertex.png"
    },
    trajectum: {
      id: "trajectum",
      name: "Trajectum",
      action: "Guia",
      description: "Teleguiado pelo instinto.",
      path: "M -10 10 L 0 0 L 10 10 M 0 0 L 0 20",
      attachTo: "top"
    }
  } as Record<string, VectorRune>,
  modulators: {
    magnus: {
      id: "magnus",
      name: "Magnus",
      mod: "Potente",
      description: "Aumenta o dano e impacto.",
      path: "M -10 -10 L 10 10 M 10 -10 L -10 10",
      position: "right"
    },
    velox: {
      id: "velox",
      name: "Velox",
      mod: "Veloz",
      description: "Aumenta a velocidade.",
      path: "M 0 -10 L 10 0 L 0 10",
      position: "right"
    },
    aeterna: {
      id: "aeterna",
      name: "Aeterna",
      mod: "Eterno",
      description: "Aumenta a duração do efeito.",
      path: "M 0 -15 L 0 15",
      position: "left"
    },
    fragilis: {
      id: "fragilis",
      name: "Fragilis",
      mod: "Ruptura",
      description: "Foca em quebrar resistências.",
      path: "M -5 -5 L 5 5 M 5 -5 L -5 5",
      position: "left"
    },
    fixus: {
      id: "fixus",
      name: "Fixus",
      mod: "Estável",
      description: "Aumenta a estabilidade e precisão.",
      path: "M -15 0 L 15 0",
      position: "left"
    },
    sincron: {
      id: "sincron",
      name: "Sincron",
      mod: "Síncrono",
      description: "Sincroniza fluxos de energia.",
      path: "M -10 -5 L 0 0 L -10 5 M 10 -5 L 0 0 L 10 5",
      position: "right"
    },
    levitas: {
      id: "levitas",
      name: "Levitas",
      mod: "Leve",
      description: "Reduz o peso e aumenta a agilidade.",
      path: "M 0 5 L 0 -10 M -5 -5 L 0 -10 L 5 -5",
      position: "left"
    },
    gravis: {
      id: "gravis",
      name: "Gravis",
      mod: "Pesado",
      description: "Aumenta a massa e o impacto.",
      path: "M 0 -5 L 0 10 M -5 5 L 0 10 L 5 5",
      position: "right"
    }
  } as Record<string, ModulatorRune>
};
