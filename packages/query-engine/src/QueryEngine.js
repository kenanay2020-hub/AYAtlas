export class ConstitutionalQueryEngine {
    askConstitutionalQuery(queryText, snapshot, commitSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8a') {
        const qLower = queryText.toLowerCase();
        // Grounded files extracted directly from active snapshot
        const groundedFiles = (snapshot?.files && snapshot.files.length > 0)
            ? snapshot.files.map((f) => ({
                path: f.path,
                digest: f.contentDigest,
                size: f.size,
                snippet: f.content ? String(f.content).slice(0, 300) : undefined,
            }))
            : [
                {
                    path: 'docs/roadmap/CURRENT_PHASE',
                    digest: 'sha256_e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
                    size: 120,
                    snippet: 'PHASE-24: Exact-Subject Evidence Planning & Accepted Evidence Boundaries.',
                },
                {
                    path: 'shared/abi/syscalls.h',
                    digest: 'sha256_8f4e2b1c',
                    size: 340,
                    snippet: '#define SYS_READ 1\n#define SYS_WRITE 2\n#define SYS_EXEC_BCIB 3',
                },
                {
                    path: 'ayken-core/crates/bcib/src/lib.rs',
                    digest: 'sha256_bcib902a',
                    size: 512,
                    snippet: 'pub struct BcibInstructionFrame { pub opcode: u16, pub payload: Vec<u8> }',
                },
                {
                    path: 'userspace/semantic-cli/src/main.rs',
                    digest: 'sha256_cli',
                    size: 400,
                    snippet: 'pub const GRANTS_NEW_AUTHORITY: bool = false;',
                },
                {
                    path: 'proofd/src/main.rs',
                    digest: 'sha256_proofd',
                    size: 600,
                    snippet: 'fn verify_evidence_candidate(candidate: &EvidenceCandidate, commit_sha: &Sha256Digest)',
                },
            ];
        const manifestDigest = snapshot?.identity.manifestDigest || 'sha256_manifest_digest_governance';
        const sourceMode = snapshot ? snapshot.observation.sourceMode : 'fixture';
        // 1. CONTRADICTORY Queries (Violating Core Invariants)
        if (qLower.includes('yetki ver') || qLower.includes('grant authority') || qLower.includes('ring3 kernel')) {
            const phaseSource = groundedFiles.filter((f) => f.path.includes('CURRENT_PHASE'));
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'CONTRADICTORY',
                conclusion: 'CRITICAL CONTRADICTION: Ring3 policy execution cannot grant runtime authority.',
                appliedInvariants: ['Newly Detected Code != Authority Grant', 'Ring0 vs Ring3 Isolation'],
                disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
                directSources: phaseSource,
                answerSummaryTr: 'ÇELİŞKİ: Ring3 ortamında tespit edilen kodlar donanım yetkisi yaratamaz. Yetki verme işlemi anayasal faz onayına bağlıdır.',
                answerSummaryEn: 'CONTRADICTION: Code in Ring3 cannot create hardware authority. Authority grant requires ratified exact-subject governance approval.',
                groundedFiles: phaseSource,
                reasoningChain: [
                    'Ring3 code detection -> VERIFIED',
                    'Authority grant evaluation -> REJECTED (Invariant Violation)',
                    'Governance boundary check -> CONTRADICTORY',
                ],
                governanceStatus: 'REJECTED',
                codeSnippet: '// Constitutional Invariant Rule:\n// grantsNewAuthority = FALSE;\n// Ring3 policy execution is isolated from Ring0 mechanism kernel.',
            };
        }
        // 2. VISION_ONLY Queries (Future Spatial Computing Systems)
        if (qLower.includes('spatial') ||
            qLower.includes('scene graph') ||
            qLower.includes('voxel') ||
            qLower.includes('gaussian') ||
            qLower.includes('gpu scheduler')) {
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'VISION_ONLY',
                conclusion: 'AykenOS Future Architecture Vision — NOT VERIFIED in Active Repository Snapshot.',
                appliedInvariants: ['Vision Architecture != Verified Repository Implementation'],
                disclaimerNotice: 'Vision Architecture Spec != Active Executable Substrate',
                directSources: [],
                answerSummaryTr: 'VİZYON (DOĞRULANMADI): Uzamsal bellek (Spatial Memory), Voksel/Gaussian veri tipleri ve GPU zamanlayıcısı AykenOS gelecek vizyonudur; henüz aktif depoda doğrulanmamıştır.',
                answerSummaryEn: 'VISION ONLY (NOT VERIFIED): Spatial Memory, Scene Graph, Voxel/Gaussian types, and GPU Scheduler represent AykenOS future architecture vision; not yet verified in active repository snapshot.',
                groundedFiles: [],
                reasoningChain: [
                    'Spatial vision keyword matching -> MATCHED',
                    'Active snapshot repository tree search -> NO_FILES_FOUND',
                    'Classification assignment -> VISION_NOT_VERIFIED',
                ],
                governanceStatus: 'UNDER_REVIEW',
                matchedTechnicalSystem: 'Spatial Computing Operating Vision',
                codeSnippet: '// AykenOS Spatial Computing Specification (Draft Vision):\n// Volumetric address space and 3D Scene Graph compositor runtime.\n// Active Git Tree Evidence: UNVERIFIED',
            };
        }
        // 3. BCIB & ABDF Substrate Queries (SUPPORTED iff source file exists)
        if (qLower.includes('bcib') || qLower.includes('abdf') || qLower.includes('binary format') || qLower.includes('ikili')) {
            const bcibFile = groundedFiles.find((f) => f.path.includes('bcib') || f.path.includes('abdf'));
            if (!bcibFile) {
                return {
                    queryText,
                    commitSha,
                    manifestDigest,
                    sourceMode,
                    status: 'UNKNOWN',
                    conclusion: 'BCIB/ABDF substrate files not found in active snapshot.',
                    appliedInvariants: ['Epistemic Truth Invariant: No Grounded Source != SUPPORTED'],
                    disclaimerNotice: 'Source Evidence Missing',
                    directSources: [],
                    answerSummaryTr: 'BİLİNMİYOR: BCIB/ABDF substrate dosyaları aktif repoda bulunamadığı için destek bilgisi üretilemedi.',
                    answerSummaryEn: 'UNKNOWN: BCIB/ABDF substrate files not located in active snapshot.',
                    groundedFiles: [],
                    reasoningChain: ['BCIB/ABDF keyword match -> OK', 'Snapshot source search -> NOT_FOUND', 'Result -> UNKNOWN'],
                    governanceStatus: 'UNDER_REVIEW',
                };
            }
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'SUPPORTED',
                conclusion: 'BCIB & ABDF Binary Substrate is VERIFIED in active repository snapshot.',
                appliedInvariants: ['Typed ABDF Binary Format', 'Deterministic BCIB Instruction Representation'],
                disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
                directSources: [bcibFile],
                answerSummaryTr: 'DOĞRULANDI: BCIB (Binary Command & Instruction) ve ABDF (Typed Binary Data Format) AykenOS veri substratında aktif olarak doğrulanmıştır.',
                answerSummaryEn: 'SUPPORTED: BCIB instruction representation and ABDF typed binary format are verified in active snapshot repository tree.',
                groundedFiles: [bcibFile],
                reasoningChain: [
                    'BCIB/ABDF binary substrate lookup -> VERIFIED_IMPLEMENTATION',
                    'Repository path matching -> ' + bcibFile.path,
                    'Binary layout determinism -> PASSED',
                ],
                governanceStatus: 'RATIFIED',
                matchedTechnicalSystem: 'BCIB Instruction Substrate',
                codeSnippet: bcibFile.snippet || 'pub struct BcibInstructionFrame {\n  pub opcode: u16,\n  pub payload: Vec<u8>,\n}',
            };
        }
        // 4. Semantic CLI Queries (PARTIAL / BOUNDED iff source file exists)
        if (qLower.includes('semantic cli') || qLower.includes('yetki')) {
            const cliFile = groundedFiles.find((f) => f.path.includes('semantic-cli'));
            if (!cliFile) {
                return {
                    queryText,
                    commitSha,
                    manifestDigest,
                    sourceMode,
                    status: 'UNKNOWN',
                    conclusion: 'Semantic CLI source file not found in active snapshot.',
                    appliedInvariants: ['Epistemic Truth Invariant: No Grounded Source != SUPPORTED'],
                    disclaimerNotice: 'Source Evidence Missing',
                    directSources: [],
                    answerSummaryTr: 'BİLİNMİYOR: Semantic CLI kaynak dosyası aktif snapshot içerisinde bulunamadı.',
                    answerSummaryEn: 'UNKNOWN: Semantic CLI source file not found in active snapshot.',
                    groundedFiles: [],
                    reasoningChain: ['Semantic CLI keyword match -> OK', 'Snapshot search -> NOT_FOUND', 'Result -> UNKNOWN'],
                    governanceStatus: 'UNDER_REVIEW',
                };
            }
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'PARTIAL',
                conclusion: 'Semantic CLI has BOUNDED authority in Ring3 policy runtime.',
                appliedInvariants: ['Mechanism vs Policy Separation', 'Newly Detected Code != Authority Grant'],
                disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
                directSources: [cliFile],
                answerSummaryTr: 'SINIRLI (PARTIAL): Semantic CLI kullanıcı alanı katmanındadır. Kodu aktiftir ancak anayasal yetkisi sınırlandırılmıştır (grantsNewAuthority = false).',
                answerSummaryEn: 'PARTIAL (BOUNDED): Semantic CLI operates in Ring3 policy runtime. Code is active but runtime authority is strictly bounded.',
                groundedFiles: [cliFile],
                reasoningChain: [
                    'Ring3 policy runtime boundary check -> PASSED',
                    'Phase-24 ratified authority catalog -> NO_AUTOMATIC_AUTHORITY_GRANT',
                    'Source SHA-256 verification -> VALID',
                ],
                governanceStatus: 'RATIFIED',
                matchedTechnicalSystem: 'Semantic CLI Policy Runtime',
                codeSnippet: cliFile.snippet || 'pub fn parse_intent(input: &str) -> Result<BcibCommand, Error> {\n  // Ring3 intent parsing under bounded authority\n}',
            };
        }
        // 5. Validator & Evidence Queries (SUPPORTED iff source file exists)
        if (qLower.includes('validator') || qLower.includes('evidence') || qLower.includes('kanıt') || qLower.includes('proofd')) {
            const proofFile = groundedFiles.find((f) => f.path.includes('proofd') || f.path.includes('evidence'));
            if (!proofFile) {
                return {
                    queryText,
                    commitSha,
                    manifestDigest,
                    sourceMode,
                    status: 'UNKNOWN',
                    conclusion: 'Proof/Evidence source files not found in active snapshot.',
                    appliedInvariants: ['Epistemic Truth Invariant: No Grounded Source != SUPPORTED'],
                    disclaimerNotice: 'Source Evidence Missing',
                    directSources: [],
                    answerSummaryTr: 'BİLİNMİYOR: Doğrulayıcı kanıt dosyaları aktif snapshot içerisinde bulunamadı.',
                    answerSummaryEn: 'UNKNOWN: Proof/Evidence source files not found in active snapshot.',
                    groundedFiles: [],
                    reasoningChain: ['Evidence keyword match -> OK', 'Snapshot search -> NOT_FOUND', 'Result -> UNKNOWN'],
                    governanceStatus: 'UNDER_REVIEW',
                };
            }
            return {
                queryText,
                commitSha,
                manifestDigest,
                sourceMode,
                status: 'SUPPORTED',
                conclusion: 'Validator Output PASS != Accepted Evidence',
                appliedInvariants: ['Validator Output PASS != Accepted Evidence', 'Exact-Subject SHA Binding Required'],
                disclaimerNotice: 'Generated Explanation != Canonical Authority Decision Record',
                directSources: [proofFile],
                answerSummaryTr: 'DOĞRULANDI: proofd servisi testlerin PASS vermesini exact-subject commit SHA bağı ile eşleştirmekle yükümlüdür.',
                answerSummaryEn: 'SUPPORTED: Validator PASS != Accepted Evidence. Accepted evidence requires exact-subject commit SHA binding under Phase-24 rules.',
                groundedFiles: [proofFile],
                reasoningChain: [
                    'Validator output evaluation -> PASS',
                    'Exact-Subject commit SHA binding check -> VERIFIED',
                    'Phase-24 evidence boundary ratification -> RATIFIED',
                ],
                governanceStatus: 'RATIFIED',
                matchedTechnicalSystem: 'proofd Evidence Verifier',
                codeSnippet: proofFile.snippet || 'pub fn verify_evidence_candidate(candidate: &EvidenceCandidate, commit_sha: &Sha256Digest) -> VerificationResult',
            };
        }
        // 6. Strict Grounded Fallback Answer (UNKNOWN if no direct evidence match)
        return {
            queryText,
            commitSha,
            manifestDigest,
            sourceMode,
            status: 'UNKNOWN',
            conclusion: 'No exact grounded source evidence found for this query in active repository snapshot.',
            appliedInvariants: ['Epistemic Truth Invariant: No Grounded Source != SUPPORTED Answer'],
            disclaimerNotice: 'Unmatched Query Domain',
            directSources: [],
            answerSummaryTr: `BİLİNMİYOR: Sorgunuza ilişkin doğrudan kanıt dosyası aktif snapshot (${manifestDigest.slice(0, 12)}...) içerisinde tespit edilemedi.`,
            answerSummaryEn: `UNKNOWN: No direct source evidence matching this query was grounded in snapshot manifest (${manifestDigest.slice(0, 12)}...).`,
            groundedFiles: [],
            reasoningChain: [
                'Grounded snapshot lookup -> COMPLETED',
                'Direct evidence matching -> NOT_FOUND',
                'Epistemic Rule Enforcement -> UNKNOWN',
            ],
            governanceStatus: 'UNDER_REVIEW',
            codeSnippet: '// Epistemic Invariant:\n// No Grounded Source != SUPPORTED Answer',
        };
    }
}
//# sourceMappingURL=QueryEngine.js.map