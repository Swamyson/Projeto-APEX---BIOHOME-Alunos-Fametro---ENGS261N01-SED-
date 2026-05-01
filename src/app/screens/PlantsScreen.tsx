import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { allPlants } from '../data/plants';
import { ArrowLeft, ChevronRight, Droplets, Sun, Thermometer, Wind } from 'lucide-react';

export function PlantsScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <MobileFrame>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="px-5 pb-24">
            <div className="pt-8 pb-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md mb-4"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>

              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 text-white mb-4">
                <h1 className="text-2xl font-semibold mb-2">Plantas</h1>
                <p className="text-sm opacity-90">
                  Veja todas as plantas do aplicativo com suas especificações completas.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {allPlants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => navigate(`/plant/${plant.id}`, { state: { roomId: 'geral' } })}
                  className="w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-left"
                >
                  <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold text-gray-900">{plant.name}</h2>
                        <p className="text-xs text-gray-500 italic mt-1">{plant.scientificName}</p>
                        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                          {plant.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end text-emerald-600">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-4">
                    <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                      <div className="rounded-2xl bg-white p-3 border border-gray-100">
                        <div className="font-medium text-gray-900">Dificuldade</div>
                        <div>{plant.difficulty}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 border border-gray-100">
                        <div className="font-medium text-gray-900">Purificação</div>
                        <div>{plant.purification}%</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 border border-gray-100">
                        <div className="font-medium text-gray-900">Temperatura</div>
                        <div>{plant.temperatureEffect}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 border border-gray-100">
                        <div className="font-medium text-gray-900">Umidade</div>
                        <div>{plant.humidityLevel}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-gray-600">
                      <div className="rounded-2xl bg-white p-3 border border-gray-100 flex items-start gap-2">
                        <Droplets className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Rega</div>
                          <div>{plant.care.water}</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 border border-gray-100 flex items-start gap-2">
                        <Sun className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Luz</div>
                          <div>{plant.care.light}</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 border border-gray-100 flex items-start gap-2">
                        <Thermometer className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Temperatura</div>
                          <div>{plant.care.temperature}</div>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-white p-3 border border-gray-100 flex items-start gap-2">
                        <Wind className="w-4 h-4 text-cyan-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900">Umidade</div>
                          <div>{plant.care.humidity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
