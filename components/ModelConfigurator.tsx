
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

interface ModelConfig {
    temperature: number;
    topK: number;
}

interface ModelConfiguratorProps {
    config: ModelConfig;
    onConfigChange: (newConfig: ModelConfig) => void;
    disabled: boolean;
}

const ModelConfigurator: React.FC<ModelConfiguratorProps> = ({ config, onConfigChange, disabled }) => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);

    const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onConfigChange({ ...config, temperature: parseFloat(e.target.value) });
    };

    const handleTopKChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onConfigChange({ ...config, topK: parseInt(e.target.value, 10) });
    };

    return (
        <div className={`max-w-xl mx-auto bg-gray-800/40 border border-gray-700 rounded-lg p-4 transition-opacity ${disabled ? 'opacity-50' : ''}`}>
            <fieldset disabled={disabled} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <legend className="sr-only">AI Model Configuration</legend>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="temperature" className="block text-sm font-medium text-gray-300">
                            Creativity (Temperature)
                        </label>
                        <span className={`text-sm font-mono ${themeClasses.text}`}>{config.temperature.toFixed(1)}</span>
                    </div>
                    <input
                        id="temperature"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={config.temperature}
                        onChange={handleTemperatureChange}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        aria-describedby="temperature-description"
                    />
                    <p id="temperature-description" className="text-xs text-gray-500 mt-1">
                        Lower values are more predictable, higher values are more creative.
                    </p>
                </div>
                <div>
                     <div className="flex justify-between items-center mb-1">
                        <label htmlFor="topk" className="block text-sm font-medium text-gray-300">
                           Token Sampling (Top-K)
                        </label>
                        <span className={`text-sm font-mono ${themeClasses.text}`}>{config.topK}</span>
                    </div>
                    <input
                        id="topk"
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={config.topK}
                        onChange={handleTopKChange}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        aria-describedby="topk-description"
                    />
                     <p id="topk-description" className="text-xs text-gray-500 mt-1">
                        Limits the model's choices for the next token to the most likely K options.
                    </p>
                </div>
            </fieldset>
        </div>
    );
};

export default ModelConfigurator;
