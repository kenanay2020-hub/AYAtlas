import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
export type ImpactClassification = 'INFORMATIONAL' | 'IMPLEMENTATION_CHANGE' | 'AUTHORITY_RELEVANT' | 'EVIDENCE_RELEVANT' | 'CONSTITUTIONAL_REVIEW_REQUIRED' | 'POTENTIAL_CONTRADICTION';
export type ProvenanceItemStatus = 'VERIFIED' | 'STALE' | 'MISSING' | 'PARTIAL' | 'CONFLICTING';
export interface SemanticChangeItem {
    path: string;
    changeType: 'ADDED' | 'MODIFIED' | 'DELETED';
    classification: ImpactClassification;
    authorityImpactDescription: string;
    grantsNewAuthority: boolean;
    provenanceStatus: ProvenanceItemStatus;
}
export interface GovernanceChangeReport {
    baseCommitSha: string;
    targetCommitSha: string;
    changes: SemanticChangeItem[];
    overallAuthorityImpact: 'NO_AUTHORITY_CHANGE' | 'AUTHORITY_EXPANDED' | 'GOVERNANCE_REVIEW_REQUIRED' | 'CONTRADICTION_DETECTED';
}
export interface PhaseDiffContext {
    basePhase?: number;
    targetPhase?: number;
    hasCanonicalDecisionFile?: boolean;
}
export declare class ChangeIntelligenceEngine {
    compareSnapshots(baseSnapshot: IngestedRepositorySnapshot, targetSnapshot: IngestedRepositorySnapshot, phaseContext?: PhaseDiffContext): GovernanceChangeReport;
    private classifyChangePath;
    private getImpactDescription;
}
//# sourceMappingURL=ChangeIntelligence.d.ts.map