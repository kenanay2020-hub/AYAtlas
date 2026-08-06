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
export declare function parseMarkdownContent(content: string): ParsedMarkdown;
/**
 * Static parser for YAML workflow files.
 */
export declare function parseWorkflowYaml(content: string): Record<string, unknown>;
/**
 * Static path classifier for AykenOS directory structure.
 */
export declare function classifyAykenosPath(path: string): {
    category: 'boot' | 'ring0' | 'abi' | 'ring3' | 'substrate' | 'verification' | 'tooling' | 'governance' | 'ci' | 'docs' | 'other';
    subCategory?: string;
};
//# sourceMappingURL=index.d.ts.map