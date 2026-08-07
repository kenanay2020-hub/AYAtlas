import { DriftAuditReport } from '@ayatlas/drift-engine';
export interface VerificationGateResult {
    gateNumber: 1 | 2 | 3 | 4 | 5;
    gateName: string;
    passed: boolean;
    summary: string;
    details?: string[];
}
export interface CIVerificationReport {
    commitSha: string;
    sourceMode: 'fixture' | 'local' | 'github';
    verificationTimestamp: string;
    overallPassed: boolean;
    gates: VerificationGateResult[];
    driftReport?: DriftAuditReport;
    summaryMarkdown: string;
}
export declare class CIVerifier {
    verifyCommit(commitSha?: string, sourceMode?: 'fixture' | 'local' | 'github', localOrRepoPath?: string): Promise<CIVerificationReport>;
}
//# sourceMappingURL=CIVerifier.d.ts.map