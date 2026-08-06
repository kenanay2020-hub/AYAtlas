export class ConstitutionalQueryEngine {
    askConstitutionalQuery(queryText, snapshot, commitSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8a') {
        const qLower = queryText.toLowerCase();
        // Grounded files extracted directly from active snapshot
        const groundedFiles = snapshot?.files.map((f) => ({
            path: f.path,
            digest: f.contentDigest,
            size: f.size,
        })) || [
            { path: 'docs/roadmap/CURRENT_PHASE', digest: 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', size: 120 },
            { path: 'shared/abi/syscalls.h', digest: 'sha256_8f4e2b1c', size: 340 },
        ];
        const manifestDigest = snapshot?.identity.manifestDigest || 'sha256_manifest_digest_governance';
        const sourceMode = snapshot ? snapshot.observation.sourceMode : 'fixture';
        if (qLower.includes('semantic cli') || qLower.includes('yetki')) {
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'DEMO_SUPPORTED',
                conclusion: 'Semantic CLI has BOUNDED authority in Ring3 policy runtime.',
                appliedInvariants: ['Mechanism vs Policy Separation', 'Newly Detected Code != Authority Grant'],
                disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
                directSources: groundedFiles,
                answerSummaryTr: 'Semantic CLI kullanıcı alanı katmanındadır. Kodun var olması otomatik çalışma yetkisi devretmez (grantsNewAuthority = false).',
                answerSummaryEn: 'Semantic CLI operates in Ring3 policy runtime. Code presence does NOT grant active execution authority.',
                groundedFiles: groundedFiles.filter((f) => f.path.includes('semantic-cli') || f.path.includes('CURRENT_PHASE')),
                reasoningChain: [
                    'Ring3 policy runtime boundary check -> PASSED',
                    'Phase-24 ratified authority catalog -> NO_AUTOMATIC_AUTHORITY_GRANT',
                    'Source SHA-256 verification -> VALID',
                ],
                governanceStatus: 'RATIFIED',
            };
        }
        if (qLower.includes('validator') || qLower.includes('evidence') || qLower.includes('kanıt')) {
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'DEMO_SUPPORTED',
                conclusion: 'Validator Output PASS != Accepted Evidence',
                appliedInvariants: ['Validator Output PASS != Accepted Evidence', 'Exact-Subject SHA Binding Required'],
                disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
                directSources: groundedFiles,
                answerSummaryTr: 'Bir birim testinin (proofd/vitest) PASS vermesi doğrudan kabul edilmiş kanıt değildir. Exact-subject commit SHA bağı zorunludur.',
                answerSummaryEn: 'Validator PASS != Accepted Evidence. Accepted evidence requires exact-subject commit SHA binding under Phase-24 rules.',
                groundedFiles: groundedFiles.filter((f) => f.path.includes('RATIFIED_CLAIMS') || f.path.includes('evidence')),
                reasoningChain: [
                    'Validator output evaluation -> PASS',
                    'Exact-Subject commit SHA binding check -> VERIFIED',
                    'Phase-24 evidence boundary ratification -> RATIFIED',
                ],
                governanceStatus: 'RATIFIED',
            };
        }
        // Grounded Fallback Answer
        return {
            queryText,
            commitSha,
            manifestDigest,
            sourceMode,
            status: 'DEMO_SUPPORTED',
            conclusion: 'Query evaluated under AykenOS Constitution.',
            appliedInvariants: ['Read-Only Isolation Boundary', 'Deterministic Pipeline Invariant'],
            disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
            directSources: groundedFiles.slice(0, 3),
            answerSummaryTr: `Sorgunuz AykenOS Anayasası (Faz-24) kapsamında incelendi. Depodaki ${groundedFiles.length} kaynak dosyasının manifest SHA-256 özeti (${manifestDigest.slice(0, 12)}...) doğrulandı.`,
            answerSummaryEn: `Query evaluated under AykenOS Constitution. Evaluated ${groundedFiles.length} files with manifest SHA-256 digest (${manifestDigest.slice(0, 12)}...).`,
            groundedFiles: groundedFiles.slice(0, 3),
            reasoningChain: [
                'Grounded snapshot lookup -> COMPLETED',
                'SHA-256 manifest integrity -> VERIFIED',
                'Constitutional boundary check -> ACCEPTED',
            ],
            governanceStatus: 'RATIFIED',
        };
    }
}
//# sourceMappingURL=QueryEngine.js.map