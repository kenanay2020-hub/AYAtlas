import { describe, it, expect } from 'vitest';
import { ChangeIntelligenceEngine } from './ChangeIntelligence';
import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';

describe('Change Intelligence Authority Invariant Test', () => {
  const engine = new ChangeIntelligenceEngine();

  const baseSnapshot: IngestedRepositorySnapshot = {
    identity: {
      repository: 'kenanay/AykenOS',
      commitSha: 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      manifestDigest: 'digest_base',
    },
    observation: {
      capturedAt: '2026-08-06T19:00:00Z',
      sourceMode: 'fixture',
      isDemoData: true,
    },
    files: [{ path: 'kernel/kernel.c', contentDigest: 'sha_base', size: 100 }],
    verificationState: 'DEMO',
    ignorePolicyVersion: '1.0.0',
  };

  const targetSnapshot: IngestedRepositorySnapshot = {
    identity: {
      repository: 'kenanay/AykenOS',
      commitSha: '53166ef11223344556677889900aabbccddeeff',
      manifestDigest: 'digest_target',
    },
    observation: {
      capturedAt: '2026-08-06T20:00:00Z',
      sourceMode: 'fixture',
      isDemoData: true,
    },
    files: [
      { path: 'kernel/kernel.c', contentDigest: 'sha_base', size: 100 },
      { path: 'userspace/ai-runtime/src/new_feature.rs', contentDigest: 'sha_new_ai', size: 200 },
    ],
    verificationState: 'DEMO',
    ignorePolicyVersion: '1.0.0',
  };

  it('does not infer authority from newly detected runtime code', () => {
    const report = engine.compareSnapshots(baseSnapshot, targetSnapshot);
    expect(report.changes.length).toBe(1);

    const addedAiCode = report.changes[0];
    expect(addedAiCode.path).toBe('userspace/ai-runtime/src/new_feature.rs');
    expect(addedAiCode.changeType).toBe('ADDED');
    expect(addedAiCode.classification).toBe('IMPLEMENTATION_CHANGE');

    // Strict invariant: grantsNewAuthority MUST remain false
    expect(addedAiCode.grantsNewAuthority).toBe(false);
  });
});
