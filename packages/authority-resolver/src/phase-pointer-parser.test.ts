import { describe, it, expect } from 'vitest';
import { parsePhasePointer } from './phase-pointer-parser';

describe('parsePhasePointer', () => {
  it('parses numeric phase pointer "24"', () => {
    const result = parsePhasePointer('24');
    expect(result).toEqual({
      phase: 24,
      raw: '24',
      format: 'numeric',
    });
  });

  it('parses phase token "Phase-24"', () => {
    const result = parsePhasePointer('Phase-24');
    expect(result).toEqual({
      phase: 24,
      raw: 'Phase-24',
      format: 'phase-token',
    });
  });

  it('parses key-value "CURRENT_PHASE=24"', () => {
    const result = parsePhasePointer('CURRENT_PHASE=24');
    expect(result).toEqual({
      phase: 24,
      raw: 'CURRENT_PHASE=24',
      format: 'key-value',
    });
  });

  it('parses key-value with colon "current_phase: 25"', () => {
    const result = parsePhasePointer('current_phase: 25');
    expect(result).toEqual({
      phase: 25,
      raw: 'current_phase: 25',
      format: 'key-value',
    });
  });

  it('parses YAML frontmatter correctly', () => {
    const content = `---
title: System Roadmap
phase: 24
status: ACTIVE
---
# Roadmap Details
`;
    const result = parsePhasePointer(content);
    expect(result).toEqual({
      phase: 24,
      raw: 'phase: 24',
      format: 'frontmatter',
    });
  });

  it('ignores historical body mentions like "Previous Phase-23"', () => {
    const content = `# System Status
Previous Phase-23 was officially closed on 2026-07-15.
Current Phase-24 is active.
`;
    const result = parsePhasePointer(content);
    expect(result).toEqual({
      phase: 24,
      raw: 'Current Phase-24 is active.',
      format: 'key-value',
    });
  });

  it('returns null for empty or invalid content', () => {
    expect(parsePhasePointer('')).toBeNull();
    expect(parsePhasePointer(null)).toBeNull();
    expect(parsePhasePointer('No phase mentions here')).toBeNull();
  });
});
