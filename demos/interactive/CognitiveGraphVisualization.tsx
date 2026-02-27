/**
 * Interactive Cognitive Graph Visualization
 * Visualizes the user's knowledge graph with real-time updates
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  domain: string;
  confidence: number;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  strength: number;
  type: string;
}

interface CognitiveGraphVisualizationProps {
  nodes: Node[];
  links: Link[];
  onNodeClick?: (node: Node) => void;
  onLinkClick?: (link: Link) => void;
  width?: number;
  height?: number;
}

export const CognitiveGraphVisualization: React.FC<CognitiveGraphVisualizationProps> = ({
  nodes,
  links,
  onNodeClick,
  onLinkClick,
  width = 800,
  height = 600
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [simulation, setSimulation] = useState<d3.Simulation<Node, Link> | null>(null);

  const domainColors = {
    technology: '#3B82F6',
    science: '#10B981',
    arts: '#F59E0B',
    philosophy: '#8B5CF6',
    mathematics: '#EF4444',
    general: '#6B7280'
  };

  const initializeSimulation = useCallback(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create main group
    const g = svg.append('g');

    // Create force simulation
    const sim = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links)
        .id(d => d.id)
        .strength(d => d.strength)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.strength * 5))
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        onLinkClick?.(d);
      });

    // Create link labels
    const linkLabels = g.append('g')
      .selectAll('text')
      .data(links)
      .enter().append('text')
      .text(d => d.type)
      .attr('font-size', '10px')
      .attr('fill', '#666')
      .attr('text-anchor', 'middle')
      .attr('dy', -5);

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    // Add circles for nodes
    node.append('circle')
      .attr('r', d => 10 + d.confidence * 15)
      .attr('fill', d => domainColors[d.domain as keyof typeof domainColors] || domainColors.general)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
        onNodeClick?.(d);
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
      });

    // Add labels for nodes
    node.append('text')
      .text(d => d.label)
      .attr('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('dy', -20)
      .attr('fill', '#333');

    // Add confidence indicators
    node.append('text')
      .text(d => `${Math.round(d.confidence * 100)}%`)
      .attr('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .attr('fill', '#666');

    // Update positions on tick
    sim.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      linkLabels
        .attr('x', d => ((d.source as Node).x! + (d.target as Node).x!) / 2)
        .attr('y', d => ((d.source as Node).y! + (d.target as Node).y!) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    setSimulation(sim);

    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) sim.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) sim.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      sim.stop();
    };
  }, [nodes, links, width, height, onNodeClick, onLinkClick]);

  useEffect(() => {
    const cleanup = initializeSimulation();
    return cleanup;
  }, [initializeSimulation]);

  useEffect(() => {
    if (simulation) {
      simulation.nodes(nodes);
      simulation.force<d3.ForceLink<Node, Link>>('link')!.links(links);
      simulation.alpha(1).restart();
    }
  }, [nodes, links, simulation]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg shadow-lg"
      />
      
      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 max-w-xs"
          >
            <h3 className="font-semibold text-lg mb-2">{selectedNode.label}</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Domain:</span> {selectedNode.domain}
              </div>
              <div>
                <span className="font-medium">Confidence:</span> {Math.round(selectedNode.confidence * 100)}%
              </div>
              <div>
                <span className="font-medium">ID:</span> {selectedNode.id}
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="mt-3 text-xs text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredNode && !selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bg-gray-800 text-white p-2 rounded text-xs pointer-events-none"
            style={{
              left: hoveredNode.x ? hoveredNode.x + 10 : 0,
              top: hoveredNode.y ? hoveredNode.y - 30 : 0
            }}
          >
            <div className="font-medium">{hoveredNode.label}</div>
            <div>Confidence: {Math.round(hoveredNode.confidence * 100)}%</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <h4 className="font-semibold text-sm mb-2">Domains</h4>
        <div className="space-y-1">
          {Object.entries(domainColors).map(([domain, color]) => (
            <div key={domain} className="flex items-center space-x-2 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">{domain}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample data for demonstration
export const sampleCognitiveGraphData = {
  nodes: [
    { id: 'quantum_computing', label: 'Quantum Computing', domain: 'technology', confidence: 0.8 },
    { id: 'qubits', label: 'Qubits', domain: 'science', confidence: 0.7 },
    { id: 'superposition', label: 'Superposition', domain: 'science', confidence: 0.6 },
    { id: 'entanglement', label: 'Entanglement', domain: 'science', confidence: 0.5 },
    { id: 'quantum_gates', label: 'Quantum Gates', domain: 'technology', confidence: 0.7 },
    { id: 'algorithms', label: 'Quantum Algorithms', domain: 'technology', confidence: 0.9 },
    { id: 'cryptography', label: 'Quantum Cryptography', domain: 'technology', confidence: 0.4 },
    { id: 'machine_learning', label: 'Machine Learning', domain: 'technology', confidence: 0.9 },
    { id: 'neural_networks', label: 'Neural Networks', domain: 'technology', confidence: 0.8 },
    { id: 'mathematics', label: 'Mathematics', domain: 'mathematics', confidence: 0.7 }
  ],
  links: [
    { source: 'quantum_computing', target: 'qubits', strength: 0.9, type: 'uses' },
    { source: 'quantum_computing', target: 'superposition', strength: 0.8, type: 'relies_on' },
    { source: 'quantum_computing', target: 'entanglement', strength: 0.8, type: 'relies_on' },
    { source: 'quantum_computing', target: 'quantum_gates', strength: 0.7, type: 'uses' },
    { source: 'quantum_computing', target: 'algorithms', strength: 0.9, type: 'implements' },
    { source: 'quantum_computing', target: 'cryptography', strength: 0.6, type: 'applies_to' },
    { source: 'qubits', target: 'superposition', strength: 0.8, type: 'exhibits' },
    { source: 'qubits', target: 'entanglement', strength: 0.7, type: 'exhibits' },
    { source: 'machine_learning', target: 'neural_networks', strength: 0.9, type: 'uses' },
    { source: 'quantum_computing', target: 'machine_learning', strength: 0.5, type: 'enhances' },
    { source: 'mathematics', target: 'quantum_computing', strength: 0.8, type: 'foundation' }
  ]
};
