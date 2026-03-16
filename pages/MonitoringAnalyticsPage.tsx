import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, Clock, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import RealTimeSystemMetrics from '../components/RealTimeSystemMetrics';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const MonitoringAnalyticsPage: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BarChart3 className={`w-12 h-12 ${themeClasses.text}`} />
          </div>
          <h1 className="text-5xl font-bold text-white">Monitoring & Analytics</h1>
          <p className="text-2xl text-gray-300">Real-Time Health & Performance Insights</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive monitoring system that tracks every aspect of your Nexus agents' 
            health, performance, and behavior in real-time.
          </p>
        </div>

        {/* Live System Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Live System Metrics</h2>
          <RealTimeSystemMetrics />
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-900/30 border border-blue-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Metrics We Monitor</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-blue-500">
              <Activity className="w-6 h-6 text-blue-400 mb-2" />
              <h3 className="text-sm font-bold text-blue-300 mb-1">Request Latency</h3>
              <p className="text-xs text-gray-400">Response time in milliseconds</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-green-500">
              <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
              <h3 className="text-sm font-bold text-green-300 mb-1">Throughput</h3>
              <p className="text-xs text-gray-400">Requests per second (RPS)</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-purple-500">
              <Zap className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="text-sm font-bold text-purple-300 mb-1">Resource Usage</h3>
              <p className="text-xs text-gray-400">CPU, Memory, GPU utilization %</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-orange-500">
              <AlertCircle className="w-6 h-6 text-orange-400 mb-2" />
              <h3 className="text-sm font-bold text-orange-300 mb-1">Error Rate</h3>
              <p className="text-xs text-gray-400">% of failed requests</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-cyan-500">
              <Clock className="w-6 h-6 text-cyan-400 mb-2" />
              <h3 className="text-sm font-bold text-cyan-300 mb-1">Uptime</h3>
              <p className="text-xs text-gray-400">System availability (%)</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-pink-500">
              <BarChart3 className="w-6 h-6 text-pink-400 mb-2" />
              <h3 className="text-sm font-bold text-pink-300 mb-1">Token Usage</h3>
              <p className="text-xs text-gray-400">Input/Output tokens consumed</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
              <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
              <h3 className="text-sm font-bold text-red-300 mb-1">Threat Events</h3>
              <p className="text-xs text-gray-400">Immune system detections</p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <TrendingUp className="w-6 h-6 text-yellow-400 mb-2" />
              <h3 className="text-sm font-bold text-yellow-300 mb-1">Model Accuracy</h3>
              <p className="text-xs text-gray-400">Prediction correctness rate</p>
            </div>
          </div>
        </motion.div>

        {/* Analytics Dashboards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Analytics Dashboards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-transparent p-6 rounded-lg border border-blue-700">
              <div className="flex items-center space-x-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-blue-300">Performance Dashboard</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Response time trends over time</li>
                <li>• P50/P95/P99 latency percentiles</li>
                <li>• Request volumes by endpoint</li>
                <li>• Peak hours and usage patterns</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-transparent p-6 rounded-lg border border-green-700">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-bold text-green-300">Health Dashboard</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• System uptime and downtimes</li>
                <li>• Resource utilization trends</li>
                <li>• Memory leaks detection</li>
                <li>• CPU throttling events</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-transparent p-6 rounded-lg border border-purple-700">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-bold text-purple-300">Reliability Dashboard</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Error rate by type</li>
                <li>• Exception logs and stack traces</li>
                <li>• MTTF (Mean Time To Failure)</li>
                <li>• Recovery time analysis</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-transparent p-6 rounded-lg border border-orange-700">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-orange-400" />
                <h3 className="text-lg font-bold text-orange-300">Usage Analytics</h3>
              </div>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Token consumed daily/monthly</li>
                <li>• Cost per inference</li>
                <li>• Model usage breakdown</li>
                <li>• Cost optimization suggestions</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Alerting System */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-900/30 border border-red-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Intelligent Alerting</h2>

          <p className="text-gray-300">
            The system doesn't just collect data - it intelligently alerts you when something requires attention:
          </p>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">⚠️ Warning Alerts</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Latency increase detected (trending up)</li>
                <li>• Memory usage approaching 80%</li>
                <li>• Error rate exceeding threshold</li>
                <li>• Unusual traffic patterns detected</li>
              </ul>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-red-300 mb-2">🚨 Critical Alerts</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Service downtime detected</li>
                <li>• Out of memory (OOM) conditions</li>
                <li>• Cascading failure in dependencies</li>
                <li>• Malicious access attempts blocked</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-700/50 p-4 rounded-lg mt-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-blue-300">Smart Routing:</strong> Alerts are routed to the right person/team based on 
              severity, type, and your custom rules. Critical alerts page on-call engineers. Performance metrics go to DevOps.
            </p>
          </div>
        </motion.div>

        {/* Predictive Analytics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-purple-900/30 border border-purple-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Predictive Analytics</h2>

          <div className="space-y-4">
            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Capacity Planning</h3>
              <p className="text-gray-300">
                Based on current growth trends, the system predicts when you'll need to scale. 
                "At current growth rate, you'll need 50% more resources in 3 weeks."
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Anomaly Detection</h3>
              <p className="text-gray-300">
                ML models learn your normal behavior patterns and alert when anomalies appear. 
                Catches issues like memory leaks before they cause failures.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Model Performance Degradation</h3>
              <p className="text-gray-300">
                Detects when models start performing worse. "Accuracy dropped from 94% to 88% - 
                likely data drift or model staleness."
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-purple-300 mb-2">Cost Optimization</h3>
              <p className="text-gray-300">
                Identifies inefficiencies. "Model A is 30% slower than Model B but costs 50% more - 
                consider switching deployment."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Integration Points */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Integration with Nexus Systems</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-blue-300 mb-2">✓ Immune System</h3>
              <p className="text-gray-300 text-sm">
                Tracks all threat detections and blocks. Monitor security posture in real-time.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 mb-2">✓ Carbon Awareness</h3>
              <p className="text-gray-300 text-sm">
                See carbon footprint of each request, track environmental impact over time.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-purple-300 mb-2">✓ Cognitive Graph</h3>
              <p className="text-gray-300 text-sm">
                Monitor graph growth, relationship density, query performance on growing dataset.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-cyan-300 mb-2">✓ MorphNet</h3>
              <p className="text-gray-300 text-sm">
                Track optimization cycles, model compression ratios, inference speed improvements.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-300 mb-2">✓ Privacy Negotiation</h3>
              <p className="text-gray-300 text-sm">
                Monitor negotiation outcomes, privacy budget usage, data sharing compliance.
              </p>
            </div>

            <div className="bg-gray-700/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-orange-300 mb-2">✓ Sovereign Persona</h3>
              <p className="text-gray-300 text-sm">
                Track persona health, alignment with values, behavior consistency over time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reports & Export */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-700 rounded-2xl p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Reports & Compliance</h2>

          <div className="space-y-3">
            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Automated Reports:</strong> Daily/weekly/monthly summaries automatically generated and sent</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>SLA Tracking:</strong> Automatically monitors Service Level Agreements and reports compliance status</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Audit Logs:</strong> Complete audit trail of all actions for compliance and security reviews</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>Custom Dashboards:</strong> Build your own dashboards with drag-and-drop controls</span>
            </p>

            <p className="flex items-start space-x-3 text-gray-300">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
              <span><strong>API Access:</strong> RESTful API for programmatic access to all metrics and alerts</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MonitoringAnalyticsPage;
