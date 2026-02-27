import React, { useState, useEffect } from 'react';
import { Leaf, Zap, TrendingDown, AlertTriangle, Activity, BarChart3 } from 'lucide-react';

interface CarbonMetric {
  timestamp: Date;
  energyUsage: number; // kWh
  carbonEmission: number; // kg CO2
  operation: string;
  efficiency: number; // 0-100
}

interface OptimizationOpportunity {
  id: string;
  type: string;
  description: string;
  potentialSavings: number; // kg CO2
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

interface RealTimeCarbonAwareProps {
  className?: string;
}

const RealTimeCarbonAware: React.FC<RealTimeCarbonAwareProps> = ({ className }) => {
  const [metrics, setMetrics] = useState<CarbonMetric[]>([]);
  const [opportunities, setOpportunities] = useState<OptimizationOpportunity[]>([]);
  const [currentUsage, setCurrentUsage] = useState(0);
  const [dailyBudget, setDailyBudget] = useState(5.0); // kg CO2
  const [totalSavings, setTotalSavings] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const initialMetrics: CarbonMetric[] = [
      {
        timestamp: new Date(Date.now() - 10000),
        energyUsage: 0.5,
        carbonEmission: 0.2,
        operation: 'AI Inference',
        efficiency: 85
      },
      {
        timestamp: new Date(Date.now() - 8000),
        energyUsage: 0.3,
        carbonEmission: 0.12,
        operation: 'Data Processing',
        efficiency: 92
      },
      {
        timestamp: new Date(Date.now() - 6000),
        energyUsage: 0.8,
        carbonEmission: 0.35,
        operation: 'Model Training',
        efficiency: 78
      }
    ];

    const initialOpportunities: OptimizationOpportunity[] = [
      {
        id: '1',
        type: 'Model Pruning',
        description: 'Reduce model complexity for simple inference tasks',
        potentialSavings: 0.8,
        priority: 'high',
        status: 'pending'
      },
      {
        id: '2',
        type: 'Batch Processing',
        description: 'Group similar operations to reduce startup overhead',
        potentialSavings: 0.3,
        priority: 'medium',
        status: 'pending'
      },
      {
        id: '3',
        type: 'Cache Optimization',
        description: 'Implement smart caching for frequently used computations',
        potentialSavings: 0.5,
        priority: 'medium',
        status: 'pending'
      }
    ];

    setMetrics(initialMetrics);
    setOpportunities(initialOpportunities);
    setCurrentUsage(initialMetrics.reduce((sum, m) => sum + m.carbonEmission, 0));
  }, []);

  // Real-time metrics generation
  useEffect(() => {
    const generateMetrics = () => {
      const operations = [
        { name: 'AI Inference', baseEnergy: 0.5, baseCarbon: 0.2 },
        { name: 'Data Processing', baseEnergy: 0.3, baseCarbon: 0.12 },
        { name: 'Model Training', baseEnergy: 0.8, baseCarbon: 0.35 },
        { name: 'Federated Learning', baseEnergy: 0.6, baseCarbon: 0.25 },
        { name: 'Privacy Negotiation', baseEnergy: 0.2, baseCarbon: 0.08 }
      ];

      const randomOp = operations[Math.floor(Math.random() * operations.length)];
      const variation = 0.8 + Math.random() * 0.4; // ±20% variation

      const newMetric: CarbonMetric = {
        timestamp: new Date(),
        energyUsage: randomOp.baseEnergy * variation,
        carbonEmission: randomOp.baseCarbon * variation,
        operation: randomOp.name,
        efficiency: 70 + Math.random() * 30
      };

      setMetrics(prev => {
        const updated = [...prev, newMetric].slice(-20); // Keep last 20 metrics
        const totalUsage = updated.reduce((sum, m) => sum + m.carbonEmission, 0);
        setCurrentUsage(totalUsage);
        return updated;
      });
    };

    const interval = setInterval(generateMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  // Optimization processing
  useEffect(() => {
    const processOptimizations = () => {
      setOpportunities(prev => prev.map(opp => {
        if (opp.status === 'pending' && Math.random() < 0.2) {
          // Start optimization
          return { ...opp, status: 'in-progress' as const };
        }
        if (opp.status === 'in-progress' && Math.random() < 0.3) {
          // Complete optimization
          setTotalSavings(prev => prev + opp.potentialSavings);
          return { ...opp, status: 'completed' as const };
        }
        return opp;
      }));

      // Remove completed opportunities and add new ones
      setOpportunities(prev => {
        const active = prev.filter(opp => opp.status !== 'completed');
        
        // Add new opportunities occasionally
        if (Math.random() < 0.1 && active.length < 5) {
          const newOpp: OptimizationOpportunity = {
            id: Date.now().toString(),
            type: ['Dynamic Scaling', 'Energy-Aware Scheduling', 'Resource Pooling'][Math.floor(Math.random() * 3)],
            description: 'New optimization opportunity detected by system',
            potentialSavings: Math.random() * 0.8 + 0.2,
            priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
            status: 'pending'
          };
          active.push(newOpp);
        }
        
        return active;
      });
    };

    const interval = setInterval(processOptimizations, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleOptimization = (opportunityId: string) => {
    setIsOptimizing(true);
    setOpportunities(prev => prev.map(opp => 
      opp.id === opportunityId ? { ...opp, status: 'in-progress' } : opp
    ));

    setTimeout(() => {
      setOpportunities(prev => prev.map(opp => {
        if (opp.id === opportunityId) {
          setTotalSavings(current => current + opp.potentialSavings);
          return { ...opp, status: 'completed' };
        }
        return opp;
      }));
      setIsOptimizing(false);
    }, 3000);
  };

  const budgetUsage = (currentUsage / dailyBudget) * 100;
  const budgetColor = budgetUsage < 50 ? 'text-green-400' : budgetUsage < 80 ? 'text-yellow-400' : 'text-red-400';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-900/20';
      case 'medium': return 'border-yellow-400 bg-yellow-900/20';
      case 'low': return 'border-green-400 bg-green-900/20';
      default: return 'border-gray-400 bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Activity className="w-4 h-4 text-yellow-400" />;
      case 'in-progress': return <Zap className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'completed': return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: return <Leaf className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`p-6 bg-gray-800 rounded-lg space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Leaf className="w-6 h-6 text-green-400" />
          <span>Real-Time Carbon-Aware Optimizer</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Monitoring</span>
        </div>
      </div>

      {/* Carbon Budget Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300 mb-2">Daily Carbon Budget</div>
          <div className="text-2xl font-bold text-white">{dailyBudget.toFixed(1)} kg CO₂</div>
          <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                budgetUsage < 50 ? 'bg-green-400' : budgetUsage < 80 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Math.min(budgetUsage, 100)}%` }}
            />
          </div>
          <div className={`text-sm mt-2 ${budgetColor}`}>
            {budgetUsage.toFixed(1)}% used
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300 mb-2">Current Usage</div>
          <div className="text-2xl font-bold text-white">{currentUsage.toFixed(2)} kg CO₂</div>
          <div className="text-sm text-gray-400 mt-2">
            Remaining: {Math.max(0, dailyBudget - currentUsage).toFixed(2)} kg
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300 mb-2">Total Savings</div>
          <div className="text-2xl font-bold text-green-400">{totalSavings.toFixed(2)} kg CO₂</div>
          <div className="text-sm text-gray-400 mt-2">
            From optimizations
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Live Operations</span>
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {metrics.slice(-5).reverse().map((metric, index) => (
            <div key={index} className="flex items-center justify-between text-sm bg-gray-800 p-2 rounded">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  metric.efficiency > 85 ? 'bg-green-400' : 
                  metric.efficiency > 70 ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="text-gray-300">{metric.operation}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400">{metric.energyUsage.toFixed(2)} kWh</span>
                <span className="text-white font-bold">{metric.carbonEmission.toFixed(3)} kg CO₂</span>
                <span className="text-gray-400">{metric.efficiency.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Optimization Opportunities</span>
        </h4>
        {opportunities.length > 0 ? (
          <div className="space-y-3">
            {opportunities.map(opp => (
              <div key={opp.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(opp.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(opp.status)}
                    <div>
                      <div className="text-white font-semibold">{opp.type}</div>
                      <div className="text-sm text-gray-400">{opp.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">
                      -{opp.potentialSavings.toFixed(2)} kg CO₂
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{opp.priority}</div>
                  </div>
                </div>
                
                {opp.status === 'pending' && (
                  <button
                    onClick={() => handleOptimization(opp.id)}
                    disabled={isOptimizing}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isOptimizing ? 'Processing...' : 'Optimize'}
                  </button>
                )}
                
                {opp.status === 'in-progress' && (
                  <div className="flex items-center space-x-2 text-sm text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Optimizing...</span>
                  </div>
                )}
                
                {opp.status === 'completed' && (
                  <div className="flex items-center space-x-2 text-sm text-green-400">
                    <TrendingDown className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700 p-8 rounded-lg text-center text-gray-400">
            <Leaf className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p>No optimization opportunities</p>
            <p className="text-sm mt-2">System is running efficiently</p>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Carbon-Aware System Active</span>
          </div>
          <div className="text-xs text-gray-400">
            Real-time monitoring enabled
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCarbonAware;
