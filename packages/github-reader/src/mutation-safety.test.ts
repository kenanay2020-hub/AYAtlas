import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('GitHub Reader Read-Only Safety Check', () => {
  it('should not contain write/mutation methods (createCommit, updateFile, createPullRequest, etc.)', () => {
    const srcDir = path.join(__dirname);
    const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'));

    const forbiddenMethods = [
      'createCommit',
      'updateFile',
      'createBranch',
      'createPullRequest',
      'dispatchWorkflow',
      'createIssue',
      'deleteFile',
    ];

    for (const file of files) {
      const filePath = path.join(srcDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      for (const method of forbiddenMethods) {
        expect(
          content.includes(method),
          `Forbidden mutation method "${method}" found in ${file}`
        ).toBe(false);
      }
    }
  });
});
