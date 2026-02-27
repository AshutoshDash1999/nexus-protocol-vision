/**
 * Carbon-Aware Dashboard Demo
 * Real-time visualization of carbon footprint and optimization
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarbonFootprint {
  totalEmissions: number;
  computationEmissions: number;
  networkEmissions: number;
  storageEmissions: number;
  coolingEmissions: number;
  timestamp: number;
}

interface CarbonBudget {
  dailyLimit: number;
  currentUsage: number;
  remainingBudget: number;
  alertThresholds: {
    warning: number;
    critical: number;
  };
}

interface OptimizationOpportunity {
  id: string;
  type: string;
  description: string;
  potentialSavings: number;
  implementationCost: number;
  priority: 'low' | 'medium' | 'high';
}

export const CarbonAwareDashboard: React.FC = () => {
  const [footprint, setFootprint] = useState<CarbonFootprint>({
    totalEmissions: 2.45,
    computationEmissions: 1.8,
    networkEmissions: 0.3,
    storageEmissions: 0.2,
    coolingEmissions: 0.15,
    timestamp: Date.now()
  });

  const [budget, setBudget] = useState<CarbonBudget>({
    dailyLimit: 50.0,
    currentUsage: 2.45,
    remainingBudget: 47.55,
    alertThresholds: {
      warning: 80,
      critical: 95
    }
  });

  const [optimizations, setOptimizations] = useState<OptimizationOpportunity[]>([
    {
      id: 'opt_001',
      type: 'Model Quantization',
      description: 'Reduce model precision from 32-bit to 8-bit',
      potentialSavings: 0.8,
      implementationCost: 0.2,
      priority: 'high'
    },
    {
      id: 'opt_002',
      type: 'Renewable Scheduling',
      description: 'Schedule operations during renewable energy peak hours',
      potentialSavings: 0.3,
      implementationCost: 0.1,
      priority: 'medium'
    },
    {
      id: 'opt_003',
      type: 'Edge Computing',
      description: 'Move computation to edge devices to reduce network emissions',
      potentialSavings: 0.2,
      implementationCost: 0.3,
      priority: 'low'
    }
  ]);

  const [selectedOptimization, setSelectedOptimization] = useState<OptimizationOpportunity | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setFootprint(prev => ({
        ...prev,
        totalEmissions: Math.max(0, prev.totalEmissions + (Math.random() - 0.5) * 0.1),
        timestamp: Date.now()
      }));

      setBudget(prev => ({
        ...prev,
        currentUsage: Math.max(0, prev.currentUsage + (Math.random() - 0.5) * 0.1),
        remainingBudget: Math.max(0, prev.dailyLimit - prev.currentUsage)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleOptimization = async (optimization: OptimizationOpportunity) => {
    setIsOptimizing(true);
    setSelectedOptimization(optimization);

    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Apply optimization
    setFootprint(prev => ({
      ...prev,
      totalEmissions: Math.max(0, prev.totalEmissions - optimization.potentialSavings)
    }));

    setBudget(prev => ({
      ...prev,
      currentUsage: Math.max(0, prev.currentUsage - optimization.potentialSavings),
      remainingBudget: prev.dailyLimit - Math.max(0, prev.currentUsage - optimization.potentialSavings)
    }));

    setOptimizations(prev => prev.filter(opt => opt.id !== optimization.id));
    setIsOptimizing(false);
    setSelectedOptimization(null);
  };

  const budgetPercentage = (budget.currentUsage / budget.dailyLimit) * 100;
  const budgetStatus = budgetPercentage >= budget.alertThresholds.critical ? 'critical' :
                     budgetPercentage >= budget.alertThresholds.warning ? 'warning' : 'healthy';

  const getBudgetColor = () => {
    switch (budgetStatus) {
      case 'critical': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon-Aware Dashboard</h1>
        <p className="text-gray-600">
          Monitor and optimize your AI operations for minimal environmental impact.
        </p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Carbon Budget</h3>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Usage</span>
              <span className={`text-sm font-medium ${getBudgetColor()}`}>
                {budgetPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${
                  budgetStatus === 'critical' ? 'bg-red-500' :
                  budgetStatus === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Limit:</span>
              <span className="font-medium">{budget.dailyLimit.toFixed(1)} kg CO₂</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Usage:</span>
              <span className="font-medium">{budget.currentUsage.toFixed(2)} kg CO₂</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Remaining:</span>
              <span className={`font-medium ${getBudgetColor()}`}>
                {budget.remainingBudget.toFixed(2)} kg CO₂
              </span>
            </div>
          </div>
        </div>

        {/* Emissions Breakdown */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Emissions Breakdown</h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Computation</span>
                <span className="text-sm font-medium">{footprint.computationEmissions.toFixed(2)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(footprint.computationEmissions / footprint.totalEmissions) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Network</span>
                <span className="text-sm font-medium">{footprint.networkEmissions.toFixed(2)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(footprint.networkEmissions / footprint.totalEmissions) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm font-medium">{footprint.storageEmissions.toFixed(2)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(footprint.storageEmissions / footprint.totalEmissions) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Cooling</span>
                <span className="text-sm font-medium">{footprint.coolingEmissions.toFixed(2)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(footprint.coolingEmissions / footprint.totalEmissions) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Emissions:</span>
              <span className="text-lg font-bold text-gray-900">
                {footprint.totalEmissions.toFixed(2)} kg CO₂
              </span>
            </div>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Real-time Metrics</h3>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {footprint.totalEmissions.toFixed(3)}
              </div>
              <div className="text-sm text-gray-600">kg CO₂ / hour</div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">
                  {((footprint.computationEmissions / footprint.totalEmissions) * 100).toFixed(0)}%
                </div>
                <div className="text-gray-600">Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">
                  {((budget.dailyLimit - budget.currentUsage) / budget.dailyLimit * 100).toFixed(0)}%
                </div>
                <div className="text-gray-600">Budget Left</div>
              </div>
            </div>

            <div className="text-center">
              <div className={`text-sm font-medium ${getBudgetColor()}`}>
                Status: {budgetStatus.charAt(0).toUpperCase() + budgetStatus.slice(1)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Opportunities */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Optimization Opportunities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {optimizations.map((optimization) => (
              <motion.div
                key={optimization.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{optimization.type}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(optimization.priority)}`}>
                    {optimization.priority}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{optimization.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Potential Savings:</span>
                    <span className="font-medium text-green-600">
                      {optimization.potentialSavings.toFixed(2)} kg CO₂
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Implementation Cost:</span>
                    <span className="font-medium">
                      {optimization.implementationCost.toFixed(2)} kg CO₂
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOptimization(optimization)}
                  disabled={isOptimizing}
                  className="w-full mt-3 bg-green-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isOptimizing && selectedOptimization?.id === optimization.id ? 'Optimizing...' : 'Apply'}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {optimizations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="font-medium">All optimizations applied!</p>
            <p className="text-sm">Your system is running at maximum efficiency.</p>
          </div>
        )}
      </div>

      {/* Optimization Progress */}
      <AnimatePresence>
        {isOptimizing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <div>
                <p className="font-medium">Applying Optimization</p>
                <p className="text-sm text-gray-600">{selectedOptimization?.type}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
