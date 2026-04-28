import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Leaf, Sprout } from 'lucide-react';
import { MobileFrame } from '../components/MobileFrame';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 flex items-center justify-center p-4">
      <MobileFrame hideNavigation>
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 px-8 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-300 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '4s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400 rounded-full blur-3xl animate-pulse"
                 style={{ animationDuration: '5s', animationDelay: '0.5s' }} />
          </div>

          {/* Logo Container with Animation */}
          <div className="relative z-10 animate-fade-in-up">
            <div className="relative mb-8">
              {/* Main Logo Circle */}
              <div className="w-40 h-40 mx-auto bg-white/25 backdrop-blur-2xl rounded-full flex items-center justify-center border-4 border-white/50 shadow-2xl animate-scale-in">
                <div className="w-36 h-36 bg-white/20 rounded-full flex items-center justify-center">
                  <Leaf className="w-20 h-20 text-white animate-float"
                        style={{ animationDuration: '3s' }} />
                </div>
              </div>

              {/* Secondary Icon */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce-in"
                   style={{ animationDelay: '0.3s', animationDuration: '0.6s' }}>
                <Sprout className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Brand Name */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h1 className="text-5xl text-white mb-3 tracking-wide">
                EcoPlant
              </h1>
              <div className="h-1 w-24 bg-white/70 mx-auto rounded-full mb-4" />
              <p className="text-white/90 text-base tracking-wider uppercase text-sm">
                Sustentabilidade Inteligente
              </p>
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-fade-in"
               style={{ animationDelay: '1s' }}>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"
                   style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"
                   style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"
                   style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </MobileFrame>
    </div>
  );
}
