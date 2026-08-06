import { describe, it, expect } from 'vitest';
import { DriftDetectionEngine } from './DriftEngine';
import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';

describe('Drift & Contradiction Detection Engine Test', () => {
  const engine = new DriftDetectionEngine();

  const baseSnapshot: IngestedRepositorySnapshot = {
    identity: {
      repository: 'kenanay/AykenOS',
      commitSha: 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
      manifestDigest: 'digest_123',
    },
    observation: {
      capturedAt: '2026-08-06T20:00:00Z',
      sourceMode: 'fixture',
      isDemoData: true,
    },
    files: [
      { path: 'shared/abi/custom_syscall.h', contentDigest: 'sha_custom_abi', size: 100 },
      { path: 'userspace/ai-runtime/src/planner.rs', contentDigest: 'sha_planner', size: 200 },
    ],
    verificationState: 'DEMO',
    ignorePolicyVersion: '1.0.0',
  };

  it('detects CRITICAL_ABI_FREEZE_VIOLATION when unratified ABI file exists', () => {
    const report = engine.auditSnapshot(baseSnapshot);
    expect(report.hasCriticalViolations).toBe(true);

    const abiDrift = report.driftItems.find((d) => d.category === 'CRITICAL_ABI_FREEZE_VIOLATION');
    expect(abiDrift).toBeDefined();
    expect(abiDrift?.severity).toBe('CRITICAL');
  });

  it('detects UNRATIFIED_IMPLEMENTATION_DRIFT for newly added AI runtime files', () => {
    const report = engine.auditSnapshot(baseSnapshot);
    const aiDrift = report.driftItems.find((d) => d.category === 'UNRATIFIED_IMPLEMENTATION_DRIFT');
    expect(aiDrift).toBeDefined();
    expect(aiDrift?.severity).toBe('WARNING');
  });
});
