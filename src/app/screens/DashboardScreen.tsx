import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { Sofa, Bed, UtensilsCrossed, Bath, Briefcase, Users, Coffee, DoorOpen, Leaf, Droplets, Clock, ChevronRight, Settings, User, Bell, LogOut, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { allPlants } from '../data/plants';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

interface Room {
  id: string;
  name: string;
  icon: typeof Sofa;
  color: string;
  bgColor: string;
  completed?: boolean;
}

export function DashboardScreen() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState<'casa' | 'empresa'>('casa');
  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const type = localStorage.getItem('userType') as 'casa' | 'empresa';
    if (name) setUserName(name);
    if (type) setUserType(type);

    const saved = localStorage.getItem('plant_reminders');
    if (saved) setReminders(JSON.parse(saved));
  }, []);

  const casaRooms: Room[] = [
    { id: 'sala', name: 'Sala de Estar', icon: Sofa, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'quarto', name: 'Quarto', icon: Bed, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { id: 'cozinha', name: 'Cozinha', icon: UtensilsCrossed, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { id: 'banheiro', name: 'Banheiro', icon: Bath, color: 'text-teal-400', bgColor: 'bg-teal-500/10' },
  ];

  const empresaRooms: Room[] = [
    { id: 'escritorio', name: 'Escritório', icon: Briefcase, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { id: 'recepcao', name: 'Recepção', icon: DoorOpen, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { id: 'reuniao', name: 'Sala de Reunião', icon: Users, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { id: 'copa', name: 'Copa', icon: Coffee, color: 'text-amber-400', bgColor: 'bg-amber-500/10' },
  ];

  const rooms = userType === 'casa' ? casaRooms : empresaRooms;

  const getRoomName = (roomId: string) => {
    const all = [...casaRooms, ...empresaRooms];
    const found = all.find(r => r.id === roomId);
    return found ? found.name : roomId;
  };

  const handleWaterPlant = (reminderId: string) => {
    const updated = reminders.map(r => {
      if (r.id === reminderId) {
        return { ...r, nextWatering: new Date(Date.now() + r.frequency * 24 * 60 * 60 * 1000).toISOString() };
      }
      return r;
    });
    setReminders(updated);
    localStorage.setItem('plant_reminders', JSON.stringify(updated));
  };

  const getDaysUntilWatering = (isoDate: string) => {
    const diff = new Date(isoDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Atrasado';
    if (days === 0) return 'Hoje';
    if (days === 1) return 'Amanhã';
    return `Em ${days} dias`;
  };

  const customEase = [0.16, 1, 0.3, 1];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: customEase } },
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
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute top-1/2 -left-20 w-64 h-64 bg-teal-600 rounded-full blur-[90px] pointer-events-none"
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
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest">Olá,</p>
                    <h1 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                      {userName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="outline-none">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] transition-colors cursor-pointer text-zinc-400">
                            <Settings className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-zinc-100" align="end">
                        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Notificações</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Privacidade</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-zinc-800" />
                        <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer" onClick={() => {
                          localStorage.removeItem('userName');
                          localStorage.removeItem('userType');
                          navigate('/');
                        }}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sair</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                      <Leaf className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 mt-1">Selecione um ambiente para começar</p>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl p-5 mb-6 border border-emerald-500/20 bg-emerald-500/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 pointer-events-none" />
                <div className="relative flex items-center justify-between text-white mb-3">
                  <span className="text-sm text-zinc-400">Progresso Geral</span>
                  <span className="text-2xl font-light text-emerald-400">
                    {reminders.length > 0 ? 'Ativo' : '0%'}
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: reminders.length > 0 ? '100%' : '0%' }}
                    transition={{ duration: 1.2, ease: customEase }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  />
                </div>
                <p className="text-xs text-zinc-500">
                  {reminders.length > 0
                    ? `Você tem ${reminders.length} planta(s) em monitoramento`
                    : 'Comece avaliando seus ambientes'}
                </p>
              </motion.div>

              {/* Watering Reminders */}
              {reminders.length > 0 && (
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <Droplets className="w-3.5 h-3.5 text-blue-400" />
                      Lembrete de Regar
                    </h2>
                    <span className="text-xs text-emerald-400 cursor-pointer">Ver todas</span>
                  </div>
                  <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {reminders.map((reminder) => {
                      const plant = allPlants.find(p => p.id === reminder.plantId);
                      if (!plant) return null;
                      const timeStatus = getDaysUntilWatering(reminder.nextWatering);
                      const isUrgent = timeStatus === 'Hoje' || timeStatus === 'Atrasado';
                      return (
                        <div
                          key={reminder.id}
                          onClick={() => navigate(`/plant/${reminder.plantId}`, { state: { roomId: reminder.roomId } })}
                          className="min-w-[240px] bg-white/[0.03] border border-white/[0.06] rounded-3xl p-4 snap-start flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform hover:bg-white/[0.05]"
                        >
                          <div className="flex gap-3 mb-3">
                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-800 flex-shrink-0">
                              <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-white truncate max-w-[140px]">{plant.name}</h3>
                              <p className="text-xs text-zinc-500 capitalize flex items-center gap-1 mt-0.5">
                                <Sofa className="w-3 h-3" />
                                {getRoomName(reminder.roomId)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${isUrgent ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                              <Clock className="w-3 h-3" />
                              {timeStatus}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleWaterPlant(reminder.id); }}
                              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full w-8 h-8 flex items-center justify-center transition-colors active:scale-95"
                            >
                              <Droplets className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Rooms Grid */}
              <motion.div variants={itemVariants} className="mb-6">
                <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">Ambientes</h2>
                <div className="grid grid-cols-2 gap-3">
                  {rooms.map((room) => {
                    const Icon = room.icon;
                    const roomPlantsCount = reminders.filter(r => r.roomId === room.id).length;
                    return (
                      <motion.button
                        key={room.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate(`/questionnaire/${room.id}`)}
                        className="relative bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] rounded-3xl p-5 flex flex-col transition-all text-left"
                      >
                        {roomPlantsCount > 0 && (
                          <div className="absolute top-3 right-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {roomPlantsCount} planta{roomPlantsCount > 1 ? 's' : ''}
                          </div>
                        )}
                        <div className={`w-12 h-12 rounded-2xl ${room.bgColor} border border-white/[0.06] flex items-center justify-center mb-3`}>
                          <Icon className={`w-6 h-6 ${room.color}`} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-sm font-medium text-zinc-200 text-left">{room.name}</h3>
                        <p className="text-xs text-zinc-600 mt-1 text-left flex items-center gap-1">
                          Avaliar novo <ChevronRight className="w-3 h-3" />
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Tips Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-200 mb-1">Dica sustentável</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Plantas purificam o ar e reduzem a temperatura ambiente em até 6°C, diminuindo a necessidade de usar o ar-condicionado com frequência.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
