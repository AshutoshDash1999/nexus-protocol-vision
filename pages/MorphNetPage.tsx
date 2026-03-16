import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, TrendingDown, AlertCircle } from 'lucide-react';
import DynamicOptimizationGraph from '../components/DynamicOptimizationGraph';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const MorphNetPage: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Zap className={`w-12 h-12 ${themeClasses.text}`} />
          </div>
          <h1 className="text-5xl font-bold text-white">MorphNet Engine</h1>
          <p className="text-2xl text-gray-300">Recursive Self-Optimization</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A self-optimizing neural network that dynamically prunes and expands itself 
            based on task complexity, saving energy and improving efficiency.
          </p>
        </div>

        {/* Core Concept */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <span className={`${themeClasses.bg} p-3 rounded-lg`}>
              <Cpu className="w-6 h-6 text-white" />
            </span>
            <span>Smart Scaling Technology</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-2">Small Brain Mode</h3>
              <p className="text-gray-300">
                For routine tasks (checking email, basic scheduling), the system uses a tiny neural network 
                with minimal connections. Result: 10x faster, 90% less energy.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-2">Medium Brain Mode</h3>
              <p className="text-gray-300">
                For moderate complexity (summarizing documents, basic analysis), the system scales up 
                with more connections and processing layers.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Large Brain Mode</h3>
              <p className="text-gray-300">
                For complex reasoning (research synthesis, advanced decisions), the full model engages 
                with all neural connections active. Maximum quality, higher energy cost.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">Auto-Scaling</h3>
              <p className="text-gray-300">
                The system automatically chooses the right mode based on task requirements and carbon budget. 
                You can also manually override for specific needs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Optimization Techniques</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-900/30 to-transparent p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-3">Neural Pruning</h3>
              <p className="text-gray-300 text-sm">
                Remove unused connections in the neural network. If a path never gets activated, 
                delete it to reduce size and speed up computation.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-transparent p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Quantization</h3>
              <p className="text-gray-300 text-sm">
                Convert high-precision numbers (floats) to lower precision. Tiny loss in accuracy, 
                massive gains in speed and memory.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-transparent p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-3">Distillation</h3>
              <p className="text-gray-300 text-sm">
                Compress a large model into a smaller one that mimics its behavior. 
                Student learns from teacher, becomes faster and smaller.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/30 to-transparent p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">Early Exit</h3>
              <p className="text-gray-300 text-sm">
                For easy problems, stop processing early. Don't need full computation if confidence 
                is already high enough.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Real-Time Optimization Dashboard</h2>
          <DynamicOptimizationGraph />
        </motion.div>

        {/* Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-green-900/30 border border-green-700 rounded-2xl p-8 space-y-4"
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingDown className="w-6 h-6 text-green-400" />
            <h3 className="text-2xl font-bold text-green-300">Measured Impact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <p className="font-bold text-green-300">⚡ Energy Reduction</p>
              <p className="text-lg">87% less energy for routine tasks</p>
            </div>
            <div>
              <p className="font-bold text-green-300">⏱️ Speed Improvement</p>
              <p className="text-lg">10x faster response times</p>
            </div>
            <div>
              <p className="font-bold text-green-300">💾 Memory Savings</p>
              <p className="text-lg">80% smaller model size</p>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-900/30 border border-blue-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Nexus Integration</h2>
          
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span><strong>Email Check:</strong> Small brain ({"<"} 1 second, 0.01 kWh)</span>
            </p>
            <p className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span><strong>Document Summary:</strong> Medium brain (2-5 seconds, 0.1 kWh)</span>
            </p>
            <p className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span><strong>Research Analysis:</strong> Large brain (10-30 seconds, 1 kWh)</span>
            </p>
            <p className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
              <span><strong>Learning New Skill:</strong> Adaptive (starts small, grows as need increases)</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MorphNetPage;
