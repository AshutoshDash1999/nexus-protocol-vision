import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type RealTimeMetrics = {
  latencyMs: number;
  energySavingsPercent: number;
  activeUsers: number;
  uptimeSeconds: number;
  cpuLoadPercent: number;
  memoryUsageMb: number;
};

const RealTimeContext = createContext<{ metrics: RealTimeMetrics } | undefined>(undefined);

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const buildMetrics = (seed?: Partial<RealTimeMetrics>): RealTimeMetrics => {
  const base: RealTimeMetrics = {
    latencyMs: 24,
    energySavingsPercent: 72,
    activeUsers: 1342,
    uptimeSeconds: 123456,
    cpuLoadPercent: 18,
    memoryUsageMb: 3280,
  };
  return { ...base, ...seed };
};

export const RealTimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<RealTimeMetrics>(() => buildMetrics());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMetrics(prev => ({
        latencyMs: Math.max(8, Math.min(120, prev.latencyMs + randomBetween(-5, 5))),
        energySavingsPercent: Math.max(40, Math.min(95, prev.energySavingsPercent + randomBetween(-2, 2))),
        activeUsers: Math.max(50, prev.activeUsers + randomBetween(-25, 25)),
        uptimeSeconds: prev.uptimeSeconds + 5,
        cpuLoadPercent: Math.max(5, Math.min(90, prev.cpuLoadPercent + randomBetween(-3, 3))),
        memoryUsageMb: Math.max(512, Math.min(8192, prev.memoryUsageMb + randomBetween(-50, 50))),
      }));
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const value = useMemo(() => ({ metrics }), [metrics]);

  return <RealTimeContext.Provider value={value}>{children}</RealTimeContext.Provider>;
};

export const useRealTimeMetrics = () => {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTimeMetrics must be used within a RealTimeProvider');
  }
  return context;
};
