import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Home, Building2, ArrowRight, User } from 'lucide-react';
import { MobileFrame } from '../components/MobileFrame';

export function RegisterScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState<'casa' | 'empresa' | null>(null);

  const handleContinue = () => {
    if (name && type) {
      localStorage.setItem('userName', name);
      localStorage.setItem('userType', type);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <MobileFrame hideNavigation>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl text-gray-900 mb-2">Bem-vindo!</h1>
              <p className="text-gray-600 text-sm">Vamos personalizar sua experiência</p>
            </div>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">Seu nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Type Selection */}
            <div className="mb-8">
              <label className="block text-sm text-gray-700 mb-3">Onde você vai usar o app?</label>
              <div className="space-y-3">
                <button
                  onClick={() => setType('casa')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    type === 'casa'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      type === 'casa' ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <Home className={`w-6 h-6 ${type === 'casa' ? 'text-emerald-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gray-900">Casa</p>
                      <p className="text-xs text-gray-500">Sala, quarto, cozinha...</p>
                    </div>
                    {type === 'casa' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setType('empresa')}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    type === 'empresa'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      type === 'empresa' ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      <Building2 className={`w-6 h-6 ${type === 'empresa' ? 'text-emerald-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-gray-900">Empresa</p>
                      <p className="text-xs text-gray-500">Escritório, recepção, sala de reunião...</p>
                    </div>
                    {type === 'empresa' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!name || !type}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                name && type
                  ? 'bg-emerald-600 text-white shadow-lg active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
