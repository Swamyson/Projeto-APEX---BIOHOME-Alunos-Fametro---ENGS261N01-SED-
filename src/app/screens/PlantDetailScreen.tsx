import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { ArrowLeft, Droplets, Sun, Thermometer, Wind, Sparkles, Image as ImageIcon, Bell, CheckCircle2, Heart, Users, ChevronRight } from 'lucide-react';
import { allPlants, getSimilarPlants } from '../data/plants';
import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import * as Dialog from '@radix-ui/react-dialog';

export function PlantDetailScreen() {
  const navigate = useNavigate();
  const { plantId } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId || 'geral';

  const plant = allPlants.find(p => p.id === plantId);

  const [reminderActive, setReminderActive] = useState(false);
  const [frequency, setFrequency] = useState(7);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [similarPlants, setSimilarPlants] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('plant_reminders');
    if (saved) {
      const reminders = JSON.parse(saved);
      const existing = reminders.find((r: any) => r.plantId === plantId && r.roomId === roomId);
      if (existing) {
        setReminderActive(true);
        setFrequency(existing.frequency || 7);
      }
    }
    if (plantId) {
      const viewed = localStorage.getItem('recently_viewed_plants');
      let viewedPlants = viewed ? JSON.parse(viewed) : [];
      viewedPlants = viewedPlants.filter((id: string) => id !== plantId);
      viewedPlants.unshift(plantId);
      viewedPlants = viewedPlants.slice(0, 5);
      localStorage.setItem('recently_viewed_plants', JSON.stringify(viewedPlants));
      const similar = getSimilarPlants(plantId, 3);
      setSimilarPlants(similar);
    }
  }, [plantId, roomId]);

  if (!plant) return <div className="bg-[#060D0A] text-white flex items-center justify-center h-full">Planta não encontrada</div>;

  const toggleReminder = () => {
    const saved = localStorage.getItem('plant_reminders');
    let reminders = saved ? JSON.parse(saved) : [];
    if (reminderActive) {
      reminders = reminders.filter((r: any) => !(r.plantId === plantId && r.roomId === roomId));
      setReminderActive(false);
    } else {
      reminders.push({
        id: Math.random().toString(36).substr(2, 9),
        plantId, roomId, frequency,
        nextWatering: new Date(Date.now() + frequency * 24 * 60 * 60 * 1000).toISOString(),
      });
      setReminderActive(true);
    }
    localStorage.setItem('plant_reminders', JSON.stringify(reminders));
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFreq = parseInt(e.target.value);
    setFrequency(newFreq);
    if (reminderActive) {
      const saved = localStorage.getItem('plant_reminders');
      if (saved) {
        const reminders = JSON.parse(saved);
        const updated = reminders.map((r: any) => {
          if (r.plantId === plantId && r.roomId === roomId) {
            return { ...r, frequency: newFreq, nextWatering: new Date(Date.now() + newFreq * 24 * 60 * 60 * 1000).toISOString() };
          }
          return r;
        });
        localStorage.setItem('plant_reminders', JSON.stringify(updated));
      }
    }
  };

  const customEase = [0.16, 1, 0.3, 1];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: customEase } },
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

          {/* Ambient orbs (behind hero) */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-600 rounded-full blur-[100px] pointer-events-none z-0"
          />

          <div className="relative z-10 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Hero Image */}
            <div className="relative h-64 flex-shrink-0">
              <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060D0A] via-black/30 to-transparent" />
              <button
                onClick={() => navigate(-1)}
                className="absolute top-6 left-5 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="absolute bottom-6 left-5 right-5">
                <h1 className="text-2xl font-light text-white mb-1">{plant.name}</h1>
                <p className="text-sm text-zinc-400 italic">{plant.scientificName}</p>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="px-5 pb-28"
            >
              {/* Description */}
              <motion.div
                variants={itemVariants}
                className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-5 -mt-4 relative z-10 mb-4"
              >
                <p className="text-sm text-zinc-400 leading-relaxed">{plant.description}</p>
              </motion.div>

              {/* Reminder */}
              <motion.div variants={itemVariants} className="mb-4">
                <div className="relative overflow-hidden rounded-3xl p-5 border border-emerald-500/20 bg-emerald-500/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 pointer-events-none" />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                        <h2 className="text-base font-medium text-white">Lembrete de Rega</h2>
                      </div>
                      <button
                        onClick={toggleReminder}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border ${
                          reminderActive
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'bg-white/[0.08] border-white/[0.1]'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full transition-transform ${reminderActive ? 'translate-x-6 bg-white' : 'translate-x-1 bg-zinc-500'}`} />
                      </button>
                    </div>

                    {reminderActive ? (
                      <div className="bg-black/20 border border-white/[0.06] rounded-2xl p-3 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-zinc-300">Frequência:</span>
                          <select
                            value={frequency}
                            onChange={handleFrequencyChange}
                            className="bg-zinc-900 border border-white/[0.1] text-emerald-400 text-sm rounded-lg px-2 py-1 outline-none font-medium"
                          >
                            <option value={2}>A cada 2 dias</option>
                            <option value={3}>A cada 3 dias</option>
                            <option value={7}>Semanalmente</option>
                            <option value={10}>A cada 10 dias</option>
                            <option value={15}>A cada 15 dias</option>
                            <option value={20}>A cada 20 dias</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Lembrete ativo para o ambiente: <strong className="text-emerald-400 capitalize">{roomId}</strong>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500">Ative para receber lembretes de rega para esta planta.</p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div variants={itemVariants} className="mb-4">
                <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Benefícios</h2>
                <div className="space-y-2">
                  {plant.benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                          <Icon className={`w-5 h-5 ${benefit.color}`} />
                        </div>
                        <p className="text-sm text-zinc-400">{benefit.text}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Care Guide */}
              <motion.div variants={itemVariants} className="mb-4">
                <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">Cuidados</h2>
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-3xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <Droplets className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm text-zinc-200">Rega Recomendada</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{plant.care.water}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sun className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm text-zinc-200">Iluminação</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{plant.care.light}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Thermometer className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm text-zinc-200">Temperatura ideal</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{plant.care.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wind className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm text-zinc-200">Umidade</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{plant.care.humidity}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Similar Plants */}
              {similarPlants.length > 0 && (
                <motion.div variants={itemVariants} className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
                    <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">Plantas similares</h2>
                  </div>
                  <div className="space-y-3">
                    {similarPlants.map((similarPlant) => (
                      <button
                        key={similarPlant.id}
                        onClick={() => navigate(`/plant/${similarPlant.id}`, { state: { roomId } })}
                        className="w-full bg-white/[0.03] border border-white/[0.05] hover:border-emerald-500/30 hover:bg-white/[0.05] rounded-2xl p-4 transition-all active:scale-[0.98] text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                            <img src={similarPlant.image} alt={similarPlant.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-white truncate">{similarPlant.name}</h3>
                            <p className="text-xs text-zinc-500 italic truncate">{similarPlant.scientificName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyStyle(similarPlant.difficulty)}`}>
                                {similarPlant.difficulty}
                              </span>
                              <span className="text-xs text-emerald-400 font-medium">{similarPlant.purification}% purificação</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
