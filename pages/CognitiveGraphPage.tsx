import React from 'react';
import { motion } from 'framer-motion';
import { Network, Brain, Zap, Eye, AlertCircle } from 'lucide-react';
import RealTimeCognitiveGraph from '../components/RealTimeCognitiveGraph';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const CognitiveGraphPage: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Network className={`w-12 h-12 ${themeClasses.text}`} />
          </div>
          <h1 className="text-5xl font-bold text-white">Cognitive Graph</h1>
          <p className="text-2xl text-gray-300">Dynamic Knowledge Mapping System</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real-time visualization and tracking of your knowledge landscape, identifying patterns, 
            gaps, and growth opportunities across your professional and personal domains.
          </p>
        </div>

        {/* What Is It */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
            <span className={`${themeClasses.bg} p-3 rounded-lg`}>
              <Brain className="w-6 h-6 text-white" />
            </span>
            <span>The Knowledge Network</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-blue-400">Concept</h3>
              <p className="text-gray-300">
                A Cognitive Graph is like a "map of your brain." Each node represents a concept or skill you know 
                (e.g., "React", "TypeScript", "Leadership"). Lines (edges) connect related concepts. The system 
                uses this to understand not just WHAT you know, but HOW those things relate.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-blue-400">Why It Matters</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span><strong>Personalized Learning:</strong> Recommends skills based on what you know</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span><strong>Gap Detection:</strong> Identifies what's missing between you and your goals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-400 mt-1">→</span>
                  <span><strong>Context Preservation:</strong> Remembers connections between concepts</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">How It's Measured</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-400 mb-2">Nodes (Concepts)</h3>
              <p className="text-gray-300">
                Each concept you've learned—like "Python", "Database Design", or "Team Leadership"—is a node. 
                The system tracks how confident you are on each (0-100%). It shows not just knowledge, but 
                expertise level.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-400 mb-2">Edges (Connections)</h3>
              <p className="text-gray-300">
                Links between concepts show relationships. "REST APIs" connects to both "JavaScript" and 
                "Database Design". Stronger connections = tighter relationships. The system learns these patterns.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-400 mb-2">Confidence Scoring</h3>
              <p className="text-gray-300">
                Every node has a confidence score. High confidence = you know it well. Low = you're still learning. 
                The system actively works to improve low-confidence areas aligned with your goals.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Domains</h3>
              <p className="text-gray-300">
                Knowledge is organized by domain: Technical, Professional, Creative, Environmental, etc. 
                The system shows which domains are your strengths and which need growth.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real-Time Visualization */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Live Visualization</h2>
          <RealTimeCognitiveGraph className="bg-gray-800/50 rounded-2xl" />
        </motion.div>

        {/* How to Use */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">How to Use It</h2>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Step 1: Add Skills/Concepts</h3>
              <p className="text-gray-300">
                Define what you know and want to learn. This creates the initial nodes in your graph.
                Example: React, JavaScript, Team Leadership, Data Science.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Step 2: Rate Your Confidence</h3>
              <p className="text-gray-300">
                For each skill, indicate your proficiency level (Beginner, Intermediate, Advanced, Expert). 
                The system starts learning your baseline knowledge level.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Step 3: Track Learning Activities</h3>
              <p className="text-gray-300">
                As you learn, do projects, or practice, log these activities. The system updates your confidence 
                scores and builds connections between concepts you're using together.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Step 4: Analyze Insights</h3>
              <p className="text-gray-300">
                View your knowledge graph visualization. Identify clusters of strong skills, isolated concepts, 
                and critical gaps between current state and your goal state.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-2">Step 5: Get Recommendations</h3>
              <p className="text-gray-300">
                Based on your graph, the system recommends what to learn next. "To advance in AI Engineering, 
                you should strengthen your Graph Theory knowledge."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Example Scenario */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-900/30 border border-blue-700 rounded-2xl p-8 space-y-4"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-blue-300">Real Example</h3>
          </div>

          <div className="text-gray-300 space-y-3">
            <p>
              <strong>Your Profile:</strong> Software Engineer with 3 years experience in React, but want to transition to Data Science.
            </p>
            <p>
              <strong>Your Cognitive Graph:</strong> "React" (Expert), "TypeScript" (Advanced), "Python" (Beginner), 
              "Statistics" (None), "Machine Learning" (None).
            </p>
            <p>
              <strong>System Analysis:</strong> Recognizes you have strong programming fundamentals. Identifies Python 
              and Statistics as critical bridges to Data Science.
            </p>
            <p>
              <strong>Recommendation:</strong> "Master Python (use existing programming skills), then learn Statistics. 
              After that, your React experience with component design will help with ML model architecture."
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Eye className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">Self-Awareness</h3>
            </div>
            <p className="text-gray-300">
              Get a clear picture of your strengths, weaknesses, and learning trajectory. No more guessing 
              where you stand in your field.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Efficient Learning</h3>
            </div>
            <p className="text-gray-300">
              Learn in the optimal order—building on existing knowledge rather than jumping randomly. 
              Faster skill acquisition and deeper understanding.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CognitiveGraphPage;
