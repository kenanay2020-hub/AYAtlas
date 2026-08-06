import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Repository Parser Execution Safety Check', () => {
  it('should not import or require process execution modules (child_process, execa, shelljs, zx, node-pty)', () => {
    const srcDir = path.join(__dirname);
    const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'));

    const forbiddenModules = ['child_process', 'execa', 'shelljs', 'zx', 'node-pty'];

    for (const file of files) {
      const filePath = path.join(srcDir, file);
      const content = fs.readFileSync(filePath, 'utf8');

      for (const mod of forbiddenModules) {
        const importPattern = new RegExp(`from\\s+['"]${mod}['"]|require\\(['"]${mod}['"]\\)`);
        expect(
          importPattern.test(content),
          `Forbidden execution module "${mod}" found in ${file}`
        ).toBe(false);
      }
    }
  });
});
