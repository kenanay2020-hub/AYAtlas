export * from './phase-evidence.js';
export * from './phase-pointer-parser.js';
export type AuthorityDomain = 'CURRENT_PHASE' | 'ARCHITECTURE_INVARIANT' | 'IMPLEMENTATION_EXISTENCE' | 'PHASE_CLOSURE' | 'EXACT_SUBJECT_STATUS' | 'CI_RESULT' | 'EVIDENCE_STATUS' | 'RUNTIME_AUTHORITY';
export interface AuthorityQuery {
    domain: AuthorityDomain;
    subjectId: string;
    snapshotId: string;
    fileContent?: string;
}
export interface AuthorityResolution {
    value: string;
    authorityClass: 'CANONICAL' | 'EXACT_SUBJECT' | 'BOUNDED' | 'HISTORICAL' | 'NON_AUTHORITY' | 'UNRESOLVED';
    sourceIds: string[];
    reasoningCode: string;
    conflicts: Array<{
        sourceId: string;
        description: string;
    }>;
}
export declare class AuthorityResolver {
    resolve(query: AuthorityQuery): AuthorityResolution;
}
//# sourceMappingURL=index.d.ts.map