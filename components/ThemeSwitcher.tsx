
import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';
import { PaletteIcon } from './icons';
import { getThemeClasses } from '../utils/themeUtils';
import { useDiagnosticLogs } from '../contexts/DiagnosticLogContext';

const themes: Theme[] = ['indigo', 'teal', 'fuchsia', 'amber', 'cyan'];

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const { addLog } = useDiagnosticLogs();

  const handleThemeChange = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    addLog('CORE', `Signal re-tuning: Switching UI frequency to ${nextTheme.toUpperCase()}`);
  };

  return (
    <button
      onClick={handleThemeChange}
      className={`p-2 rounded-full transition-colors duration-200 ${themeClasses.hoverBg}/20 hover:text-white`}
      aria-label={`Switch theme. Current theme: ${theme}`}
    >
      <PaletteIcon className={`w-6 h-6 ${themeClasses.text}`} />
    </button>
  );
};

export default ThemeSwitcher;
