/**
 * IgnorePolicy filters out build outputs, binary files, node_modules, and git internals.
 */
export class IgnorePolicy {
  private ignoredPatterns: string[] = [
    'node_modules/',
    'target/',
    'dist/',
    '.git/',
    '*.o',
    '*.a',
    '*.bin',
    '*.iso',
    '*.DS_Store',
  ];

  shouldIgnore(path: string): boolean {
    const normalized = path.replace(/\\/g, '/');
    for (const pattern of this.ignoredPatterns) {
      if (pattern.endsWith('/') && normalized.includes(pattern)) {
        return true;
      }
      if (pattern.startsWith('*') && normalized.endsWith(pattern.slice(1))) {
        return true;
      }
      if (normalized.includes(pattern)) {
        return true;
      }
    }
    return false;
  }
}
