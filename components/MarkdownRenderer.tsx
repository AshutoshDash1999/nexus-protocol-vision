import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

// A simple blinking cursor component for the typing indicator.
const BlinkingCursor = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    return (
        <span 
            className={`inline-block w-2 h-4 ${themeClasses.bg} ml-1 animate-pulse align-middle`} 
            style={{ marginBottom: '2px' }}
            aria-hidden="true"
        />
    );
};

// Parses inline elements like bold text into an array of React nodes.
const parseInlineToReact = (line: string): React.ReactNode[] => {
    if (!line) return [];
    const parts = line.split(/(\*\*.*?\*\*)/g); 
    
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part; 
    });
};

const MarkdownRenderer: React.FC<{ text: string, isLoading?: boolean }> = ({ text, isLoading = false }) => {
    if (!text && !isLoading) return null;

    const lines = text ? text.split('\n') : [];
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = (keyPrefix: string) => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${keyPrefix}`} className="list-disc list-inside space-y-1 my-2">
                    {listItems.map((item, index) => (
                        <li key={index}>{parseInlineToReact(item)}</li>
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.trim().startsWith('* ')) {
            listItems.push(line.trim().substring(2));
        } else {
            flushList(`l-${index}`);
            if (line.trim() !== '') {
                const isLastLine = index === lines.length - 1;
                elements.push(
                    <p key={`p-${index}`} className="my-1">
                        {parseInlineToReact(line)}
                        {isLoading && isLastLine && <BlinkingCursor />}
                    </p>
                );
            }
        }
    });

    flushList('final');

    // Handle initial loading state when no text has arrived yet.
    if (elements.length === 0 && isLoading) {
        return <p key="p-initial-loading" className="my-1"><BlinkingCursor /></p>;
    }

    return <React.Fragment>{elements}</React.Fragment>;
};

export default MarkdownRenderer;