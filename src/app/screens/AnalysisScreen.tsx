import { MobileFrame } from '../components/MobileFrame';
import { EnergyChart } from '../components/EnergyChart';
import { TemperatureReductionCard } from '../components/TemperatureReductionCard';
import { IndicatorsGrid } from '../components/IndicatorsGrid';
import { PlantHealthSection } from '../components/PlantHealthSection';
import { motion } from 'framer-motion';

export function AnalysisScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-8">
      <MobileFrame>
        <div className="relative h-full w-full overflow-hidden bg-[#060D0A]">
          <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-emerald-900/30 via-emerald-900/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-5 pb-28 pt-8 space-y-6"
            >
              <motion.div variants={itemVariants}>
                <h1 className="text-2xl font-light text-white mb-1">Análise</h1>
                <p className="text-sm text-zinc-400">Desempenho e impacto das suas plantas</p>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <EnergyChart />
              </motion.div>

              <motion.div variants={itemVariants}>
                <TemperatureReductionCard />
              </motion.div>

              <motion.div variants={itemVariants}>
                <IndicatorsGrid />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PlantHealthSection />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}