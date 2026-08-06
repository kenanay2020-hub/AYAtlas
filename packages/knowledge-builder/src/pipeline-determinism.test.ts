import { describe, it, expect } from 'vitest';
import { OfflineFixtureRepositorySource } from '@ayatlas/github-reader';
import { KnowledgePipelineEngine } from './index';

describe('Deterministic 5-Stage Knowledge Pipeline Test', () => {
  it('should produce identical payloadDigest hashes for consecutive runs over the same snapshot', async () => {
    const source = new OfflineFixtureRepositorySource('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f');
    const engine1 = new KnowledgePipelineEngine(source);
    const engine2 = new KnowledgePipelineEngine(source);

    const res1 = await engine1.runFullPipeline();
    const res2 = await engine2.runFullPipeline();

    // Verify all 5 stage payload digests match perfectly
    expect(res1.s1.metadata.payloadDigest).toBe(res2.s1.metadata.payloadDigest);
    expect(res1.s2.metadata.payloadDigest).toBe(res2.s2.metadata.payloadDigest);
    expect(res1.s3.metadata.payloadDigest).toBe(res2.s3.metadata.payloadDigest);
    expect(res1.s4.metadata.payloadDigest).toBe(res2.s4.metadata.payloadDigest);
    expect(res1.s5.metadata.payloadDigest).toBe(res2.s5.metadata.payloadDigest);
  });
});
