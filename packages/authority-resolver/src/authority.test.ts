import { describe, it, expect } from 'vitest';
import { AuthorityResolver } from './index';

describe('Authority Resolver Invariant Tests', () => {
  const resolver = new AuthorityResolver();

  it('should NOT resolve ACTIVE_AUTHORITY for Ring3 AI Runtime or Semantic CLI', () => {
    const res = resolver.resolve({
      domain: 'RUNTIME_AUTHORITY',
      subjectId: 'userspace/ai-runtime',
      snapshotId: 'kenanay/AykenOS:d8018a2c',
    });

    expect(res.authorityClass).toBe('BOUNDED');
    expect(res.value).toBe('NO_GENERAL_RUNTIME_AUTHORITY');
  });

  it('should NOT resolve ACCEPTED_EVIDENCE from validator outputs alone', () => {
    const res = resolver.resolve({
      domain: 'EVIDENCE_STATUS',
      subjectId: 'workflow-run-12345',
      snapshotId: 'kenanay/AykenOS:d8018a2c',
    });

    expect(res.value).not.toBe('ACCEPTED_EVIDENCE');
    expect(res.authorityClass).toBe('EXACT_SUBJECT');
  });
});
