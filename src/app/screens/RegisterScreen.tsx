import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Home, Building2, ArrowRight, User } from 'lucide-react';
import { MobileFrame } from '../components/MobileFrame';
import { motion } from 'framer-motion';

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

  const customEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } },
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <MobileFrame hideNavigation>
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#060D0A] flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Ambient Background */}
          <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-emerald-900/40 via-emerald-900/5 to-transparent pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-600 rounded-full blur-[100px] pointer-events-none"
          />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-emerald-950/70 blur-[80px] pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 px-6 py-10 flex flex-col flex-1"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <User className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
                Bem-vindo!
              </h1>
              <p className="text-zinc-500 text-sm">Vamos personalizar sua experiência</p>
            </motion.div>

            {/* Name Input */}
            <motion.div variants={itemVariants} className="mb-6">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-2">
                Seu nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:bg-white/[0.06] transition-all text-sm"
              />
            </motion.div>

            {/* Type Selection */}
            <motion.div variants={itemVariants} className="mb-8">
              <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">
                Onde você vai usar o app?
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setType('casa')}
                  className={`w-full p-4 rounded-2xl border transition-all text-left ${
                    type === 'casa'
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors ${
                      type === 'casa'
                        ? 'bg-emerald-500/20 border-emerald-500/30'
                        : 'bg-white/[0.04] border-white/[0.06]'
                    }`}>
                      <Home className={`w-6 h-6 ${type === 'casa' ? 'text-emerald-400' : 'text-zinc-500'}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${type === 'casa' ? 'text-white' : 'text-zinc-300'}`}>Casa</p>
                      <p className="text-xs text-zinc-600 mt-0.5">Sala, quarto, cozinha...</p>
                    </div>
                    {type === 'casa' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setType('empresa')}
                  className={`w-full p-4 rounded-2xl border transition-all text-left ${
                    type === 'empresa'
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors ${
                      type === 'empresa'
                        ? 'bg-emerald-500/20 border-emerald-500/30'
                        : 'bg-white/[0.04] border-white/[0.06]'
                    }`}>
                      <Building2 className={`w-6 h-6 ${type === 'empresa' ? 'text-emerald-400' : 'text-zinc-500'}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${type === 'empresa' ? 'text-white' : 'text-zinc-300'}`}>Empresa</p>
                      <p className="text-xs text-zinc-600 mt-0.5">Escritório, recepção, sala de reunião...</p>
                    </div>
                    {type === 'empresa' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Continue Button */}
            <motion.button
              variants={itemVariants}
              whileHover={name && type ? { scale: 1.02 } : {}}
              whileTap={name && type ? { scale: 0.97 } : {}}
              onClick={handleContinue}
              disabled={!name || !type}
              className={`w-full py-4 rounded-full flex items-center justify-center gap-2 font-semibold text-base transition-all ${
                name && type
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_10px_40px_rgba(16,185,129,0.25)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)] cursor-pointer'
                  : 'bg-white/[0.04] text-zinc-600 border border-white/[0.06] cursor-not-allowed'
              }`}
            >
              <span>Continuar</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </MobileFrame>
    </div>
  );
}
