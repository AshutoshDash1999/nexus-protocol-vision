/**
 * Type definitions for Sovereign Persona and Cognitive Graph
 */

export interface GraphNode {
  id: string;
  domain: string;
  complexity: number;
  confidence: number;
  lastAccessed: number;
  accessCount: number;
  relatedConcepts: string[];
  metadata: {
    source?: string;
    context?: any;
    createdAt?: number;
    interactions?: Array<{
      timestamp: number;
      type: string;
      context: any;
    }>;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  type: string;
  strength: number;
}

export interface KnowledgeState {
  totalNodes: number;
  totalEdges: number;
  averageConfidence: number;
  domainDistribution: Record<string, number>;
  learningVelocity: number;
  lastUpdate: number;
}

export interface LearningPath {
  goal: string;
  steps: GraphNode[];
  estimatedDuration: number;
  difficulty: number;
  prerequisites: string[];
}
