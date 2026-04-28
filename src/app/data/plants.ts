import { Wind, Thermometer, Droplets, Sparkles } from 'lucide-react';

export interface PlantBenefit {
  icon: any;
  text: string;
  color: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  description: string;
  care: {
    water: string;
    light: string;
    temperature: string;
    humidity: string;
  };
  benefits: PlantBenefit[];
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  purification: number;
  humidityLevel: number;
  temperatureEffect: string;
  
  // matching tags
  traits: {
    light: ('pouca' | 'media' | 'muita')[];
    humidity: ('seco' | 'normal' | 'umido')[];
    temperature: ('frio' | 'ameno' | 'quente')[];
    acTolerant: boolean;
    petFriendly: boolean;
    easyCare: boolean;
    purifier: boolean;
  };
  layouts?: string[];
}

export const allPlants: Plant[] = [
  {
    id: 'zamioculca',
    name: 'Zamioculca',
    scientificName: 'Zamioculcas zamiifolia',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&q=80',
    description: 'Planta perfeita para iniciantes e ambientes com pouca luz. Beleza, resistência extrema e significado espiritual positivo.',
    difficulty: 'Fácil',
    purification: 85,
    humidityLevel: 40,
    temperatureEffect: 'Neutro',
    care: {
      water: 'A cada 10-15 dias no verão',
      light: 'Luz indireta ou pouca luz',
      temperature: 'Suporta variações',
      humidity: 'Baixa a Normal',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['seco', 'normal'],
      temperature: ['ameno', 'quente'],
      acTolerant: true,
      petFriendly: false,
      easyCare: true,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Remove xileno e tolueno', color: 'text-blue-600' },
      { icon: Sparkles, text: 'Resistência extrema a negligência', color: 'text-emerald-600' }
    ],
    layouts: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400'
    ]
  },
  {
    id: 'jiboia',
    name: 'Jiboia',
    scientificName: 'Epipremnum aureum',
    image: 'https://images.unsplash.com/photo-1596724878582-76f1a8fdc24f?w=800&q=80',
    description: 'Planta versátil, trepadeira, excelente purificadora de ar. Crescimento rápido e adaptabilidade.',
    difficulty: 'Fácil',
    purification: 90,
    humidityLevel: 60,
    temperatureEffect: 'Reduz até 2°C',
    care: {
      water: '2-3 vezes por semana',
      light: 'Pouca luz a luz indireta intensa',
      temperature: 'Temperaturas mais altas',
      humidity: 'Média a Alta',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['normal', 'umido'],
      temperature: ['ameno', 'quente'],
      acTolerant: true, // Needs occasional misting but ok
      petFriendly: false,
      easyCare: true,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Remove formaldeído, xilenos e benzeno', color: 'text-blue-600' },
      { icon: Droplets, text: 'Aumenta umidade local', color: 'text-cyan-600' }
    ]
  },
  {
    id: 'espada-sao-jorge',
    name: 'Espada de São Jorge',
    scientificName: 'Sansevieria trifasciata',
    image: 'https://images.unsplash.com/photo-1687552212914-03a30c82053c?w=800&q=80',
    description: 'Extremamente adaptável e resistente, tolera ambientes sem luz natural, excelente purificadora noturna.',
    difficulty: 'Fácil',
    purification: 95,
    humidityLevel: 40,
    temperatureEffect: 'Reduz até 3°C',
    care: {
      water: 'Semanal no verão, 10-15 dias no inverno',
      light: 'Sombra a Sol direto',
      temperature: 'Adapta-se a várias',
      humidity: 'Seco a Normal',
    },
    traits: {
      light: ['pouca', 'media', 'muita'],
      humidity: ['seco', 'normal'],
      temperature: ['frio', 'ameno', 'quente'],
      acTolerant: true,
      petFriendly: false,
      easyCare: true,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Filtra formaldeído, benzeno', color: 'text-blue-600' },
      { icon: Sparkles, text: 'Libera oxigênio à noite', color: 'text-emerald-600' }
    ]
  },
  {
    id: 'lanca-sao-jorge',
    name: 'Lança de São Jorge',
    scientificName: 'Sansevieria cylindrica',
    image: 'https://images.unsplash.com/photo-1599719840151-53fc447e7143?w=800&q=80',
    description: 'Versão mais moderna e minimalista, folhas cilíndricas elegantes e extrema facilidade de cultivo.',
    difficulty: 'Fácil',
    purification: 90,
    humidityLevel: 40,
    temperatureEffect: 'Reduz até 2°C',
    care: {
      water: '15-20 dias no verão',
      light: 'Pouca luz a luz indireta',
      temperature: '15°C a 30°C',
      humidity: 'Seco a Normal',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['seco', 'normal'],
      temperature: ['ameno', 'quente'],
      acTolerant: true,
      petFriendly: false,
      easyCare: true,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Filtra formaldeído e benzeno', color: 'text-blue-600' },
      { icon: Sparkles, text: 'Libera oxigênio à noite', color: 'text-emerald-600' }
    ]
  },
  {
    id: 'espada-santa-barbara',
    name: 'Espada de Santa Bárbara',
    scientificName: 'Sansevieria trifasciata \'Laurentii\'',
    image: 'https://images.unsplash.com/photo-1615389909888-76c2271881a3?w=800&q=80',
    description: 'Versão mais ornamental com bordas amarelas. Une beleza, facilidade extrema e purificação.',
    difficulty: 'Fácil',
    purification: 92,
    humidityLevel: 40,
    temperatureEffect: 'Reduz até 2°C',
    care: {
      water: '10-14 dias no verão',
      light: 'Meia sombra ou luz indireta',
      temperature: 'Adapta-se a várias',
      humidity: 'Seco a Normal',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['seco', 'normal'],
      temperature: ['ameno', 'quente'],
      acTolerant: true,
      petFriendly: false,
      easyCare: true,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Filtra formaldeído, benzeno e tricloroetileno', color: 'text-blue-600' },
      { icon: Sparkles, text: 'Libera oxigênio à noite', color: 'text-emerald-600' }
    ]
  },
  {
    id: 'dracena',
    name: 'Dracena',
    scientificName: 'Dracaena spp',
    image: 'https://images.unsplash.com/photo-1656875419747-4ddd4b09a899?w=800&q=80',
    description: 'Planta de grande apelo visual e excelente purificadora do ar, trazendo uma elegância tropical.',
    difficulty: 'Médio',
    purification: 88,
    humidityLevel: 50,
    temperatureEffect: 'Reduz até 2°C',
    care: {
      water: 'A cada 7-10 dias',
      light: 'Luz indireta a meia-sombra',
      temperature: '15°C a 30°C',
      humidity: 'Média',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['normal', 'umido'],
      temperature: ['ameno', 'quente'],
      acTolerant: false,
      petFriendly: false,
      easyCare: false,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Remove tricloroetileno, benzeno, formaldeído', color: 'text-blue-600' }
    ]
  },
  {
    id: 'aglaonema',
    name: 'Aglaonema',
    scientificName: 'Aglaonema spp',
    image: 'https://images.unsplash.com/photo-1620803366004-119b57f54cd6?w=800&q=80',
    description: 'Joia de interior com folhagem colorida e tolerância a baixa luminosidade.',
    difficulty: 'Fácil',
    purification: 85,
    humidityLevel: 55,
    temperatureEffect: 'Neutro',
    care: {
      water: 'A cada 7-10 dias',
      light: 'Luz indireta filtrada, tolera sombra',
      temperature: 'Acima de 10°C',
      humidity: 'Normal',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['normal'],
      temperature: ['ameno', 'quente'],
      acTolerant: false,
      petFriendly: false,
      easyCare: true,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Filtra formaldeído e benzeno', color: 'text-blue-600' }
    ]
  },
  {
    id: 'samambaia',
    name: 'Samambaia Americana',
    scientificName: 'Nephrolepis exaltata',
    image: 'https://images.unsplash.com/photo-1515054788900-574580f821ad?w=800&q=80',
    description: 'Planta ideal para quem tem pets. Exuberância tropical, purifica e umidifica o ar.',
    difficulty: 'Médio',
    purification: 92,
    humidityLevel: 80,
    temperatureEffect: 'Reduz até 3°C',
    care: {
      water: '2 vezes por semana',
      light: 'Luz indireta',
      temperature: 'Ameno a Quente',
      humidity: 'Alta (Úmido)',
    },
    traits: {
      light: ['media'],
      humidity: ['umido', 'normal'],
      temperature: ['ameno', 'quente'],
      acTolerant: false,
      petFriendly: true,
      easyCare: false,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Filtra formaldeído, tolueno e xileno', color: 'text-blue-600' },
      { icon: Droplets, text: 'Excelente umidificadora natural', color: 'text-cyan-600' }
    ]
  },
  {
    id: 'areca-bambu',
    name: 'Areca-bambu',
    scientificName: 'Dypsis lutescens',
    image: 'https://images.unsplash.com/photo-1615309363679-fed456ff8113?w=800&q=80',
    description: 'A rainha das umidificadoras naturais. Exuberante, pet-friendly e purificadora de ar potente.',
    difficulty: 'Médio',
    purification: 98,
    humidityLevel: 85,
    temperatureEffect: 'Reduz até 5°C',
    care: {
      water: '2-3 vezes por semana',
      light: 'Luz indireta intensa ou meia-sombra',
      temperature: 'Acima de 10°C',
      humidity: 'Alta',
    },
    traits: {
      light: ['media', 'muita'],
      humidity: ['normal', 'umido'],
      temperature: ['ameno', 'quente'],
      acTolerant: true, // Resists somewhat if grouped
      petFriendly: true,
      easyCare: false,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Remove formaldeído, xileno, tolueno', color: 'text-blue-600' },
      { icon: Droplets, text: 'Altíssima taxa de transpiração e umidade', color: 'text-cyan-600' }
    ]
  },
  {
    id: 'lirio-paz',
    name: 'Lírio da Paz',
    scientificName: 'Spathiphyllum wallisii',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&q=80',
    description: 'Planta elegante com flores brancas, excepcional na purificação do ar e muito usada em decoração.',
    difficulty: 'Médio',
    purification: 94,
    humidityLevel: 70,
    temperatureEffect: 'Reduz até 2°C',
    care: {
      water: 'Quando as folhas murcharem levemente',
      light: 'Luz indireta ou pouca luz',
      temperature: '18°C a 27°C',
      humidity: 'Alta',
    },
    traits: {
      light: ['pouca', 'media'],
      humidity: ['normal', 'umido'],
      temperature: ['ameno', 'quente'],
      acTolerant: false,
      petFriendly: false,
      easyCare: false,
      purifier: true,
    },
    benefits: [
      { icon: Wind, text: 'Elimina diversos compostos nocivos', color: 'text-blue-600' }
    ]
  }
];

export function getRecommendations(answers: Record<string, any>): Plant[] {
  // Example answers shape:
  // {
  //   temperature: 'ameno',
  //   ac: 'sim',
  //   light: 'media',
  //   humidity: 'normal',
  //   goals: ['purificar', 'pet-friendly']
  // }
  
  let scoredPlants = allPlants.map(plant => {
    let score = 0;
    let perfectMatch = true;

    // Check Temperature
    if (answers.temperature && plant.traits.temperature.includes(answers.temperature)) {
      score += 2;
    } else {
      perfectMatch = false;
    }

    // Check AC
    if (answers.ac === 'sim' && !plant.traits.acTolerant) {
      score -= 3; // Penalty for AC sensitive plants
      perfectMatch = false;
    } else if (answers.ac === 'sim' && plant.traits.acTolerant) {
      score += 2;
    }

    // Check Light
    if (answers.light && plant.traits.light.includes(answers.light)) {
      score += 3; // Light is very important
    } else {
      score -= 2;
      perfectMatch = false;
    }

    // Check Humidity
    if (answers.humidity && plant.traits.humidity.includes(answers.humidity)) {
      score += 2;
    }

    // Check Goals
    const goals = answers.goals || [];
    if (goals.includes('pet-friendly')) {
      if (plant.traits.petFriendly) {
        score += 5; // Must-have for pet owners
      } else {
        score -= 10; // Severe penalty if not pet friendly
        perfectMatch = false;
      }
    }
    
    if (goals.includes('facil')) {
      if (plant.traits.easyCare) score += 3;
    }
    
    if (goals.includes('purificacao')) {
      if (plant.traits.purifier) score += 2;
    }

    return { plant, score, perfectMatch };
  });

  // Sort by score
  scoredPlants.sort((a, b) => b.score - a.score);

  // Return top 3-4 recommendations
  return scoredPlants.filter(s => s.score > 0).slice(0, 4).map(s => s.plant);
}
