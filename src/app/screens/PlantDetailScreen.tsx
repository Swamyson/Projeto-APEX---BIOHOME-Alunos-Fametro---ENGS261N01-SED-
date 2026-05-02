import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { ArrowLeft, Droplets, Sun, Thermometer, Wind, Sparkles, Image as ImageIcon, Bell, CheckCircle2, Heart, Users, ChevronRight } from 'lucide-react';
import { allPlants, getSimilarPlants } from '../data/plants';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import * as Dialog from '@radix-ui/react-dialog';

export function PlantDetailScreen() {
  const navigate = useNavigate();
  const { plantId } = useParams();
  const location = useLocation();
  const roomId = location.state?.roomId || 'geral';

  const plant = allPlants.find(p => p.id === plantId);

  // Reminder State
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

    // Save to recently viewed
    if (plantId) {
      const viewed = localStorage.getItem('recently_viewed_plants');
      let viewedPlants = viewed ? JSON.parse(viewed) : [];
      viewedPlants = viewedPlants.filter((id: string) => id !== plantId);
      viewedPlants.unshift(plantId);
      viewedPlants = viewedPlants.slice(0, 5); // Keep only last 5
      localStorage.setItem('recently_viewed_plants', JSON.stringify(viewedPlants));
    }

    // Get similar plants
    if (plantId) {
      const similar = getSimilarPlants(plantId, 3);
      setSimilarPlants(similar);
    }
  }, [plantId, roomId]);

  if (!plant) {
    return <div>Planta não encontrada</div>;
  }

  const toggleReminder = () => {
    const saved = localStorage.getItem('plant_reminders');
    let reminders = saved ? JSON.parse(saved) : [];
    
    if (reminderActive) {
      reminders = reminders.filter((r: any) => !(r.plantId === plantId && r.roomId === roomId));
      setReminderActive(false);
    } else {
      reminders.push({
        id: Math.random().toString(36).substr(2, 9),
        plantId,
        roomId,
        frequency,
        nextWatering: new Date(Date.now() + frequency * 24 * 60 * 60 * 1000).toISOString(),
      });
      setReminderActive(true);
    }
    localStorage.setItem('plant_reminders', JSON.stringify(reminders));
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFreq = parseInt(e.target.value);
    setFrequency(newFreq);
    
    // update existing if active
    if (reminderActive) {
      const saved = localStorage.getItem('plant_reminders');
      if (saved) {
        const reminders = JSON.parse(saved);
        const updated = reminders.map((r: any) => {
          if (r.plantId === plantId && r.roomId === roomId) {
            return {
              ...r,
              frequency: newFreq,
              nextWatering: new Date(Date.now() + newFreq * 24 * 60 * 60 * 1000).toISOString(),
            };
          }
          return r;
        });
        localStorage.setItem('plant_reminders', JSON.stringify(updated));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <MobileFrame>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative">
          {/* Hero Image */}
          <div className="relative h-64">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={() => navigate(-1)}
              className="absolute top-6 left-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>
            <div className="absolute bottom-6 left-5 right-5 text-white">
              <h1 className="text-2xl mb-1">{plant.name}</h1>
              <p className="text-sm opacity-90 italic">{plant.scientificName}</p>
            </div>
          </div>

          <div className="px-5 pb-24">
            {/* Description */}
            <div className="bg-white rounded-3xl p-5 -mt-6 shadow-xl mb-4 relative z-10">
              <p className="text-sm text-gray-700 leading-relaxed">{plant.description}</p>
            </div>

            {/* Reminder Section (Interactive) */}
            <div className="mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 text-white shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-white" />
                    <h2 className="text-base font-medium">Lembrete de Rega</h2>
                  </div>
                  <button
                    onClick={toggleReminder}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${reminderActive ? 'bg-white' : 'bg-white/30'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-emerald-500 transition-transform ${reminderActive ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
                
                {reminderActive ? (
                  <div className="bg-white/20 rounded-2xl p-3 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Frequência:</span>
                      <select 
                        value={frequency}
                        onChange={handleFrequencyChange}
                        className="bg-white text-emerald-700 text-sm rounded-lg px-2 py-1 outline-none font-medium"
                      >
                        <option value={2}>A cada 2 dias</option>
                        <option value={3}>A cada 3 dias</option>
                        <option value={7}>Semanalmente</option>
                        <option value={10}>A cada 10 dias</option>
                        <option value={15}>A cada 15 dias</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/90 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Lembrete ativo para o ambiente: <strong className="capitalize">{roomId}</strong>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-white/80">
                    Ative para receber lembretes de rega para esta planta.
                  </p>
                )}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h2 className="text-base text-gray-900 mb-3">Benefícios</h2>
              <div className="space-y-2">
                {plant.benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-50">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-5 h-5 ${benefit.color}`} />
                      </div>
                      <p className="text-sm text-gray-700">{benefit.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Care Guide */}
            <div className="mb-4">
              <h2 className="text-base text-gray-900 mb-3">Cuidados</h2>
              <div className="bg-white rounded-3xl p-5 space-y-4 shadow-sm border border-gray-50">
                <div className="flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Rega Recomendada</p>
                    <p className="text-xs text-gray-600">{plant.care.water}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Iluminação</p>
                    <p className="text-xs text-gray-600">{plant.care.light}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Thermometer className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Temperatura ideal</p>
                    <p className="text-xs text-gray-600">{plant.care.temperature}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wind className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-900">Umidade</p>
                    <p className="text-xs text-gray-600">{plant.care.humidity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Plants Recommendations */}
            {similarPlants.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <h2 className="text-base text-gray-900">Plantas similares</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {similarPlants.map((similarPlant) => (
                    <button
                      key={similarPlant.id}
                      onClick={() => navigate(`/plant/${similarPlant.id}`, { state: { roomId } })}
                      className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-50 hover:shadow-md transition-all active:scale-[0.98] text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={similarPlant.image}
                            alt={similarPlant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{similarPlant.name}</h3>
                          <p className="text-xs text-gray-500 italic truncate">{similarPlant.scientificName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              similarPlant.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                              similarPlant.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {similarPlant.difficulty}
                            </span>
                            <span className="text-xs text-emerald-600 font-medium">
                              {similarPlant.purification}% purificação
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Layout Suggestions & Community */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-gray-900" />
                  <h2 className="text-base text-gray-900">Sugestões de Layout</h2>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {(plant.layouts || [
                  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
                  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
                  'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
                ]).map((layout, index) => (
                  <div key={index} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                    <img
                      src={layout}
                      alt={`Layout ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setGalleryOpen(true)}
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-colors border border-emerald-200 shadow-sm active:scale-95"
              >
                <Users className="w-4 h-4" />
                Ver Galeria da Comunidade
              </button>
            </div>

          {/* Community Gallery Dialog */}
          <Dialog.Root open={galleryOpen} onOpenChange={setGalleryOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
              <Dialog.Content className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl h-[85vh] z-50 flex flex-col focus:outline-none overflow-hidden max-w-[400px] mx-auto shadow-2xl">
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                  <div>
                    <Dialog.Title className="text-lg font-medium text-gray-900">Galeria da Comunidade</Dialog.Title>
                    <Dialog.Description className="text-xs text-gray-500">
                      Como outros cuidadores arranjaram a {plant.name}
                    </Dialog.Description>
                  </div>
                  <button onClick={() => setGalleryOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <ResponsiveMasonry columnsCountBreakPoints={{300: 2, 500: 2}}>
                    <Masonry gutter="12px">
                      {[
                        'https://images.unsplash.com/photo-1545241047-6083a36ee159?w=400&q=80',
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
                        'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400&q=80',
                        'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?w=400&q=80',
                        'https://images.unsplash.com/photo-1416879573089-0f23d069c9b4?w=400&q=80',
                        'https://images.unsplash.com/photo-1524423812865-dcda6d71b409?w=400&q=80',
                      ].map((img, i) => (
                        <div key={i} className="relative group rounded-xl overflow-hidden shadow-sm">
                          <img
                            src={img}
                            alt={`Community plant ${i}`}
                            className="w-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6 flex justify-between items-end opacity-100">
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-emerald-500 border border-white" />
                              <span className="text-white text-[10px]">User{i+1}</span>
                            </div>
                            <button className="text-white hover:text-red-400">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </Masonry>
                  </ResponsiveMasonry>
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-white">
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl py-3 text-sm font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Compartilhar meu arranjo
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      </MobileFrame>
    </div>
  );
}
