export type ParsedPhasePointer = {
    phase: number;
    raw: string;
    format: 'numeric' | 'phase-token' | 'key-value' | 'frontmatter';
};
/**
 * Robustly parses the active phase number from CURRENT_PHASE file content.
 * Handles canonical formats:
 * - Numeric: "24"
 * - Phase Token: "Phase-24" / "phase-24"
 * - Key-Value: "CURRENT_PHASE=24", "CURRENT_PHASE: 24", "phase: 24"
 * - Frontmatter: YAML frontmatter key-value pairs
 *
 * Ignores historical body mentions such as "Previous Phase-23" or explanatory notes.
 */
export declare function parsePhasePointer(content: string | undefined | null): ParsedPhasePointer | null;
//# sourceMappingURL=phase-pointer-parser.d.ts.map