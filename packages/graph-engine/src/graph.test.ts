import { describe, it, expect } from 'vitest';
import { GovernanceKnowledgeGraphEngine } from './index';

describe('Governance Knowledge Graph Traversal Test', () => {
  const engine = new GovernanceKnowledgeGraphEngine();

  it('should traverse neighborhood for Phase-24 node correctly', () => {
    const neighborhood = engine.getNeighborhood('phase-24');
    expect(neighborhood).not.toBeNull();
    expect(neighborhood?.targetNode.label).toContain('Phase-24');
    expect(neighborhood?.connectedNodes.length).toBeGreaterThan(0);
  });

  it('should traverse neighborhood for Invariant node correctly', () => {
    const neighborhood = engine.getNeighborhood('inv-validator-accepted');
    expect(neighborhood).not.toBeNull();
    expect(neighborhood?.edges.some((e) => e.relation === 'BOUNDS')).toBe(true);
  });
});
