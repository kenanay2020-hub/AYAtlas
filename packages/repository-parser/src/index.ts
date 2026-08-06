import jsYaml from 'js-yaml';

export interface ParsedMarkdown {
  frontmatter: Record<string, unknown>;
  title?: string;
  headers: string[];
  body: string;
}

/**
 * Static parser for Markdown text & YAML frontmatter.
 * NO process execution. Pure string manipulation and AST parsing.
 */
export function parseMarkdownContent(content: string): ParsedMarkdown {
  const frontmatterPattern = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/;
  let frontmatter: Record<string, unknown> = {};
  let body = content;

  const match = content.match(frontmatterPattern);
  if (match) {
    try {
      const parsedYaml = jsYaml.load(match[1]);
      if (typeof parsedYaml === 'object' && parsedYaml !== null) {
        frontmatter = parsedYaml as Record<string, unknown>;
      }
    } catch {
      // Graceful fallback for non-valid YAML frontmatter
    }
    body = content.slice(match[0].length);
  }

  // Extract headings
  const headerLines = body.match(/^#+\s+.+$/gm) || [];
  const headers = headerLines.map((line) => line.replace(/^#+\s+/, '').trim());
  const titleHeader = headerLines.find((line) => line.startsWith('# '));
  const title = titleHeader ? titleHeader.replace(/^#\s+/, '').trim() : undefined;

  return {
    frontmatter,
    title,
    headers,
    body,
  };
}

/**
 * Static parser for YAML workflow files.
 */
export function parseWorkflowYaml(content: string): Record<string, unknown> {
  try {
    const doc = jsYaml.load(content);
    if (typeof doc === 'object' && doc !== null) {
      return doc as Record<string, unknown>;
    }
  } catch {
    // Fallback
  }
  return {};
}

/**
 * Static path classifier for AykenOS directory structure.
 */
export function classifyAykenosPath(path: string): {
  category: 'boot' | 'ring0' | 'abi' | 'ring3' | 'substrate' | 'verification' | 'tooling' | 'governance' | 'ci' | 'docs' | 'other';
  subCategory?: string;
} {
  const normalized = path.replace(/^\//, '');

  if (normalized.startsWith('bootloader') || normalized.includes('gnu-efi') || normalized.includes('qemu')) {
    return { category: 'boot', subCategory: 'platform_init' };
  }
  if (normalized.startsWith('kernel/')) {
    const sub = normalized.split('/')[1];
    return { category: 'ring0', subCategory: sub };
  }
  if (normalized.startsWith('shared/abi') || normalized.startsWith('kernel/sys')) {
    return { category: 'abi', subCategory: 'syscall_boundary' };
  }
  if (normalized.startsWith('userspace/')) {
    const sub = normalized.split('/')[1];
    return { category: 'ring3', subCategory: sub };
  }
  if (normalized.startsWith('ayken-core/crates/')) {
    const crate = normalized.split('/')[2];
    return { category: 'substrate', subCategory: crate };
  }
  if (normalized.startsWith('proofd') || normalized.includes('verification') || normalized.includes('validation')) {
    return { category: 'verification', subCategory: 'evidence_validation' };
  }
  if (normalized.startsWith('.github/workflows')) {
    return { category: 'ci', subCategory: 'ci_gate' };
  }
  if (normalized.startsWith('tools/')) {
    const sub = normalized.split('/')[1];
    return { category: 'tooling', subCategory: sub };
  }
  if (normalized.startsWith('docs/')) {
    return { category: 'governance', subCategory: 'documentation' };
  }

  return { category: 'other' };
}
