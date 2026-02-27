/**
 * Interactive Privacy Negotiator Demo
 * Demonstrates secure negotiation between agents
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NegotiationRequest {
  id: string;
  agentId: string;
  requestType: string;
  parameters: any;
  urgency: 'low' | 'medium' | 'high';
  timestamp: number;
}

interface NegotiationResult {
  accepted: boolean;
  terms: any;
  privacyGuarantees: PrivacyGuarantee[];
  carbonImpact: number;
  trustScore: number;
  executionTime: number;
}

interface PrivacyGuarantee {
  type: string;
  confidence: number;
  description: string;
}

export const PrivacyNegotiatorDemo: React.FC = () => {
  const [requests, setRequests] = useState<NegotiationRequest[]>([]);
  const [results, setResults] = useState<Map<string, NegotiationResult>>(new Map());
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<NegotiationRequest | null>(null);

  const sampleRequests: NegotiationRequest[] = [
    {
      id: 'req_001',
      agentId: 'energy_grid_001',
      requestType: 'data_access',
      parameters: {
        dataTypes: ['energy_usage', 'time_patterns'],
        duration: '24h',
        purpose: 'optimization'
      },
      urgency: 'medium',
      timestamp: Date.now() - 10000
    },
    {
      id: 'req_002',
      agentId: 'traffic_system_002',
      requestType: 'location_sharing',
      parameters: {
        accuracy: 'neighborhood_level',
        frequency: 'hourly',
        purpose: 'traffic_optimization'
      },
      urgency: 'high',
      timestamp: Date.now() - 5000
    },
    {
      id: 'req_003',
      agentId: 'health_monitor_003',
      requestType: 'biometric_access',
      parameters: {
        metrics: ['heart_rate', 'sleep_patterns'],
        aggregation: 'anonymized',
        purpose: 'health_insights'
      },
      urgency: 'low',
      timestamp: Date.now()
    }
  ];

  useEffect(() => {
    setRequests(sampleRequests);
  }, []);

  const handleNegotiate = async (request: NegotiationRequest) => {
    setIsNegotiating(true);
    setSelectedRequest(request);

    // Simulate negotiation process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result: NegotiationResult = {
      accepted: Math.random() > 0.3, // 70% chance of acceptance
      terms: {
        dataAccess: {
          allowedFields: request.parameters.dataTypes || [],
          processingPurpose: request.parameters.purpose,
          retentionPeriod: 24,
          encryptionLevel: 'military'
        },
        duration: 86400000,
        auditTrail: true
      },
      privacyGuarantees: [
        {
          type: 'differential_privacy',
          confidence: 0.95,
          description: 'Mathematical guarantee of individual privacy'
        },
        {
          type: 'zero_knowledge',
          confidence: 0.87,
          description: 'Proof without revealing underlying data'
        },
        {
          type: 'secure_mpc',
          confidence: 0.92,
          description: 'Multi-party computation without data sharing'
        }
      ],
      carbonImpact: Math.random() * 0.05,
      trustScore: 0.7 + Math.random() * 0.3,
      executionTime: 1500 + Math.random() * 1000
    };

    setResults(prev => new Map(prev).set(request.id, result));
    setIsNegotiating(false);
    setSelectedRequest(null);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Negotiator Demo</h1>
        <p className="text-gray-600">
          Experience secure, privacy-preserving negotiations between AI agents using advanced cryptographic techniques.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incoming Requests */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
          
          <div className="space-y-3">
            <AnimatePresence>
              {requests.map((request) => {
                const result = results.get(request.id);
                return (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`border rounded-lg p-4 ${
                      result?.accepted ? 'border-green-200 bg-green-50' :
                      result?.accepted === false ? 'border-red-200 bg-red-50' :
                      'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{request.agentId}</h3>
                        <p className="text-sm text-gray-600">{request.requestType}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </div>

                    <div className="text-sm text-gray-700 mb-3">
                      <p><strong>Purpose:</strong> {request.parameters.purpose}</p>
                      <p><strong>Duration:</strong> {request.parameters.duration}</p>
                    </div>

                    {result ? (
                      <div className="space-y-2">
                        <div className={`text-sm font-medium ${result.accepted ? 'text-green-600' : 'text-red-600'}`}>
                          {result.accepted ? '✓ Accepted' : '✗ Rejected'}
                        </div>
                        {result.accepted && (
                          <div className="text-xs text-gray-600">
                            <p>Trust Score: <span className={getTrustScoreColor(result.trustScore)}>{result.trustScore.toFixed(2)}</span></p>
                            <p>Carbon Impact: {result.carbonImpact.toFixed(3)} kg CO₂</p>
                            <p>Execution Time: {(result.executionTime / 1000).toFixed(1)}s</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNegotiate(request)}
                        disabled={isNegotiating}
                        className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        {isNegotiating && selectedRequest?.id === request.id ? 'Negotiating...' : 'Negotiate'}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Negotiation Process */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Negotiation Process</h2>
          
          {isNegotiating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-700">Negotiating with {selectedRequest?.agentId}...</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Analyzing request parameters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Assessing trustworthiness</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Generating privacy guarantees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Calculating carbon impact</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p>Select a request to start negotiation</p>
            </div>
          )}

          {/* Recent Results */}
          {results.size > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-3">Recent Negotiations</h3>
              <div className="space-y-2">
                {Array.from(results.entries()).slice(-3).map(([requestId, result]) => {
                  const request = requests.find(r => r.id === requestId);
                  return (
                    <div key={requestId} className="text-sm p-2 bg-gray-50 rounded">
                      <div className="font-medium">{request?.agentId}</div>
                      <div className="text-gray-600">
                        {result.accepted ? 'Accepted' : 'Rejected'} • 
                        Trust: {result.trustScore.toFixed(2)} •
                        Carbon: {result.carbonImpact.toFixed(3)} kg CO₂
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Privacy Guarantees Info */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Privacy-Preserving Techniques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Differential Privacy</h4>
            <p className="text-sm text-gray-700">
              Mathematical guarantees that individual data cannot be identified from aggregated results.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Zero-Knowledge Proofs</h4>
            <p className="text-sm text-gray-700">
              Prove knowledge of information without revealing the information itself.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Secure MPC</h4>
            <p className="text-sm text-gray-700">
              Multiple parties compute functions over private inputs without revealing those inputs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
