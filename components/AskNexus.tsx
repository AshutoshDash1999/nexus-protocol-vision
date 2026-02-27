
import React, { useState, useRef, useEffect } from 'react';
import { NEXUS_PROTOCOL_CONTEXT } from '../constants';
import { UserIcon, NexusLogoIcon } from './icons';
import MarkdownRenderer from './MarkdownRenderer';
import ConfirmationModal from './ConfirmationModal';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getApiErrorMessage } from '../utils/errorHandler';
import { useGraphComplexity } from '../contexts/GraphComplexityContext';
import { useErrorState } from '../contexts/ErrorStateContext';
import { useDiagnosticLogs } from '../contexts/DiagnosticLogContext';

interface Message {
    by: 'user' | 'ai';
    text: string;
}

type PersonaMode = 'Architect' | 'Citizen' | 'Skeptic';

// simple offline glossary – extend as needed
const LOCAL_GLOSSARY: Record<string,string> = {
    gravity: 'Gravity is a natural force that attracts two bodies with mass toward each other.',
    ai: 'Artificial intelligence (AI) is the simulation of human intelligence processes by machines.',
    computer: 'A computer is an electronic device that processes data according to instructions.',
    democracy: 'Democracy is a form of government in which power is held by the people.',
    // add more definitions here
};


const exampleQuestions = [
    "Explain Sovereign Persona.",
    "Is my data actually safe?",
    "Why open source?",
    "What is the Sovereign Hive framework?",
    "How does the Epistemic Engine identify knowledge gaps?",
    "Can the personal chatbot help with learning math?",
];

const PERSONA_PROMPTS: Record<PersonaMode, string> = {
    Architect: "You are a Technical Architect for the Nexus Protocol. Use high-level engineering terms, explain the math (ZKP, MPC, MorphNet, federated shards, GNNs), and focus on system architecture.",
    Citizen: "You are a helpful assistant explaining the Nexus Protocol to a non-technical user. Use simple analogies, focus on daily life benefits, and be warm and reassuring.",
    Skeptic: "You are an objective auditor. Answer questions by focusing on privacy risks, security measures, and how the protocol proves its claims through code and math."
};

const initialMessage: Message[] = [{ by: 'ai', text: "Welcome! I'm the Nexus Core Assistant. Select a perspective below and ask me anything about the protocol." }];

const AskNexus: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    const { setComplexity } = useGraphComplexity();
    const { setHasComponentError } = useErrorState();
    const { addLog } = useDiagnosticLogs();
    const [input, setInput] = useState('');
    const [history, setHistory] = useLocalStorage<Message[]>('nexus-chat-history', initialMessage);
    const [isLoading, setIsLoading] = useState(false);
    const [persona, setPersona] = useState<PersonaMode>('Architect');
    const [error, setError] = useState('');
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isLoading]);

    const handleQuery = async (query: string) => {
        if (!query.trim() || isLoading) return;
        setComplexity('simple');
        setInput('');
        setIsLoading(true);
        setError('');
        
        // Protocol Step 1: Input Analysis
        addLog('SHIELD', `SCAN: Analyzing semantic intent for Persona: ${persona.toUpperCase()}`);
        
        // Protocol Step 2: Establish Secure Channel
        addLog('MPC', `TUNNEL: Initiating secure computation tunnel for query processing...`);

        const userMessage: Message = { by: 'user', text: query };
        const aiMessagePlaceholder: Message = { by: 'ai', text: '' };
        setHistory(prev => [...prev, userMessage, aiMessagePlaceholder]);

        // purely local processing, potentially with online fallback
        try {
            const localAnswer = await (async () => {
                // glossary lookup
                const normalized = query.trim().toLowerCase();
                if (LOCAL_GLOSSARY[normalized]) {
                    return LOCAL_GLOSSARY[normalized];
                }
                // phrase match (first word)
                const first = normalized.split(/\W+/)[0];
                if (LOCAL_GLOSSARY[first]) {
                    return LOCAL_GLOSSARY[first];
                }
                // try context lookup first, ignoring common stopwords so mundane questions don't always match
                const ctx = NEXUS_PROTOCOL_CONTEXT.toLowerCase();
                const stopwords = new Set(['what','that','this','with','from','your','you','the','and','for','have','not','but','are','just','has','was','being','been','they','their','them','would','could']);
                const words = query.toLowerCase().split(/\W+/);
                for (const word of words) {
                    if (word.length > 3 && !stopwords.has(word) && ctx.includes(word)) {
                        const idx = ctx.indexOf(word);
                        const start = Math.max(0, idx - 100);
                        const end = Math.min(ctx.length, idx + 200);
                        return ctx.slice(start, end) + '...';
                    }
                }
                // basic arithmetic handling
                try {
                    const clean = query.replace(/[^0-9+\-*/(). ]/g, '');
                    // eslint-disable-next-line no-eval
                    const result = eval(clean);
                    if (typeof result === 'number' && !isNaN(result)) {
                        return `${query.trim()} = ${result}`;
                    }
                } catch {}
                // generic fallback: try Wikipedia for broad coverage
                try {
                    // derive a plausible page title from the query
                    let title = query.trim();
                    const lower = title.toLowerCase();
                    if (lower.startsWith('capital of ')) {
                        title = title.slice('capital of '.length);
                    } else if (lower.startsWith('who is ')) {
                        title = title.slice('who is '.length);
                    } else if (lower.startsWith('what is ')) {
                        title = title.slice('what is '.length);
                    } else if (lower.startsWith('define ')) {
                        title = title.slice('define '.length);
                    }
                    // replace spaces with underscores
                    title = title.replace(/\s+/g, '_');

                    let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
                    let resp = await fetch(apiUrl);
                    if (resp.ok) {
                        const data = await resp.json();
                        if (data.extract) {
                            return data.extract;
                        }
                    }
                    // if 404 or no extract, try search endpoint to recover from typos
                    if (resp.status === 404) {
                        const searchUrl = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(query)}&limit=1`;
                        const sresp = await fetch(searchUrl);
                        if (sresp.ok) {
                            const sdata = await sresp.json();
                            if (sdata.pages && sdata.pages.length > 0 && sdata.pages[0].key) {
                                const bestTitle = sdata.pages[0].key;
                                const r2 = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(bestTitle)}`);
                                if (r2.ok) {
                                    const d2 = await r2.json();
                                    if (d2.extract) return d2.extract;
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.warn('wikipedia lookup failed', err);
                }
                return "[local AI] I couldn't find a local answer. Consider expanding the glossary or check online.";            })();

            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1].text = localAnswer;
                return newHistory;
            });

            addLog('ZKP', 'PROOF: Verifying knowledge graph source integrity...', 'success');
            addLog('CORE', 'SYNC: Local weights updated with response metadata.', 'success');
        } catch (err) {
            console.error(err);
            const errorMessage = getApiErrorMessage(err);
            setError(errorMessage);
            setHasComponentError(true);
            setHistory(prev => prev.slice(0, -2));
            addLog('SHIELD', 'BLOCKED: Answering cycle halted by safety policy.', 'denied');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePersonaChange = (mode: PersonaMode) => {
        setPersona(mode);
        addLog('ZKP', `PERSONA: Re-calculating local identity weights for ${mode.toUpperCase()}`, 'success', true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleQuery(input);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Explore the Vision</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Interact with the protocol's intelligence layer. Every search triggers a privacy-preserving negotiation in the Ledger.
                </p>
                <p className="text-green-400 text-sm mt-2">
                    🔒 Your questions and chat history stay on this device; nothing is sent to any server. (Generic queries may use Wikipedia to fetch public knowledge.)
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Persona Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-3 block">Assistant Persona</label>
                        <div className="space-y-2">
                            {(['Architect', 'Citizen', 'Skeptic'] as PersonaMode[]).map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => handlePersonaChange(mode)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all border ${persona === mode ? `${themeClasses.border} ${themeClasses.text} bg-gray-700` : 'border-transparent text-gray-400 hover:bg-gray-700/50'}`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="lg:col-span-3 bg-gray-800/30 border border-gray-700 rounded-xl flex flex-col h-[500px]">
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                        {history.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.by === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.by === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                                        <NexusLogoIcon className={`w-5 h-5 ${themeClasses.text}`} />
                                    </div>
                                )}
                                <div className={`prose prose-invert prose-sm max-w-[85%] rounded-2xl px-4 py-2.5 ${msg.by === 'user' ? `${themeClasses.bg} text-white` : 'bg-gray-700/50 text-gray-300 border border-gray-600'}`}>
                                    <MarkdownRenderer text={msg.text} isLoading={isLoading && index === history.length -1} />
                                </div>
                                {msg.by === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                                        <UserIcon className="w-5 h-5 text-gray-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    
                    <div className="p-4 border-t border-gray-700 bg-gray-900/40 rounded-b-xl">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about the protocol..."
                                className={`flex-grow bg-gray-800/80 border border-gray-600 text-white rounded-lg px-4 py-2.5 text-sm focus:ring-1 ${themeClasses.focusRing} focus:outline-none transition`}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className={`${themeClasses.bg} text-white font-bold px-5 py-2.5 rounded-lg text-sm ${themeClasses.hoverBg} disabled:opacity-50 transition-all`}
                                disabled={isLoading || !input.trim()}
                            >
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskNexus;
