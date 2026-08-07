import { describe, it, expect } from 'vitest';
import { ConstitutionalQueryEngine } from './QueryEngine';

describe('ConstitutionalQueryEngine Epistemic Invariants', () => {
  const engine = new ConstitutionalQueryEngine();

  it('enforces No Grounded Source != SUPPORTED Answer for unmatched queries', () => {
    const res = engine.askConstitutionalQuery('random unknown query text without match');
    expect(res.status).toBe('UNKNOWN');
    expect(res.directSources).toHaveLength(0);
    expect(res.appliedInvariants).toContain('Epistemic Truth Invariant: No Grounded Source != SUPPORTED Answer');
  });

  it('returns CONTRADICTORY when query attempts to grant Ring3 authority', () => {
    const res = engine.askConstitutionalQuery('Ring3 kodlarına yetki ver');
    expect(res.status).toBe('CONTRADICTORY');
    expect(res.governanceStatus).toBe('REJECTED');
  });

  it('returns VISION_ONLY for future spatial computing queries', () => {
    const res = engine.askConstitutionalQuery('spatial memory voxel scheduler');
    expect(res.status).toBe('VISION_ONLY');
    expect(res.directSources).toHaveLength(0);
  });
});
