import { Droplets, Sun, Sprout } from 'lucide-react';

interface Indicator {
  icon: typeof Droplets;
  label: string;
  value: string | number;
  unit: string;
  color: string;
  bgColor: string;
}

const indicators: Indicator[] = [
  {
    icon: Droplets,
    label: 'Umidade',
    value: 68,
    unit: '%',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Sun,
    label: 'Incidência UV',
    value: 'Moderada',
    unit: '',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Sprout,
    label: 'Nível de Irrigação',
    value: 'Ideal',
    unit: '',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
];

export function IndicatorsGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {indicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-3 border border-white/40 shadow-lg"
          >
            <div className={`w-8 h-8 rounded-full ${indicator.bgColor} flex items-center justify-center mb-2`}>
              <Icon className={`w-4 h-4 ${indicator.color}`} />
            </div>
            <p className="text-[10px] text-gray-600 mb-0.5">{indicator.label}</p>
            <div className="flex items-baseline gap-0.5">
              <span className="text-base text-gray-900">{indicator.value}</span>
              {indicator.unit && (
                <span className="text-xs text-gray-500">{indicator.unit}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}