export type FileCategory =
  | 'SOURCE'
  | 'GOVERNANCE'
  | 'TEST'
  | 'GENERATED'
  | 'BINARY'
  | 'VENDOR'
  | 'BUILD_ARTIFACT'
  | 'DOCUMENTATION';

export class FileClassifier {
  classify(filePath: string): FileCategory {
    const lower = filePath.toLowerCase();

    // 1. Vendor & Build Artifacts
    if (
      lower.includes('node_modules/') ||
      lower.includes('vendor/') ||
      lower.includes('dist/') ||
      lower.includes('target/') ||
      lower.includes('.turbo/')
    ) {
      return 'VENDOR';
    }

    // 2. Binary files
    if (
      lower.endsWith('.png') ||
      lower.endsWith('.jpg') ||
      lower.endsWith('.jpeg') ||
      lower.endsWith('.gif') ||
      lower.endsWith('.ico') ||
      lower.endsWith('.pdf') ||
      lower.endsWith('.zip') ||
      lower.endsWith('.tar') ||
      lower.endsWith('.gz') ||
      lower.endsWith('.wasm') ||
      lower.endsWith('.o') ||
      lower.endsWith('.so') ||
      lower.endsWith('.a') ||
      lower.endsWith('.dylib') ||
      lower.endsWith('.exe')
    ) {
      return 'BINARY';
    }

    // 3. Tests
    if (
      lower.includes('.test.') ||
      lower.includes('.spec.') ||
      lower.includes('tests/') ||
      lower.includes('test/')
    ) {
      return 'TEST';
    }

    // 4. Governance & Canonical Decisions
    if (
      lower.includes('docs/roadmap/current_phase') ||
      lower.includes('docs/phase') ||
      lower.includes('docs/canonical') ||
      lower.includes('docs/evidence') ||
      lower.includes('constitution') ||
      lower.includes('governance')
    ) {
      return 'GOVERNANCE';
    }

    // 5. Documentation
    if (lower.startsWith('docs/') || lower.endsWith('.md')) {
      return 'DOCUMENTATION';
    }

    // 6. Source code
    if (
      lower.endsWith('.rs') ||
      lower.endsWith('.c') ||
      lower.endsWith('.h') ||
      lower.endsWith('.cpp') ||
      lower.endsWith('.ts') ||
      lower.endsWith('.tsx') ||
      lower.endsWith('.js') ||
      lower.endsWith('.py') ||
      lower.endsWith('.go') ||
      lower.endsWith('.toml') ||
      lower.endsWith('.json')
    ) {
      return 'SOURCE';
    }

    return 'DOCUMENTATION';
  }

  isRelevantForKnowledge(category: FileCategory): boolean {
    return category === 'SOURCE' || category === 'GOVERNANCE' || category === 'DOCUMENTATION';
  }
}
