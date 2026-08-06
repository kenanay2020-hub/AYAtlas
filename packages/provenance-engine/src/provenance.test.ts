import { describe, it, expect } from 'vitest';
import { ProvenanceEngine } from './ProvenanceEngine';

describe('Provenance Engine Test', () => {
  const engine = new ProvenanceEngine();

  it('should register and validate exact source provenance', () => {
    engine.registerProvenance({
      assertionId: 'assert-phase-24',
      repository: 'kenanay/AykenOS',
      commitSha: 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      sourcePath: 'docs/roadmap/CURRENT_PHASE',
      sourceDigest: 'hash_abc123',
      extractionMethod: 'governance-resolved',
      confidence: 1.0,
    });

    const record = engine.getProvenance('assert-phase-24');
    expect(record).toBeDefined();
    expect(record?.extractionMethod).toBe('governance-resolved');
    expect(engine.isProvenanceValid('assert-phase-24', 'hash_abc123')).toBe(true);
    expect(engine.isProvenanceValid('assert-phase-24', 'stale_hash')).toBe(false);
  });
});
