import { calculateCanonicalDigest } from '@ayatlas/snapshot-model';
import { IgnorePolicy } from './IgnorePolicy';
export class RepositoryIngestor {
    source;
    ignorePolicy;
    constructor(source) {
        this.source = source;
        this.ignorePolicy = new IgnorePolicy();
    }
    async ingestSnapshot(commitSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f', sourceMode = 'fixture', capturedAt = '2026-08-06T20:00:00Z') {
        const treeRes = await this.source.getTree(commitSha);
        const rawTree = treeRes.entries;
        const filteredFiles = rawTree
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
        let verificationState = 'VERIFIED';
        if (this.source.isDemoMode()) {
            verificationState = 'DEMO';
        }
        else if (treeRes.isTruncated) {
            verificationState = 'TRUNCATED';
        }
        else if (sourceMode === 'local' && commitSha.startsWith('local_unversioned')) {
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
//# sourceMappingURL=RepositoryIngestor.js.map