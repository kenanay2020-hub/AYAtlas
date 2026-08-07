import { RepositorySnapshot } from '@ayatlas/snapshot-model';
export interface RepositoryMetadata {
    name: 'AykenOS';
    fullName: 'kenanay/AykenOS';
    defaultBranch: 'main';
    description: string;
}
export interface TreeEntry {
    path: string;
    type: 'file' | 'directory';
    sha: string;
    size?: number;
}
export interface FileContent {
    path: string;
    content: string;
    sha: string;
    encoding: 'utf-8' | 'base64';
}
export interface ResolvedRepositoryRef {
    requestedRef: string;
    resolvedCommitSha: string;
    refType: 'branch' | 'tag' | 'commit' | 'unversioned';
    isTruncated?: boolean;
}
/**
 * STRICTLY READ-ONLY Repository Source Interface.
 * Contains ZERO mutation/write capabilities.
 */
export interface ReadOnlyRepositorySource {
    getRepository(): Promise<RepositoryMetadata>;
    getBranch(branchName: string): Promise<{
        name: string;
        headSha: string;
    }>;
    resolveRef(ref: string): Promise<ResolvedRepositoryRef>;
    getTree(ref: string): Promise<{
        entries: TreeEntry[];
        isTruncated: boolean;
    }>;
    getFile(path: string, ref: string): Promise<FileContent>;
    getSnapshot(ref?: string): Promise<RepositorySnapshot>;
    isDemoMode(): boolean;
}
/**
 * Helper for browser-safe Base64 UTF-8 decoding without requiring Node's Buffer.
 */
export declare function decodeBase64Utf8(base64Str: string): string;
/**
 * Real GitHub API Read-Only Adapter (GET-Only with Truncation Guard)
 */
export declare class GitHubReadOnlyRepositorySource implements ReadOnlyRepositorySource {
    private owner;
    private repo;
    private apiToken?;
    constructor(apiToken?: string);
    isDemoMode(): boolean;
    private getHeaders;
    getRepository(): Promise<RepositoryMetadata>;
    resolveRef(ref: string): Promise<ResolvedRepositoryRef>;
    getBranch(branchName?: string): Promise<{
        name: string;
        headSha: string;
    }>;
    getTree(ref?: string): Promise<{
        entries: TreeEntry[];
        isTruncated: boolean;
    }>;
    getFile(pathStr: string, ref?: string): Promise<FileContent>;
    getSnapshot(ref?: string): Promise<RepositorySnapshot>;
}
/**
 * Offline Fixture Reader for deterministic local testing & DEMO mode.
 */
export declare class OfflineFixtureRepositorySource implements ReadOnlyRepositorySource {
    private headSha;
    constructor(headSha?: string);
    isDemoMode(): boolean;
    getRepository(): Promise<RepositoryMetadata>;
    resolveRef(ref: string): Promise<ResolvedRepositoryRef>;
    getBranch(branchName: string): Promise<{
        name: string;
        headSha: string;
    }>;
    getTree(_ref: string): Promise<{
        entries: TreeEntry[];
        isTruncated: boolean;
    }>;
    getFile(pathStr: string, _ref: string): Promise<FileContent>;
    getSnapshot(ref?: string): Promise<RepositorySnapshot>;
}
//# sourceMappingURL=github.d.ts.map