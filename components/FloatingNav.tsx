
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

interface FloatingNavProps {
  navItems: {
    name: string;
    link: string;
  }[];
  sectionIds: string[];
}

const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, sectionIds }) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const [isVisible, setIsVisible] = useState(false);
  const activeId = useScrollSpy(sectionIds, { offset: 100 });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-30"
        >
          <nav className="flex items-center space-x-1 bg-gray-800/60 backdrop-blur-lg border border-gray-700 rounded-full px-3 py-2 shadow-lg">
            {navItems.map((item) => {
              const isActive = activeId === item.link.substring(1);
              return (
                <a
                  key={item.link}
                  href={item.link}
                  className={`relative px-3 py-1 text-sm font-medium text-gray-300 transition-colors rounded-full ${isActive ? '' : `hover:${themeClasses.text}`}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-item"
                      className={`absolute inset-0 ${themeClasses.bg} rounded-full`}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
