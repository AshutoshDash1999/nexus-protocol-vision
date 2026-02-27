
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WarningIcon } from './icons';
import { useErrorState } from '../contexts/ErrorStateContext';

interface GlobalResetProps {
  onReset: () => void;
}

const GlobalReset: React.FC<GlobalResetProps> = ({ onReset }) => {
  const { hasComponentError } = useErrorState();

  return (
    <AnimatePresence>
      {hasComponentError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-rose-600/90 backdrop-blur-sm text-white font-semibold rounded-lg shadow-lg hover:bg-rose-500 transition-colors"
            aria-label="A component has encountered an error. Click to reset the application."
          >
            <WarningIcon className="w-5 h-5" />
            <span>App Reset Required</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalReset;
