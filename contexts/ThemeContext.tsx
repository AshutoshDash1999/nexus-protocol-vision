import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { themeFocusColors } from '../utils/themeColors';

export type Theme = 'indigo' | 'teal' | 'fuchsia' | 'amber' | 'cyan';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = window.localStorage.getItem('nexus-theme');
      return (storedTheme as Theme) || 'indigo';
    } catch {
      return 'indigo';
    }
  });

  useEffect(() => {
    try {
      // 1. Persist theme choice to localStorage
      window.localStorage.setItem('nexus-theme', theme);

      // 2. Update CSS variables for global styles like focus rings
      const colors = themeFocusColors[theme];
      const root = document.documentElement;
      if (colors) {
          root.style.setProperty('--theme-focus-ring', colors.ring);
          root.style.setProperty('--theme-focus-ring-shadow', colors.shadow);
      }

    } catch (error) {
        console.error("Failed to save theme or update CSS variables", error);
    }
  }, [theme]);
  
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};