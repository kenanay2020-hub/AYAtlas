import { SourceReference } from '@ayatlas/knowledge-model';

export type GovernanceNodeType =
  | 'GOVERNANCE_INVARIANT'
  | 'PHASE_DECISION'
  | 'EVIDENCE_STEP'
  | 'SYSCALL_ABI'
  | 'COMPONENT'
  | 'CI_GATE';

export interface GovernanceGraphNode {
  id: string;
  label: string;
  nodeType: GovernanceNodeType;
  domain: 'Constitutional' | 'Phase' | 'Evidence' | 'ABI' | 'Runtime';
  description: string;
  authorityClass: 'CANONICAL' | 'EXACT_SUBJECT' | 'BOUNDED' | 'HISTORICAL';
  sources: SourceReference[];
}

export interface GovernanceGraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relation: 'GOVERNS' | 'BOUNDS' | 'VERIFIES' | 'RATIFIES' | 'EXCLUDES';
  description: string;
}

export interface GovernanceGraphNeighborhood {
  targetNode: GovernanceGraphNode;
  connectedNodes: GovernanceGraphNode[];
  edges: GovernanceGraphEdge[];
}

export interface DynamicGraphBuildContext {
  commitSha: string;
  detectedPhase?: number;
  files?: { path: string }[];
  sourceAuthorityPolicy?: string;
}

export class GovernanceKnowledgeGraphEngine {
  private nodes: Map<string, GovernanceGraphNode> = new Map();
  private edges: GovernanceGraphEdge[] = [];

  constructor() {
    this.initDefaultGraph('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f', 24);
  }

  public buildGraph(ctx: DynamicGraphBuildContext) {
    const commitSha = ctx.commitSha || 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f';
    const phase = ctx.detectedPhase || 24;
    this.initDefaultGraph(commitSha, phase);
  }

  private initDefaultGraph(commitSha: string, phase: number) {
    this.nodes.clear();
    this.edges = [];

    const defaultSource: SourceReference = {
      sourceType: 'CANONICAL_DOCUMENT',
      repository: 'kenanay/AykenOS',
      ref: 'main',
      headSha: commitSha,
      path: 'docs/roadmap/CURRENT_PHASE',
    };

    const nodesList: GovernanceGraphNode[] = [
      {
        id: 'inv-mechanism-policy',
        label: 'Invariant: Mechanism vs Policy Separation',
        nodeType: 'GOVERNANCE_INVARIANT',
        domain: 'Constitutional',
        description: 'Ring0 kernel provides mechanisms; Ring3 userspace provides policies.',
        authorityClass: 'CANONICAL',
        sources: [defaultSource],
      },
      {
        id: 'inv-validator-accepted',
        label: 'Invariant: Validator PASS != Accepted Evidence',
        nodeType: 'GOVERNANCE_INVARIANT',
        domain: 'Evidence',
        description: 'Validator PASS is a tool output; accepted evidence requires exact-subject governance ratification.',
        authorityClass: 'CANONICAL',
        sources: [defaultSource],
      },
      {
        id: `phase-${phase}`,
        label: `Phase-${phase}: Accepted-Evidence Boundary Planning`,
        nodeType: 'PHASE_DECISION',
        domain: 'Phase',
        description: `Current active phase (${phase}) defining exact-subject evidence expectations.`,
        authorityClass: 'CANONICAL',
        sources: [defaultSource],
      },
      {
        id: 'syscall-abi',
        label: 'Syscall ABI Boundary (FROZEN)',
        nodeType: 'SYSCALL_ABI',
        domain: 'ABI',
        description: 'Frozen syscall interface boundary between Ring0 and Ring3.',
        authorityClass: 'CANONICAL',
        sources: [{ ...defaultSource, path: 'shared/abi/syscalls.h' }],
      },
      {
        id: 'semantic-cli',
        label: 'Semantic CLI Component',
        nodeType: 'COMPONENT',
        domain: 'Runtime',
        description: `Ring3 intent interface. Bounded authority in Phase-${phase}.`,
        authorityClass: 'BOUNDED',
        sources: [{ ...defaultSource, path: 'userspace/semantic-cli/src/main.rs' }],
      },
      {
        id: 'evidence-exact-subject',
        label: 'Exact-Subject Binding Step',
        nodeType: 'EVIDENCE_STEP',
        domain: 'Evidence',
        description: `Binding candidate evidence to locked commit SHA ${commitSha.slice(0, 8)}...`,
        authorityClass: 'EXACT_SUBJECT',
        sources: [{ ...defaultSource, path: 'docs/evidence/RATIFIED_CLAIMS.md' }],
      },
    ];

    for (const node of nodesList) {
      this.nodes.set(node.id, node);
    }

    this.edges = [
      {
        id: 'e-inv-phase',
        sourceId: 'inv-mechanism-policy',
        targetId: `phase-${phase}`,
        relation: 'GOVERNS',
        description: `Constitutional invariant governs Phase-${phase} active scope.`,
      },
      {
        id: 'e-phase-semantic',
        sourceId: `phase-${phase}`,
        targetId: 'semantic-cli',
        relation: 'BOUNDS',
        description: `Phase-${phase} explicitly bounds Semantic CLI authority.`,
      },
      {
        id: 'e-phase-evidence',
        sourceId: `phase-${phase}`,
        targetId: 'evidence-exact-subject',
        relation: 'RATIFIES',
        description: `Phase-${phase} planning establishes exact-subject binding rules.`,
      },
      {
        id: 'e-inv-evidence',
        sourceId: 'inv-validator-accepted',
        targetId: 'evidence-exact-subject',
        relation: 'BOUNDS',
        description: 'Requires exact-subject governance ratification for acceptance.',
      },
    ];
  }

  getNeighborhood(nodeId: string): GovernanceGraphNeighborhood | null {
    const targetNode = this.nodes.get(nodeId);
    if (!targetNode) return null;

    const connectedEdges = this.edges.filter(
      (e) => e.sourceId === nodeId || e.targetId === nodeId
    );

    const connectedIds = new Set<string>();
    for (const e of connectedEdges) {
      if (e.sourceId !== nodeId) connectedIds.add(e.sourceId);
      if (e.targetId !== nodeId) connectedIds.add(e.targetId);
    }

    const connectedNodes: GovernanceGraphNode[] = [];
    for (const id of connectedIds) {
      const n = this.nodes.get(id);
      if (n) connectedNodes.push(n);
    }

    return {
      targetNode,
      connectedNodes,
      edges: connectedEdges,
    };
  }

  getAllNodes(): GovernanceGraphNode[] {
    return Array.from(this.nodes.values());
  }

  getAllEdges(): GovernanceGraphEdge[] {
    return [...this.edges];
  }
}
