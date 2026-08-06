import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
export interface GroundedEvidenceReference {
    path: string;
    digest: string;
    size: number;
    snippet?: string;
}
export interface ConstitutionalAnswerPackage {
    queryText: string;
    commitSha: string;
    manifestDigest: string;
    sourceMode: string;
    status: string;
    conclusion: string;
    appliedInvariants: string[];
    disclaimerNotice: string;
    directSources: GroundedEvidenceReference[];
    answerSummaryTr: string;
    answerSummaryEn: string;
    groundedFiles: GroundedEvidenceReference[];
    reasoningChain: string[];
    governanceStatus: 'RATIFIED' | 'UNDER_REVIEW' | 'REJECTED';
}
export declare class ConstitutionalQueryEngine {
    askConstitutionalQuery(queryText: string, snapshot?: IngestedRepositorySnapshot, commitSha?: string): ConstitutionalAnswerPackage;
}
//# sourceMappingURL=QueryEngine.d.ts.map