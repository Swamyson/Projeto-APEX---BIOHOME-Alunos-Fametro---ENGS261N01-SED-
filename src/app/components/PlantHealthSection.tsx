import { Leaf } from 'lucide-react';

interface PlantHealth {
  name: string;
  scientificName: string;
  health: number;
  status: 'Excelente' | 'Bom' | 'Atenção';
}

const plants: PlantHealth[] = [
  { name: 'Jiboia', scientificName: 'Epipremnum aureum', health: 95, status: 'Excelente' },
  { name: 'Helicônia', scientificName: 'Heliconia spp.', health: 88, status: 'Bom' },
  { name: 'Aspargo', scientificName: 'Asparagus setaceus', health: 92, status: 'Excelente' },
];

export function PlantHealthSection() {
  const getHealthColor = (health: number) => {
    if (health >= 90) return 'from-emerald-500 to-emerald-600';
    if (health >= 75) return 'from-green-500 to-green-600';
    return 'from-yellow-500 to-yellow-600';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Excelente') return 'text-emerald-600 bg-emerald-50';
    if (status === 'Bom') return 'text-green-600 bg-green-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 border border-white/40 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <Leaf className="w-4 h-4 text-emerald-600" />
        <h2 className="text-sm text-gray-800">Saúde das Plantas</h2>
      </div>
      
      <div className="space-y-3">
        {plants.map((plant, index) => (
          <div key={index} className="bg-white/80 rounded-2xl p-3 border border-emerald-100">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm text-gray-900">{plant.name}</h3>
                <p className="text-xs text-gray-500 italic">{plant.scientificName}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(plant.status)}`}>
                {plant.status}
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Saúde</span>
                <span className="text-gray-900">{plant.health}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getHealthColor(plant.health)} rounded-full transition-all duration-700`}
                  style={{ width: `${plant.health}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}