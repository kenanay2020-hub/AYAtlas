import { describe, it, expect } from 'vitest';
import { ChangeIntelligenceEngine } from './ChangeIntelligence';
import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';

describe('Current Phase Semantic Diff & Contradiction Test', () => {
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
    files: [{ path: 'docs/roadmap/CURRENT_PHASE', contentDigest: 'sha_p24', size: 100 }],
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
    files: [{ path: 'docs/roadmap/CURRENT_PHASE', contentDigest: 'sha_p25', size: 100 }],
    verificationState: 'DEMO',
    ignorePolicyVersion: '1.0.0',
  };

  it('detects POTENTIAL_CONTRADICTION when CURRENT_PHASE changes without canonical decision file', () => {
    const report = engine.compareSnapshots(baseSnapshot, targetSnapshot, {
      basePhase: 24,
      targetPhase: 25,
      hasCanonicalDecisionFile: false,
    });

    expect(report.overallAuthorityImpact).toBe('CONTRADICTION_DETECTED');
    const phaseChange = report.changes.find((c) => c.path === 'docs/roadmap/CURRENT_PHASE');
    expect(phaseChange?.classification).toBe('POTENTIAL_CONTRADICTION');
    expect(phaseChange?.authorityImpactDescription).toContain('without canonical decision file');
  });
});
