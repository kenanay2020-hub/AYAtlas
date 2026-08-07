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
  getBranch(branchName: string): Promise<{ name: string; headSha: string }>;
  resolveRef(ref: string): Promise<ResolvedRepositoryRef>;
  getTree(ref: string): Promise<{ entries: TreeEntry[]; isTruncated: boolean }>;
  getFile(path: string, ref: string): Promise<FileContent>;
  getSnapshot(ref?: string): Promise<RepositorySnapshot>;
  isDemoMode(): boolean;
}

/**
 * Helper for browser-safe Base64 UTF-8 decoding without requiring Node's Buffer.
 */
export function decodeBase64Utf8(base64Str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64Str, 'base64').toString('utf-8');
  }
  const cleanBase64 = base64Str.replace(/\s/g, '');
  const binaryStr = atob(cleanBase64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

/**
 * Real GitHub API Read-Only Adapter (GET-Only with Truncation Guard)
 */
export class GitHubReadOnlyRepositorySource implements ReadOnlyRepositorySource {
  private owner = 'kenanay';
  private repo = 'AykenOS';
  private apiToken?: string;

  constructor(apiToken?: string) {
    this.apiToken = apiToken;
  }

  isDemoMode(): boolean {
    return false;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'User-Agent': 'AYAtlas-Architecture-Platform',
      Accept: 'application/vnd.github.v3+json',
    };
    if (this.apiToken) {
      headers['Authorization'] = `token ${this.apiToken}`;
    }
    return headers;
  }

  async getRepository(): Promise<RepositoryMetadata> {
    const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return {
      name: 'AykenOS',
      fullName: 'kenanay/AykenOS',
      defaultBranch: data.default_branch || 'main',
      description: data.description || '',
    };
  }

  async resolveRef(ref: string): Promise<ResolvedRepositoryRef> {
    if (/^[0-9a-f]{40}$/i.test(ref) || /^[0-9a-f]{7,12}$/i.test(ref)) {
      return {
        requestedRef: ref,
        resolvedCommitSha: ref,
        refType: 'commit',
      };
    }
    try {
      const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/commits/${ref}`, {
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        return {
          requestedRef: ref,
          resolvedCommitSha: data.sha,
          refType: 'commit',
        };
      }
    } catch (_e) {
      // Fallback
    }

    const branch = await this.getBranch(ref);
    return {
      requestedRef: ref,
      resolvedCommitSha: branch.headSha,
      refType: 'branch',
    };
  }

  async getBranch(branchName = 'main'): Promise<{ name: string; headSha: string }> {
    const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/branches/${branchName}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return {
      name: branchName,
      headSha: data.commit.sha,
    };
  }

  async getTree(ref = 'main'): Promise<{ entries: TreeEntry[]; isTruncated: boolean }> {
    const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${ref}?recursive=1`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    const isTruncated = Boolean(data.truncated);

    const entries: TreeEntry[] = (data.tree || []).map((t: any) => ({
      path: t.path,
      type: t.type === 'blob' ? 'file' : 'directory',
      sha: t.sha,
      size: t.size,
    }));

    return { entries, isTruncated };
  }

  async getFile(pathStr: string, ref = 'main'): Promise<FileContent> {
    const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${pathStr}?ref=${ref}`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    const content = decodeBase64Utf8(data.content || '');
    return {
      path: pathStr,
      content,
      sha: data.sha,
      encoding: 'utf-8',
    };
  }

  async getSnapshot(ref = 'main'): Promise<RepositorySnapshot> {
    const resolved = await this.resolveRef(ref);
    return {
      identity: {
        repository: 'kenanay/AykenOS',
        commitSha: resolved.resolvedCommitSha,
        manifestDigest: '',
      },
      observation: {
        capturedAt: new Date().toISOString(),
        sourceMode: 'github',
        isDemoData: false,
      },
      branch: ref,
      readerVersion: '1.0.0',
      parserVersion: '1.0.0',
      knowledgeSchemaVersion: '1.0.0',
    };
  }
}

/**
 * Offline Fixture Reader for deterministic local testing & DEMO mode.
 */
export class OfflineFixtureRepositorySource implements ReadOnlyRepositorySource {
  private headSha: string;

  constructor(headSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f') {
    this.headSha = headSha;
  }

  isDemoMode(): boolean {
    return true;
  }

  async getRepository(): Promise<RepositoryMetadata> {
    return {
      name: 'AykenOS',
      fullName: 'kenanay/AykenOS',
      defaultBranch: 'main',
      description: 'An execution-centric OS with typed substrate & evidence governance.',
    };
  }

  async resolveRef(ref: string): Promise<ResolvedRepositoryRef> {
    return {
      requestedRef: ref,
      resolvedCommitSha: this.headSha,
      refType: 'commit',
    };
  }

  async getBranch(branchName: string): Promise<{ name: string; headSha: string }> {
    return {
      name: branchName || 'main',
      headSha: this.headSha,
    };
  }

  async getTree(_ref: string): Promise<{ entries: TreeEntry[]; isTruncated: boolean }> {
    return {
      entries: [
        { path: 'bootloader/efi_main.c', type: 'file', sha: 'sha_boot' },
        { path: 'kernel/kernel.c', type: 'file', sha: 'sha_kernel' },
        { path: 'kernel/arch/x86_64/gdt.c', type: 'file', sha: 'sha_gdt' },
        { path: 'kernel/mm/page_alloc.c', type: 'file', sha: 'sha_mm' },
        { path: 'kernel/sys/syscall.c', type: 'file', sha: 'sha_sys' },
        { path: 'shared/abi/syscall_nums.h', type: 'file', sha: 'sha_abi' },
        { path: 'userspace/semantic-cli/src/main.rs', type: 'file', sha: 'sha_sem' },
        { path: 'userspace/ai-runtime/src/lib.rs', type: 'file', sha: 'sha_ai' },
        { path: 'ayken-core/crates/abdf/src/lib.rs', type: 'file', sha: 'sha_abdf' },
        { path: 'ayken-core/crates/bcib/src/lib.rs', type: 'file', sha: 'sha_bcib' },
        { path: 'proofd/src/main.rs', type: 'file', sha: 'sha_proofd' },
        { path: 'tools/verification/proof_verifier.py', type: 'file', sha: 'sha_verifier' },
        { path: '.github/workflows/ci-freeze.yml', type: 'file', sha: 'sha_wf_freeze' },
        { path: 'docs/roadmap/CURRENT_PHASE', type: 'file', sha: 'sha_phase' },
      ],
      isTruncated: false,
    };
  }

  async getFile(pathStr: string, _ref: string): Promise<FileContent> {
    if (pathStr === 'docs/roadmap/CURRENT_PHASE') {
      return {
        path: pathStr,
        content: 'CURRENT_PHASE=24',
        sha: 'sha_phase',
        encoding: 'utf-8',
      };
    }
    return {
      path: pathStr,
      content: `// Sample content for ${pathStr}`,
      sha: 'sha_sample',
      encoding: 'utf-8',
    };
  }

  async getSnapshot(ref = 'main'): Promise<RepositorySnapshot> {
    const branch = await this.getBranch(ref);
    return {
      identity: {
        repository: 'kenanay/AykenOS',
        commitSha: branch.headSha,
        manifestDigest: '',
      },
      observation: {
        capturedAt: '2026-08-06T20:00:00Z',
        sourceMode: 'fixture',
        isDemoData: true,
      },
      branch: branch.name,
      readerVersion: '1.0.0',
      parserVersion: '1.0.0',
      knowledgeSchemaVersion: '1.0.0',
    };
  }
}
