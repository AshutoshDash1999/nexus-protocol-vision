import React, { useMemo } from 'react';
import { Shield, Lock, Key, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useDiagnosticLogs } from '../contexts/DiagnosticLogContext';

interface Negotiation {
  id: string;
  agentId: string;
  agentName: string;
  requestType: string;
  dataType: string;
  purpose: string;
  status: 'pending' | 'negotiating' | 'approved' | 'rejected';
  privacyGuarantees: string[];
  riskScore: number;
  timestamp: Date;
  mpcProgress: number;
  zkpProgress: number;
}

interface RealTimePrivacyNegotiatorProps {
  className?: string;
}

const RealTimePrivacyNegotiator: React.FC<RealTimePrivacyNegotiatorProps> = ({ className }) => {
  const { logs } = useDiagnosticLogs();

  const negotiations = useMemo(() => {
    // Convert recent SHIELD/MPC/ZKP logs into negotiation-like records
    return logs
      .filter(l => l.type === 'MPC' || l.type === 'ZKP' || l.type === 'SHIELD')
      .slice(-20)
      .map(log => ({
        id: log.id,
        agentId: log.type,
        agentName: `${log.type} Module`,
        requestType: log.type === 'SHIELD' ? 'intent-scan' : 'secure-handshake',
        dataType: 'user-context',
        purpose: log.message,
        status: log.status === 'success' ? 'approved' : (log.status === 'warning' ? 'negotiating' : 'rejected'),
        privacyGuarantees: log.type === 'SHIELD' ? ['semantic analysis', 'prompt sanitization'] : ['MPC', 'ZKP'],
        riskScore: log.status === 'success' ? 0.2 : (log.status === 'warning' ? 0.5 : 0.8),
        timestamp: new Date(),
        mpcProgress: log.type === 'MPC' ? 100 : 0,
        zkpProgress: log.type === 'ZKP' ? 100 : 0,
      })) as Negotiation[];
  }, [logs]);

  const stats = useMemo(() => {
    const total = negotiations.length;
    const approved = negotiations.filter(n => n.status === 'approved').length;
    const active = negotiations.filter(n => n.status === 'negotiating').length;
    const avgRisk = total > 0 ? negotiations.reduce((sum, n) => sum + n.riskScore, 0) / total : 0;
    return {
      totalNegotiations: total,
      approvedRate: total > 0 ? (approved / total) * 100 : 0,
      avgRiskScore: avgRisk,
      activeNegotiations: active
    };
  }, [negotiations]);


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'negotiating': return <Users className="w-4 h-4 text-blue-400 animate-pulse" />;
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'rejected': return <Shield className="w-4 h-4 text-red-400" />;
      default: return <Lock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'border-yellow-400';
      case 'negotiating': return 'border-blue-400';
      case 'approved': return 'border-green-400';
      case 'rejected': return 'border-red-400';
      default: return 'border-gray-400';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk < 0.3) return 'text-green-400';
    if (risk < 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className={`p-6 bg-gray-800 rounded-lg space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-400" />
          <span>Real-Time Privacy Negotiator</span>
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Active</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Total Negotiations</div>
          <div className="text-2xl font-bold text-white">{stats.totalNegotiations}</div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Approval Rate</div>
          <div className="text-2xl font-bold text-green-400">{stats.approvedRate.toFixed(1)}%</div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Avg Risk Score</div>
          <div className={`text-2xl font-bold ${getRiskColor(stats.avgRiskScore)}`}>
            {(stats.avgRiskScore * 100).toFixed(0)}
          </div>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Active Negotiations</div>
          <div className="text-2xl font-bold text-blue-400">{stats.activeNegotiations}</div>
        </div>
      </div>

      {/* Active Negotiations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Active Negotiations</h4>
        {negotiations.length > 0 ? (
          <div className="space-y-3">
            {negotiations.map(neg => (
              <div key={neg.id} className={`bg-gray-700 p-4 rounded-lg border-l-4 ${getStatusColor(neg.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(neg.status)}
                    <div>
                      <div className="text-white font-semibold">{neg.agentName}</div>
                      <div className="text-sm text-gray-400">{neg.requestType} • {neg.dataType}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${getRiskColor(neg.riskScore)}`}>
                    Risk: {(neg.riskScore * 100).toFixed(0)}%
                  </div>
                </div>

                <div className="text-sm text-gray-300 mb-3">
                  <strong>Purpose:</strong> {neg.purpose}
                </div>

                {neg.status === 'negotiating' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-blue-400" />
                        <span>MPC Progress</span>
                      </span>
                      <span className="text-blue-400">{neg.mpcProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${neg.mpcProgress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-purple-400" />
                        <span>ZKP Progress</span>
                      </span>
                      <span className="text-purple-400">{neg.zkpProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${neg.zkpProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {neg.privacyGuarantees.map((guarantee, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-600 text-xs text-gray-300 rounded">
                      {guarantee}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-gray-500 mt-2">
                  {neg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-700 p-8 rounded-lg text-center text-gray-400">
            <Shield className="w-12 h-12 mx-auto mb-3 text-gray-500" />
            <p>No active negotiations</p>
            <p className="text-sm mt-2">Waiting for privacy requests...</p>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Privacy Negotiator Active</span>
          </div>
          <div className="text-xs text-gray-400">
            MPC & ZKP protocols enabled
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimePrivacyNegotiator;
