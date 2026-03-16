import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Battery, Clock, AlertCircle } from 'lucide-react';
import RealTimeCarbonAware from '../components/RealTimeCarbonAware';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const CarbonAwarePage: React.FC = () => {
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
          <h1 className="text-5xl font-bold text-white">Carbon-Aware Optimization</h1>
          <p className="text-2xl text-gray-300">Sustainable AI Computing</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real-time environmental impact monitoring and optimization. The system tracks energy consumption, 
            carbon emissions, and recommends optimization strategies to minimize your digital footprint.
          </p>
        </div>

        {/* The Problem */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-900/30 border border-yellow-700 rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-yellow-300">Why Carbon Awareness Matters</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-yellow-300">Did you know?</strong> Training a single large AI model can produce 
              as much CO₂ as 125 round-trip transatlantic flights.
            </p>
            <p>
              Every computation has a cost—not just financial, but environmental. Most AI systems ignore this entirely, 
              running at full power regardless of the time of day or the grid's energy mix.
            </p>
            <p>
              <strong className="text-yellow-300">The Nexus Solution:</strong> Consider energy sources in real-time. 
              If renewable energy is abundant, compute now. If it's scarce, defer non-critical tasks or reduce complexity.
            </p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Core Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-blue-500 space-y-3">
              <div className="flex items-center space-x-3">
                <Battery className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Energy Usage (kWh)</h3>
              </div>
              <p className="text-gray-300">
                Raw energy consumed by computation. Measured in kilowatt-hours. The system tracks this per 
                operation and per time period.
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-green-500 space-y-3">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">Carbon Emission (kg CO₂)</h3>
              </div>
              <p className="text-gray-300">
                Converted energy to carbon impact. Depends on your grid's energy mix (coal = high CO₂, renewables = low).
                Real-time grid data improves accuracy.
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-purple-500 space-y-3">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Efficiency Score (0-100%)</h3>
              </div>
              <p className="text-gray-300">
                How efficiently a computation was executed. 100% = perfect, 50% = twice the resources needed. 
                Guides optimization.
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-yellow-500 space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold text-white">Temporal Awareness</h3>
              </div>
              <p className="text-gray-300">
                Knows when renewable energy is abundant in your region. Can schedule tasks to align with 
                low-carbon windows.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Optimization Strategies */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">How It Optimizes</h2>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-2">1. Model Pruning</h3>
              <p className="text-gray-300">
                Simplify your AI model for routine tasks. A complex model uses 10x more energy. 
                Use it only when necessary (using MorphNet Engine).
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-2">2. Batch Processing</h3>
              <p className="text-gray-300">
                Group similar computations together. Processing 100 requests in one batch = more efficient 
                than processing separately.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-2">3. Task Scheduling</h3>
              <p className="text-gray-300">
                Defer non-urgent tasks to times when grid is powered by renewables. 
                "I'll process your reports at 3 AM when wind turbines are spinning."
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">4. Caching & Reuse</h3>
              <p className="text-gray-300">
                Cache computation results. If you ask the same question twice, use the cached answer instead 
                of recomputing.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-300 mb-2">5. Graceful Degradation</h3>
              <p className="text-gray-300">
                If carbon is high, offer you a lower-resolution answer quickly instead of a perfect answer slowly. 
                You choose the trade-off.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real-Time Tracking */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Carbon Impact Dashboard</h2>
          <RealTimeCarbonAware className="bg-gray-800/50 rounded-2xl" />
        </motion.div>

        {/* User Control */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">You're in Control</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Set Your Carbon Budget</h3>
              <p className="text-gray-300 text-sm mb-3">
                Define a monthly or daily carbon limit. The system prioritizes tasks accordingly:
              </p>
              <div className="bg-gray-800 p-3 rounded text-sm text-blue-300 font-mono space-y-1">
                <div>Monthly Budget: 10 kg CO₂</div>
                <div>Current Usage: 3.5 kg CO₂ (35%)</div>
                <div>Remaining Capacity: 6.5 kg</div>
              </div>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-green-400 mb-3">Quality vs. Carbon Trade-off</h3>
              <p className="text-gray-300 text-sm mb-3">
                Choose your preference:
              </p>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• <strong>Eco Mode:</strong> Lowest carbon, fastest</div>
                <div>• <strong>Balanced:</strong> Good quality, moderate carbon</div>
                <div>• <strong>Quality Mode:</strong> Best results, higher carbon</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Impact Examples */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-green-900/30 border border-green-700 rounded-2xl p-8 space-y-4"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-2xl font-bold text-green-300">Real Impact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="font-bold text-green-300 mb-2">✓ Without Carbon Awareness:</p>
              <p className="text-sm">Running AI model 24/7 = ~50 kg CO₂/month (1600 kg CO₂/year)</p>
            </div>
            <div>
              <p className="font-bold text-green-300 mb-2">✓ With Carbon Awareness:</p>
              <p className="text-sm">Smart scheduling + pruning = ~15 kg CO₂/month (180 kg CO₂/year)</p>
            </div>
            <div className="col-span-1 md:col-span-2 pt-4 border-t border-green-700">
              <p className="text-lg">
                <strong className="text-green-300">Net Savings:</strong> 1,420 kg CO₂/year = equivalent to taking 
                a car off the road for 3 months!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarbonAwarePage;
