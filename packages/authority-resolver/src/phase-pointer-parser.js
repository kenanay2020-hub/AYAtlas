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
export function parsePhasePointer(content) {
    if (!content || typeof content !== 'string') {
        return null;
    }
    const trimmed = content.trim();
    if (!trimmed) {
        return null;
    }
    // 1. Check plain numeric format (single line with just number)
    if (/^\d+$/.test(trimmed)) {
        const phase = parseInt(trimmed, 10);
        return {
            phase,
            raw: trimmed,
            format: 'numeric',
        };
    }
    const lines = trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    // 2. Check frontmatter block if present
    if (lines[0] === '---') {
        const endFrontmatter = lines.indexOf('---', 1);
        const frontmatterLines = endFrontmatter > 0 ? lines.slice(1, endFrontmatter) : lines.slice(1);
        for (const line of frontmatterLines) {
            const kvMatch = line.match(/^(?:CURRENT_PHASE|phase|current_phase)\s*[:=]\s*["']?(?:Phase-)?(\d+)["']?/i);
            if (kvMatch) {
                return {
                    phase: parseInt(kvMatch[1], 10),
                    raw: line,
                    format: 'frontmatter',
                };
            }
        }
    }
    // 3. Priority Key-Value scan (e.g. "CURRENT_PHASE=24", "CURRENT_PHASE: 24", "phase: 24")
    for (const line of lines) {
        if (line.startsWith('#'))
            continue;
        const kvMatch = line.match(/^(?:CURRENT_PHASE|phase|current_phase)\s*[:=]\s*["']?(?:Phase-)?(\d+)["']?/i);
        if (kvMatch) {
            return {
                phase: parseInt(kvMatch[1], 10),
                raw: line,
                format: 'key-value',
            };
        }
    }
    // 4. "Current Phase" or explicit active assignment scan (ignoring "Previous Phase")
    for (const line of lines) {
        const currentPhaseMatch = line.match(/(?:Current\s+Phase|Active\s+Phase|Target\s+Phase)\s*[:=\-\s]\s*(\d+)/i);
        if (currentPhaseMatch) {
            return {
                phase: parseInt(currentPhaseMatch[1], 10),
                raw: line,
                format: 'key-value',
            };
        }
    }
    // 5. Standalone Phase token scan (e.g., line starting with "Phase-24" or "phase-24")
    for (const line of lines) {
        if (line.toLowerCase().includes('previous phase') || line.toLowerCase().includes('historical')) {
            continue;
        }
        const tokenMatch = line.match(/^(?:#+\s*)?(?:Phase-)(\d+)\b/i);
        if (tokenMatch) {
            return {
                phase: parseInt(tokenMatch[1], 10),
                raw: line,
                format: 'phase-token',
            };
        }
    }
    // 6. General Phase-N token scan fallback (excluding explicit previous phase context)
    for (const line of lines) {
        if (/\b(?:previous|prior|past|historical)\b/i.test(line)) {
            continue;
        }
        const match = line.match(/\bPhase-(\d+)\b/i);
        if (match) {
            return {
                phase: parseInt(match[1], 10),
                raw: line,
                format: 'phase-token',
            };
        }
    }
    return null;
}
//# sourceMappingURL=phase-pointer-parser.js.map