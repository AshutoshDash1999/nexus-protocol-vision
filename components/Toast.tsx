
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { XCircleIcon } from './icons';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.5 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`flex items-center justify-between gap-4 py-3 px-5 rounded-lg shadow-2xl ${themeClasses.hoverShadow} bg-gray-800 border ${themeClasses.border}`}
          >
            <p className={`text-sm font-medium ${themeClasses.text}`}>{message}</p>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
