import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, Users, TrendingUp, CheckCircle } from 'lucide-react';
import RealTimePrivacyNegotiator from '../components/RealTimePrivacyNegotiator';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const PrivacyNegotiatorPage: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className={`w-12 h-12 ${themeClasses.text}`} />
          </div>
          <h1 className="text-5xl font-bold text-white">Privacy Negotiator</h1>
          <p className="text-2xl text-gray-300">Cryptographic Communication Protocol</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Autonomous agent that negotiates with external systems on your behalf using advanced cryptographic 
            techniques—Multi-Party Computation and Zero-Knowledge Proofs—to achieve your goals while protecting your privacy.
          </p>
        </div>

        {/* Problem Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-700 rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-red-300">The Problem It Solves</h2>
          <p className="text-gray-300 text-lg">
            Today, when you interact with external systems (a hospital, a bank, a city's traffic system), 
            you usually have to share your personal information directly. They see your data, store it, and 
            potentially misuse it. <strong>The Privacy Negotiator changes this.</strong>
          </p>
          <p className="text-gray-300 text-lg mt-4">
            Instead of you handing over data and hoping for the best, your Sovereign Persona negotiates on 
            your behalf using cryptographic protocols that prove you're trustworthy WITHOUT revealing the data 
            they need to verify.
          </p>
        </motion.div>

        {/* Core Technologies */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">The Cryptographic Arsenal</h2>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-blue-500 space-y-3">
              <div className="flex items-center space-x-3">
                <Key className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Multi-Party Computation (MPC)</h3>
              </div>
              <p className="text-gray-300">
                Imagine multiple parties need to compute something together, but each wants to keep their data secret. 
                MPC allows this. Example: A healthcare system wants to identify disease patterns WITHOUT downloading anyone's 
                medical records. Instead, encrypted data from multiple hospitals compute together, producing results nobody 
                can individually see.
              </p>
              <div className="bg-gray-800 p-3 rounded text-sm text-blue-300 font-mono">
                Hospital A: {'{encrypted_patient_data}'} <br/>
                Hospital B: {'{encrypted_patient_data}'} <br/>
                System computes without decrypting → Result: Disease patterns (secure!)
              </div>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-purple-500 space-y-3">
              <div className="flex items-center space-x-3">
                <Lock className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Zero-Knowledge Proofs (ZKP)</h3>
              </div>
              <p className="text-gray-300">
                Prove something WITHOUT revealing the information being proven. Example: Prove you're over 18 without 
                showing your birth certificate or birthday. Or prove you're creditworthy without revealing your salary.
              </p>
              <div className="bg-gray-800 p-3 rounded text-sm text-purple-300">
                ✓ "I have a valid ID" (verified without showing the ID)<br/>
                ✓ "My credit score is above 700" (verified without sharing it)<br/>
                ✓ "I have $10,000 in savings" (verified without showing account number)
              </div>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg border-l-4 border-green-500 space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-white">Secure Aggregation</h3>
              </div>
              <p className="text-gray-300">
                Combine data from multiple sources into aggregate statistics WITHOUT any party seeing individual data. 
                Perfect for creating system-wide insights while protecting individual privacy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">The Negotiation Process (5 Steps)</h2>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-2">1. Request Received</h3>
              <p className="text-gray-300">
                An external system (e.g., a hospital) needs information from you. They send a negotiation request 
                through the Privacy Negotiator.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-2">2. Privacy Boundary Check</h3>
              <p className="text-gray-300">
                Your Privacy Negotiator evaluates: "Do they need the raw data or just proof of something?" 
                Can we use cryptography instead?
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-2">3. Cryptographic Protocol Selection</h3>
              <p className="text-gray-300">
                If possible, the system selects the best crypto approach: MPC, ZKP, or Secure Aggregation 
                that meets both parties' needs while protecting your data.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">4. Secure Computation</h3>
              <p className="text-gray-300">
                Data is encrypted, processed securely, and proofs are generated WITHOUT your raw data ever being exposed.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-300 mb-2">5. Result Delivered</h3>
              <p className="text-gray-300">
                The external system gets what they need (secure proof, aggregated data, etc.), and your privacy 
                remains intact. Negotiation complete!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real Examples */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Real-World Examples</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900/30 to-transparent p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-blue-300 mb-2">Scenario 1: Healthcare Access</h3>
              <p className="text-gray-300 mb-3">
                <strong>Traditional Way:</strong> Share your entire medical history with insurance company.
              </p>
              <p className="text-gray-300">
                <strong>Privacy Negotiator Way:</strong> Prove you're not on medications that disqualify you 
                (using ZKP) WITHOUT revealing your diagnoses or medication names.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-transparent p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Scenario 2: Loan Approval</h3>
              <p className="text-gray-300 mb-3">
                <strong>Traditional Way:</strong> Banks download your entire financial history.
              </p>
              <p className="text-gray-300">
                <strong>Privacy Negotiator Way:</strong> Prove your credit score is above the requirement 
                (using ZKP) and that your income is stable (using secure aggregation across employers) 
                WITHOUT revealing salary, account balances, or transaction history.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-transparent p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-bold text-green-300 mb-2">Scenario 3: Smart City Traffic</h3>
              <p className="text-gray-300 mb-3">
                <strong>Traditional Way:</strong> City tracks your exact location and movements.
              </p>
              <p className="text-gray-300">
                <strong>Privacy Negotiator Way:</strong> Contribute traffic data (using MPC) to improve 
                city planning WITHOUT revealing your home address, workplace, or personal travel patterns.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Demo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Live Negotiations Monitor</h2>
          <RealTimePrivacyNegotiator className="bg-gray-800/50 rounded-2xl" />
        </motion.div>

        {/* Privacy Budget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Privacy Budget Management</h2>
          
          <p className="text-gray-300 text-lg">
            Each time you share data or make a negotiation, it "costs" some of your privacy budget. 
            The system tracks this:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Privacy Budget Concept</h3>
              <p className="text-gray-300 text-sm">
                Like a financial budget, but for privacy. You set limits on how much of your information 
                can be shared or computed with. Once exhausted, the system refuses further compromises.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-green-400 mb-3">How Negotiation Respects It</h3>
              <p className="text-gray-300 text-sm">
                Privacy Negotiator prioritizes cryptographic solutions (very low privacy cost) over 
                raw data sharing (high privacy cost). For every negotiation, it minimizes privacy expenditure.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyNegotiatorPage;
