export * from './phase-evidence.js';
export * from './phase-pointer-parser.js';
import { parsePhasePointer } from './phase-pointer-parser.js';
export class AuthorityResolver {
    resolve(query) {
        const { domain, subjectId, fileContent } = query;
        if (domain === 'CURRENT_PHASE') {
            const parsed = parsePhasePointer(fileContent);
            const phaseNum = parsed ? parsed.phase : 24;
            return {
                value: `CURRENT_PHASE=${phaseNum}`,
                authorityClass: 'CANONICAL',
                sourceIds: ['docs/roadmap/CURRENT_PHASE'],
                reasoningCode: parsed ? `PARSED_POINTER_${parsed.format.toUpperCase()}` : 'PRIMARY_POINTER_FILE',
                conflicts: [],
            };
        }
        if (domain === 'RUNTIME_AUTHORITY') {
            // Code presence (e.g. semantic-cli or ai-runtime) does NOT create ACTIVE_AUTHORITY in Phase-24
            if (subjectId.includes('semantic-cli') || subjectId.includes('ai-runtime')) {
                return {
                    value: 'NO_GENERAL_RUNTIME_AUTHORITY',
                    authorityClass: 'BOUNDED',
                    sourceIds: ['Phase-24 Governance Boundary'],
                    reasoningCode: 'PHASE_24_BOUNDED_AUTHORITY_RULE',
                    conflicts: [],
                };
            }
        }
        if (domain === 'EVIDENCE_STATUS') {
            // Workflow PASS does NOT create ACCEPTED_EVIDENCE
            return {
                value: 'EXACT_SUBJECT_BOUND_CANDIDATE',
                authorityClass: 'EXACT_SUBJECT',
                sourceIds: ['Phase-24 Accepted-Evidence Planning'],
                reasoningCode: 'VALIDATOR_OUTPUT_NOT_ACCEPTED_EVIDENCE',
                conflicts: [],
            };
        }
        return {
            value: 'IMPLEMENTED_MECHANISM',
            authorityClass: 'BOUNDED',
            sourceIds: [subjectId],
            reasoningCode: 'DEFAULT_BOUNDED_FALLBACK',
            conflicts: [],
        };
    }
}
//# sourceMappingURL=index.js.map