import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { User, MessageCircle, Info, Globe2, Moon, Leaf, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useAppSettings } from '../contexts/AppSettingsContext';

type SettingsSection = 'account' | 'feedback' | 'about' | 'dark' | 'language';

const sectionMeta: {
  id: SettingsSection;
  icon: typeof User;
  accentBg: string;
  accentText: string;
}[] = [
  {
    id: 'account',
    icon: User,
    accentBg: 'bg-emerald-500/10',
    accentText: 'text-emerald-600',
  },
  {
    id: 'feedback',
    icon: MessageCircle,
    accentBg: 'bg-lime-500/10',
    accentText: 'text-lime-600',
  },
  {
    id: 'about',
    icon: Info,
    accentBg: 'bg-teal-500/10',
    accentText: 'text-teal-600',
  },
  {
    id: 'dark',
    icon: Moon,
    accentBg: 'bg-blue-500/10',
    accentText: 'text-blue-600',
  },
  {
    id: 'language',
    icon: Globe2,
    accentBg: 'bg-amber-500/10',
    accentText: 'text-amber-600',
  },
];

export function SettingsScreen() {
  const navigate = useNavigate();
  const { theme, setTheme, language, setLanguage, messages } = useAppSettings();
  const [selectedSection, setSelectedSection] = useState<SettingsSection>('account');
  const [userName, setUserName] = useState('Marina Silva');
  const [userEmail, setUserEmail] = useState('marina@example.com');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const sectionItems = [
    {
      id: 'account' as const,
      title: messages.settings.sections.account.title,
      description: messages.settings.sections.account.description,
      icon: User,
      accentBg: 'bg-emerald-500/10',
      accentText: 'text-emerald-600',
    },
    {
      id: 'feedback' as const,
      title: messages.settings.sections.feedback.title,
      description: messages.settings.sections.feedback.description,
      icon: MessageCircle,
      accentBg: 'bg-lime-500/10',
      accentText: 'text-lime-600',
    },
    {
      id: 'about' as const,
      title: messages.settings.sections.about.title,
      description: messages.settings.sections.about.description,
      icon: Info,
      accentBg: 'bg-teal-500/10',
      accentText: 'text-teal-600',
    },
    {
      id: 'dark' as const,
      title: messages.settings.sections.dark.title,
      description: messages.settings.sections.dark.description,
      icon: Moon,
      accentBg: 'bg-blue-500/10',
      accentText: 'text-blue-600',
    },
    {
      id: 'language' as const,
      title: messages.settings.sections.language.title,
      description: messages.settings.sections.language.description,
      icon: Globe2,
      accentBg: 'bg-amber-500/10',
      accentText: 'text-amber-600',
    },
  ];

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageChange = (value: string) => {
    const normalized = value === 'English' || value === 'English' ? 'en' : 'pt';
    setLanguage(normalized as typeof language);
  };

  const handleSendFeedback = () => {
    if (!feedbackMessage.trim()) return;
    setFeedbackSent(true);
    setFeedbackMessage('');
    setTimeout(() => setFeedbackSent(false), 2800);
  };

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2200);
  };

  const activeSection = sectionItems.find((item) => item.id === selectedSection);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-8 ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-emerald-50 text-zinc-950'}`}>
      <MobileFrame hideNavigation>
        <div className={`relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-emerald-100'}`}>
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-emerald-500/20 via-emerald-200/60 to-transparent pointer-events-none" />
          <div className="relative z-10 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="px-5 pb-28 pt-8">
              <button
                onClick={() => navigate('/dashboard')}
                className={`mb-6 inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium shadow-sm transition ${theme === 'dark' ? 'border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800' : 'border-emerald-100 bg-white/90 text-emerald-700 hover:bg-emerald-50'}`}
              >
                <ChevronLeft className="w-4 h-4" />
                {messages.settings.back}
              </button>

              <div className={`rounded-[2rem] border p-6 shadow-sm backdrop-blur-sm ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/90' : 'border-emerald-100 bg-emerald-50/80'}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-700">
                    <Leaf className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-700/80">{messages.settings.title}</p>
                    <h1 className="mt-2 text-2xl font-semibold">{messages.settings.title}</h1>
                    <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{messages.settings.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {sectionItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedSection(item.id)}
                      className={`group flex items-center justify-between rounded-3xl border px-5 py-4 text-left transition ${isActive ? 'border-emerald-300 bg-emerald-100/80 shadow-sm' : theme === 'dark' ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800' : 'border-emerald-100 bg-white hover:bg-emerald-50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${item.accentBg} ${item.accentText}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className={`text-base font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{item.title}</h2>
                          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>{messages.settings.sections[item.id].description}</p>
                        </div>
                      </div>
                      <div className="rounded-full border border-emerald-200 bg-white p-2 text-emerald-600 transition group-hover:border-emerald-300">
                        <CheckCircle2 className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={`mt-8 rounded-[2rem] border p-6 shadow-sm ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-emerald-100 bg-white'}`}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-600">{activeSection?.title}</p>
                    <h2 className={`mt-2 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>{activeSection?.description}</h2>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                    {selectedSection === 'dark'
                      ? theme === 'dark'
                        ? messages.settings.sections.dark.active
                        : messages.settings.sections.dark.inactive
                      : selectedSection === 'language'
                      ? messages.settings.languageOptions[language]
                      : 'Informações'}
                  </span>
                </div>

                {selectedSection === 'account' && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">{messages.settings.account.nameLabel}</label>
                      <input
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        className="w-full rounded-3xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">{messages.settings.account.emailLabel}</label>
                      <input
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)}
                        className="w-full rounded-3xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-300"
                      />
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      {messages.settings.account.saveButton}
                    </button>
                    {profileSaved && <p className="text-sm text-emerald-700">{messages.settings.account.savedMessage}</p>}
                  </div>
                )}

                {selectedSection === 'feedback' && (
                  <div className="space-y-5">
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{messages.settings.feedback.description}</p>
                    <textarea
                      rows={5}
                      value={feedbackMessage}
                      onChange={(event) => setFeedbackMessage(event.target.value)}
                      placeholder={messages.settings.feedback.placeholder}
                      className="w-full rounded-3xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-emerald-300"
                    />
                    <button
                      onClick={handleSendFeedback}
                      className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      {messages.settings.feedback.sendButton}
                    </button>
                    {feedbackSent && <p className="text-sm text-emerald-700">{messages.settings.feedback.successMessage}</p>}
                  </div>
                )}

                {selectedSection === 'about' && (
                  <div className={`space-y-5 text-sm leading-7 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    <p>{messages.settings.about.line1}</p>
                    <p>{messages.settings.about.line2}</p>
                    <p className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-emerald-700">
                      {messages.settings.about.versionLabel}
                    </p>
                  </div>
                )}

                {selectedSection === 'dark' && (
                  <div className="space-y-5">
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{messages.settings.sections.dark.description}</p>
                    <button
                      onClick={handleToggleTheme}
                      className="inline-flex items-center justify-between rounded-3xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                    >
                      <span>{theme === 'dark' ? messages.settings.sections.dark.disable : messages.settings.sections.dark.enable}</span>
                      <Moon className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {selectedSection === 'language' && (
                  <div className="space-y-5">
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>{messages.settings.sections.language.description}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {Object.entries(messages.settings.languageOptions).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setLanguage(key as typeof language)}
                          className={`rounded-3xl border px-4 py-3 text-left text-sm font-medium transition ${
                            language === key ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-emerald-100 bg-white text-zinc-700 hover:bg-emerald-50'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {messages.settings.sections.language.current.replace('{language}', messages.settings.languageOptions[language])}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
