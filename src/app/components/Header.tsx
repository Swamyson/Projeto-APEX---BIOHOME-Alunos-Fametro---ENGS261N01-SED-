import { MapPin, Thermometer } from 'lucide-react';

export function Header() {
  return (
    <header className="pt-8 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span className="text-sm text-gray-800">Manaus, AM</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-lg px-3 py-1.5 rounded-full border border-white/40 shadow-lg">
          <Thermometer className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-800">32°C</span>
        </div>
      </div>
      <h1 className="text-2xl mt-3 text-gray-900">BioHome</h1>
      <p className="text-sm text-gray-600 mt-0.5">Barreira Térmica Inteligente</p>
    </header>
  );
}