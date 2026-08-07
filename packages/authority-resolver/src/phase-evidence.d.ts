export interface PhaseRecord {
    phase: number;
    title: string;
    status: 'OFFICIALLY_CLOSED' | 'ACTIVE' | 'PLANNING_ONLY' | 'HISTORICAL';
    objective: string;
    scope: string;
    unauthorizedScope: string[];
    deliverables: string[];
    decisionDocs: string[];
    commitRange?: string;
    exactSubjectSha?: string;
}
export interface EvidenceChainStep {
    id: string;
    stepName: string;
    stage: 'EXECUTION' | 'TRACE' | 'RECEIPT' | 'VALIDATOR_OUTPUT' | 'EVIDENCE_CANDIDATE' | 'EXACT_SUBJECT_BINDING' | 'GOVERNANCE_REVIEW' | 'ACCEPTED_EVIDENCE';
    description: string;
    isAuthorityGranted: boolean;
    codePaths: string[];
    governanceConstraint: string;
}
/**
 * Authoritative Phase Catalog (Phase-0 to Phase-24)
 */
export declare const AYKENOS_PHASE_CATALOG: PhaseRecord[];
/**
 * Standard Evidence Boundary Chain for AykenOS
 */
export declare const AYKENOS_EVIDENCE_CHAIN: EvidenceChainStep[];
//# sourceMappingURL=phase-evidence.d.ts.map