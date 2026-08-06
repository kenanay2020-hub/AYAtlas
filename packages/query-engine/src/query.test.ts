import { describe, it, expect } from 'vitest';
import { ConstitutionalQueryEngine } from './QueryEngine';

describe('Constitutional Query & Explanation Engine Test', () => {
  const engine = new ConstitutionalQueryEngine();

  it('evaluates Ring3 authority query with Mechanism vs Policy invariant', () => {
    const answer = engine.askConstitutionalQuery('Semantic CLI neden aktif yetkiye sahip değildir?');
    expect(answer.status).toBe('DEMO_SUPPORTED');
    expect(answer.conclusion).toContain('BOUNDED authority');
    expect(answer.appliedInvariants.some((inv) => inv.includes('Mechanism vs Policy'))).toBe(true);
    expect(answer.disclaimerNotice).toContain('Generated Explanation != Canonical Authority Decision');
  });

  it('evaluates validator PASS query with Validator PASS != Accepted Evidence invariant', () => {
    const answer = engine.askConstitutionalQuery('Validator PASS neden accepted evidence değildir?');
    expect(answer.status).toBe('DEMO_SUPPORTED');
    expect(answer.appliedInvariants.some((inv) => inv.includes('Validator Output PASS != Accepted Evidence'))).toBe(true);
    expect(answer.directSources.length).toBeGreaterThan(0);
  });
});
