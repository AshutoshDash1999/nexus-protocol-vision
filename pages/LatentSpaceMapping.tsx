import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Globe, Database, GitBranch, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const LatentSpaceMapping: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Wifi className={`w-12 h-12 ${themeClasses.text}`} />
          </div>
          <h1 className="text-5xl font-bold text-white">Latent Space Mapping</h1>
          <p className="text-2xl text-gray-300">Universal Interoperability Framework</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Enables seamless communication across different AI models by mapping their 
            "latent spaces" - the fundamental concepts and understanding each model possesses.
          </p>
        </div>

        {/* The Problem */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">The Interoperability Problem</h2>
          
          <div className="space-y-4">
            <p className="text-gray-300 text-lg">
              Today's AI ecosystem is siloed. Different models speak different "languages":
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-300">
                  <strong className="text-red-300">GPT-4</strong> understands concepts one way
                </p>
              </div>

              <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-300">
                  <strong className="text-red-300">Claude</strong> processes them differently
                </p>
              </div>

              <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-300">
                  <strong className="text-red-300">Specialized Models</strong> have unique representations
                </p>
              </div>

              <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
                <p className="text-gray-300">
                  <strong className="text-red-300">Result:</strong> Cannot truly collaborate
                </p>
              </div>
            </div>

            <p className="text-gray-400 italic">
              Latent Space Mapping solves this by creating "translation layers" between different models' understanding.
            </p>
          </div>
        </motion.div>

        {/* Core Concept */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-900/30 border border-blue-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Core Concept: Latent Space</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700/50 p-5 rounded-lg">
              <Database className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-bold text-blue-300 mb-2">Embedding Space</h3>
              <p className="text-gray-300 text-sm">
                Each AI model represents concepts as mathematical vectors in a "space". 
                "Dog" might be coordinates (0.7, 0.2, 0.9, ...).
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <GitBranch className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-bold text-purple-300 mb-2">The Gap</h3>
              <p className="text-gray-300 text-sm">
                Different models use different "coordinate systems" for the same concepts. 
                "Dog" in Model A ≠ "Dog" in Model B mathematically.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <Globe className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-bold text-green-300 mb-2">The Bridge</h3>
              <p className="text-gray-300 text-sm">
                Latent Space Mapping learns the transformation to convert one model's 
                representation into another's.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mapping Process */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">How The Mapping Works</h2>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Calibration Phase",
                desc: "Send identical prompts to both models and capture their internal representations (embeddings)"
              },
              {
                step: 2,
                title: "Pattern Analysis",
                desc: "Compare the embeddings to find structural similarities - where do both models 'agree'?"
              },
              {
                step: 3,
                title: "Translation Matrix",
                desc: "Build a mathematical matrix that transforms one model's space into the other's"
              },
              {
                step: 4,
                title: "Verification",
                desc: "Test the mapping with new concepts not in the training set. Ensure translation is accurate"
              },
              {
                step: 5,
                title: "Real-time Usage",
                desc: "When Model A wants to communicate with Model B, transform its thoughts through the translation matrix"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-4 bg-gray-700/50 p-5 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
                {idx < 4 && <ArrowRight className="w-6 h-6 text-gray-500 mt-2 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real-World Applications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-green-900/30 border border-green-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Real-World Applications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Scientific Research</h3>
              <p className="text-gray-300">
                Different specialized models (biology, chemistry, physics) can now share insights 
                and collaborate on interdisciplinary problems without manual translation.
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Multi-Model Consensus</h3>
              <p className="text-gray-300">
                Get answers from multiple models in their native representations, then compare 
                through unified latent spaces for more robust conclusions.
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Zero-Shot Transfer</h3>
              <p className="text-gray-300">
                Train knowledge with one model, transfer to another's latent space, and immediately 
                apply that knowledge without retraining.
              </p>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-3">Federated Intelligence</h3>
              <p className="text-gray-300">
                Multiple organizations' AI systems can collaborate through latent space translation 
                without sharing raw data or training details.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits & Impact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Impact on Nexus Protocol</h2>

          <div className="space-y-3">
            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>True Interoperability:</strong> Nexus agents from different organizations can collaborate as freely as if they were trained together</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Best-of-Breed Selection:</strong> Use the best model for each subtask, seamlessly connected through latent space mapping</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Innovation Acceleration:</strong> New models can integrate into the network instantly without compatibility layers</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Open Ecosystem:</strong> Any organization can contribute AI models that automatically "understand" the Nexus language</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Emergent Intelligence:</strong> Collective intelligence emerges from diverse models thinking in harmony</span>
            </p>
          </div>
        </motion.div>

        {/* Technical Challenges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Technical Frontiers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-300">Dimensionality Mismatch:</strong> Different models have different latent space sizes
              </p>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-300">Semantic Drift:</strong> Meaning changes as data distributions shift over time
              </p>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-300">One-to-Many Mappings:</strong> A concept might map to multiple concepts in target space
              </p>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong className="text-yellow-300">Adversarial Translation:</strong> Ensuring malicious actors can't poison the mapping
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LatentSpaceMapping;
