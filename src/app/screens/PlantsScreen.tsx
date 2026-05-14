import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { MobileFrame } from '../components/MobileFrame';
import { allPlants, getSimilarPlants, Plant, PlantAlert } from '../data/plants';
import { ArrowLeft, ChevronRight, Droplets, Sun, Thermometer, Wind, Star, Search, X, AlertTriangle, Info, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [filters, setFilters] = useState<FilterState>({ difficulty: [], light: [], watering: [] });
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('plant_favorites');
    if (saved) setFavorites(JSON.parse(saved));
    const viewed = localStorage.getItem('recently_viewed_plants');
    if (viewed) setRecentlyViewed(JSON.parse(viewed));
  }, []);

  const toggleFavorite = (plantId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = favorites.includes(plantId)
      ? favorites.filter(id => id !== plantId)
      : [...favorites, plantId];
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

  const renderAlert = (alert: PlantAlert) => {
    const styles: Record<string, string> = {
      danger: 'bg-red-500/10 border-red-500/20 text-red-400',
      warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      info: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    };
    const Icons: Record<string, JSX.Element> = {
      danger: <AlertTriangle className="w-3 h-3" />,
      warning: <AlertTriangle className="w-3 h-3" />,
      info: <Info className="w-3 h-3" />,
    };
    return (
      <div key={alert.type} className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${styles[alert.severity] || styles.info}`}>
        <span className="text-sm">{alert.icon}</span>
        {Icons[alert.severity] || Icons.info}
        <span className="font-medium">{alert.message}</span>
      </div>
    );
  };

  const filteredPlants = useMemo(() => {
    let result = allPlants;
    if (searchTerm) {
      result = result.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (showFavoritesOnly) result = result.filter(plant => favorites.includes(plant.id));
    if (filters.difficulty.length > 0) result = result.filter(plant => filters.difficulty.includes(plant.difficulty));
    if (filters.light.length > 0) {
      result = result.filter(plant =>
        filters.light.some(light => plant.traits.light.includes(lightMap[light]?.[0] as any))
      );
    }
    if (filters.watering.length > 0) {
      result = result.filter(plant => {
        const freq = getWateringFrequency(plant.care.water);
        return filters.watering.includes(freq);
      });
    }
    return result;
  }, [searchTerm, showFavoritesOnly, filters, favorites]);

  const recommendations = useMemo(() => {
    if (!showRecommendations) return [] as Plant[];
    const basePlants = recentlyViewed.length > 0 ? recentlyViewed : favorites.length > 0 ? favorites : ['zamioculca'];
    const allRecs = new Set<string>();
    basePlants.forEach(plantId => {
      getSimilarPlants(plantId, 2).forEach(plant => allRecs.add(plant.id));
    });
    return Array.from(allRecs).slice(0, 6)
      .map(id => allPlants.find(p => p.id === id))
      .filter((plant): plant is Plant => Boolean(plant));
  }, [recentlyViewed, favorites, showRecommendations]);

  const hasActiveFilters = searchTerm || showFavoritesOnly || Object.values(filters).some(arr => arr.length > 0);

  const customEase = [0.16, 1, 0.3, 1];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: customEase } },
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
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.22, 0.15] }}
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
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-4 hover:bg-white/[0.08] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-zinc-300" />
                </button>
                <div className="relative overflow-hidden rounded-3xl p-5 border border-emerald-500/20 bg-emerald-500/5 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 pointer-events-none" />
                  <h1 className="relative text-2xl font-light text-white mb-1">Plantas</h1>
                  <p className="relative text-sm text-zinc-400">
                    {filteredPlants.length} planta{filteredPlants.length !== 1 ? 's' : ''} disponível{filteredPlants.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </motion.div>

              {/* Search Bar */}
              <motion.div variants={itemVariants} className="mb-4 relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou nome científico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.07] rounded-2xl placeholder:text-zinc-600 text-zinc-200 text-sm focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-4 top-3.5">
                    <X className="w-4 h-4 text-zinc-500" />
                  </button>
                )}
              </motion.div>

              {/* Filters */}
              <motion.div variants={itemVariants} className="mb-4 space-y-3">
                {/* Favorites Toggle */}
                <button
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`w-full px-4 py-3 rounded-2xl text-sm transition-all flex items-center justify-between border ${
                    showFavoritesOnly
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Favoritas ({favorites.length})
                  </div>
                  {showFavoritesOnly && <X className="w-4 h-4" />}
                </button>

                {/* Difficulty */}
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">Dificuldade</p>
                  <div className="flex gap-2">
                    {Object.keys(difficultyMap).map(diff => (
                      <button
                        key={diff}
                        onClick={() => toggleFilter('difficulty', diff)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                          filters.difficulty.includes(diff)
                            ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/[0.1]'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Light */}
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">Luz</p>
                  <div className="flex gap-2">
                    {Object.keys(lightMap).map(light => (
                      <button
                        key={light}
                        onClick={() => toggleFilter('light', light)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                          filters.light.includes(light)
                            ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/[0.1]'
                        }`}
                      >
                        {light === 'sol' ? '☀️ Sol' : light === 'meia-sombra' ? '🌤️ Meia' : '🌑 Sombra'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Watering */}
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest">regar</p>
                  <div className="flex gap-2">
                    {Object.keys(wateringMap).map(watering => (
                      <button
                        key={watering}
                        onClick={() => toggleFilter('watering', watering)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                          filters.watering.includes(watering)
                            ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/[0.1]'
                        }`}
                      >
                        {watering === 'frequente' ? '💧 Frequente' : watering === 'moderada' ? '💧 Moderada' : '💧 Pouca'}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-medium hover:bg-red-500/15 transition-colors"
                  >
                    Limpar filtros
                  </button>
                )}
              </motion.div>

              {/* Recommendations */}
              {recommendations.length > 0 && !hasActiveFilters && (
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      Recomendações para você
                    </h2>
                    <button
                      onClick={() => setShowRecommendations(!showRecommendations)}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showRecommendations ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  <div className="flex overflow-x-auto gap-3 pb-2 -mx-5 px-5 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {recommendations.map((plant) => (
                      <button
                        key={plant.id}
                        onClick={() => navigate(`/plant/${plant.id}`, { state: { roomId: 'geral' } })}
                        className="min-w-[200px] bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] rounded-2xl p-3 snap-start transition-all active:scale-[0.98] text-left"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                            <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-white truncate">{plant.name}</h3>
                            <p className="text-xs text-zinc-500 italic truncate">{plant.scientificName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${difficultyStyle(plant.difficulty)}`}>
                            {plant.difficulty}
                          </span>
                          <span className="text-xs text-emerald-400 font-medium">{plant.purification}%</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Plants List */}
              {filteredPlants.length === 0 ? (
                <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-zinc-500 text-sm">Nenhuma planta encontrada</p>
                  <button onClick={clearFilters} className="text-emerald-400 text-xs font-medium mt-2 hover:text-emerald-300 transition-colors">
                    Limpar filtros
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredPlants.map((plant) => (
                    <motion.div
                      key={plant.id}
                      variants={itemVariants}
                      onClick={() => navigate(`/plant/${plant.id}`, { state: { roomId: 'geral' } })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && navigate(`/plant/${plant.id}`, { state: { roomId: 'geral' } })}
                      className="w-full bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 hover:bg-white/[0.05] rounded-3xl overflow-hidden transition-all active:scale-[0.98] text-left group relative cursor-pointer"
                    >
                      {/* Favorite */}
                      <button
                        onClick={(e) => toggleFavorite(plant.id, e)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.08] hover:scale-110 transition-transform"
                      >
                        <Star className={`w-4 h-4 ${favorites.includes(plant.id) ? 'fill-amber-400 text-amber-400' : 'text-zinc-500'}`} />
                      </button>

                      <div className="flex flex-col gap-4 p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-24 rounded-3xl overflow-hidden bg-zinc-800 flex-shrink-0">
                            <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h2 className="text-base font-semibold text-white">{plant.name}</h2>
                            <p className="text-xs text-zinc-500 italic mt-0.5">{plant.scientificName}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <span className={`text-xs px-2.5 py-1 rounded-full ${difficultyStyle(plant.difficulty)}`}>
                                {plant.difficulty}
                              </span>
                            </div>
                            {plant.alerts && plant.alerts.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {plant.alerts.slice(0, 2).map(renderAlert)}
                                {plant.alerts.length > 2 && (
                                  <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-white/[0.04] border border-white/[0.06] text-zinc-500">
                                    <span>+{plant.alerts.length - 2}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-1" />
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="border-t border-white/[0.04] bg-white/[0.02] px-4 py-4">
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs">
                                <Wind className="w-3.5 h-3.5 text-blue-400" />
                                <span className="font-medium text-zinc-400">Purificação</span>
                              </div>
                              <span className="text-xs font-semibold text-blue-400">{plant.purification}%</span>
                            </div>
                            <div className="w-full bg-white/[0.06] rounded-full h-1.5">
                              <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${plant.purification}%` }} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs">
                                <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="font-medium text-zinc-400">Umidade</span>
                              </div>
                              <span className="text-xs font-semibold text-cyan-400">{plant.humidityLevel}%</span>
                            </div>
                            <div className="w-full bg-white/[0.06] rounded-full h-1.5">
                              <div className="bg-cyan-500 h-1.5 rounded-full transition-all" style={{ width: `${plant.humidityLevel}%` }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/[0.04]">
                            <div className="flex items-center gap-2 text-xs">
                              <Sun className="w-3.5 h-3.5 text-amber-400" />
                              <span className="text-zinc-500 line-clamp-1">{plant.care.light}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Thermometer className="w-3.5 h-3.5 text-red-400" />
                              <span className="text-zinc-500 line-clamp-1">{plant.care.temperature}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs col-span-2">
                              <Droplets className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-zinc-500 line-clamp-1">regar: {plant.care.water}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
