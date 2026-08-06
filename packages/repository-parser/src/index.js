import jsYaml from 'js-yaml';
/**
 * Static parser for Markdown text & YAML frontmatter.
 * NO process execution. Pure string manipulation and AST parsing.
 */
export function parseMarkdownContent(content) {
    const frontmatterPattern = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]*/;
    let frontmatter = {};
    let body = content;
    const match = content.match(frontmatterPattern);
    if (match) {
        try {
            const parsedYaml = jsYaml.load(match[1]);
            if (typeof parsedYaml === 'object' && parsedYaml !== null) {
                frontmatter = parsedYaml;
            }
        }
        catch {
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
export function parseWorkflowYaml(content) {
    try {
        const doc = jsYaml.load(content);
        if (typeof doc === 'object' && doc !== null) {
            return doc;
        }
    }
    catch {
        // Fallback
    }
    return {};
}
/**
 * Static path classifier for AykenOS directory structure.
 */
export function classifyAykenosPath(path) {
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
//# sourceMappingURL=index.js.map