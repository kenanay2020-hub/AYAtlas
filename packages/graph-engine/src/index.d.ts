import { SourceReference } from '@ayatlas/knowledge-model';
export type GovernanceNodeType = 'GOVERNANCE_INVARIANT' | 'PHASE_DECISION' | 'EVIDENCE_STEP' | 'SYSCALL_ABI' | 'COMPONENT' | 'CI_GATE';
export interface GovernanceGraphNode {
    id: string;
    label: string;
    nodeType: GovernanceNodeType;
    domain: 'Constitutional' | 'Phase' | 'Evidence' | 'ABI' | 'Runtime';
    description: string;
    authorityClass: 'CANONICAL' | 'EXACT_SUBJECT' | 'BOUNDED' | 'HISTORICAL';
    sources: SourceReference[];
}
export interface GovernanceGraphEdge {
    id: string;
    sourceId: string;
    targetId: string;
    relation: 'GOVERNS' | 'BOUNDS' | 'VERIFIES' | 'RATIFIES' | 'EXCLUDES';
    description: string;
}
export interface GovernanceGraphNeighborhood {
    targetNode: GovernanceGraphNode;
    connectedNodes: GovernanceGraphNode[];
    edges: GovernanceGraphEdge[];
}
export interface DynamicGraphBuildContext {
    commitSha: string;
    detectedPhase?: number;
    files?: {
        path: string;
    }[];
    sourceAuthorityPolicy?: string;
}
export declare class GovernanceKnowledgeGraphEngine {
    private nodes;
    private edges;
    constructor();
    buildGraph(ctx: DynamicGraphBuildContext): void;
    private initDefaultGraph;
    getNeighborhood(nodeId: string): GovernanceGraphNeighborhood | null;
    getAllNodes(): GovernanceGraphNode[];
    getAllEdges(): GovernanceGraphEdge[];
}
//# sourceMappingURL=index.d.ts.map