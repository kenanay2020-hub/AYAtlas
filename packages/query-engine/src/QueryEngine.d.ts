import { SnapshotIdentity } from '@ayatlas/snapshot-model';
import { ProvenanceRecord, ProvenanceEngine } from '@ayatlas/provenance-engine';
import { GovernanceKnowledgeGraphEngine, GovernanceGraphEdge } from '@ayatlas/graph-engine';
import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
export interface ConstitutionalAnswer {
    query: string;
    conclusion: string;
    status: 'SUPPORTED' | 'PARTIAL' | 'CONTRADICTORY' | 'UNKNOWN' | 'DEMO_SUPPORTED';
    directSources: ProvenanceRecord[];
    appliedInvariants: string[];
    reasoningPath: GovernanceGraphEdge[];
    unresolvedQuestions: string[];
    snapshotIdentity: SnapshotIdentity;
    disclaimerNotice: string;
}
export interface ConstitutionalQueryContext {
    snapshot?: IngestedRepositorySnapshot;
    provenanceEngine?: ProvenanceEngine;
    graphEngine?: GovernanceKnowledgeGraphEngine;
}
export declare class ConstitutionalQueryEngine {
    private defaultGraphEngine;
    constructor();
    askConstitutionalQuery(query: string, context?: ConstitutionalQueryContext, fallbackHeadSha?: string): ConstitutionalAnswer;
}
//# sourceMappingURL=QueryEngine.d.ts.map