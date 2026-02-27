
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { NEXUS_PROTOCOL_CONTEXT } from '../constants';
import { RefreshIcon, XCircleIcon, CopyIcon, CheckmarkIcon } from './icons';
import ModelConfigurator from './ModelConfigurator';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getApiErrorMessage } from '../utils/errorHandler';
import { useToast } from '../contexts/ToastContext';
import { useGraphComplexity } from '../contexts/GraphComplexityContext';
import { useErrorState } from '../contexts/ErrorStateContext';
import { useDiagnosticLogs } from '../contexts/DiagnosticLogContext';

const SCENARIO_DOMAINS = [
    "Healthcare",
    "Project Management",
    "Smart Cities"
];

const ScenarioGenerator: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    const { showToast } = useToast();
    const { setComplexity } = useGraphComplexity();
    const { setHasComponentError } = useErrorState();
    const { addLog } = useDiagnosticLogs();
    const [activeDomain, setActiveDomain] = useLocalStorage<string | null>('scenario-domain', null);
    const [customDomain, setCustomDomain] = useState('');
    const [scenario, setScenario] = useLocalStorage<string>('scenario-text', '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [modelConfig, setModelConfig] = useLocalStorage('scenario-model-config', { temperature: 0.7, topK: 40 });
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerateScenario = useCallback(async (domain: string) => {
        if (!domain) return;
        
        setComplexity('simple');
        setActiveDomain(domain);
        setIsLoading(true);
        setError('');
        setScenario('');

        addLog('MPC', `HANDSHAKE: Requesting future state simulation for domain: ${domain.toUpperCase()}`);
        addLog('ZKP', 'AUTH: Generating proof of eligibility for industry-specific data synthesis...', 'success');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Based on the Nexus Protocol context, write a 100-word future scenario for "${domain}". Focus on how the Sovereign Persona and Privacy Negotiator protect the user. Context:\n${NEXUS_PROTOCOL_CONTEXT}`,
                config: {
                    temperature: modelConfig.temperature,
                    topK: modelConfig.topK,
                }
            });
            const generatedText = response.text;
            
            if (!generatedText) {
                throw new Error("The AI did not return a scenario.");
            }
            setScenario(generatedText);
            addLog('CORE', `SIM: Industry narrative synthesized and verified.`, 'success');
        } catch (err) {
            console.error(err);
            const errorMessage = getApiErrorMessage(err);
            setError(errorMessage);
            setHasComponentError(true);
            addLog('SHIELD', 'BLOCKED: External industry probe failed security verification.', 'denied');
        } finally {
            setIsLoading(false);
        }
    }, [modelConfig, setActiveDomain, setScenario, setComplexity, setHasComponentError, addLog]);
    
    const handleClear = () => {
        setActiveDomain(null);
        setScenario('');
        setError('');
        setCustomDomain('');
        addLog('CORE', 'SYNC: Local scenario buffer cleared.', 'success', true);
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Real-World Narratives</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Choose a domain or enter your own to see how the Protocol handles sensitive data in high-stakes environments.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-wrap gap-3 justify-center">
                    {SCENARIO_DOMAINS.map(domain => (
                        <button
                            key={domain}
                            onClick={() => handleGenerateScenario(domain)}
                            disabled={isLoading}
                            className={`px-6 py-2 font-bold text-xs uppercase tracking-widest rounded-full border transition-all ${activeDomain === domain && !error ? `${themeClasses.bg} ${themeClasses.border} text-white` : `bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500` } disabled:opacity-50`}
                        >
                            {domain}
                        </button>
                    ))}
                </div>
                
                <div className="flex max-w-md mx-auto gap-2">
                    <input 
                        type="text" 
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerateScenario(customDomain)}
                        placeholder="Or enter custom domain (e.g. Finance)"
                        className="flex-grow bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button 
                        onClick={() => handleGenerateScenario(customDomain)}
                        disabled={isLoading || !customDomain}
                        className={`px-4 py-2 rounded-lg text-sm font-bold bg-gray-700 text-white hover:bg-gray-600 transition-all`}
                    >
                        GO
                    </button>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 rounded-2xl min-h-[16rem] p-8 relative flex items-center justify-center">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 rounded-2xl z-10">
                            <div className={`w-8 h-8 border-2 border-t-transparent ${themeClasses.border} rounded-full animate-spin mb-4`}></div>
                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Generating Future...</span>
                        </div>
                    )}
                    
                    {scenario ? (
                        <div className="text-left animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <span className={`text-[10px] uppercase font-bold tracking-[0.3em] ${themeClasses.text}`}>Protocol Simulation: {activeDomain}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleGenerateScenario(activeDomain!)} className="p-1.5 hover:bg-gray-800 rounded-md text-gray-500 transition-colors" title="Regenerate"><RefreshIcon className="w-4 h-4"/></button>
                                    <button onClick={handleClear} className="p-1.5 hover:bg-gray-800 rounded-md text-gray-500 transition-colors" title="Clear"><XCircleIcon className="w-4 h-4"/></button>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed font-light italic text-lg">"{scenario}"</p>
                        </div>
                    ) : (
                        <div className="text-center text-gray-600 italic font-light">
                            Select a core industry to simulate a secure interaction and watch the Ledger react.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScenarioGenerator;
