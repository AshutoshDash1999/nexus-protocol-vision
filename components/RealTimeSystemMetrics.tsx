import React, { useState, useEffect } from 'react';
import { Network, Activity, Zap, Shield, Leaf, Map, BarChart3 } from 'lucide-react';

interface RealTimeSystemMetricsProps {
  className?: string;
}

interface SystemMetric {
  name: string;
  icon: React.ReactNode;
  status: 'active' | 'idle' | 'error';
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: Date;
}

const RealTimeSystemMetrics: React.FC<RealTimeSystemMetricsProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: 'Cognitive Graph',
      icon: <Network className="w-4 h-4" />,
      status: 'active',
      value: 0,
      unit: 'nodes',
      trend: 'up',
      lastUpdate: new Date()
    },
    {
      name: 'Federated Learning',
      icon: <Activity className="w-4 h-4" />,
      status: 'idle',
      value: 0,
      unit: 'participants',
      trend: 'stable',
      lastUpdate: new Date()
    },
    {
      name: 'Privacy Negotiator',
      icon: <Shield className="w-4 h-4" />,
      status: 'active',
      value: 0,
      unit: 'negotiations/sec',
      trend: 'up',
      lastUpdate: new Date()
    },
    {
      name: 'MorphNet Engine',
      icon: <Zap className="w-4 h-4" />,
      status: 'active',
      value: 0,
      unit: 'optimizations',
      trend: 'up',
      lastUpdate: new Date()
    },
    {
      name: 'Adversarial Immune',
      icon: <Shield className="w-4 h-4" />,
      status: 'active',
      value: 0,
      unit: 'threats blocked',
      trend: 'stable',
      lastUpdate: new Date()
    },
    {
      name: 'Carbon-Aware',
      icon: <Leaf className="w-4 h-4" />,
      status: 'active',
      value: 0,
      unit: 'kg CO2 saved',
      trend: 'up',
      lastUpdate: new Date()
    },
    {
      name: 'Latent Space',
      icon: <Map className="w-4 h-4" />,
      status: 'idle',
      value: 0,
      unit: 'mappings',
      trend: 'stable',
      lastUpdate: new Date()
    },
    {
      name: 'Monitoring',
      icon: <BarChart3 className="w-4 h-4" />,
      status: 'active',
      value: 0,
      unit: 'metrics',
      trend: 'up',
      lastUpdate: new Date()
    }
  ]);

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => {
          const change = Math.random() * 10 - 5; // Random change between -5 and +5
          const newValue = Math.max(0, metric.value + change);
          
          // Determine new trend
          let newTrend: 'up' | 'down' | 'stable' = 'stable';
          if (change > 2) newTrend = 'up';
          else if (change < -2) newTrend = 'down';

          // Randomly change status
          const statusChance = Math.random();
          let newStatus: 'active' | 'idle' | 'error' = metric.status;
          if (statusChance < 0.1) newStatus = 'idle';
          else if (statusChance < 0.15) newStatus = 'active';
          else if (statusChance < 0.17) newStatus = 'error';
          else newStatus = 'active';

          return {
            ...metric,
            value: newValue,
            trend: newTrend,
            status: newStatus,
            lastUpdate: new Date()
          };
        })
      );
    };

    const interval = setInterval(updateMetrics, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

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
        {metrics.map((metric, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 ${getStatusColor(metric.status)} rounded-full`}></div>
                <span className="text-sm text-gray-300">{metric.name}</span>
              </div>
              <span className={`text-lg ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-blue-400">{metric.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {metric.value.toFixed(1)}
                  </div>
                  <div className="text-xs text-gray-400">{metric.unit}</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              {metric.lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-300 mb-3">System Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-gray-400">Active Systems</div>
            <div className="text-white font-bold">
              {metrics.filter(m => m.status === 'active').length}/8
            </div>
          </div>
          <div>
            <div className="text-gray-400">Total Operations</div>
            <div className="text-white font-bold">
              {metrics.reduce((sum, m) => sum + m.value, 0).toFixed(0)}
            </div>
          </div>
          <div>
            <div className="text-gray-400">Avg Performance</div>
            <div className="text-white font-bold">
              {(metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length).toFixed(1)}
            </div>
          </div>
          <div>
            <div className="text-gray-400">System Health</div>
            <div className="text-green-400 font-bold">
              {Math.round((metrics.filter(m => m.status !== 'error').length / metrics.length) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeSystemMetrics;
