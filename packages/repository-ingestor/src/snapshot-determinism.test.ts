import { describe, it, expect } from 'vitest';
import { OfflineFixtureRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor } from './RepositoryIngestor';

describe('Repository Ingestor Determinism & Identity Test', () => {
  it('should produce identical manifestDigest for consecutive ingestions of the same commit SHA', async () => {
    const source = new OfflineFixtureRepositorySource('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f');
    const ingestor = new RepositoryIngestor(source);

    const s1 = await ingestor.ingestSnapshot('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f', 'fixture', '2026-08-06T20:00:00Z');
    const s2 = await ingestor.ingestSnapshot('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f', 'fixture', '2026-08-06T21:00:00Z');

    // Digest MUST be identical despite different capturedAt timestamps
    expect(s1.identity.manifestDigest).toBe(s2.identity.manifestDigest);
    expect(s1.files.length).toBeGreaterThan(0);
  });
});
