import fs from 'fs';
import path from 'path';
import { sha256Pure } from '@ayatlas/snapshot-model';
/**
 * Local Filesystem Read-Only Adapter (Node-Only Runtime, With Real SHA-256 Hashes)
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
//# sourceMappingURL=local.js.map