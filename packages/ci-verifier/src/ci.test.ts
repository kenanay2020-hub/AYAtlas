import { describe, it, expect } from 'vitest';
import { CIVerifier } from './CIVerifier';

describe('CI Verifier & 5-Gate Constitutional Audit Test', () => {
  const verifier = new CIVerifier();

  it('verifies clean commit snapshot against all 5 constitutional gates', async () => {
    const report = await verifier.verifyCommit('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f');
    expect(report.overallPassed).toBe(true);
    expect(report.gates.length).toBe(5);
    expect(report.gates.every((g) => g.passed)).toBe(true);
    expect(report.summaryMarkdown).toContain('AYAtlas Constitutional CI Verification Report');
    expect(report.summaryMarkdown).toContain('Gate 1 [PASS]');
    expect(report.summaryMarkdown).toContain('Gate 5 [PASS]');
  });
});
