
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import { useRealTimeMetrics } from '../contexts/RealTimeContext';

const ConcludingVision: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const { metrics } = useRealTimeMetrics();

  return (
    <div className="text-center">
      <h2 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} mb-4`}>
        The Path Forward
      </h2>
      <div className="max-w-3xl mx-auto space-y-4 text-gray-400">
        <p>
          The Nexus Protocol is more than a technical blueprint; it's a philosophical stance on the future of our relationship with technology. It imagines a world where AI is not a remote, monolithic entity, but a personal, sovereign extension of human intellect and agency.
        </p>
        <p>
          By embedding principles of privacy, efficiency, and security into its architecture, this vision becomes a real-time system. Current network latency is <strong>{metrics.latencyMs}ms</strong>, and energy savings are at <strong>{metrics.energySavingsPercent}%</strong>.
        </p>
      </div>

      <div className="mt-8 bg-gray-800/40 border border-gray-700 rounded-xl p-6 text-left">
        <h3 className="text-lg font-semibold text-white mb-3">Live Protocol Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-200">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400">Active Users</div>
            <div className="text-xl font-bold">{metrics.activeUsers}</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400">Uptime</div>
            <div className="text-xl font-bold">{Math.floor(metrics.uptimeSeconds / 3600)}h</div>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400">System Load</div>
            <div className="text-xl font-bold">{metrics.cpuLoadPercent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcludingVision;
