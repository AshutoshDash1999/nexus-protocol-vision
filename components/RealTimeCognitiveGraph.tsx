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

  // Initialize cognitive graph from real metrics
  useEffect(() => {
    const baseNodes = Math.max(5, Math.min(20, Math.round(metrics.activeUsers / 2 + metrics.cpuLoadPercent / 10)));
    const baseEdges = Math.round(baseNodes * 1.5);

    const generatedNodes: Node[] = Array.from({ length: baseNodes }, (_, idx) => {
      const domain = ['technical', 'ethical', 'environmental'][idx % 3];
      return {
        id: `${metrics.uptimeSeconds}-${idx}`,
        label: domain === 'technical' ? `Tech Node ${idx + 1}` : domain === 'ethical' ? `Ethics Node ${idx + 1}` : `Env Node ${idx + 1}`,
        x: 100 + (idx % 5) * 80,
        y: 100 + Math.floor(idx / 5) * 80,
        vx: 0,
        vy: 0,
        confidence: 0.6 + (metrics.energySavingsPercent / 200),
        domain,
        lastAccessed: Date.now() - Math.random() * 20000
      };
    });

    const generatedEdges: Edge[] = Array.from({ length: baseEdges }, (_, idx) => ({
      source: generatedNodes[idx % generatedNodes.length].id,
      target: generatedNodes[(idx + 1) % generatedNodes.length].id,
      strength: 0.4 + Math.random() * 0.6,
      type: 'relation'
    }));

    setNodes(generatedNodes);
    setEdges(generatedEdges);
  }, [metrics]);

  // Real-time updates
  useEffect(() => {
    const updateGraph = () => {
      setNodes(prevNodes => {
        const updatedNodes = [...prevNodes];
        
        // Simulate real-time learning
        if (Math.random() < 0.1) {
          // Add new node occasionally
          const newNode: Node = {
            id: Date.now().toString(),
            label: ['AI Safety', 'Quantum Computing', 'Blockchain', 'Climate Tech'][Math.floor(Math.random() * 4)],
            x: Math.random() * 400 + 50,
            y: Math.random() * 300 + 50,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            confidence: Math.random() * 0.5 + 0.5,
            domain: ['technical', 'ethical', 'environmental'][Math.floor(Math.random() * 3)],
            lastAccessed: Date.now()
          };
          
          if (updatedNodes.length < 15) {
            updatedNodes.push(newNode);
            
            // Add random connections
            if (Math.random() < 0.7) {
              const randomTarget = updatedNodes[Math.floor(Math.random() * (updatedNodes.length - 1))];
              setEdges(prevEdges => [...prevEdges, {
                source: newNode.id,
                target: randomTarget.id,
                strength: Math.random() * 0.5 + 0.5,
                type: 'learning'
              }]);
            }
          }
        }

        // Update existing nodes
        return updatedNodes.map(node => ({
          ...node,
          confidence: Math.min(1, node.confidence + (Math.random() - 0.5) * 0.1),
          lastAccessed: Math.random() < 0.3 ? Date.now() : node.lastAccessed
        }));
      });
    };

    const interval = setInterval(updateGraph, 2000);
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

      // Draw edges
      edges.forEach(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${edge.strength})`;
          ctx.lineWidth = edge.strength * 3;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach(node => {
        const isSelected = selectedNode?.id === node.id;
        const isRecentlyAccessed = Date.now() - node.lastAccessed < 5000;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 10 + node.confidence * 10, 0, Math.PI * 2);
        
        // Color based on domain
        const colors = {
          technical: '59, 130, 246',
          ethical: '239, 68, 68',
          environmental: '34, 197, 94'
        };
        const color = colors[node.domain as keyof typeof colors] || '156, 163, 175';
        
        ctx.fillStyle = `rgba(${color}, ${node.confidence})`;
        ctx.fill();
        
        if (isSelected) {
          ctx.strokeStyle = 'rgba(251, 191, 36, 1)';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else if (isRecentlyAccessed) {
          ctx.strokeStyle = 'rgba(34, 197, 94, 1)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Node label
        ctx.fillStyle = 'white';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 20);
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
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
              <Network className="w-4 h-4" />
              <span>Graph Statistics</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Nodes:</span>
                <span className="text-white font-bold">{stats.totalNodes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Edges:</span>
                <span className="text-white font-bold">{stats.totalEdges}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Confidence:</span>
                <span className="text-white font-bold">{(stats.avgConfidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Domain Distribution</h4>
            <div className="space-y-2">
              {Object.entries(stats.domains).map(([domain, count]) => (
                <div key={domain} className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{domain}:</span>
                  <span className="text-white font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedNode && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Selected Node</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="text-white font-bold">{selectedNode.label}</div>
                <div className="text-gray-400">Domain: {selectedNode.domain}</div>
                <div className="text-gray-400">Confidence: {(selectedNode.confidence * 100).toFixed(1)}%</div>
                <div className="text-gray-400">
                  Last accessed: {new Date(selectedNode.lastAccessed).toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Graph Active</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-400">
          <span>Click nodes to inspect</span>
          <span>•</span>
          <span>Real-time learning enabled</span>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCognitiveGraph;
