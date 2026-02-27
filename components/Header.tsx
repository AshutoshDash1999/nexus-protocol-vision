
import React from 'react';
import { NexusLogoIcon } from './icons';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <NexusLogoIcon className={`w-6 h-6 ${themeClasses.text}`} />
            <h1 className="text-xl font-bold tracking-widest text-white">
              NEXUS <span className="font-light text-gray-400">PROTOCOL</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 border-l border-gray-700 pl-6">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${themeClasses.bg} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${themeClasses.bg}`}></span>
              </span>
              <span className="text-[10px] uppercase tracking-tighter text-gray-500 font-mono">Core System: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-tighter text-gray-500 font-mono">Latency: 24ms</span>
            </div>
          </div>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
