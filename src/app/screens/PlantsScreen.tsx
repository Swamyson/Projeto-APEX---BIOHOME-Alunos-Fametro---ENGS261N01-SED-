import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { allPlants } from '../data/plants';
import { ArrowLeft, ChevronRight, Droplets, Sun, Thermometer, Wind, Star, Search, X } from 'lucide-react';

interface FilterState {
  difficulty: string[];
  light: string[];
  watering: string[];
}

const difficultyMap: Record<string, string[]> = {
  'Fácil': ['Fácil'],
  'Médio': ['Médio'],
  'Difícil': ['Difícil'],
};

const lightMap: Record<string, string[]> = {
  'sol': ['muita'],
  'meia-sombra': ['media'],
  'sombra': ['pouca'],
};

const wateringMap: Record<string, Record<string, boolean>> = {
  'frequente': { '2': true, '3': true, '7': true },
  'moderada': { '7': true, '10': true, '15': true },
  'pouca': { '10': true, '15': true, '20': true },
};

function getWateringFrequency(careWater: string): string {
  if (careWater.includes('2') || careWater.includes('3')) return 'frequente';
  if (careWater.includes('7') || careWater.includes('10')) return 'moderada';
  return 'pouca';
}

export function PlantsScreen() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    light: [],
    watering: [],
  });

  useEffect(() => {
    const saved = localStorage.getItem('plant_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (plantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let newFavorites: string[];
    if (favorites.includes(plantId)) {
      newFavorites = favorites.filter(id => id !== plantId);
    } else {
      newFavorites = [...favorites, plantId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('plant_favorites', JSON.stringify(newFavorites));
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value],
    }));
  };

  const clearFilters = () => {
    setFilters({ difficulty: [], light: [], watering: [] });
    setSearchTerm('');
    setShowFavoritesOnly(false);
  };

  const filteredPlants = useMemo(() => {
    let result = allPlants;

    // Search filter
    if (searchTerm) {
      result = result.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Favorites filter
    if (showFavoritesOnly) {
      result = result.filter(plant => favorites.includes(plant.id));
    }

    // Difficulty filter
    if (filters.difficulty.length > 0) {
      result = result.filter(plant => filters.difficulty.includes(plant.difficulty));
    }

    // Light filter
    if (filters.light.length > 0) {
      result = result.filter(plant =>
        filters.light.some(light => plant.traits.light.includes(lightMap[light]?.[0] as any))
      );
    }

    // Watering filter
    if (filters.watering.length > 0) {
      result = result.filter(plant => {
        const freq = getWateringFrequency(plant.care.water);
        return filters.watering.includes(freq);
      });
    }

    return result;
  }, [searchTerm, showFavoritesOnly, filters, favorites]);

  const hasActiveFilters = searchTerm || showFavoritesOnly || Object.values(filters).some(arr => arr.length > 0);

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
                <h1 className="text-2xl font-semibold mb-2">Plantas</h1>
                <p className="text-sm opacity-90">
                  {filteredPlants.length} planta{filteredPlants.length !== 1 ? 's' : ''} disponível{filteredPlants.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-4 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Buscar por nome ou nome científico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-200 placeholder:text-gray-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Filter Tabs */}
            <div className="mb-4 space-y-3">
              {/* Favorites Toggle */}
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`w-full px-4 py-3 rounded-2xl font-medium text-sm transition-all flex items-center justify-between ${
                  showFavoritesOnly
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Favoritas ({favorites.length})
                </div>
                {showFavoritesOnly && <X className="w-4 h-4" />}
              </button>

              {/* Difficulty Filter */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase">Dificuldade</p>
                <div className="flex gap-2">
                  {Object.keys(difficultyMap).map(diff => (
                    <button
                      key={diff}
                      onClick={() => toggleFilter('difficulty', diff)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        filters.difficulty.includes(diff)
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Light Filter */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase">Luz</p>
                <div className="flex gap-2">
                  {Object.keys(lightMap).map(light => (
                    <button
                      key={light}
                      onClick={() => toggleFilter('light', light)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        filters.light.includes(light)
                          ? 'bg-amber-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      {light === 'sol' ? '☀️ Sol' : light === 'meia-sombra' ? '🌤️ Meia' : '🌑 Sombra'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Watering Filter */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600 uppercase">Rega</p>
                <div className="flex gap-2">
                  {Object.keys(wateringMap).map(watering => (
                    <button
                      key={watering}
                      onClick={() => toggleFilter('watering', watering)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        filters.watering.includes(watering)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {watering === 'frequente' ? '💧 Frequente' : watering === 'moderada' ? '💧 Moderada' : '💧 Pouca'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors"
                >
                  Limpar filtros
                </button>
              )}
            </div>

            {/* Plants List */}
            {filteredPlants.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-500 text-sm">Nenhuma planta encontrada</p>
                <button
                  onClick={clearFilters}
                  className="text-emerald-600 text-xs font-medium mt-2 hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPlants.map((plant) => (
                  <button
                    key={plant.id}
                    onClick={() => navigate(`/plant/${plant.id}`, { state: { roomId: 'geral' } })}
                    className="w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all active:scale-[0.98] text-left group relative"
                  >
                    {/* Favorite Star */}
                    <button
                      onClick={(e) => toggleFavorite(plant.id, e)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          favorites.includes(plant.id)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>

                    <div className="flex flex-col gap-4 p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-lg font-semibold text-gray-900">{plant.name}</h2>
                          <p className="text-xs text-gray-500 italic mt-1">{plant.scientificName}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              plant.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                              plant.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {plant.difficulty}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-1" />
                      </div>
                    </div>

                    {/* Specifications with Visual Indicators */}
                    <div className="border-t border-gray-100 bg-gray-50 px-4 py-4">
                      <div className="space-y-3">
                        {/* Purification */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs">
                              <Wind className="w-4 h-4 text-blue-600" />
                              <span className="font-medium text-gray-700">Purificação</span>
                            </div>
                            <span className="text-xs font-semibold text-blue-600">{plant.purification}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all"
                              style={{ width: `${plant.purification}%` }}
                            />
                          </div>
                        </div>

                        {/* Humidity */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs">
                              <Droplets className="w-4 h-4 text-cyan-600" />
                              <span className="font-medium text-gray-700">Umidade</span>
                            </div>
                            <span className="text-xs font-semibold text-cyan-600">{plant.humidityLevel}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-cyan-500 h-2 rounded-full transition-all"
                              style={{ width: `${plant.humidityLevel}%` }}
                            />
                          </div>
                        </div>

                        {/* Care Requirements */}
                        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-2 text-xs">
                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-gray-600 line-clamp-1">{plant.care.light}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Thermometer className="w-3.5 h-3.5 text-red-500" />
                            <span className="text-gray-600 line-clamp-1">{plant.care.temperature}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs col-span-2">
                            <Droplets className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-gray-600 line-clamp-1">Rega: {plant.care.water}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
