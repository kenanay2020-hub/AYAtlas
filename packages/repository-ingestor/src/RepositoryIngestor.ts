import type { ReadOnlyRepositorySource, TreeEntry } from '@ayatlas/github-reader';
import { calculateCanonicalDigest, SnapshotIdentity, SnapshotObservation, SnapshotFile, sha256Pure } from '@ayatlas/snapshot-model';
import { IgnorePolicy } from './IgnorePolicy.js';

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
    requestedRef = 'main',
    sourceMode: 'local' | 'github' | 'fixture' = 'fixture',
    capturedAt = '2026-08-06T20:00:00Z'
  ): Promise<IngestedRepositorySnapshot> {
    // 1. Resolve exact ref to locked commit SHA
    const resolvedRef = await this.source.resolveRef(requestedRef);
    const resolvedCommitSha = resolvedRef.resolvedCommitSha || requestedRef;

    // 2. Fetch tree at exact locked commit SHA
    const treeRes = await this.source.getTree(resolvedCommitSha);
    const rawTree = treeRes.entries;

    // 3. Filter files & compute SHA-256 contentDigest separate from Git blob sourceObjectId
    const filteredFiles: SnapshotFile[] = rawTree
      .filter((entry) => entry.type === 'file' && !this.ignorePolicy.shouldIgnore(entry.path))
      .map((entry) => {
        // Calculate SHA-256 for contentDigest; store git object SHA as sourceObjectId
        const contentDigest = entry.sha && /^[0-9a-f]{64}$/i.test(entry.sha)
          ? entry.sha
          : sha256Pure(`file:${entry.path}:${entry.size || 0}:${entry.sha}`);
        
        return {
          path: entry.path,
          contentDigest,
          sourceObjectId: entry.sha,
          size: entry.size || 0,
        };
      })
      .sort((a, b) => a.path.localeCompare(b.path));

    const manifestPayload = {
      repository: 'kenanay/AykenOS',
      commitSha: resolvedCommitSha,
      ignorePolicyVersion: '1.0.0',
      files: filteredFiles,
    };

    const manifestDigest = calculateCanonicalDigest(manifestPayload);

    let verificationState: SnapshotVerificationState = 'VERIFIED';
    if (this.source.isDemoMode()) {
      verificationState = 'DEMO';
    } else if (treeRes.isTruncated) {
      verificationState = 'TRUNCATED';
    } else if (sourceMode === 'local' && resolvedCommitSha.startsWith('local_unversioned')) {
      verificationState = 'UNVERSIONED_LOCAL';
    }

    return {
      identity: {
        repository: 'kenanay/AykenOS',
        commitSha: resolvedCommitSha,
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
