
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { useGraphComplexity } from '../contexts/GraphComplexityContext';

const DynamicOptimizationGraph: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    const { complexity } = useGraphComplexity();

    const stats = useMemo(() => {
        if (complexity === 'complex') return { neurons: '1.2B', energy: 'High', efficiency: '92%', mode: 'Reasoning' };
        if (complexity === 'simple') return { neurons: '150M', energy: 'Minimal', efficiency: '98%', mode: 'Pruned' };
        return { neurons: '0', energy: 'Zero', efficiency: '100%', mode: 'Standby' };
    }, [complexity]);

    const nodePositions = [
        { top: '50%', left: '10%' },
        { top: '20%', left: '35%' }, { top: '50%', left: '35%' }, { top: '80%', left: '35%' },
        { top: '20%', left: '65%' }, { top: '50%', left: '65%' }, { top: '80%', left: '65%' },
        { top: '50%', left: '90%' },
    ];
    
    const simpleConnections = [ [0, 1], [0, 2], [2, 5], [5, 7] ];
    const complexConnections = [
        [0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 4], [2, 5], [2, 6], [3, 5], [3, 6],
        [4, 7], [5, 7], [6, 7]
    ];
    
    const isNodeActive = (index: number) => {
        if (complexity === 'complex') return true;
        if (complexity === 'simple') return [0, 1, 2, 5, 7].includes(index);
        return false;
    };

    const activeConnections = complexity === 'simple' ? simpleConnections : (complexity === 'complex' ? complexConnections : []);
    const complexityColorClass = complexity === 'simple' ? 'bg-rose-500' : themeClasses.bg;

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Recursive Optimization: MorphNet</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    The protocol dynamically prunes its neural architecture based on task intensity. This simulation shows real-time resource allocation.
                </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Telemetry Dashboard */}
                <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
                    {[
                        { label: 'Neural Density', value: stats.neurons },
                        { label: 'Energy State', value: stats.energy },
                        { label: 'Throughput', value: stats.efficiency },
                        { label: 'Compute Mode', value: stats.mode },
                    ].map((stat, i) => (
                        <div key={i} className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 flex flex-col justify-center">
                            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{stat.label}</span>
                            <span className={`text-xl font-mono font-bold mt-1 ${complexity !== 'idle' ? themeClasses.text : 'text-gray-600'}`}>
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* The Visual Graph */}
                <div className="lg:col-span-2 aspect-video bg-gray-950 border border-gray-800 rounded-xl p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(31,41,55,0.4)_0,transparent_100%)]"></div>
                    
                    <div className="w-full h-full relative z-10">
                        {/* Background Connections */}
                        {complexConnections.map(conn => {
                            const [i1, i2] = conn;
                            const p1 = nodePositions[i1];
                            const p2 = nodePositions[i2];
                            const top = parseFloat(p1.top);
                            const left = parseFloat(p1.left);
                            const top2 = parseFloat(p2.top);
                            const left2 = parseFloat(p2.left);
                            const angle = Math.atan2(top2 - top, left2 - left) * 180 / Math.PI;
                            const length = Math.sqrt(Math.pow(left2 - left, 2) + Math.pow(top2 - top, 2));
                            return (
                                <div
                                    key={`bg-${i1}-${i2}`}
                                    className="absolute h-[1px] bg-gray-800 origin-left"
                                    style={{ top: p1.top, left: p1.left, width: `${length}%`, transform: `rotate(${angle}deg)`}}
                                />
                            );
                        })}

                        {/* Active Connections */}
                        <AnimatePresence>
                            {activeConnections.map(conn => {
                                const [i1, i2] = conn;
                                const p1 = nodePositions[i1];
                                const p2 = nodePositions[i2];
                                const top = parseFloat(p1.top);
                                const left = parseFloat(p1.left);
                                const top2 = parseFloat(p2.top);
                                const left2 = parseFloat(p2.left);
                                const angle = Math.atan2(top2 - top, left2 - left) * 180 / Math.PI;
                                const length = Math.sqrt(Math.pow(left2 - left, 2) + Math.pow(top2 - top, 2));
                                return (
                                    <motion.div
                                        key={`active-${i1}-${i2}`}
                                        initial={{ opacity: 0, scaleX: 0 }}
                                        animate={{ opacity: 1, scaleX: 1 }}
                                        exit={{ opacity: 0, scaleX: 0 }}
                                        className={`absolute h-[2px] origin-left ${complexityColorClass} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                                        style={{ top: p1.top, left: p1.left, width: `${length}%`, transform: `rotate(${angle}deg)`}}
                                    />
                                );
                            })}
                        </AnimatePresence>

                        {/* Nodes */}
                        {nodePositions.map((pos, index) => {
                             const isActive = isNodeActive(index);
                             const nodeBgClass = complexity === 'simple' ? 'bg-rose-500' : themeClasses.bg;
                             return (
                                <div
                                    key={index}
                                    className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                                    style={{ top: pos.top, left: pos.left }}
                                >
                                    <div className="absolute inset-0 w-full h-full rounded-full bg-gray-900 border border-gray-700" />
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className={`absolute inset-0 w-full h-full rounded-full ${nodeBgClass} opacity-80 shadow-[0_0_15px_${nodeBgClass}]`}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                             );
                        })}
                    </div>
                    
                    {/* Status Overlay */}
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                        <span className={`px-2 py-0.5 rounded border border-gray-700 text-[8px] font-mono font-bold tracking-tighter ${complexity !== 'idle' ? 'text-green-400 border-green-400/30' : 'text-gray-500'}`}>
                            {complexity === 'idle' ? 'ENGINE: IDLE' : `ENGINE: ${complexity.toUpperCase()}`}
                        </span>
                        <span className="px-2 py-0.5 rounded border border-gray-700 text-[8px] font-mono font-bold tracking-tighter text-gray-500">
                            OPTIMIZATION: 0.82
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicOptimizationGraph;
