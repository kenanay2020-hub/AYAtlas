import { RepositorySnapshot } from '@ayatlas/snapshot-model';
import { ReadOnlyRepositorySource, RepositoryMetadata, ResolvedRepositoryRef, TreeEntry, FileContent } from './github.js';
/**
 * Local Filesystem Read-Only Adapter (Node-Only Runtime, With Real SHA-256 Hashes)
 */
export declare class LocalReadOnlyRepositorySource implements ReadOnlyRepositorySource {
    private localRootPath;
    constructor(localRootPath: string);
    isDemoMode(): boolean;
    getRepository(): Promise<RepositoryMetadata>;
    resolveRef(ref?: string): Promise<ResolvedRepositoryRef>;
    getBranch(branchName?: string): Promise<{
        name: string;
        headSha: string;
    }>;
    getTree(_ref?: string): Promise<{
        entries: TreeEntry[];
        isTruncated: boolean;
    }>;
    getFile(pathStr: string, _ref?: string): Promise<FileContent>;
    getSnapshot(ref?: string): Promise<RepositorySnapshot>;
}
//# sourceMappingURL=local.d.ts.map