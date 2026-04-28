import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { Sofa, Bed, UtensilsCrossed, Bath, Briefcase, Users, Coffee, DoorOpen, Leaf, Droplets, Clock, ChevronRight } from 'lucide-react';
import { allPlants } from '../data/plants';

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
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  const casaRooms: Room[] = [
    { id: 'sala', name: 'Sala de Estar', icon: Sofa, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'quarto', name: 'Quarto', icon: Bed, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'cozinha', name: 'Cozinha', icon: UtensilsCrossed, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'banheiro', name: 'Banheiro', icon: Bath, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  ];

  const empresaRooms: Room[] = [
    { id: 'escritorio', name: 'Escritório', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'recepcao', name: 'Recepção', icon: DoorOpen, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { id: 'reuniao', name: 'Sala de Reunião', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'copa', name: 'Copa', icon: Coffee, color: 'text-amber-600', bgColor: 'bg-amber-50' },
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
        return {
          ...r,
          nextWatering: new Date(Date.now() + r.frequency * 24 * 60 * 60 * 1000).toISOString()
        };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <MobileFrame>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="px-5 pb-24">
            {/* Header */}
            <div className="pt-8 pb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-gray-600">Olá,</p>
                  <h1 className="text-2xl text-gray-900">{userName}</h1>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Selecione um ambiente para começar
              </p>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 mb-6 shadow-lg">
              <div className="flex items-center justify-between text-white mb-3">
                <span className="text-sm opacity-90">Progresso Geral</span>
                <span className="text-2xl">
                  {reminders.length > 0 ? 'Ativo' : '0%'}
                </span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000" 
                  style={{ width: reminders.length > 0 ? '100%' : '0%' }} 
                />
              </div>
              <p className="text-xs text-white/80 mt-2">
                {reminders.length > 0 
                  ? `Você tem ${reminders.length} planta(s) em monitoramento`
                  : 'Comece avaliando seus ambientes'
                }
              </p>
            </div>

            {/* Watering Reminders Section */}
            {reminders.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    Lembretes de Rega
                  </h2>
                  <span className="text-xs text-emerald-600 cursor-pointer">Ver todas</span>
                </div>
                <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 snap-x hide-scrollbar">
                  {reminders.map((reminder) => {
                    const plant = allPlants.find(p => p.id === reminder.plantId);
                    if (!plant) return null;
                    
                    const timeStatus = getDaysUntilWatering(reminder.nextWatering);
                    const isUrgent = timeStatus === 'Hoje' || timeStatus === 'Atrasado';

                    return (
                      <div 
                        key={reminder.id} 
                        onClick={() => navigate(`/plant/${reminder.plantId}`, { state: { roomId: reminder.roomId } })}
                        className="min-w-[240px] bg-white rounded-3xl p-4 shadow-md snap-start border border-gray-50 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        <div className="flex gap-3 mb-3">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 truncate max-w-[140px]">{plant.name}</h3>
                            <p className="text-xs text-gray-500 capitalize flex items-center gap-1 mt-0.5">
                              <Sofa className="w-3 h-3" />
                              {getRoomName(reminder.roomId)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isUrgent ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            <Clock className="w-3 h-3" />
                            {timeStatus}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWaterPlant(reminder.id);
                            }}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors active:scale-95 shadow-sm"
                          >
                            <Droplets className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rooms Grid */}
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Ambientes</h2>
              <div className="grid grid-cols-2 gap-3">
                {rooms.map((room) => {
                  const Icon = room.icon;
                  // Contar quantas plantas salvas neste cômodo
                  const roomPlantsCount = reminders.filter(r => r.roomId === room.id).length;

                  return (
                    <button
                      key={room.id}
                      onClick={() => navigate(`/questionnaire/${room.id}`)}
                      className="bg-white rounded-3xl p-5 shadow-md hover:shadow-lg transition-all active:scale-95 border-2 border-transparent hover:border-emerald-100 flex flex-col relative"
                    >
                      {roomPlantsCount > 0 && (
                        <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {roomPlantsCount} planta{roomPlantsCount > 1 ? 's' : ''}
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-2xl ${room.bgColor} flex items-center justify-center mb-3`}>
                        <Icon className={`w-6 h-6 ${room.color}`} />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 text-left">{room.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 text-left flex items-center gap-1">
                        Avaliar novo <ChevronRight className="w-3 h-3" />
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 border border-emerald-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Dica sustentável</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Plantas purificam o ar e reduzem a temperatura ambiente em até 6°C, diminuindo a necessidade de usar o ar-condicionado com frequência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MobileFrame>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
