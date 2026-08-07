import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
import { KnowledgeGraph } from '@ayatlas/knowledge-model';
export type DriftSeverity = 'CRITICAL' | 'WARNING' | 'INFORMATIONAL';
export type DriftCategory = 'CRITICAL_ABI_FREEZE_VIOLATION' | 'PHASE_POINTER_CONTRADICTION' | 'UNRATIFIED_IMPLEMENTATION_DRIFT' | 'UNBOUND_EVIDENCE_CLAIM';
export interface DriftItem {
    id: string;
    category: DriftCategory;
    severity: DriftSeverity;
    title: string;
    affectedPath: string;
    description: string;
    remediationRecommendation: string;
}
export interface DriftAuditReport {
    snapshotHeadSha: string;
    auditTimestamp: string;
    driftItems: DriftItem[];
    hasCriticalViolations: boolean;
    totalDriftCount: number;
}
export declare class DriftDetectionEngine {
    auditSnapshot(snapshot: IngestedRepositorySnapshot, _graph?: KnowledgeGraph): DriftAuditReport;
}
//# sourceMappingURL=DriftEngine.d.ts.map