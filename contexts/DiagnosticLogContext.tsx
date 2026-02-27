
import React, { createContext, useState, useContext, useCallback, useMemo, ReactNode } from 'react';

export type LogType = 'MPC' | 'ZKP' | 'SHIELD' | 'CORE';

export interface DiagnosticLog {
    id: string;
    timestamp: string;
    type: LogType;
    message: string;
    status: 'success' | 'warning' | 'denied';
    isUserAction?: boolean;
}

interface DiagnosticLogContextType {
    logs: DiagnosticLog[];
    addLog: (type: LogType, message: string, status?: 'success' | 'warning' | 'denied', isUserAction?: boolean) => void;
}

const DiagnosticLogContext = createContext<DiagnosticLogContextType | undefined>(undefined);

export const DiagnosticLogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [logs, setLogs] = useState<DiagnosticLog[]>([]);

    const addLog = useCallback((type: LogType, message: string, status: 'success' | 'warning' | 'denied' = 'success', isUserAction: boolean = true) => {
        const newLog: DiagnosticLog = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            type,
            message,
            status,
            isUserAction,
        };
        setLogs(prev => [...prev.slice(-49), newLog]);
    }, []);

    const value = useMemo(() => ({ logs, addLog }), [logs, addLog]);

    return (
        <DiagnosticLogContext.Provider value={value}>
            {children}
        </DiagnosticLogContext.Provider>
    );
};

export const useDiagnosticLogs = (): DiagnosticLogContextType => {
    const context = useContext(DiagnosticLogContext);
    if (context === undefined) {
        throw new Error('useDiagnosticLogs must be used within a DiagnosticLogProvider');
    }
    return context;
};
