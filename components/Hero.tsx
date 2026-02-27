
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="text-center">
      <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo}`}>
        The Nexus Protocol
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
        A paradigm shift from "AI as a Tool" to "AI as an Infrastructure." A private, intelligent, self-optimizing AI operating system that lives with you, protects your data, and negotiates on your behalf.
      </p>
    </div>
  );
};

export default Hero;
