import { useNavigate } from 'react-router';
import { Leaf, Sprout, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MobileFrame } from '../components/MobileFrame';
import logo from '@/assets/logo.jpeg';

export function WelcomeScreen() {
  const navigate = useNavigate();

  // Curva de animação de alto nível (Ease Out suave)
  const customEase = [0.16, 1, 0.3, 1];

  // Variantes para animação em cascata (Stagger)
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
      <MobileFrame hideNavigation>
        <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#060D0A] flex flex-col justify-between [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Abstract Ambient Background - Agora com animação de "respiração" */}
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

          {/* Orquestrador Único para Animação em Cascata Perfeita */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex-1 flex flex-col justify-between"
          >
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-4">
            
            {/* Header Section */}
            <div className="w-full flex flex-col items-center mt-2">
              <motion.div variants={itemVariants} className="relative mb-6 group">
                {/* Glowing aura behind logo */}
                <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full scale-110 transition-all duration-700 group-hover:scale-125 group-hover:bg-emerald-400/30" />
                
                {/* Logo Container */}
                <div className="relative w-44 h-44 bg-zinc-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10 flex items-center justify-center transform transition-all duration-500 group-hover:-translate-y-2 group-hover:ring-white/20 overflow-hidden">
                  <img src={logo} alt="APEX BIOHOME Logo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="text-[2.25rem] font-light tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2 text-center leading-tight">
                APEX BIOHOME
              </motion.h1>
              <motion.p variants={itemVariants} className="text-emerald-400 font-medium tracking-[0.2em] text-xs mb-4 uppercase">
                Sustentabilidade em casa
              </motion.p>
              <motion.p variants={itemVariants} className="text-zinc-400 text-sm max-w-[280px] text-center leading-relaxed font-light">
                Transforme seu ambiente com plantas inteligentes
              </motion.p>
            </div>
            </div>

          {/* Features & CTA Section */}
            <div className="relative z-50 w-full px-6 pb-8 pointer-events-auto">
            <div className="space-y-3 mb-8">
              <motion.div variants={itemVariants} className="group flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.08] hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors shadow-inner">
                  <Leaf className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                </div>
                <p className="text-zinc-300 text-sm font-medium tracking-wide">Plantas ideais para cada ambiente</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="group flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.08] hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors shadow-inner">
                  <Sprout className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                </div>
                <p className="text-zinc-300 text-sm font-medium tracking-wide">Reduza temperatura e purifique o ar</p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="group flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.08] hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors shadow-inner">
                  <Heart className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                </div>
                <p className="text-zinc-300 text-sm font-medium tracking-wide">Bem-estar e sustentabilidade</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
              className="group relative z-50 w-full overflow-hidden rounded-full bg-emerald-500 text-zinc-950 font-semibold text-base py-4 flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(16,185,129,0.2)] hover:shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-shadow duration-300 cursor-pointer"
            >
              <span>Começar agora</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            </div>
          </motion.div>
        </div>
      </MobileFrame>
    </div>
  );
}
