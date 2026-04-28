import { TrendingDown } from 'lucide-react';

export function TemperatureReductionCard() {
  const reduction = 6;
  const percentage = (reduction / 10) * 100;
  const circumference = 2 * Math.PI * 60; // raio = 60 (reduzido)
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-5 border border-white/40 shadow-xl">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-3xl" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm text-gray-800">Redução de Temperatura Interna</h2>
        </div>
        
        <div className="flex items-center justify-center py-6">
          <div className="relative">
            {/* SVG Circular Meter */}
            <svg className="transform -rotate-90" width="150" height="150">
              {/* Background circle */}
              <circle
                cx="75"
                cy="75"
                r="60"
                fill="none"
                stroke="rgba(16, 185, 129, 0.1)"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <circle
                cx="75"
                cy="75"
                r="60"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl text-emerald-600">-{reduction}</span>
              <span className="text-xl text-gray-500">°C</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-2">
          <p className="text-xs text-gray-600">
            Temperatura ambiente reduzida em relação ao exterior
          </p>
        </div>
      </div>
    </div>
  );
}