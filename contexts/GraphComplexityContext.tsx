
import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

export type Complexity = 'idle' | 'simple' | 'complex';

interface GraphComplexityContextType {
  complexity: Complexity;
  setComplexity: (complexity: Complexity) => void;
}

const GraphComplexityContext = createContext<GraphComplexityContextType | undefined>(undefined);

export const GraphComplexityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [complexity, setComplexity] = useState<Complexity>('idle');

  const value = useMemo(() => ({ complexity, setComplexity }), [complexity]);

  return (
    <GraphComplexityContext.Provider value={value}>
      {children}
    </GraphComplexityContext.Provider>
  );
};

export const useGraphComplexity = (): GraphComplexityContextType => {
  const context = useContext(GraphComplexityContext);
  if (context === undefined) {
    throw new Error('useGraphComplexity must be used within a GraphComplexityProvider');
  }
  return context;
};
