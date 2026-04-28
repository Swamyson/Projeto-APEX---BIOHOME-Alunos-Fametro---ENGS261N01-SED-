import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

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
      { value: 'pet-friendly', label: 'Segura para Pets (Cães e Gatos)' },
      { value: 'decoracao', label: 'Estética / Decoração' },
    ],
  },
];

export function QuestionnaireScreen() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

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
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/dashboard');
    }
  };

  const isSelected = (value: string) => {
    if (question.type === 'choice') {
      return answers[question.id] === value;
    } else {
      const current = (answers[question.id] as string[]) || [];
      return current.includes(value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <MobileFrame hideNavigation>
        <div className="h-full flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          {/* Header */}
          <div className="px-5 pt-8 pb-4">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md mb-4"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h1 className="text-xl text-gray-900 mb-2">{question.question}</h1>
            {question.type === 'multiple' && (
              <p className="text-sm text-gray-600">Selecione todas que se aplicam</p>
            )}
          </div>

          {/* Options */}
          <div className="flex-1 overflow-y-auto px-5 pb-6">
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                    isSelected(option.value)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{option.label}</span>
                    {isSelected(option.value) && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 pb-8 pt-4 bg-white/80 backdrop-blur-lg border-t border-gray-200">
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                canProceed
                  ? 'bg-emerald-600 text-white shadow-lg active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'Ver recomendações' : 'Próxima'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
