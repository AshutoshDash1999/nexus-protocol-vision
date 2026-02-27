
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WarningIcon } from './icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children, confirmText = "Confirm" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose} // Close on backdrop click
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full p-6 text-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-900/50 mb-4">
              <WarningIcon className="h-6 w-6 text-rose-400" aria-hidden="true" />
            </div>

            <h3 className="text-xl font-semibold text-white" id="modal-title">
              {title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-400">
                {children}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center gap-3">
              <button
                type="button"
                className="w-full sm:w-auto justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 transition-colors focus-visible:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-full sm:w-auto justify-center rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 transition-colors focus-visible:bg-rose-500"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
