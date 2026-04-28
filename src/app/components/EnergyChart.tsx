import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap } from 'lucide-react';

const data = [
  { time: '00h', economia: 12 },
  { time: '04h', economia: 8 },
  { time: '08h', economia: 15 },
  { time: '12h', economia: 28 },
  { time: '16h', economia: 32 },
  { time: '20h', economia: 22 },
  { time: '24h', economia: 14 },
];

export function EnergyChart() {
  return (
    <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-5 border border-white/40 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm text-gray-800">Economia de Energia</h2>
        </div>
        <div className="text-right">
          <p className="text-xl text-emerald-600">24.5%</p>
          <p className="text-[10px] text-gray-500">Hoje</p>
        </div>
      </div>
      
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              style={{ fontSize: '10px' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '10px' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
              }}
              formatter={(value: number) => [`${value}%`, 'Economia']}
              labelStyle={{ color: '#374151' }}
            />
            <Line 
              type="monotone" 
              dataKey="economia" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: '#059669' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Redução no uso do ar-condicionado</span>
          <span className="text-emerald-600">↓ 3.2 kWh</span>
        </div>
      </div>
    </div>
  );
}