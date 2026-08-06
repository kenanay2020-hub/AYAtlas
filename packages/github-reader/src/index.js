import { sha256Pure } from '@ayatlas/snapshot-model';
import fs from 'fs';
import path from 'path';
/**
 * Real GitHub API Read-Only Adapter (GET-Only with Truncation Guard)
 */
export class GitHubReadOnlyRepositorySource {
    owner = 'kenanay';
    repo = 'AykenOS';
    apiToken;
    constructor(apiToken) {
        this.apiToken = apiToken;
    }
    isDemoMode() {
        return false;
    }
    getHeaders() {
        const headers = {
            'User-Agent': 'AYAtlas-Architecture-Platform',
            Accept: 'application/vnd.github.v3+json',
        };
        if (this.apiToken) {
            headers['Authorization'] = `token ${this.apiToken}`;
        }
        return headers;
    }
    async getRepository() {
        const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok)
            throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        return {
            name: 'AykenOS',
            fullName: 'kenanay/AykenOS',
            defaultBranch: data.default_branch || 'main',
            description: data.description || '',
        };
    }
    async resolveRef(ref) {
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
        }
        catch (_e) {
            // Fallback
        }
        const branch = await this.getBranch(ref);
        return {
            requestedRef: ref,
            resolvedCommitSha: branch.headSha,
            refType: 'branch',
        };
    }
    async getBranch(branchName = 'main') {
        const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/branches/${branchName}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok)
            throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        return {
            name: branchName,
            headSha: data.commit.sha,
        };
    }
    async getTree(ref = 'main') {
        const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/git/trees/${ref}?recursive=1`, {
            headers: this.getHeaders(),
        });
        if (!res.ok)
            throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        const isTruncated = Boolean(data.truncated);
        const entries = (data.tree || []).map((t) => ({
            path: t.path,
            type: t.type === 'blob' ? 'file' : 'directory',
            sha: t.sha,
            size: t.size,
        }));
        return { entries, isTruncated };
    }
    async getFile(pathStr, ref = 'main') {
        const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${pathStr}?ref=${ref}`, {
            headers: this.getHeaders(),
        });
        if (!res.ok)
            throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
        const data = await res.json();
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        return {
            path: pathStr,
            content,
            sha: data.sha,
            encoding: 'utf-8',
        };
    }
    async getSnapshot(ref = 'main') {
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
 * Local Filesystem Read-Only Adapter (With Real SHA-256 Hashes)
 */
export class LocalReadOnlyRepositorySource {
    localRootPath;
    constructor(localRootPath) {
        this.localRootPath = localRootPath;
    }
    isDemoMode() {
        return false;
    }
    async getRepository() {
        return {
            name: 'AykenOS',
            fullName: 'kenanay/AykenOS',
            defaultBranch: 'main',
            description: 'Local workspace mirror of AykenOS',
        };
    }
    async resolveRef(ref = 'main') {
        const gitHeadPath = path.join(this.localRootPath, '.git', 'HEAD');
        if (fs.existsSync(gitHeadPath)) {
            try {
                const headContent = fs.readFileSync(gitHeadPath, 'utf-8').trim();
                if (headContent.startsWith('ref:')) {
                    const refRelative = headContent.replace('ref:', '').trim();
                    const refPath = path.join(this.localRootPath, '.git', refRelative);
                    if (fs.existsSync(refPath)) {
                        const commitSha = fs.readFileSync(refPath, 'utf-8').trim();
                        return {
                            requestedRef: ref,
                            resolvedCommitSha: commitSha,
                            refType: 'branch',
                        };
                    }
                }
                else if (/^[0-9a-f]{40}$/i.test(headContent)) {
                    return {
                        requestedRef: ref,
                        resolvedCommitSha: headContent,
                        refType: 'commit',
                    };
                }
            }
            catch (_e) {
                // Fallthrough
            }
        }
        return {
            requestedRef: ref,
            resolvedCommitSha: 'local_unversioned_' + sha256Pure(this.localRootPath).slice(0, 12),
            refType: 'unversioned',
        };
    }
    async getBranch(branchName = 'main') {
        const resolved = await this.resolveRef(branchName);
        return {
            name: branchName,
            headSha: resolved.resolvedCommitSha,
        };
    }
    async getTree(_ref = 'main') {
        const entries = [];
        const readDirRecursive = async (dir) => {
            const files = await fs.promises.readdir(dir, { withFileTypes: true });
            for (const f of files) {
                const fullPath = path.join(dir, f.name);
                const relPath = path.relative(this.localRootPath, fullPath).replace(/\\/g, '/');
                if (f.name === 'node_modules' || f.name === '.git' || f.name === 'target' || f.name === 'dist') {
                    continue;
                }
                if (f.isDirectory()) {
                    entries.push({ path: relPath, type: 'directory', sha: sha256Pure(relPath) });
                    await readDirRecursive(fullPath);
                }
                else {
                    try {
                        const content = fs.readFileSync(fullPath, 'utf-8');
                        const fileSha = sha256Pure(content);
                        entries.push({ path: relPath, type: 'file', sha: fileSha, size: content.length });
                    }
                    catch (_e) {
                        // Binary or unreadable file: compute byte buffer sha256
                        try {
                            const bytes = fs.readFileSync(fullPath);
                            entries.push({ path: relPath, type: 'file', sha: sha256Pure(bytes.toString('hex')), size: bytes.length });
                        }
                        catch (_err) {
                            entries.push({ path: relPath, type: 'file', sha: sha256Pure(relPath), size: 0 });
                        }
                    }
                }
            }
        };
        if (fs.existsSync(this.localRootPath)) {
            await readDirRecursive(this.localRootPath);
        }
        return { entries, isTruncated: false };
    }
    async getFile(pathStr, _ref = 'main') {
        const fullPath = path.join(this.localRootPath, pathStr);
        const content = await fs.promises.readFile(fullPath, 'utf-8');
        return {
            path: pathStr,
            content,
            sha: sha256Pure(content),
            encoding: 'utf-8',
        };
    }
    async getSnapshot(ref = 'main') {
        const resolved = await this.resolveRef(ref);
        return {
            identity: {
                repository: 'kenanay/AykenOS',
                commitSha: resolved.resolvedCommitSha,
                manifestDigest: '',
            },
            observation: {
                capturedAt: new Date().toISOString(),
                sourceMode: 'local',
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
export class OfflineFixtureRepositorySource {
    headSha;
    constructor(headSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f') {
        this.headSha = headSha;
    }
    isDemoMode() {
        return true;
    }
    async getRepository() {
        return {
            name: 'AykenOS',
            fullName: 'kenanay/AykenOS',
            defaultBranch: 'main',
            description: 'An execution-centric OS with typed substrate & evidence governance.',
        };
    }
    async resolveRef(ref) {
        return {
            requestedRef: ref,
            resolvedCommitSha: this.headSha,
            refType: 'commit',
        };
    }
    async getBranch(branchName) {
        return {
            name: branchName || 'main',
            headSha: this.headSha,
        };
    }
    async getTree(_ref) {
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
    async getFile(pathStr, _ref) {
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
    async getSnapshot(ref = 'main') {
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
//# sourceMappingURL=index.js.map