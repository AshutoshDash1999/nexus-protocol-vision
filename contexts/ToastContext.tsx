
import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import Toast from '../components/Toast';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000); // Auto-hide after 3 seconds
  }, []);
  
  const hideToast = () => setIsToastVisible(false);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
