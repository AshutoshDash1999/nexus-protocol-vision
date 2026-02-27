
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircleIcon, DownloadIcon, RefreshIcon, CheckmarkIcon, CopyIcon } from './icons';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { ActionType } from './DiveDeeper';
import MarkdownRenderer from './MarkdownRenderer';
import { GoogleGenAI } from '@google/genai';
import { NEXUS_PROTOCOL_CONTEXT } from '../constants';

interface ProjectDetailsModalProps {
    type: ActionType;
    onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ type, onClose }) => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState<string>('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!type) return;
        
        const fetchContent = async () => {
            setLoading(true);
            setContent('');
            try {
                if (type === 'whitepaper') {
                    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                    const response = await ai.models.generateContent({
                        model: 'gemini-3-flash-preview',
                        contents: `Write a 500-word academic Whitepaper Abstract for the Nexus Protocol. Use sections like: 1. Executive Summary, 2. The Sovereignty Problem, 3. Proposed Architecture (MorphNet & MPC), 4. Ethical Guardrails. Make it sound highly professional and visionary. Use Markdown formatting. Context:\n${NEXUS_PROTOCOL_CONTEXT}`,
                    });
                    setContent(response.text || 'Failed to generate abstract.');
                } else if (type === 'code') {
                    // Predefined code simulation
                    setContent(`// Nexus Protocol Core: MorphNet Pruning Logic
// Version 1.2.0-alpha

import { NeuralOptimizer, ZKPClient } from '@nexus/core';

export class SovereignNode extends NodeBase {
  private persona: CognitiveGraph;

  constructor(config: NodeConfig) {
    super(config);
    this.persona = new CognitiveGraph(config.localPath);
  }

  /**
   * Dynamically adjust compute complexity
   * based on task semantic weight.
   */
  async process(instruction: Intent): Promise<Result> {
    const complexity = NeuralOptimizer.evaluate(instruction);
    
    if (complexity === 'LOW') {
      return this.morphNet.prune().execute(instruction);
    }
    
    return this.morphNet.scaleUp().execute(instruction);
  }

  /**
   * Negotiate with external agents via Zero-Knowledge Proofs
   */
  async negotiate(target: Agent, query: string) {
    const proof = await ZKPClient.generateProof(this.persona.identity);
    return target.authorize(proof);
  }
}`);
                }
            } catch (err) {
                setContent('Error loading module. Please ensure protocol connection is stable.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [type]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!type) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-gray-950/90 backdrop-blur-xl"
            >
                <motion.div
                    initial={{ scale: 0.95, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 20, opacity: 0 }}
                    className="bg-gray-900 border border-gray-700 w-full max-w-6xl h-full max-h-[90vh] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${themeClasses.text}`}>
                                Nexus Protocol {type.toUpperCase()}
                            </span>
                            <div className="h-4 w-[1px] bg-gray-700"></div>
                            <span className="text-xs text-gray-500 font-mono">v1.2.0-stable</span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white">
                            <XCircleIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-grow overflow-y-auto p-6 md:p-12">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center space-y-4">
                                <div className={`w-12 h-12 border-4 border-t-transparent ${themeClasses.border} rounded-full animate-spin`}></div>
                                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Decrypting Module...</span>
                            </div>
                        ) : (
                            <div className="animate-fade-in">
                                {type === 'whitepaper' && (
                                    <div className="max-w-3xl mx-auto prose prose-invert prose-indigo">
                                        <MarkdownRenderer text={content} />
                                        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center">
                                            <p className="text-xs text-gray-500 font-serif italic">This document is a generated simulation of the Nexus Protocol framework.</p>
                                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm hover:border-gray-500 transition-all`}>
                                                <DownloadIcon className="w-4 h-4" />
                                                Download PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {type === 'code' && (
                                    <div className="relative group">
                                        <div className="absolute top-4 right-4 z-20">
                                            <button onClick={handleCopy} className="p-2 bg-gray-800/80 rounded-md border border-gray-700 hover:border-gray-500 text-gray-400 transition-all">
                                                {copied ? <CheckmarkIcon className={`w-4 h-4 ${themeClasses.text}`} /> : <CopyIcon className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <pre className="bg-gray-950 p-8 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto border border-gray-800 text-indigo-300">
                                            <code>{content}</code>
                                        </pre>
                                        <div className="mt-4 flex gap-4 text-[10px] font-mono text-gray-600 uppercase">
                                            <span>File: protocol_core.ts</span>
                                            <span>Language: TypeScript</span>
                                            <span>Pruning Efficiency: 94%</span>
                                        </div>
                                    </div>
                                )}
                                {type === 'community' && (
                                    <div className="h-full flex flex-col items-center justify-center space-y-10">
                                        <div className="relative w-64 h-64 md:w-96 md:h-96">
                                            {/* Simulated Network Map */}
                                            <div className={`absolute inset-0 border-[1px] border-dashed ${themeClasses.border} rounded-full opacity-20 animate-[spin_60s_linear_infinite]`}></div>
                                            <div className={`absolute inset-10 border-[1px] border-dashed ${themeClasses.border} rounded-full opacity-30 animate-[spin_40s_linear_infinite_reverse]`}></div>
                                            <div className={`absolute inset-0 flex items-center justify-center`}>
                                                <div className={`w-4 h-4 ${themeClasses.bg} rounded-full shadow-[0_0_30px_${themeClasses.shadow}] animate-pulse`}></div>
                                            </div>
                                            {/* Random Nodes */}
                                            {[...Array(8)].map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className="absolute w-2 h-2 bg-white rounded-full opacity-60"
                                                    style={{ 
                                                        top: `${50 + 40 * Math.sin(i * (Math.PI * 2 / 8))}%`, 
                                                        left: `${50 + 40 * Math.cos(i * (Math.PI * 2 / 8))}%` 
                                                    }}
                                                >
                                                    <div className={`absolute -inset-1 border border-white/20 rounded-full animate-ping`}></div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center space-y-2">
                                            <h3 className="text-2xl font-bold text-white">41,208 Nodes Active</h3>
                                            <p className="text-gray-500 max-w-sm">The Nexus Mesh is expanding. Your Sovereign Persona is waiting to be instantiated.</p>
                                            <div className="pt-6">
                                                <button className={`${themeClasses.bg} text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest ${themeClasses.hoverBg} transition-all`}>
                                                    Initialize Connection
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer / Status Bar */}
                    <div className="p-4 bg-gray-950 border-t border-gray-800 flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                           <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Encryption: AES-4096</span>
                           </div>
                           <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">Connection: Peer-to-Peer</span>
                           </div>
                        </div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                            Secure Session ID: NX-992-ALPHA
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProjectDetailsModal;
