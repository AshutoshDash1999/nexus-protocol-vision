
import React from 'react';
import { motion } from 'framer-motion';
import { NexusLogoIcon } from './icons';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const Preloader: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0.5 }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ 
            duration: 2, 
            ease: "easeInOut", 
            repeat: Infinity, 
            repeatType: "mirror" 
        }}
      >
        <NexusLogoIcon className={`w-24 h-24 ${themeClasses.text}`} />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
