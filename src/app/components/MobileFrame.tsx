import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Home, TrendingUp, Settings, Menu, User, Bell, Shield, Moon, Sun, LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

interface MobileFrameProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

export function MobileFrame({ children, hideNavigation = false }: MobileFrameProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navButtonClass = (path: string) =>
    `flex flex-col items-center gap-1 ${currentPath === path ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'} transition-colors`;

  return (
    <div className="relative w-full max-w-[480px] h-[100dvh] mx-auto flex flex-col bg-white">
      {/* Phone Frame */}
      {/* <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl p-3"> */}
        {/* <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col"> */}
          {/* Status Bar */}
          {/* <div className="flex-shrink-0 px-6 pt-3 pb-2 bg-gradient-to-br from-emerald-50 to-white"> */}
            {/* <div className="flex items-center justify-between text-xs"> */}
              {/* <span className="text-gray-900">9:45</span> */}
              {/* <div className="flex items-center gap-1"> */}
                {/* Signal bars */}
                {/* <div className="flex items-end gap-[2px]">
                  <div className="w-[3px] h-[6px] bg-gray-900 rounded-sm" />
                  <div className="w-[3px] h-[8px] bg-gray-900 rounded-sm" />
                  <div className="w-[3px] h-[10px] bg-gray-900 rounded-sm" />
                  <div className="w-[3px] h-[12px] bg-gray-900 rounded-sm" />
                </div> */}
                {/* WiFi */}
                {/* <svg className="w-4 h-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg> */}
                {/* Battery */}
                {/* <svg className="w-6 h-4 text-gray-900" viewBox="0 0 24 12" fill="none">
                  <rect x="1" y="2" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="3" y="4" width="14" height="4" rx="1" fill="currentColor"/>
                  <rect x="20" y="4" width="2" height="4" rx="1" fill="currentColor"/>
                </svg> */}
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}

          {/* App Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>

          {/* Bottom Navigation */}
          {!hideNavigation && (
            <div className="flex-shrink-0 bg-white/80 backdrop-blur-xl border-t border-gray-200">
              <div className="flex items-center justify-around px-6 py-3 pb-5">
                <button onClick={() => navigate('/dashboard')} className={navButtonClass('/dashboard')}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentPath === '/dashboard' ? 'bg-emerald-100' : ''}`}>
                    <Home className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Início</span>
                </button>
                
                <button onClick={() => navigate('/analysis')} className={navButtonClass('/analysis')}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentPath === '/analysis' ? 'bg-emerald-100' : ''}`}>
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Análise</span>
                </button>
                
                <button onClick={() => navigate('/plants')} className={navButtonClass('/plants')}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${currentPath === '/plants' ? 'bg-emerald-100' : ''}`}>
                    <Menu className="w-6 h-6" />
                  </div>
                  <span className="text-xs">Plantas</span>
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={navButtonClass('/config')}>
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center outline-none">
                        <Settings className="w-6 h-6" />
                      </div>
                      <span className="text-xs">Configurações</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mb-2 bg-zinc-900 border-zinc-800 text-zinc-100" align="end">
                    <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notificações</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Privacidade</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Modo Claro</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Tema Escuro</span>
                    </DropdownMenuItem>                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer" onClick={() => {
                      localStorage.removeItem('userName');
                      localStorage.removeItem('userType');
                      navigate('/');
                    }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        {/* </div> */}
      {/* </div> */}

      {/* Notch (optional for realism) */}
      {/* <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" /> */}
    </div>
  );
}