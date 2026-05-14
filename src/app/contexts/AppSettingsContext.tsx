import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'light' | 'dark';
export type AppLanguage = 'pt' | 'en';

type TranslationMap = typeof translations.pt;

const translations = {
  pt: {
    navigation: {
      home: 'Início',
      analysis: 'Análise',
      plants: 'Plantas',
      settings: 'Config',
    },
    splash: {
      title: 'APEX BIOHOME',
      tagline: 'Sustentabilidade em casa',
      loading: 'Carregando...',
    },
    welcome: {
      heading: 'APEX BIOHOME',
      slogan: 'Sustentabilidade em casa',
      description: 'Transforme seu ambiente com plantas inteligentes',
      feature1: 'Plantas ideais para cada ambiente',
      feature2: 'Reduza temperatura e purifique o ar',
      feature3: 'Bem-estar e sustentabilidade',
      cta: 'Começar agora',
      version: 'Versão Beta 1.0',
      social: '@apexbiohome',
    },
    register: {
      welcome: 'Bem-vindo!',
      personalize: 'Vamos personalizar sua experiência',
      nameLabel: 'Seu nome',
      namePlaceholder: 'Digite seu nome',
      question: 'Onde você vai usar o app?',
      home: 'Casa',
      homeDescription: 'Sala, quarto, cozinha...',
      company: 'Empresa',
      companyDescription: 'Escritório, recepção, sala de reunião...',
      continue: 'Continuar',
    },
    dashboard: {
      greeting: 'Olá,',
      selectRoom: 'Selecione um ambiente para começar',
      progressTitle: 'Progresso Geral',
      activeStatus: 'Ativo',
      startMessage: 'Comece avaliando seus ambientes',
      remindersTitle: 'Lembrete de Regar',
      viewAll: 'Ver todas',
      roomsTitle: 'Ambientes',
      evaluate: 'Avaliar novo',
      tipTitle: 'Dica sustentável',
      tipText: 'Plantas purificam o ar e reduzem a temperatura ambiente em até 6°C, diminuindo a necessidade de ar-condicionado.',
      plantsLabel: 'planta(s)',
    },
    questionnaire: {
      progress: 'Pergunta {current} de {total}',
      selectAll: 'Selecione todas que se aplicam',
      next: 'Próxima',
      finish: 'Ver recomendações',
      questions: [
        {
          id: 'temperature',
          question: 'Como é o clima neste ambiente?',
          options: [
            { value: 'frio', label: 'Frio (abaixo de 15°C)' },
            { value: 'ameno', label: 'Moderado/Ameno (15°C - 25°C)' },
            { value: 'quente', label: 'Quente (acima de 25°C)' },
          ],
        },
        {
          id: 'ac',
          question: 'Você utiliza ar-condicionado com frequência neste local?',
          options: [
            { value: 'sim', label: 'Sim, frequentemente' },
            { value: 'nao', label: 'Não ou raramente' },
          ],
        },
        {
          id: 'light',
          question: 'Como é a iluminação natural?',
          options: [
            { value: 'pouca', label: 'Pouca luz (ambientes internos ou distantes da janela)' },
            { value: 'media', label: 'Luz indireta (próximo à janela sem sol direto)' },
            { value: 'muita', label: 'Sol direto (incidência de sol direto nas folhas)' },
          ],
        },
        {
          id: 'humidity',
          question: 'Como é a umidade do ar?',
          options: [
            { value: 'seco', label: 'Ambiente Seco' },
            { value: 'normal', label: 'Normal' },
            { value: 'umido', label: 'Ambiente Úmido (ex: banheiros)' },
          ],
        },
        {
          id: 'goals',
          question: 'Quais são as suas prioridades? (múltiplas escolhas)',
          options: [
            { value: 'purificacao', label: 'Purificação do ar' },
            { value: 'facil', label: 'Fácil de cuidar / Baixa manutenção' },
            { value: 'pet-friendly', label: 'Segura para Crianças e Pets' },
            { value: 'decoracao', label: 'Estética / Decoração' },
          ],
        },
      ],
    },
    results: {
      title: 'Recomendações para seu ambiente',
      subtitle: 'Selecionamos as melhores plantas baseado nas suas respostas',
      emptyTitle: 'Nenhuma planta perfeita encontrada',
      emptyMessage: 'Tente ajustar suas respostas para ver mais opções.',
      suggestionTitle: 'Dica de arranjo',
      suggestionText: 'Para melhor resultado, distribua as plantas em diferentes alturas e próximas às janelas.',
      suggestionsButton: 'Ver sugestões de layout →',
    },
    plantDetail: {
      notFound: 'Planta não encontrada',
      wateringReminderTitle: 'Lembrete de regar',
      reminderActive: 'Lembrete ativo para o ambiente:',
      wateringText: 'Ative para receber lembretes de regar para esta planta.',
      frequencyLabel: 'Frequência:',
      benefitsTitle: 'Benefícios',
      careTitle: 'Cuidados',
      wateringRecommended: 'regar Recomendada',
      lighting: 'Iluminação',
      idealTemperature: 'Temperatura ideal',
      humidity: 'Umidade',
      similarPlants: 'Plantas similares',
      layoutSuggestions: 'Sugestões de Layout',
      communityGalleryTitle: 'Galeria da Comunidade',
      communityGalleryDescription: 'Como outros cuidadores arranjaram a planta',
      shareButton: 'Compartilhar meu arranjo',
      galleryBack: 'Fechar',
    },
    settings: {
      title: 'Preferências',
      subtitle: 'Crie um ambiente mais natural e confortável para cuidar das suas plantas.',
      back: 'Voltar',
      sections: {
        account: {
          title: 'Conta ou Usuário',
          description: 'Gerencie seu perfil e preferências pessoais.',
        },
        feedback: {
          title: 'Feedback',
          description: 'Envie sua opinião sobre sustentabilidade e plantas.',
        },
        about: {
          title: 'Sobre',
          description: 'Saiba mais sobre o app e sua missão verde.',
        },
        dark: {
          title: 'Alternar modo escuro',
          description: 'Ative o modo noite para uma experiência suave em ambientes escuros.',
          active: 'Ativo',
          inactive: 'Desativado',
          enable: 'Ativar modo escuro',
          disable: 'Desativar modo escuro',
        },
        language: {
          title: 'Idioma',
          description: 'Escolha seu idioma preferido para a experiência do app.',
          current: 'Idioma selecionado: {language}',
        },
      },
      account: {
        nameLabel: 'Nome',
        emailLabel: 'E-mail',
        saveButton: 'Salvar perfil',
        savedMessage: 'Perfil atualizado com sucesso!',
      },
      feedback: {
        description: 'Compartilhe o que você mais gostou no app ou como podemos melhorar a experiência sustentável.',
        placeholder: 'Escreva seu feedback aqui...',
        sendButton: 'Enviar feedback',
        successMessage: 'Obrigado! Seu feedback foi recebido.',
      },
      about: {
        line1: 'O BioHome conecta você ao ciclo de cuidados das plantas por meio de uma experiência natural, suave e inteligente.',
        line2: 'Este app foi pensado para quem busca sustentabilidade, simplicidade e bem-estar no ambiente da casa ou do trabalho.',
        versionLabel: 'Versão 1.0.0 · Design inspirado em plantas, terra e luz natural.',
      },
      languageOptions: {
        pt: 'Português',
        en: 'English',
      },
    },
    plants: {
      searchPlaceholder: 'Buscar por nome ou nome científico...',
      favorites: 'Favoritas',
      difficulty: 'Dificuldade',
      light: 'Luz',
      watering: 'Rega',
      clearFilters: 'Limpar filtros',
      easy: 'Fácil',
      medium: 'Médio',
      hard: 'Difícil',
      frequent: 'Frequente',
      moderate: 'Moderada',
      low: 'Pouca',
      home: 'Casa',
      office: 'Empresa',
      rooms: 'Ambientes',
      selectedPlants: 'plantas',
      searchClear: 'Limpar',
    },
  },
  en: {
    navigation: { home: 'Home', analysis: 'Analysis', plants: 'Plants', settings: 'Settings' },
    splash: { title: 'APEX BIOHOME', tagline: 'Sustainability at home', loading: 'Loading...' },
    welcome: {
      heading: 'APEX BIOHOME',
      slogan: 'Sustainability at home',
      description: 'Transform your space with smart plants',
      feature1: 'Plants ideal for every room',
      feature2: 'Lower temperature and purify the air',
      feature3: 'Well-being and sustainability',
      cta: 'Get started',
      version: 'Beta Version 1.0',
      social: '@apexbiohome',
    },
    register: {
      welcome: 'Welcome!',
      personalize: 'Let’s personalize your experience',
      nameLabel: 'Your name',
      namePlaceholder: 'Type your name',
      question: 'Where will you use the app?',
      home: 'Home',
      homeDescription: 'Living room, bedroom, kitchen...',
      company: 'Office',
      companyDescription: 'Office, reception, meeting room...',
      continue: 'Continue',
    },
    dashboard: {
      greeting: 'Hello,',
      selectRoom: 'Select a room to get started',
      progressTitle: 'Overall Progress',
      activeStatus: 'Active',
      startMessage: 'Start by evaluating your rooms',
      remindersTitle: 'Watering Reminder',
      viewAll: 'See all',
      roomsTitle: 'Rooms',
      evaluate: 'Evaluate again',
      tipTitle: 'Sustainability tip',
      tipText: 'Plants purify the air and reduce room temperature by up to 6°C, lowering AC usage.',
      plantsLabel: 'plant(s)',
    },
    questionnaire: {
      progress: 'Question {current} of {total}',
      selectAll: 'Select all that apply',
      next: 'Next',
      finish: 'See recommendations',
      questions: [
        {
          id: 'temperature',
          question: 'How is the climate in this room?',
          options: [
            { value: 'frio', label: 'Cold (below 15°C)' },
            { value: 'ameno', label: 'Moderate (15°C - 25°C)' },
            { value: 'quente', label: 'Warm (above 25°C)' },
          ],
        },
        {
          id: 'ac',
          question: 'Do you use air conditioning frequently here?',
          options: [
            { value: 'sim', label: 'Yes, frequently' },
            { value: 'nao', label: 'No or rarely' },
          ],
        },
        {
          id: 'light',
          question: 'How is the natural light?',
          options: [
            { value: 'pouca', label: 'Low light (interior or far from windows)' },
            { value: 'media', label: 'Indirect light (near window without direct sun)' },
            { value: 'muita', label: 'Direct sun (sunlight on leaves)' },
          ],
        },
        {
          id: 'humidity',
          question: 'How is the air humidity?',
          options: [
            { value: 'seco', label: 'Dry environment' },
            { value: 'normal', label: 'Normal' },
            { value: 'umido', label: 'Humid environment (e.g., bathroom)' },
          ],
        },
        {
          id: 'goals',
          question: 'What are your priorities? (multiple choice)',
          options: [
            { value: 'purificacao', label: 'Air purification' },
            { value: 'facil', label: 'Easy care / Low maintenance' },
            { value: 'pet-friendly', label: 'Safe for kids and pets' },
            { value: 'decoracao', label: 'Aesthetic / Decoration' },
          ],
        },
      ],
    },
    results: {
      title: 'Recommendations for your space',
      subtitle: 'We selected the best plants based on your answers',
      emptyTitle: 'No perfect plant found',
      emptyMessage: 'Try adjusting your answers to see more options.',
      suggestionTitle: 'Arrangement tip',
      suggestionText: 'For best results, place plants at different heights and near windows.',
      suggestionsButton: 'See layout suggestions →',
    },
    plantDetail: {
      notFound: 'Plant not found',
      wateringReminderTitle: 'Watering reminder',
      reminderActive: 'Reminder active for:',
      wateringText: 'Enable to receive watering reminders for this plant.',
      frequencyLabel: 'Frequency:',
      benefitsTitle: 'Benefits',
      careTitle: 'Care guide',
      wateringRecommended: 'Recommended watering',
      lighting: 'Lighting',
      idealTemperature: 'Ideal temperature',
      humidity: 'Humidity',
      similarPlants: 'Similar plants',
      layoutSuggestions: 'Layout suggestions',
      communityGalleryTitle: 'Community gallery',
      communityGalleryDescription: 'How other growers arranged this plant',
      shareButton: 'Share my arrangement',
      galleryBack: 'Close',
    },
    settings: {
      title: 'Preferences',
      subtitle: 'Create a natural and comfortable space to care for your plants.',
      back: 'Back',
      sections: {
        account: {
          title: 'Account or User',
          description: 'Manage your profile and personal preferences.',
        },
        feedback: {
          title: 'Feedback',
          description: 'Share your thoughts about sustainability and plants.',
        },
        about: {
          title: 'About',
          description: 'Learn more about the app and its green mission.',
        },
        dark: {
          title: 'Toggle dark mode',
          description: 'Enable night mode for a softer experience in low light.',
          active: 'Active',
          inactive: 'Inactive',
          enable: 'Enable dark mode',
          disable: 'Disable dark mode',
        },
        language: {
          title: 'Language',
          description: 'Choose your preferred app language.',
          current: 'Selected language: {language}',
        },
      },
      account: {
        nameLabel: 'Name',
        emailLabel: 'Email',
        saveButton: 'Save profile',
        savedMessage: 'Profile updated successfully!',
      },
      feedback: {
        description: 'Share what you enjoyed most in the app or how we can improve the sustainable experience.',
        placeholder: 'Write your feedback here...',
        sendButton: 'Send feedback',
        successMessage: 'Thanks! Your feedback has been received.',
      },
      about: {
        line1: 'BioHome connects you to the plant care cycle through a natural, smooth, and intelligent experience.',
        line2: 'This app is designed for those seeking sustainability, simplicity, and comfort at home or work.',
        versionLabel: 'Version 1.0.0 · Design inspired by plants, earth and natural light.',
      },
      languageOptions: {
        pt: 'Português',
        en: 'English',
      },
    },
    plants: {
      searchPlaceholder: 'Search by name or scientific name...',
      favorites: 'Favorites',
      difficulty: 'Difficulty',
      light: 'Light',
      watering: 'Watering',
      clearFilters: 'Clear filters',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      frequent: 'Frequent',
      moderate: 'Moderate',
      low: 'Low',
      home: 'Home',
      office: 'Office',
      rooms: 'Rooms',
      selectedPlants: 'plants',
      searchClear: 'Clear',
    },
  },
};

const AppSettingsContext = createContext<{
  theme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
  language: AppLanguage;
  setLanguage: (value: AppLanguage) => void;
  messages: TranslationMap;
}>({
  theme: 'dark',
  setTheme: () => {},
  language: 'pt',
  setLanguage: () => {},
  messages: translations.pt,
});

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [language, setLanguage] = useState<AppLanguage>('pt');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app_theme') as ThemeMode | null;
    const savedLanguage = localStorage.getItem('app_language') as AppLanguage | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    if (savedLanguage === 'pt' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  const messages = useMemo(() => translations[language], [language]);

  return (
    <AppSettingsContext.Provider value={{ theme, setTheme, language, setLanguage, messages }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  return useContext(AppSettingsContext);
}
