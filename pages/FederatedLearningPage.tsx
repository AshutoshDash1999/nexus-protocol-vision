import React from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, Lock, TrendingUp, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const FederatedLearningPage: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className={`w-12 h-12 ${themeClasses.text}`} />
          </div>
          <h1 className="text-5xl font-bold text-white">Federated Learning</h1>
          <p className="text-2xl text-gray-300">Privacy-Preserving Collaborative Learning</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Learn together without sharing raw data. Each participant learns locally, 
            and only mathematical updates are shared to improve the global model.
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
              <Users className="w-6 h-6 text-white" />
            </span>
            <span>How Federated Learning Works</span>
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-2">1. Local Learning</h3>
              <p className="text-gray-300">
                Each device (yours, mine, someone else's) trains an AI model using its own local data. 
                Gmail learns from YOUR emails on YOUR device. No one else sees them.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-2">2. Extract Updates</h3>
              <p className="text-gray-300">
                Instead of sharing raw data, we extract "updates": 
                "Here's how email patterns changed on this device." These updates are mathematical, not human-readable.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-2">3. Aggregate</h3>
              <p className="text-gray-300">
                Millions of devices send their updates to a central aggregator. 
                The aggregator combines them into one global update without seeing individual data.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">4. Improve Global Model</h3>
              <p className="text-gray-300">
                The global model improves from the aggregate. 
                Everyone gets a better model that learned from billions of private interactions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real Examples */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Real-World Applications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-900/30 to-transparent p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-3">Email Filtering</h3>
              <p className="text-gray-300 text-sm">
                Gmail learns from YOUR emails to filter spam. Model improves from millions of users 
                without Google ever seeing your private emails.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-transparent p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Keyboard Prediction</h3>
              <p className="text-gray-300 text-sm">
                Your phone learns from your typing patterns locally. Sends only model improvements 
                to improve typing prediction globally.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-transparent p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-3">Healthcare Research</h3>
              <p className="text-gray-300 text-sm">
                Hospitals train models on their patients' data locally. Share only statistical findings, 
                not individual medical records.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/30 to-transparent p-6 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">Fraud Detection</h3>
              <p className="text-gray-300 text-sm">
                Banks learn from transaction patterns locally. Models improve globally 
                without sharing customer financial data.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Lock className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Privacy Preserved</h3>
            </div>
            <p className="text-gray-300">
              Raw data never leaves your device. Only mathematical updates are shared, 
              which are impossible to reverse back to original data.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Share2 className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Collaborative</h3>
            </div>
            <p className="text-gray-300">
              Everyone benefits from everyone's data (insights, not raw data). 
              The global model gets smarter from billions of private interactions.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Decentralized</h3>
            </div>
            <p className="text-gray-300">
              No central authority controls all the data. Learning happens at the edge, 
              reducing dependence on centralized servers.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Compliant</h3>
            </div>
            <p className="text-gray-300">
              Meets GDPR, HIPAA, and other regulations since personal data doesn't leave your device. 
              Only aggregated insights are shared.
            </p>
          </div>
        </motion.div>

        {/* How Nexus Uses It */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-900/30 border border-blue-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Nexus Protocol Integration</h2>
          <p className="text-gray-300 text-lg">
            Your Sovereign Persona uses Federated Learning to:
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <span>Learn from your personal interactions without uploading raw data</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <span>Contribute to global intelligence while maintaining privacy</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <span>Stay in sync with global knowledge without compromising personal autonomy</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
              <span>Enable differential privacy guarantees</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default FederatedLearningPage;
