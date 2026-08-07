import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Network, Info, Shield } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';
export const InteractiveGovernanceGraph = () => {
    const { snapshot, sourceMode } = useSnapshotContext();
    const [selectedNodeId, setSelectedNodeId] = useState('node-ring0');
    const [filterCategory, setFilterCategory] = useState('ALL');
    const nodes = [
        {
            id: 'node-ring0',
            label: 'Ring0 Kernel Mechanism',
            category: 'RING0',
            x: 350,
            y: 320,
            codePath: 'kernel/mm, kernel/proc',
            description: 'Pure hardware execution mechanisms without domain or business policy rules.',
            trExplanation: 'Donanım üzerinde çalışan ve yalnızca güvenli hafıza/proses yürütmesi sağlayan çekirdek mekanizması.',
        },
        {
            id: 'node-ring3',
            label: 'Ring3 Policy Runtime',
            category: 'RING3',
            x: 180,
            y: 120,
            codePath: 'userspace/semantic-cli',
            description: 'Application logic & user constraints outside kernel. Policy presence != Authority grant.',
            trExplanation: 'Sistemin ne yapacağını belirleyen ancak doğrudan çekirdek yetkisi içermeyen kullanıcı alanı katmanı.',
        },
        {
            id: 'node-abi',
            label: 'Frozen Syscall ABI',
            category: 'ABI',
            x: 520,
            y: 180,
            codePath: 'shared/abi/syscalls.h',
            description: 'Immutable system call interface boundary between Ring3 and Ring0.',
            trExplanation: 'Ring3 ile Ring0 arasında değişmezliği anayasal olarak dondurulmuş sistem çağrı arayüzü.',
        },
        {
            id: 'node-evidence',
            label: 'Accepted Evidence Claim',
            category: 'EVIDENCE',
            x: 650,
            y: 350,
            codePath: 'docs/evidence/RATIFIED_CLAIMS.md',
            description: 'Validator PASS != Accepted Evidence. Requires exact-subject SHA binding.',
            trExplanation: 'Doğrulayıcı testi geçse bile kabul edilmiş kanıt olması için exact-subject SHA bağı gereklidir.',
        },
        {
            id: 'node-phase24',
            label: 'Phase-24 Governance Pointer',
            category: 'GOVERNANCE',
            x: 350,
            y: 60,
            codePath: 'docs/roadmap/CURRENT_PHASE',
            description: 'Ratified Phase-24 governance execution boundary under AykenOS Constitution.',
            trExplanation: 'AykenOS Anayasası altında onaylanmış ve yürürlükte olan Faz-24 yönetişim sınırı.',
        },
    ];
    const edges = [
        { from: 'node-phase24', to: 'node-ring3', relation: 'GOVERNS' },
        { from: 'node-ring3', to: 'node-abi', relation: 'BOUNDS' },
        { from: 'node-abi', to: 'node-ring0', relation: 'FROZEN_BY' },
        { from: 'node-ring0', to: 'node-evidence', relation: 'VERIFIES' },
        { from: 'node-phase24', to: 'node-evidence', relation: 'GOVERNS' },
    ];
    const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];
    const filteredNodes = nodes.filter((n) => filterCategory === 'ALL' || n.category === filterCategory);
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Network, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Interactive Governance Knowledge Graph Canvas" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Visual node-edge canvas representing relational architectural edges (GOVERNS, BOUNDS, VERIFIES, FROZEN_BY)." })] }), _jsx("div", { className: "flex items-center space-x-2", children: ['ALL', 'RING0', 'RING3', 'ABI', 'EVIDENCE', 'GOVERNANCE'].map((cat) => (_jsx("button", { onClick: () => setFilterCategory(cat), className: `px-3 py-1 rounded text-[11px] font-semibold transition-colors ${filterCategory === cat
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`, children: cat }, cat))) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 glass-panel p-4 border-slate-800 relative bg-slate-950/80 min-h-[440px] flex flex-col justify-between overflow-hidden", children: [_jsxs("div", { className: "absolute top-4 left-4 z-10 flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800", children: [_jsx(Info, { className: "h-3.5 w-3.5 text-cyan-400" }), _jsx("span", { children: "Interactive Nodes: Click any node to inspect governance relations" })] }), _jsxs("svg", { className: "w-full h-[400px] z-0", children: [_jsx("defs", { children: _jsx("marker", { id: "arrowhead", markerWidth: "10", markerHeight: "7", refX: "20", refY: "3.5", orient: "auto", children: _jsx("polygon", { points: "0 0, 10 3.5, 0 7", fill: "#06b6d4" }) }) }), edges.map((edge, idx) => {
                                        const sourceNode = nodes.find((n) => n.id === edge.from);
                                        const targetNode = nodes.find((n) => n.id === edge.to);
                                        if (!sourceNode || !targetNode)
                                            return null;
                                        const isSelected = selectedNodeId === edge.from || selectedNodeId === edge.to;
                                        return (_jsxs("g", { children: [_jsx("line", { x1: sourceNode.x, y1: sourceNode.y, x2: targetNode.x, y2: targetNode.y, stroke: isSelected ? '#06b6d4' : '#334155', strokeWidth: isSelected ? 2.5 : 1.5, strokeDasharray: edge.relation === 'FROZEN_BY' ? '4 4' : 'none', markerEnd: "url(#arrowhead)" }), _jsx("text", { x: (sourceNode.x + targetNode.x) / 2, y: (sourceNode.y + targetNode.y) / 2 - 6, fill: isSelected ? '#67e8f9' : '#64748b', fontSize: "10", textAnchor: "middle", className: "font-mono font-bold", children: edge.relation })] }, idx));
                                    }), filteredNodes.map((node) => {
                                        const isSelected = selectedNodeId === node.id;
                                        let fillBg = '#0f172a';
                                        let strokeColor = '#334155';
                                        if (node.category === 'RING0')
                                            strokeColor = '#ec4899';
                                        if (node.category === 'RING3')
                                            strokeColor = '#6366f1';
                                        if (node.category === 'ABI')
                                            strokeColor = '#f59e0b';
                                        if (node.category === 'EVIDENCE')
                                            strokeColor = '#10b981';
                                        if (node.category === 'GOVERNANCE')
                                            strokeColor = '#06b6d4';
                                        return (_jsxs("g", { onClick: () => setSelectedNodeId(node.id), className: "cursor-pointer transition-transform hover:scale-105", children: [_jsx("circle", { cx: node.x, cy: node.y, r: isSelected ? 26 : 22, fill: isSelected ? strokeColor : fillBg, fillOpacity: isSelected ? 0.3 : 0.9, stroke: strokeColor, strokeWidth: isSelected ? 3 : 2 }), _jsx("text", { x: node.x, y: node.y + 36, fill: isSelected ? '#f8fafc' : '#94a3b8', fontSize: "11", fontWeight: isSelected ? 'bold' : 'normal', textAnchor: "middle", className: "select-none", children: node.label })] }, node.id));
                                    })] }), _jsxs("div", { className: "flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 z-10", children: [_jsxs("span", { children: ["Snapshot Source: ", _jsx("strong", { className: "text-cyan-400", children: sourceMode.toUpperCase() })] }), _jsxs("span", { children: ["Total Graph Edges: ", _jsx("strong", { className: "text-slate-200", children: edges.length })] })] })] }), _jsxs("div", { className: "glass-panel p-5 border-slate-800 space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2 border-b border-slate-800 pb-3", children: [_jsx(Shield, { className: "h-5 w-5 text-cyan-400" }), _jsx("h3", { className: "font-bold text-sm text-slate-100", children: selectedNode.label })] }), _jsxs("div", { className: "space-y-3 text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-slate-400 text-[11px]", children: "Category:" }), _jsx("div", { className: "mt-1 font-bold text-cyan-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800", children: selectedNode.category })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400 text-[11px]", children: "Code Location:" }), _jsx("div", { className: "mt-1 font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800", children: selectedNode.codePath })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400 text-[11px]", children: "Turkish Explanation (T\u00FCrk\u00E7e A\u00E7\u0131klama):" }), _jsx("p", { className: "mt-1 text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800", children: selectedNode.trExplanation })] }), _jsxs("div", { children: [_jsx("span", { className: "text-slate-400 text-[11px]", children: "Technical Invariant:" }), _jsx("p", { className: "mt-1 text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800", children: selectedNode.description })] })] })] })] })] }));
};
//# sourceMappingURL=InteractiveGovernanceGraph.js.map