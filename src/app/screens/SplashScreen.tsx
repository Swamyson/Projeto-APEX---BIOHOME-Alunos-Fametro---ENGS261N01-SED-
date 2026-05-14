import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { mFrame } from '../components/mFrame';
import logo from '@/assets/logo.jpeg';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Curva de animação de alto nível (Ease Out suave) idêntica à WelcomeScreen
  const customEase = [0.16, 1, 0.3, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: customEase },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <mFrame hideNavigation>
        <div className="relative h-full w-full overflow-hidden bg-[#060D0A] flex flex-col justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Abstract Ambient Background - Idêntico à WelcomeScreen */}
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-emerald-900/40 via-emerald-900/5 to-transparent pointer-events-none" />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-600 rounded-full blur-[120px] pointer-events-none" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-600 rounded-full blur-[100px] pointer-events-none" 
          />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-emerald-950/70 blur-[80px] pointer-events-none" />

          {/* Orquestrador Único para Animação em Cascata */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center px-6"
          >
            <motion.div variants={itemVariants} className="relative mb-6 group">
              <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full scale-110 transition-all duration-700" />
              <div className="relative w-44 h-44 bg-zinc-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex items-center justify-center transform overflow-hidden">
                <img src={logo} alt="APEX BIOHOME Logo" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-[2.25rem] font-light tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2 text-center leading-tight">
              APEX BIOHOME
            </motion.h1>
            <motion.p variants={itemVariants} className="text-emerald-400 font-medium tracking-[0.2em] text-xs mb-8 uppercase">
              Sustentabilidade em casa
            </motion.p>

            {/* Loading Indicator adaptado ao tema escuro */}
            <motion.div variants={itemVariants} className="flex gap-2">
              <div className="w-2 h-2 bg-emerald-500/80 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-emerald-500/80 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-emerald-500/80 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </motion.div>
          </motion.div>
          
        </div>
      </mFrame>
    </div>
  );
}
