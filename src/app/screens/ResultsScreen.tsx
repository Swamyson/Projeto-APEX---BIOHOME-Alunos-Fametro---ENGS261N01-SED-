import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { ArrowLeft, Wind, Droplets, Sparkles, ChevronRight, AlertCircle } from 'lucide-react';
import { Plant, getRecommendations } from '../data/plants';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <MobileFrame>
        <div className="h-full overflow-y-auto bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="px-5 pb-24">
            {/* Header */}
            <div className="pt-8 pb-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md mb-4"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-5 text-white mb-4">
                <h1 className="text-xl mb-2">Recomendações para seu ambiente</h1>
                <p className="text-sm opacity-90">
                  Selecionamos as melhores plantas baseado nas suas respostas
                </p>
              </div>
            </div>

            {/* Plants List */}
            <div className="space-y-4 mb-6">
              {recommendedPlants.length === 0 && (
                 <div className="bg-orange-50 border border-orange-200 rounded-3xl p-5 text-center flex flex-col items-center">
                   <AlertCircle className="w-8 h-8 text-orange-400 mb-2" />
                   <h3 className="text-orange-800 font-medium">Nenhuma planta perfeita encontrada</h3>
                   <p className="text-sm text-orange-600 mt-1">Tente ajustar suas respostas para ver mais opções.</p>
                 </div>
              )}
              {recommendedPlants.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => navigate(`/plant/${plant.id}`, { state: { roomId } })}
                  className="w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all active:scale-98"
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base text-gray-900">{plant.name}</h3>
                          <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          plant.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                          plant.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {plant.difficulty}
                        </span>
                        <span className="text-xs text-emerald-600 font-medium">
                          {plant.temperatureEffect}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Wind className="w-3 h-3" />
                          <span>{plant.purification}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Droplets className="w-3 h-3" />
                          <span>{plant.humidityLevel}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Tips Section */}
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 border border-emerald-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-900 mb-2">Dica de arranjo</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Para melhor resultado, distribua as plantas em diferentes alturas e próximas às janelas.
                  </p>
                  <button className="text-xs text-emerald-600 font-medium">
                    Ver sugestões de layout →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
