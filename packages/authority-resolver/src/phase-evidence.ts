import { AuthorityDomain, AuthorityQuery, AuthorityResolution } from './index';

export interface PhaseRecord {
  phase: number;
  title: string;
  status: 'OFFICIALLY_CLOSED' | 'ACTIVE' | 'PLANNING_ONLY' | 'HISTORICAL';
  objective: string;
  scope: string;
  unauthorizedScope: string[];
  deliverables: string[];
  decisionDocs: string[];
  commitRange?: string;
  exactSubjectSha?: string;
}

export interface EvidenceChainStep {
  id: string;
  stepName: string;
  stage:
    | 'EXECUTION'
    | 'TRACE'
    | 'RECEIPT'
    | 'VALIDATOR_OUTPUT'
    | 'EVIDENCE_CANDIDATE'
    | 'EXACT_SUBJECT_BINDING'
    | 'GOVERNANCE_REVIEW'
    | 'ACCEPTED_EVIDENCE';
  description: string;
  isAuthorityGranted: boolean;
  codePaths: string[];
  governanceConstraint: string;
}

/**
 * Authoritative Phase Catalog (Phase-0 to Phase-24)
 */
export const AYKENOS_PHASE_CATALOG: PhaseRecord[] = [
  {
    phase: 0,
    title: 'Phase-0 — Bootloader & UEFI Target',
    status: 'OFFICIALLY_CLOSED',
    objective: 'Initial hardware boot & UEFI memory map handover.',
    scope: 'UEFI initialization, kernel ELF loader.',
    unauthorizedScope: ['Ring3 Userspace', 'AI Runtime', 'Syscall ABI'],
    deliverables: ['bootloader/efi_main.c'],
    decisionDocs: ['docs/phase0-bootloader.md'],
  },
  {
    phase: 11,
    title: 'Phase-11 — Memory Management Subsystem',
    status: 'OFFICIALLY_CLOSED',
    objective: 'Physical page allocator and page-table mapping.',
    scope: 'Physical memory allocation, kernel heap setup.',
    unauthorizedScope: ['Ring3 Policy', 'Dynamic Package Execution'],
    deliverables: ['kernel/mm/page_alloc.c'],
    decisionDocs: ['docs/phase11-mm-closure.md'],
  },
  {
    phase: 15,
    title: 'Phase-15 — BCIB Substrate & Instruction Representation',
    status: 'OFFICIALLY_CLOSED',
    objective: 'Binary instruction IR substrate implementation.',
    scope: 'BCIB instruction decoding, deterministic trace generation.',
    unauthorizedScope: ['General Runtime Authority', 'AI Decision Making'],
    deliverables: ['ayken-core/crates/bcib'],
    decisionDocs: ['docs/phase15-bcib-closure.md'],
  },
  {
    phase: 19,
    title: 'Phase-19 — Bounded Admission & Receipt Substrate',
    status: 'OFFICIALLY_CLOSED',
    objective: 'Bounded admission receipt generation.',
    scope: 'Receipt creation, bounded task submission.',
    unauthorizedScope: ['Accepted Evidence Status', 'Runtime Execution Activation'],
    deliverables: ['userspace/phase19-admission-receipt'],
    decisionDocs: ['docs/phase19-admission-closure.md'],
  },
  {
    phase: 24,
    title: 'Phase-24 — Accepted-Evidence Boundary Planning',
    status: 'ACTIVE',
    objective: 'Exact-subject evidence expectations and accepted-evidence boundary planning.',
    scope: 'Pointer transition, governance overview, exact-subject expectations, precision corrections.',
    unauthorizedScope: [
      'New Syscall Creation',
      'Kernel ABI Expansion',
      'Ring0 Policy Authority',
      'General AI Runtime Activation',
      'Accepted Evidence Creation',
      'Downstream Authority Delegation',
    ],
    deliverables: [
      'docs/roadmap/CURRENT_PHASE',
      'docs/phase24-pointer-transition.md',
      'docs/phase24-governance-overview.md',
      'docs/phase24-accepted-evidence-planning.md',
    ],
    decisionDocs: [
      'docs/phase24-pointer-transition.md',
      'docs/phase24-governance-overview.md',
      'docs/phase24-accepted-evidence-planning.md',
      'docs/phase24-p2-precision-correction.md',
    ],
    exactSubjectSha: 'd8018a2c3b4a5e6f7g8h9i0j',
  },
];

/**
 * Standard Evidence Boundary Chain for AykenOS
 */
export const AYKENOS_EVIDENCE_CHAIN: EvidenceChainStep[] = [
  {
    id: 'step-1-exec',
    stepName: '1. Execution Mechanism Output',
    stage: 'EXECUTION',
    description: 'Raw binary execution trace produced by Ring0 mechanism kernel or minimal userspace binary.',
    isAuthorityGranted: false,
    codePaths: ['kernel/kernel.c', 'userspace/minimal'],
    governanceConstraint: 'Raw execution output carries zero constitutional authority.',
  },
  {
    id: 'step-2-trace',
    stepName: '2. Deterministic Trace / BCIB',
    stage: 'TRACE',
    description: 'BCIB instruction trace representation and memory state snapshot.',
    isAuthorityGranted: false,
    codePaths: ['ayken-core/crates/bcib'],
    governanceConstraint: 'Trace identity is deterministic but unverified.',
  },
  {
    id: 'step-3-receipt',
    stepName: '3. Admission Receipt (Phase-19)',
    stage: 'RECEIPT',
    description: 'Phase-19 bounded admission receipt artifact.',
    isAuthorityGranted: false,
    codePaths: ['userspace/phase19-admission-receipt'],
    governanceConstraint: 'Receipt proves submission under bounded limits, not evidence acceptance.',
  },
  {
    id: 'step-4-validator',
    stepName: '4. Validator Tooling Output',
    stage: 'VALIDATOR_OUTPUT',
    description: 'Output produced by proofd or proof-verifier tools.',
    isAuthorityGranted: false,
    codePaths: ['proofd/src/main.rs', 'tools/verification/proof_verifier.py'],
    governanceConstraint: 'Validator PASS result != Accepted Evidence.',
  },
  {
    id: 'step-5-candidate',
    stepName: '5. Evidence Candidate',
    stage: 'EVIDENCE_CANDIDATE',
    description: 'Artifact submitted for exact-subject binding review.',
    isAuthorityGranted: false,
    codePaths: ['tools/validation'],
    governanceConstraint: 'Candidate evidence pending exact SHA binding.',
  },
  {
    id: 'step-6-exact-subject',
    stepName: '6. Exact-Subject Binding (Phase-24)',
    stage: 'EXACT_SUBJECT_BINDING',
    description: 'Evidence candidate locked to specific commit SHA d8018a2c...',
    isAuthorityGranted: false,
    codePaths: ['docs/phase24-accepted-evidence-planning.md'],
    governanceConstraint: 'Exact-subject binding completes subject expectation; awaits governance decision.',
  },
  {
    id: 'step-7-governance',
    stepName: '7. Governance Review',
    stage: 'GOVERNANCE_REVIEW',
    description: 'Formal review under Platform Constitution and Phase decisions.',
    isAuthorityGranted: false,
    codePaths: ['docs/roadmap/CURRENT_PHASE'],
    governanceConstraint: 'Governance review evaluates invariant compliance.',
  },
  {
    id: 'step-8-accepted',
    stepName: '8. Accepted Evidence Boundary',
    stage: 'ACCEPTED_EVIDENCE',
    description: 'Canonical accepted evidence status formally ratified.',
    isAuthorityGranted: true,
    codePaths: ['docs/canonical-decisions'],
    governanceConstraint: 'Only ratified accepted evidence can form downstream authority.',
  },
];
