import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { ArrowLeft, Wind, Droplets, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';
import { Plant, getRecommendations } from '../data/plants';
import { motion } from 'framer-motion';

export function ResultsScreen() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answers_${roomId}`);
    if (savedAnswers) {
      const answers = JSON.parse(savedAnswers);
      const recommendations = getRecommendations(answers);
      setRecommendedPlants(recommendations);
    }
  }, [roomId]);

  const customEase = [0.16, 1, 0.3, 1];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: customEase } },
  };

  const difficultyStyle = (d: string) => {
    if (d === 'Fácil') return 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400';
    if (d === 'Médio') return 'bg-amber-500/10 border border-amber-500/20 text-amber-400';
    return 'bg-red-500/10 border border-red-500/20 text-red-400';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <MobileFrame>
        <div className="relative h-full w-full overflow-hidden bg-[#060D0A]">

          {/* Ambient Background */}
          <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-emerald-900/30 via-emerald-900/5 to-transparent pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-600 rounded-full blur-[100px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.12, 0.07] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/3 -left-20 w-64 h-64 bg-teal-600 rounded-full blur-[90px] pointer-events-none"
          />

          <div className="relative z-10 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-5 pb-28"
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="pt-8 pb-6">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 hover:bg-white/[0.08] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-zinc-300" />
                </button>

                <div className="relative overflow-hidden rounded-3xl p-5 border border-emerald-500/20 bg-emerald-500/5 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 pointer-events-none" />
                  <h1 className="relative text-lg font-light text-white mb-1">
                    Recomendações para seu ambiente
                  </h1>
                  <p className="relative text-sm text-zinc-400">
                    Selecionamos as melhores plantas baseado nas suas respostas
                  </p>
                </div>
              </motion.div>

              {/* Plants List */}
              <div className="space-y-4 mb-6">
                {recommendedPlants.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="bg-orange-500/10 border border-orange-500/20 rounded-3xl p-5 text-center flex flex-col items-center"
                  >
                    <AlertCircle className="w-8 h-8 text-orange-400 mb-2" />
                    <h3 className="text-orange-300 font-medium text-sm">Nenhuma planta perfeita encontrada</h3>
                    <p className="text-xs text-orange-400/70 mt-1">Tente ajustar suas respostas para ver mais opções.</p>
                  </motion.div>
                )}
                {recommendedPlants.map((plant, i) => (
                  <motion.button
                    key={plant.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => navigate(`/plant/${plant.id}`, { state: { roomId } })}
                    className="w-full bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] rounded-3xl overflow-hidden transition-all text-left"
                  >
                    <div className="flex gap-4 p-4">
                      {/* Image */}
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-zinc-800">
                        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="min-w-0 flex-1 pr-2">
                            <h3 className="text-base font-medium text-white truncate">{plant.name}</h3>
                            <p className="text-xs text-zinc-500 italic mt-0.5">{plant.scientificName}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                        </div>

                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs px-2.5 py-1 rounded-full ${difficultyStyle(plant.difficulty)}`}>
                            {plant.difficulty}
                          </span>
                          <span className="text-xs text-emerald-400 font-medium">
                            {plant.temperatureEffect}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Wind className="w-3 h-3 text-blue-400" />
                            <span>{plant.purification}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-cyan-400" />
                            <span>{plant.humidityLevel}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Tips Section */}
              <motion.div
                variants={itemVariants}
                className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-5"
              >

              </motion.div>
            </motion.div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
