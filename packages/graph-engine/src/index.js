export class GovernanceKnowledgeGraphEngine {
    nodes = new Map();
    edges = [];
    constructor() {
        this.initDefaultGraph();
    }
    initDefaultGraph() {
        const defaultSource = {
            sourceType: 'CANONICAL_DOCUMENT',
            repository: 'kenanay/AykenOS',
            ref: 'main',
            headSha: 'd8018a2c3b4a5e6f7g8h9i0j',
            path: 'docs/roadmap/CURRENT_PHASE',
        };
        const nodesList = [
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
                id: 'phase-24',
                label: 'Phase-24: Accepted-Evidence Boundary Planning',
                nodeType: 'PHASE_DECISION',
                domain: 'Phase',
                description: 'Current active phase defining exact-subject evidence expectations.',
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
                sources: [defaultSource],
            },
            {
                id: 'semantic-cli',
                label: 'Semantic CLI Component',
                nodeType: 'COMPONENT',
                domain: 'Runtime',
                description: 'Ring3 intent interface. Bounded authority in Phase-24.',
                authorityClass: 'BOUNDED',
                sources: [defaultSource],
            },
            {
                id: 'evidence-exact-subject',
                label: 'Exact-Subject Binding Step',
                nodeType: 'EVIDENCE_STEP',
                domain: 'Evidence',
                description: 'Binding candidate evidence to commit SHA d8018a2c...',
                authorityClass: 'EXACT_SUBJECT',
                sources: [defaultSource],
            },
        ];
        for (const node of nodesList) {
            this.nodes.set(node.id, node);
        }
        this.edges = [
            {
                id: 'e-inv-phase24',
                sourceId: 'inv-mechanism-policy',
                targetId: 'phase-24',
                relation: 'GOVERNS',
                description: 'Constitutional invariant governs Phase-24 active scope.',
            },
            {
                id: 'e-phase24-semantic',
                sourceId: 'phase-24',
                targetId: 'semantic-cli',
                relation: 'BOUNDS',
                description: 'Phase-24 explicitly bounds Semantic CLI authority.',
            },
            {
                id: 'e-phase24-evidence',
                sourceId: 'phase-24',
                targetId: 'evidence-exact-subject',
                relation: 'RATIFIES',
                description: 'Phase-24 planning establishes exact-subject binding rules.',
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
    getNeighborhood(nodeId) {
        const targetNode = this.nodes.get(nodeId);
        if (!targetNode)
            return null;
        const connectedEdges = this.edges.filter((e) => e.sourceId === nodeId || e.targetId === nodeId);
        const connectedIds = new Set();
        for (const e of connectedEdges) {
            if (e.sourceId !== nodeId)
                connectedIds.add(e.sourceId);
            if (e.targetId !== nodeId)
                connectedIds.add(e.targetId);
        }
        const connectedNodes = [];
        for (const id of connectedIds) {
            const n = this.nodes.get(id);
            if (n)
                connectedNodes.push(n);
        }
        return {
            targetNode,
            connectedNodes,
            edges: connectedEdges,
        };
    }
    getAllNodes() {
        return Array.from(this.nodes.values());
    }
    getAllEdges() {
        return [...this.edges];
    }
}
//# sourceMappingURL=index.js.map