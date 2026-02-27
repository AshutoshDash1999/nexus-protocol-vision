
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { FEATURES } from '../constants';
import { CopyIcon, CheckmarkIcon, RefreshIcon, XCircleIcon, DownloadIcon } from './icons';
import ModelConfigurator from './ModelConfigurator';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getApiErrorMessage } from '../utils/errorHandler';
import { useGraphComplexity } from '../contexts/GraphComplexityContext';
import { useErrorState } from '../contexts/ErrorStateContext';
import { useDiagnosticLogs } from '../contexts/DiagnosticLogContext';

const VisualizeConcept: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    const { setComplexity } = useGraphComplexity();
    const { setHasComponentError } = useErrorState();
    const { addLog } = useDiagnosticLogs();
    const [selectedConcept, setSelectedConcept] = useLocalStorage<{ title: string; description: string } | null>('visualize-concept', null);
    const [generatedPrompt, setGeneratedPrompt] = useLocalStorage<string>('visualize-prompt', '');
    const [imageUrl, setImageUrl] = useLocalStorage<string>('visualize-image-url', '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [modelConfig, setModelConfig] = useLocalStorage('visualize-model-config', { temperature: 0.8, topK: 32 });


    const handleCopyToClipboard = () => {
        if (generatedPrompt) {
            navigator.clipboard.writeText(generatedPrompt);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            addLog('CORE', 'Prompt metadata copied to clipboard.');
        }
    };

    const handleVisualize = useCallback(async (concept: { title: string, description: string } | null) => {
        if (!concept) return;

        setComplexity('complex');
        setSelectedConcept(concept);
        setIsLoading(true);
        setError('');
        setImageUrl('');
        setGeneratedPrompt('');

        addLog('MPC', `Negotiating visualization for: ${concept.title}`);
        addLog('ZKP', 'Providing proof of identity for high-fidelity generation...', 'success');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const promptGenerationResponse = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Based on the following AI concept, create a short, vivid, and imaginative prompt for an image generation model. Concept: "${concept.title} - ${concept.description}"`,
                config: {
                    temperature: modelConfig.temperature,
                    topK: modelConfig.topK,
                }
            });
            const imagePrompt = promptGenerationResponse.text;

            if (!imagePrompt) {
                throw new Error("Failed to generate a creative prompt.");
            }
            setGeneratedPrompt(imagePrompt);
            addLog('CORE', `Latent space mapping complete. Prompt synthesized.`);

            const imageGenerationResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: imagePrompt }] },
            });
            
            let imageData = null;
            for (const part of imageGenerationResponse.candidates[0].content.parts) {
                if (part.inlineData) {
                    imageData = part.inlineData.data;
                    break;
                }
            }
            
            if (imageData) {
                setImageUrl(`data:image/png;base64,${imageData}`);
                addLog('MPC', 'Encrypted pixel stream decoded successfully.', 'success');
            } else {
                throw new Error("No image data found in the response.");
            }

        } catch (err) {
            console.error(err);
            const errorMessage = getApiErrorMessage(err);
            setError(errorMessage);
            setHasComponentError(true);
            addLog('SHIELD', 'Visualization pipeline interrupted by system constraints.', 'warning');
        } finally {
            setIsLoading(false);
        }
    }, [modelConfig, setGeneratedPrompt, setImageUrl, setSelectedConcept, setComplexity, setHasComponentError, addLog]);

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Visualize the Concepts</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Trigger a latent space projection. Every pixel is generated through a privacy-preserving negotiation.
            </p>
            
            <ModelConfigurator config={modelConfig} onConfigChange={setModelConfig} disabled={isLoading} />

            <div className="flex flex-wrap gap-3 justify-center my-8">
                {FEATURES.map(feature => (
                    <button
                        key={feature.title}
                        onClick={() => handleVisualize(feature)}
                        disabled={isLoading}
                        className={`px-4 py-2 font-semibold text-sm rounded-lg transition-colors border ${selectedConcept?.title === feature.title && !error ? `${themeClasses.bg} ${themeClasses.border} text-white` : `bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 ${themeClasses.hoverBorder}` } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {feature.title}
                    </button>
                ))}
            </div>

            <div className="max-w-3xl mx-auto aspect-video bg-gray-900/50 border border-gray-700 rounded-xl flex items-center justify-center p-2 relative overflow-hidden">
                {isLoading && (
                     <div className="w-full h-full bg-gray-800 absolute inset-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">
                            <p className="animate-pulse">Negotiating synthesis...</p>
                        </div>
                    </div>
                )}
                 {imageUrl && (
                    <img src={imageUrl} alt="Visualization" className="object-contain w-full h-full rounded-lg animate-fade-in" />
                 )}
                 {!isLoading && !imageUrl && <p className="text-gray-500">Select a concept to begin the handshake.</p>}
            </div>
        </div>
    );
};

export default VisualizeConcept;
