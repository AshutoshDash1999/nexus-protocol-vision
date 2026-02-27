
import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

interface ErrorStateContextType {
  hasComponentError: boolean;
  setHasComponentError: (hasError: boolean) => void;
}

const ErrorStateContext = createContext<ErrorStateContextType | undefined>(undefined);

export const ErrorStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasComponentError, setHasComponentError] = useState<boolean>(false);

  const value = useMemo(() => ({ hasComponentError, setHasComponentError }), [hasComponentError]);

  return (
    <ErrorStateContext.Provider value={value}>
      {children}
    </ErrorStateContext.Provider>
  );
};

export const useErrorState = (): ErrorStateContextType => {
  const context = useContext(ErrorStateContext);
  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorStateProvider');
  }
  return context;
};
