
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const NexusReport: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);

    return (
        <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center">
                <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ${themeClasses.text} mb-2 block`}>Strategic Analysis</span>
                <h2 className="text-4xl font-extrabold text-white">Project Vision Report</h2>
                <div className="h-1 w-24 bg-gray-800 mx-auto mt-4 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className={`w-1/2 h-full ${themeClasses.bg}`}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300">
                {/* 1. Brief about the idea */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className={`w-1 h-6 ${themeClasses.bg} rounded-full`}></span>
                        Brief about the Idea
                    </h3>
                    <p className="text-sm leading-relaxed font-light">
                        The Nexus Protocol is a decentralized, agentic operating layer designed to sit between the user and the digital world. It shifts the paradigm from "AI as a tool" to "AI as Infrastructure." By creating a <strong>Sovereign Persona</strong>—a local-first, digital twin—Nexus ensures cognitive agency remains with the individual rather than centralized cloud providers.
                    </p>
                </section>

                {/* 2. Opportunities */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className={`w-1 h-6 ${themeClasses.bg} rounded-full`}></span>
                        Opportunities
                    </h3>
                    <ul className="text-sm space-y-2 list-disc list-inside font-light">
                        <li><strong>Hyper-Personalization:</strong> Context-aware reasoning without data leakage.</li>
                        <li><strong>Carbon-Aware Computing:</strong> Drastic reduction in inference energy costs.</li>
                        <li><strong>Autonomous Negotiation:</strong> A new economy based on agent-to-agent MPC handshakes.</li>
                    </ul>
                </section>

                {/* 3. Differentiation */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className={`w-1 h-6 ${themeClasses.bg} rounded-full`}></span>
                        Competitive Edge
                    </h3>
                    <p className="text-sm leading-relaxed font-light">
                        Unlike existing monolithic models (ChatGPT, Claude), Nexus is <strong>recursive</strong>. It scales its own brain (MorphNet) to match the task intensity. It doesn't just process data; it manages the <em>privacy</em> of that data through Zero-Knowledge Proofs (ZKP), making it the first truly "trustless" AI partner.
                    </p>
                </section>

                {/* 4. Problem Solving */}
                <section className="space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className={`w-1 h-6 ${themeClasses.bg} rounded-full`}></span>
                        Problem Solving
                    </h3>
                    <p className="text-sm leading-relaxed font-light">
                        The protocol neutralizes three core risks:
                        <br/>1. <strong>Privacy Decay:</strong> Federated Learning keeps raw data local.
                        <br/>2. <strong>Resource Waste:</strong> Pruning architecture saves up to 80% energy.
                        <br/>3. <strong>Security Gaps:</strong> The Semantic Immune System detects malicious intent, not just bad keywords.
                    </p>
                </section>
            </div>

            {/* Use Case & Process Flow */}
            <div className="bg-gray-800/20 border border-gray-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Process Flow & Architecture</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="bg-gray-950 p-6 rounded-xl border border-gray-800 font-mono text-[10px]">
                            <p className="text-gray-500 mb-4 uppercase tracking-widest font-bold">Flow Diagram: Handshake Request</p>
                            <div className="space-y-2">
                                <p className="text-white">1. [USER_INPUT] -{'>'} SHIELD_LAYER (Intent Analysis)</p>
                                <p className={`ml-4 ${themeClasses.text}`}>- IF (Threat {'>'} 0.5) -{'>'} QUARANTINE</p>
                                <p className="text-white">2. [LOGIC_BLOCK] -{'>'} MORPHNET (Complexity Scaling)</p>
                                <p className={`ml-4 ${themeClasses.text}`}>- Evaluation: "Reasoning" or "Pruned"</p>
                                <p className="text-white">3. [EXECUTION] -{'>'} MPC_NEGOTIATOR (ZKP Validation)</p>
                                <p className="text-white">4. [OUTPUT] -{'>'} SOVEREIGN_PERSONA (Local Storage)</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            The process flow ensures every request is vetted for intent before a single neuron fires at full capacity.
                        </p>
                    </div>

                    <div className="relative h-64 border border-gray-800 rounded-xl bg-gray-950 overflow-hidden flex items-center justify-center">
                        {/* Visual Architecture Representation */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="flex gap-4">
                                <div className="w-16 h-16 rounded bg-gray-800 border border-gray-700 flex items-center justify-center text-[8px] text-center p-1">Sovereign Persona</div>
                                <div className={`w-16 h-16 rounded ${themeClasses.bg} border border-white/20 flex items-center justify-center text-[8px] text-center p-1 text-white shadow-lg`}>Core Gemini Engine</div>
                                <div className="w-16 h-16 rounded bg-gray-800 border border-gray-700 flex items-center justify-center text-[8px] text-center p-1">SHIELD Monitor</div>
                             </div>
                             <div className="w-full h-1 bg-gray-800 relative">
                                <motion.div 
                                    animate={{ left: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className={`absolute top-0 w-8 h-full ${themeClasses.bg} shadow-[0_0_10px_white]`}
                                />
                             </div>
                             <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Universal Interoperable Layer</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack & Implementation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
                    <h4 className={`text-xs font-bold uppercase ${themeClasses.text} mb-4 tracking-[0.2em]`}>Technologies</h4>
                    <ul className="text-sm space-y-2 text-gray-400 font-mono">
                        <li>• Google Gemini 3 Flash</li>
                        <li>• Gemini 2.5 Flash Image</li>
                        <li>• React 18 + TypeScript</li>
                        <li>• Tailwind CSS v3</li>
                        <li>• Framer Motion (State-SVG)</li>
                    </ul>
                </div>
                <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
                    <h4 className={`text-xs font-bold uppercase ${themeClasses.text} mb-4 tracking-[0.2em]`}>AMD Synergy</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        The Nexus Protocol is optimized for <strong>AMD EPYC™</strong> processors and <strong>Instinct™ MI300</strong> accelerators in the decentralized mesh, leveraging high core counts for multi-agent MPC negotiations and large memory bandwidth for local-first persona twin hosting.
                    </p>
                </div>
                <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
                    <h4 className={`text-xs font-bold uppercase ${themeClasses.text} mb-4 tracking-[0.2em]`}>Est. Cost & Scale</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        <strong>Prototype:</strong> $0.00 (Developer Credits)
                        <br/><strong>Alpha Node:</strong> $4,500 (Base HW)
                        <br/><strong>Enterprise:</strong> $2M+ (Regional Mesh)
                        <br/><br/>
                        <em>Scalability: O(log n) due to Recursive Pruning.</em>
                    </p>
                </div>
            </div>

            <div className="text-center pb-20">
                <p className="text-xs text-gray-600 uppercase tracking-widest">End of Report - Version 1.2.0-Vision</p>
            </div>
        </div>
    );
};

export default NexusReport;
