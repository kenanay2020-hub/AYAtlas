import type { ReadOnlyRepositorySource } from '@ayatlas/github-reader';
import { SnapshotIdentity, SnapshotObservation, SnapshotFile } from '@ayatlas/snapshot-model';
export type SnapshotVerificationState = 'DEMO' | 'INGESTING' | 'VERIFIED' | 'TRUNCATED' | 'PARTIAL' | 'UNVERSIONED_LOCAL' | 'FAILED';
export interface IngestedRepositorySnapshot {
    identity: SnapshotIdentity;
    observation: SnapshotObservation;
    files: SnapshotFile[];
    verificationState: SnapshotVerificationState;
    ignorePolicyVersion: string;
}
export declare class RepositoryIngestor {
    private source;
    private ignorePolicy;
    constructor(source: ReadOnlyRepositorySource);
    ingestSnapshot(requestedRef?: string, sourceMode?: 'local' | 'github' | 'fixture', capturedAt?: string): Promise<IngestedRepositorySnapshot>;
}
//# sourceMappingURL=RepositoryIngestor.d.ts.map