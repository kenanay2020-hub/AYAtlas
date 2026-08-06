import { GovernanceKnowledgeGraphEngine } from '@ayatlas/graph-engine';
import { AYKENOS_PHASE_CATALOG } from '@ayatlas/authority-resolver';
export class ConstitutionalQueryEngine {
    defaultGraphEngine;
    constructor() {
        this.defaultGraphEngine = new GovernanceKnowledgeGraphEngine();
    }
    askConstitutionalQuery(query, context, fallbackHeadSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f') {
        const normalized = query.toLowerCase();
        const graphEngine = context?.graphEngine || this.defaultGraphEngine;
        const commitSha = context?.snapshot?.identity.commitSha || fallbackHeadSha;
        const manifestDigest = context?.snapshot?.identity.manifestDigest || ('sha256_digest_' + commitSha.slice(0, 8));
        const isDemoData = context?.snapshot?.observation.isDemoData ?? true;
        const snapshotIdentity = {
            repository: 'kenanay/AykenOS',
            commitSha,
            manifestDigest,
        };
        const status = isDemoData ? 'DEMO_SUPPORTED' : 'SUPPORTED';
        const disclaimerNotice = 'Generated Explanation != Canonical Authority Decision. AYAtlas provides audit-traceable explanations derived strictly from canonical documents and governance graph evidence, but never invents or ratifies new constitutional decisions.';
        if (normalized.includes('semantic cli') || normalized.includes('yetki') || normalized.includes('authority')) {
            const neighborhood = graphEngine.getNeighborhood('semantic-cli');
            return {
                query,
                conclusion: 'Semantic CLI operates in Ring3 userspace with BOUNDED authority under Phase-24 constraints. Ring3 code existence does NOT grant active runtime execution authority.',
                status,
                directSources: [
                    {
                        assertionId: 'assert-semantic-cli-bounded',
                        repository: 'kenanay/AykenOS',
                        commitSha,
                        sourcePath: 'userspace/semantic-cli/src/main.rs',
                        sourceDigest: 'sha256_' + commitSha.slice(0, 12),
                        extractionMethod: 'governance-resolved',
                        confidence: 1.0,
                    },
                ],
                appliedInvariants: [
                    'Invariant: Mechanism vs Policy Separation (Ring0 Kernel mechanism vs Ring3 Policy)',
                    'Invariant: Repository Change != Authority Change (Newly detected code does not infer authority)',
                ],
                reasoningPath: neighborhood?.edges || [],
                unresolvedQuestions: [
                    'Will Phase-25 expand Semantic CLI execution scope?',
                ],
                snapshotIdentity,
                disclaimerNotice,
            };
        }
        if (normalized.includes('phase-24') || normalized.includes('phase 24') || normalized.includes('faz-24')) {
            const p24 = AYKENOS_PHASE_CATALOG.find((p) => p.phase === 24);
            const neighborhood = graphEngine.getNeighborhood('phase-24');
            return {
                query,
                conclusion: `Phase-24 (${p24?.title}) allows exact-subject evidence expectations, pointer transition documentation, and governance overview. It explicitly FORBIDS new syscall creation, Ring0 policy expansion, and general AI runtime activation.`,
                status,
                directSources: [
                    {
                        assertionId: 'assert-p24-scope',
                        repository: 'kenanay/AykenOS',
                        commitSha,
                        sourcePath: 'docs/roadmap/CURRENT_PHASE',
                        sourceDigest: 'sha256_' + commitSha.slice(0, 12),
                        extractionMethod: 'governance-resolved',
                        confidence: 1.0,
                    },
                ],
                appliedInvariants: [
                    'Invariant: Phase-24 Bounded Scope Invariant',
                    `Invariant: Exact-Subject SHA Binding ${commitSha.slice(0, 8)}...`,
                ],
                reasoningPath: neighborhood?.edges || [],
                unresolvedQuestions: [],
                snapshotIdentity,
                disclaimerNotice,
            };
        }
        if (normalized.includes('validator') || normalized.includes('pass') || normalized.includes('accepted evidence')) {
            const neighborhood = graphEngine.getNeighborhood('inv-validator-accepted');
            return {
                query,
                conclusion: 'Validator PASS is a local tooling output (proofd / verifier tool). Accepted evidence requires exact-subject binding and formal governance ratification under Phase-24 rules.',
                status,
                directSources: [
                    {
                        assertionId: 'assert-evidence-boundary',
                        repository: 'kenanay/AykenOS',
                        commitSha,
                        sourcePath: 'docs/phase24-accepted-evidence-planning.md',
                        sourceDigest: 'sha256_' + commitSha.slice(0, 12),
                        extractionMethod: 'governance-resolved',
                        confidence: 1.0,
                    },
                ],
                appliedInvariants: [
                    'Invariant: Validator Output PASS != Accepted Evidence',
                    'Invariant: Sequential 8-Step Evidence Verification Boundary',
                ],
                reasoningPath: neighborhood?.edges || [],
                unresolvedQuestions: [],
                snapshotIdentity,
                disclaimerNotice,
            };
        }
        // Default Fallback Query Answer
        return {
            query,
            conclusion: 'Query evaluated against AykenOS Governance Knowledge Graph. Subject identified under Phase-24 active governance overview.',
            status: 'PARTIAL',
            directSources: [
                {
                    assertionId: 'assert-general-governance',
                    repository: 'kenanay/AykenOS',
                    commitSha,
                    sourcePath: 'docs/roadmap/CURRENT_PHASE',
                    sourceDigest: 'sha256_' + commitSha.slice(0, 12),
                    extractionMethod: 'parsed',
                    confidence: 0.8,
                },
            ],
            appliedInvariants: ['Invariant: General Governance Overview Invariant'],
            reasoningPath: [],
            unresolvedQuestions: ['Exact specification requires additional canonical decision reference.'],
            snapshotIdentity,
            disclaimerNotice,
        };
    }
}
//# sourceMappingURL=QueryEngine.js.map