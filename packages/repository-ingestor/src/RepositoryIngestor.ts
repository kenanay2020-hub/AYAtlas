import { ReadOnlyRepositorySource, TreeEntry } from '@ayatlas/github-reader';
import { calculateCanonicalDigest, SnapshotIdentity, SnapshotObservation, SnapshotFile } from '@ayatlas/snapshot-model';
import { IgnorePolicy } from './IgnorePolicy';

export type SnapshotVerificationState =
  | 'DEMO'
  | 'INGESTING'
  | 'VERIFIED'
  | 'TRUNCATED'
  | 'PARTIAL'
  | 'UNVERSIONED_LOCAL'
  | 'FAILED';

export interface IngestedRepositorySnapshot {
  identity: SnapshotIdentity;
  observation: SnapshotObservation;
  files: SnapshotFile[];
  verificationState: SnapshotVerificationState;
  ignorePolicyVersion: string;
}

export class RepositoryIngestor {
  private source: ReadOnlyRepositorySource;
  private ignorePolicy: IgnorePolicy;

  constructor(source: ReadOnlyRepositorySource) {
    this.source = source;
    this.ignorePolicy = new IgnorePolicy();
  }

  async ingestSnapshot(
    commitSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
    sourceMode: 'local' | 'github' | 'fixture' = 'fixture',
    capturedAt = '2026-08-06T20:00:00Z'
  ): Promise<IngestedRepositorySnapshot> {
    const treeRes = await this.source.getTree(commitSha);
    const rawTree = treeRes.entries;

    const filteredFiles: SnapshotFile[] = rawTree
      .filter((entry) => entry.type === 'file' && !this.ignorePolicy.shouldIgnore(entry.path))
      .map((entry) => ({
        path: entry.path,
        contentDigest: entry.sha,
        sourceObjectId: entry.sha,
        size: entry.size || 0,
      }))
      .sort((a, b) => a.path.localeCompare(b.path));

    const manifestPayload = {
      repository: 'kenanay/AykenOS',
      commitSha,
      ignorePolicyVersion: '1.0.0',
      files: filteredFiles,
    };

    const manifestDigest = calculateCanonicalDigest(manifestPayload);

    let verificationState: SnapshotVerificationState = 'VERIFIED';
    if (this.source.isDemoMode()) {
      verificationState = 'DEMO';
    } else if (treeRes.isTruncated) {
      verificationState = 'TRUNCATED';
    } else if (sourceMode === 'local' && commitSha.startsWith('local_unversioned')) {
      verificationState = 'UNVERSIONED_LOCAL';
    }

    return {
      identity: {
        repository: 'kenanay/AykenOS',
        commitSha,
        manifestDigest,
      },
      observation: {
        capturedAt,
        sourceMode,
        isDemoData: this.source.isDemoMode(),
      },
      files: filteredFiles,
      verificationState,
      ignorePolicyVersion: '1.0.0',
    };
  }
}
