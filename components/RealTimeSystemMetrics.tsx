import React from 'react';
import { Network, Activity, Zap, Leaf, BarChart3, Users } from 'lucide-react';
import { useRealTimeMetrics } from '../contexts/RealTimeContext';

interface RealTimeSystemMetricsProps {
  className?: string;
}

const RealTimeSystemMetrics: React.FC<RealTimeSystemMetricsProps> = ({ className }) => {
  const { metrics } = useRealTimeMetrics();

  const displayMetrics = [
    { name: 'Latency', value: metrics.latencyMs, unit: 'ms', icon: <Activity className="w-4 h-4" /> },
    { name: 'Active Users', value: metrics.activeUsers, unit: '', icon: <Users className="w-4 h-4" /> },
    { name: 'CPU Load', value: metrics.cpuLoadPercent, unit: '%', icon: <Zap className="w-4 h-4" /> },
    { name: 'Memory', value: metrics.memoryUsageMb, unit: 'MB', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Energy Savings', value: metrics.energySavingsPercent, unit: '%', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Uptime', value: metrics.uptimeSeconds, unit: 's', icon: <Network className="w-4 h-4" /> },
  ];


  return (
    <div className={`p-6 bg-gray-800 rounded-lg space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Activity className="w-6 h-6 text-blue-400" />
          <span>Real-Time System Metrics</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">{metric.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-blue-400">{metric.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {typeof metric.value === 'number' ? metric.value.toFixed(1) : String(metric.value)}
                  </div>
                  <div className="text-xs text-gray-400">{metric.unit}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">System Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-gray-400">Uptime</div>
            <div className="text-white font-bold">{Math.floor(metrics.uptimeSeconds / 3600)}h</div>
          </div>
          <div>
            <div className="text-gray-400">Latency</div>
            <div className="text-white font-bold">{metrics.latencyMs}ms</div>
          </div>
          <div>
            <div className="text-gray-400">Active Users</div>
            <div className="text-white font-bold">{metrics.activeUsers}</div>
          </div>
          <div>
            <div className="text-gray-400">Energy Saving</div>
            <div className="text-green-400 font-bold">{metrics.energySavingsPercent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeSystemMetrics;
