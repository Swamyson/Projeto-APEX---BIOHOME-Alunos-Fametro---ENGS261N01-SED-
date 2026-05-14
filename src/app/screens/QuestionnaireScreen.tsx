import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { mFrame } from '../components/mFrame';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: string;
  question: string;
  type: 'choice' | 'multiple';
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 'temperature',
    question: 'Como é o clima neste ambiente?',
    type: 'choice',
    options: [
      { value: 'frio', label: 'Frio (abaixo de 15°C)' },
      { value: 'ameno', label: 'Moderado/Ameno (15°C - 25°C)' },
      { value: 'quente', label: 'Quente (acima de 25°C)' },
    ],
  },
  {
    id: 'ac',
    question: 'Você utiliza ar-condicionado com frequência neste local?',
    type: 'choice',
    options: [
      { value: 'sim', label: 'Sim, frequentemente' },
      { value: 'nao', label: 'Não ou raramente' },
    ],
  },
  {
    id: 'light',
    question: 'Como é a iluminação natural?',
    type: 'choice',
    options: [
      { value: 'pouca', label: 'Pouca luz (ambientes internos ou distantes da janela)' },
      { value: 'media', label: 'Luz indireta (próximo à janela sem sol direto)' },
      { value: 'muita', label: 'Sol direto (incidência de sol direto nas folhas)' },
    ],
  },
  {
    id: 'humidity',
    question: 'Como é a umidade do ar?',
    type: 'choice',
    options: [
      { value: 'seco', label: 'Ambiente Seco' },
      { value: 'normal', label: 'Normal' },
      { value: 'umido', label: 'Ambiente Úmido (ex: banheiros)' },
    ],
  },
  {
    id: 'goals',
    question: 'Quais são as suas prioridades? (múltiplas escolhas)',
    type: 'multiple',
    options: [
      { value: 'purificacao', label: 'Purificação do ar' },
      { value: 'facil', label: 'Fácil de cuidar / Baixa manutenção' },
      { value: 'pet-friendly', label: 'Segura para Crianças e Pets' },
      { value: 'decoracao', label: 'Estética / Decoração' },
    ],
  },
];

export function QuestionnaireScreen() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[question.id] !== undefined;

  const handleAnswer = (value: string) => {
    if (question.type === 'choice') {
      setAnswers({ ...answers, [question.id]: value });
    } else {
      const current = (answers[question.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [question.id]: updated });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      localStorage.setItem(`answers_${roomId}`, JSON.stringify(answers));
      navigate(`/results/${roomId}`);
    } else {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/dashboard');
    }
  };

  const isSelected = (value: string) => {
    if (question.type === 'choice') return answers[question.id] === value;
    const current = (answers[question.id] as string[]) || [];
    return current.includes(value);
  };

  const customEase = [0.16, 1, 0.3, 1];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <mFrame hideNavigation>
        <div className="relative h-full w-full overflow-hidden bg-[#060D0A] flex flex-col">

          {/* Ambient Background */}
          <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-emerald-900/30 via-emerald-900/5 to-transparent pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.22, 0.15] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-600 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Header */}
          <div className="relative z-10 px-5 pt-8 pb-4 flex-shrink-0">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5 transition-colors hover:bg-white/[0.08]"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-300" />
            </button>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                <span className="text-emerald-400 font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: customEase }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion + '-title'}
                initial={{ opacity: 0, x: direction * 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -30 }}
                transition={{ duration: 0.4, ease: customEase }}
              >
                <h1 className="text-lg font-light text-white leading-snug">{question.question}</h1>
                {question.type === 'multiple' && (
                  <p className="text-xs text-zinc-500 mt-1">Selecione todas que se aplicam</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Options */}
          <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion + '-options'}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: customEase }}
                className="space-y-3"
              >
                {question.options.map((option, i) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: customEase }}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                      isSelected(option.value)
                        ? 'border-emerald-500/60 bg-emerald-500/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-sm ${isSelected(option.value) ? 'text-white' : 'text-zinc-300'}`}>
                        {option.label}
                      </span>
                      {isSelected(option.value) && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="relative z-10 px-5 pb-8 pt-4 border-t border-white/[0.05] bg-[#060D0A]/80 backdrop-blur-xl flex-shrink-0">
            <motion.button
              whileHover={canProceed ? { scale: 1.02 } : {}}
              whileTap={canProceed ? { scale: 0.97 } : {}}
              onClick={handleNext}
              disabled={!canProceed}
              className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
                canProceed
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_10px_40px_rgba(16,185,129,0.25)] cursor-pointer'
                  : 'bg-white/[0.04] text-zinc-600 border border-white/[0.06] cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'Ver recomendações' : 'Próxima'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </mFrame>
    </div>
  );
}
