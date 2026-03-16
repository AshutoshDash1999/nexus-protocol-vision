import React, { useState, useEffect, useRef } from 'react';
import { Network, Brain, Zap, Eye } from 'lucide-react';
import { useRealTimeMetrics } from '../contexts/RealTimeContext';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  confidence: number;
  domain: string;
  lastAccessed: number;
}

interface Edge {
  source: string;
  target: string;
  strength: number;
  type: string;
}

interface RealTimeCognitiveGraphProps {
  className?: string;
}

const RealTimeCognitiveGraph: React.FC<RealTimeCognitiveGraphProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { metrics } = useRealTimeMetrics();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [stats, setStats] = useState({
    totalNodes: 0,
    totalEdges: 0,
    avgConfidence: 0,
    domains: {} as Record<string, number>
  });

  // Initialize cognitive graph with meaningful concepts
  useEffect(() => {
    const conceptLabels = {
      technical: ['Neural Networks', 'ZKP', 'MPC', 'Federated Learning', 'Model Compression', 'Optimization', 'Inference'],
      ethical: ['Privacy', 'Accountability', 'Fairness', 'Transparency', 'Consent', 'Autonomy'],
      environmental: ['Energy', 'Carbon', 'Efficiency', 'Sustainability', 'Optimization', 'Green AI']
    };

    const baseNodes = Math.max(8, Math.min(20, Math.round(metrics.activeUsers / 2 + metrics.cpuLoadPercent / 10)));

    const generatedNodes: Node[] = Array.from({ length: baseNodes }, (_, idx) => {
      const domain = ['technical', 'ethical', 'environmental'][idx % 3] as 'technical' | 'ethical' | 'environmental';
      const labels = conceptLabels[domain];
      const label = labels[idx % labels.length];
      
      return {
        id: `concept-${domain}-${idx}`,
        label: label,
        x: 80 + (idx % 5) * 90,
        y: 80 + Math.floor(idx / 5) * 100,
        vx: 0,
        vy: 0,
        confidence: 0.5 + (metrics.energySavingsPercent / 250) + Math.random() * 0.2,
        domain,
        lastAccessed: Date.now() - Math.random() * 15000
      };
    });

    // Create meaningful connections based on concept relationships
    const generatedEdges: Edge[] = [];
    for (let i = 0; i < generatedNodes.length; i++) {
      for (let j = i + 1; j < generatedNodes.length; j++) {
        // Create more connections within domains
        const sameDomain = generatedNodes[i].domain === generatedNodes[j].domain;
        const connectionProbability = sameDomain ? 0.6 : 0.2;
        
        if (Math.random() < connectionProbability) {
          generatedEdges.push({
            source: generatedNodes[i].id,
            target: generatedNodes[j].id,
            strength: sameDomain ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.3,
            type: sameDomain ? 'strong' : 'weak'
          });
        }
      }
    }

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, [metrics]);

  // Real-time learning simulation - meaningful updates
  useEffect(() => {
    const updateGraph = () => {
      setNodes(prevNodes => {
        const updatedNodes = [...prevNodes];
        
        // Strengthen nodes that are being accessed (active learning)
        updatedNodes.forEach(node => {
          if (Math.random() < 0.3) {
            node.confidence = Math.min(1, node.confidence + (Math.random() - 0.3) * 0.08);
            node.lastAccessed = Date.now();
          } else {
            // Slight decay for unused knowledge
            node.confidence = Math.max(0.3, node.confidence - (Math.random() * 0.02));
          }
        });

        // Add new learned concepts occasionally
        if (Math.random() < 0.08 && updatedNodes.length < 25) {
          const conceptLabels = {
            technical: ['Attention Mechanisms', 'Transformer Architecture', 'Embeddings', 'Backpropagation', 'Loss Functions'],
            ethical: ['Bias Detection', 'Interpretability', 'Consent Validation', 'Audit Trails'],
            environmental: ['Power Efficiency', 'Model Distillation', 'Quantization', 'Edge Computing']
          };
          
          const randomDomain = ['technical', 'ethical', 'environmental'][Math.floor(Math.random() * 3)] as 'technical' | 'ethical' | 'environmental';
          const labels = conceptLabels[randomDomain];
          const newConcept = labels[Math.floor(Math.random() * labels.length)];

          const newNode: Node = {
            id: `learned-${Date.now()}`,
            label: newConcept,
            x: Math.random() * 400 + 50,
            y: Math.random() * 350 + 30,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            confidence: 0.4 + Math.random() * 0.3,
            domain: randomDomain,
            lastAccessed: Date.now()
          };
          
          updatedNodes.push(newNode);

          // Automatically create relationships with related concepts
          const relatedNodes = updatedNodes.filter(n => n.domain === randomDomain && n.id !== newNode.id);
          if (relatedNodes.length > 0) {
            const targetNode = relatedNodes[Math.floor(Math.random() * relatedNodes.length)];
            setEdges(prevEdges => [...prevEdges, {
              source: newNode.id,
              target: targetNode.id,
              strength: 0.6 + Math.random() * 0.3,
              type: 'learned'
            }]);
          }
        }

        return updatedNodes;
      });
    };

    const interval = setInterval(updateGraph, 1500);
    return () => clearInterval(interval);
  }, []);

  // Physics simulation
  useEffect(() => {
    if (!isAnimating) return;

    const simulate = () => {
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          let { x, y, vx, vy } = node;

          // Apply forces
          prevNodes.forEach(other => {
            if (other.id !== node.id) {
              const dx = other.x - x;
              const dy = other.y - y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < 100 && distance > 0) {
                // Repulsion
                const force = 50 / (distance * distance);
                vx -= (dx / distance) * force;
                vy -= (dy / distance) * force;
              } else if (distance > 150) {
                // Attraction
                const force = (distance - 150) * 0.001;
                vx += (dx / distance) * force;
                vy += (dy / distance) * force;
              }
            }
          });

          // Apply velocity with damping
          x += vx * 0.1;
          y += vy * 0.1;
          vx *= 0.9;
          vy *= 0.9;

          // Keep within bounds
          x = Math.max(20, Math.min(480, x));
          y = Math.max(20, Math.min(380, y));

          return { ...node, x, y, vx, vy };
        });
      });
    };

    const animationFrame = requestAnimationFrame(function animate() {
      simulate();
      if (isAnimating) {
        requestAnimationFrame(animate);
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isAnimating]);

  // Update stats
  useEffect(() => {
    const domains = nodes.reduce((acc, node) => {
      acc[node.domain] = (acc[node.domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setStats({
      totalNodes: nodes.length,
      totalEdges: edges.length,
      avgConfidence: nodes.length > 0 ? nodes.reduce((sum, n) => sum + n.confidence, 0) / nodes.length : 0,
      domains
    });
  }, [nodes, edges]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw edges with better visualization
      edges.forEach(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          
          // Color based on connection strength and type
          const isLearned = edge.type === 'learned';
          const baseAlpha = edge.strength * (isLearned ? 0.8 : 0.5);
          ctx.strokeStyle = isLearned 
            ? `rgba(34, 197, 94, ${baseAlpha})` 
            : `rgba(59, 130, 246, ${edge.strength * 0.6})`;
          
          ctx.lineWidth = edge.strength * 2 + (isLearned ? 0.5 : 0);
          ctx.stroke();
        }
      });

      // Draw nodes with better visual hierarchy
      nodes.forEach(node => {
        const isSelected = selectedNode?.id === node.id;
        const isRecentlyAccessed = Date.now() - node.lastAccessed < 4000;
        
        // Node circle with size based on confidence
        const nodeRadius = 8 + node.confidence * 8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        
        // Color based on domain
        const colors = {
          technical: '59, 130, 246',      // blue
          ethical: '239, 68, 68',         // red  
          environmental: '34, 197, 94'    // green
        };
        const color = colors[node.domain as keyof typeof colors] || '156, 163, 175';
        
        // Fill with solid color
        ctx.fillStyle = `rgba(${color}, ${node.confidence * 0.8 + 0.2})`;
        ctx.fill();
        
        // Selection ring
        if (isSelected) {
          ctx.strokeStyle = 'rgba(251, 191, 36, 1)';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (isRecentlyAccessed) {
          // Active learning indicator
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // Normal border
          ctx.strokeStyle = `rgba(${color}, 0.5)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node label with better positioning
        ctx.fillStyle = 'white';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const maxWidth = 60;
        const text = node.label.length > 12 ? node.label.substring(0, 12) + '.' : node.label;
        ctx.fillText(text, node.x, node.y - nodeRadius - 8);

        // Confidence indicator
        ctx.fillStyle = `rgba(${color}, 0.6)`;
        ctx.font = '7px monospace';
        ctx.fillText(`${Math.round(node.confidence * 100)}%`, node.x, node.y + nodeRadius + 6);
      });
    };

    render();
  }, [nodes, edges, selectedNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked node
    const clickedNode = nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 20;
    });

    setSelectedNode(clickedNode || null);
  };

  return (
    <div className={`p-6 bg-gray-800 rounded-lg space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Brain className="w-6 h-6 text-blue-400" />
          <span>Real-Time Cognitive Graph</span>
        </h3>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          {isAnimating ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg p-4">
            <canvas
              ref={canvasRef}
              width={500}
              height={400}
              onClick={handleCanvasClick}
              className="w-full cursor-pointer"
              style={{ maxWidth: '500px', height: '400px' }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-900/30 to-transparent border border-blue-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>Knowledge Graph</span>
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Concepts Learned:</span>
                  <span className="text-blue-300 font-bold">{stats.totalNodes}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Connections:</span>
                  <span className="text-blue-300 font-bold">{stats.totalEdges}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Knowledge Confidence:</span>
                  <span className="text-green-300 font-bold">{(stats.avgConfidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.avgConfidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-purple-300 mb-3">Learning by Domain</h4>
            <div className="space-y-2">
              {Object.entries({
                technical: '59, 130, 246',
                ethical: '239, 68, 68',
                environmental: '34, 197, 94'
              }).map(([domain, color]) => {
                const count = stats.domains[domain] || 0;
                const total = stats.totalNodes || 1;
                const percent = Math.round((count / total) * 100);
                return (
                  <div key={domain} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400 capitalize">{domain}</span>
                      <span className="text-white font-bold">{count}</span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%`, backgroundColor: `rgb(${color})` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedNode && (
            <div className="bg-gradient-to-br from-yellow-900/30 to-transparent border border-yellow-700 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-300 mb-3 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Inspecting Concept</span>
              </h4>
              <div className="space-y-2 text-xs">
                <div className="text-white font-bold text-sm">{selectedNode.label}</div>
                <div className="flex justify-between text-gray-400">
                  <span>Domain:</span>
                  <span className="text-gray-300 capitalize">{selectedNode.domain}</span>
                </div>
                <div className="flex justify-between text-gray-400 mb-2">
                  <span>Confidence:</span>
                  <span className="text-gray-300 font-bold">{(selectedNode.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                  <div 
                    className="bg-yellow-400 h-1.5 rounded-full"
                    style={{ width: `${selectedNode.confidence * 100}%` }}
                  />
                </div>
                <div className="text-gray-500 text-[10px] mt-2">
                  Active: {new Date(selectedNode.lastAccessed).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-gradient-to-r from-gray-700/40 to-gray-700/20 border border-gray-700 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Active Learning</span>
        </div>
        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <span>📊 {stats.totalNodes} concepts</span>
          <span>•</span>
          <span>🔗 {stats.totalEdges} connections</span>
          <span>•</span>
          <span>Click nodes to explore</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCognitiveGraph;
