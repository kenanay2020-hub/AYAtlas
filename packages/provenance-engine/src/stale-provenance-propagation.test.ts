import { describe, it, expect } from 'vitest';
import { ProvenanceEngine } from './ProvenanceEngine';

describe('Stale Provenance Propagation Test', () => {
  const engine = new ProvenanceEngine();

  it('should propagate stale status to linked assertions when source path changes', () => {
    engine.registerProvenance({
      assertionId: 'assert-phase-24',
      repository: 'kenanay/AykenOS',
      commitSha: 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      sourcePath: 'docs/roadmap/CURRENT_PHASE',
      sourceDigest: 'hash_v1',
      extractionMethod: 'governance-resolved',
      confidence: 1.0,
    });

    expect(engine.isProvenanceValid('assert-phase-24', 'hash_v1')).toBe(true);

    // Mark source path stale
    const staleIds = engine.markSourcePathStale('docs/roadmap/CURRENT_PHASE');
    expect(staleIds).toContain('assert-phase-24');

    // Invariant: Stale provenance must be invalid
    expect(engine.isProvenanceValid('assert-phase-24', 'hash_v1')).toBe(false);
  });
});
