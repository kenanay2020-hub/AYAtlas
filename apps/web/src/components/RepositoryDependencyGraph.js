import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Network, Box, ArrowRight } from 'lucide-react';
export const RepositoryDependencyGraph = () => {
    const [selectedNodeId, setSelectedNodeId] = useState('@ayatlas/web');
    const [filterLayer, setFilterLayer] = useState('ALL');
    const packages = [
        {
            id: '@ayatlas/snapshot-model',
            name: 'snapshot-model',
            layer: 'Models & Substrate',
            description: 'Immutable RepositorySnapshot schemas, SnapshotIdentity, and pure TypeScript SHA-256 digest engine.',
            dependencies: ['zod'],
            dependents: ['@ayatlas/github-reader', '@ayatlas/repository-parser', '@ayatlas/repository-ingestor', '@ayatlas/knowledge-builder', '@ayatlas/query-engine', '@ayatlas/drift-engine', '@ayatlas/web'],
            buildTarget: 'packages/snapshot-model',
            color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
        },
        {
            id: '@ayatlas/knowledge-model',
            name: 'knowledge-model',
            layer: 'Models & Substrate',
            description: 'KnowledgeNode, InvariantClaim, GovernanceEdge, and DerivedArtifactEnvelope schemas.',
            dependencies: ['zod'],
            dependents: ['@ayatlas/graph-engine', '@ayatlas/knowledge-builder', '@ayatlas/provenance-engine', '@ayatlas/query-engine', '@ayatlas/drift-engine', '@ayatlas/web'],
            buildTarget: 'packages/knowledge-model',
            color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
        },
        {
            id: '@ayatlas/github-reader',
            name: 'github-reader',
            layer: 'Readers & Ingestion',
            description: 'Read-only adapter for Local, Offline Fixture, and Octokit GitHub API repository sources.',
            dependencies: ['@ayatlas/snapshot-model'],
            dependents: ['@ayatlas/repository-ingestor', '@ayatlas/knowledge-builder', '@ayatlas/ci-verifier', '@ayatlas/web'],
            buildTarget: 'packages/github-reader',
            color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
        },
        {
            id: '@ayatlas/repository-parser',
            name: 'repository-parser',
            layer: 'Readers & Ingestion',
            description: 'Safety-enforced path sanitizer, AST code parser, and file digest extractor.',
            dependencies: ['@ayatlas/snapshot-model'],
            dependents: ['@ayatlas/repository-ingestor', '@ayatlas/web'],
            buildTarget: 'packages/repository-parser',
            color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
        },
        {
            id: '@ayatlas/repository-ingestor',
            name: 'repository-ingestor',
            layer: 'Readers & Ingestion',
            description: 'Orchestrates commit reading, path filtering, ignore policies, and snapshot compilation.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/github-reader', '@ayatlas/repository-parser'],
            dependents: ['@ayatlas/knowledge-builder', '@ayatlas/query-engine', '@ayatlas/ci-verifier', '@ayatlas/web'],
            buildTarget: 'packages/repository-ingestor',
            color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300',
        },
        {
            id: '@ayatlas/authority-resolver',
            name: 'authority-resolver',
            layer: 'Intelligence Engines',
            description: 'Resolves Ring0 kernel vs Ring3 policy runtimes and enforces grantsNewAuthority=FALSE invariant.',
            dependencies: ['@ayatlas/snapshot-model'],
            dependents: ['@ayatlas/knowledge-builder', '@ayatlas/change-intelligence', '@ayatlas/web'],
            buildTarget: 'packages/authority-resolver',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/graph-engine',
            name: 'graph-engine',
            layer: 'Intelligence Engines',
            description: 'Constructs directed acyclic governance graphs, node relationship edges, and dependency trees.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model'],
            dependents: ['@ayatlas/web'],
            buildTarget: 'packages/graph-engine',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/knowledge-builder',
            name: 'knowledge-builder',
            layer: 'Intelligence Engines',
            description: '5-Stage deterministic pipeline engine transforming raw snapshots into verifiable knowledge artifacts.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model', '@ayatlas/repository-ingestor', '@ayatlas/authority-resolver'],
            dependents: ['@ayatlas/ci-verifier', '@ayatlas/web'],
            buildTarget: 'packages/knowledge-builder',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/provenance-engine',
            name: 'provenance-engine',
            layer: 'Intelligence Engines',
            description: 'Tracks claims, exact-subject commit SHA bindings, and flags stale provenance records.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model'],
            dependents: ['@ayatlas/ci-verifier', '@ayatlas/web'],
            buildTarget: 'packages/provenance-engine',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/query-engine',
            name: 'query-engine',
            layer: 'Intelligence Engines',
            description: 'Grounded natural language and code query engine evaluating 5 constitutional answer statuses.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model', '@ayatlas/repository-ingestor'],
            dependents: ['@ayatlas/web'],
            buildTarget: 'packages/query-engine',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/drift-engine',
            name: 'drift-engine',
            layer: 'Intelligence Engines',
            description: 'Audit engine detecting architectural drift, capability deprecations, and invariant violations.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model'],
            dependents: ['@ayatlas/change-intelligence', '@ayatlas/ci-verifier', '@ayatlas/web'],
            buildTarget: 'packages/drift-engine',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/change-intelligence',
            name: 'change-intelligence',
            layer: 'Intelligence Engines',
            description: 'Computes current-phase semantic diffs and evaluates authority impact across commit ranges.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model', '@ayatlas/drift-engine', '@ayatlas/authority-resolver'],
            dependents: ['@ayatlas/web'],
            buildTarget: 'packages/change-intelligence',
            color: 'border-purple-500/40 bg-purple-500/10 text-purple-300',
        },
        {
            id: '@ayatlas/ci-verifier',
            name: 'ci-verifier',
            layer: 'Intelligence Engines',
            description: 'Automated 5-gate CI verifier validating read-only safety, pipeline determinism, and drift.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/github-reader', '@ayatlas/repository-ingestor', '@ayatlas/knowledge-builder', '@ayatlas/drift-engine', '@ayatlas/provenance-engine'],
            dependents: ['@ayatlas/web'],
            buildTarget: 'packages/ci-verifier',
            color: 'border-rose-500/50 bg-rose-500/10 text-rose-300',
        },
        {
            id: '@ayatlas/web',
            name: 'web (React SPA)',
            layer: 'Web Presentation',
            description: 'Vite + React + Tailwind CSS dashboard providing interactive visualization for all 13 packages.',
            dependencies: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model', '@ayatlas/github-reader', '@ayatlas/repository-ingestor', '@ayatlas/authority-resolver', '@ayatlas/graph-engine', '@ayatlas/knowledge-builder', '@ayatlas/provenance-engine', '@ayatlas/query-engine', '@ayatlas/drift-engine', '@ayatlas/change-intelligence', '@ayatlas/ci-verifier'],
            dependents: [],
            buildTarget: 'apps/web',
            color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-bold',
        },
    ];
    const selectedNode = packages.find((p) => p.id === selectedNodeId) || packages[0];
    const filteredPackages = filterLayer === 'ALL'
        ? packages
        : packages.filter((p) => p.layer === filterLayer);
    const layers = [
        'Models & Substrate',
        'Readers & Ingestion',
        'Intelligence Engines',
        'Web Presentation',
    ];
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Network, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Monorepo Dependency & Module Topology Canvas" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Visualizing the strict Turbo monorepo dependency hierarchy across 14 workspace packages." })] }), _jsxs("div", { className: "flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs", children: [_jsx("span", { className: "text-slate-400 text-[11px] px-2", children: "Layer:" }), ['ALL', ...layers].map((l) => (_jsx("button", { onClick: () => setFilterLayer(l), className: `px-2.5 py-1 rounded-lg transition-colors ${filterLayer === l
                                    ? 'bg-cyan-500 text-slate-950 font-bold'
                                    : 'text-slate-400 hover:text-slate-200'}`, children: l }, l)))] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2 space-y-4", children: layers.map((layerName) => {
                            const layerPkgs = filteredPackages.filter((p) => p.layer === layerName);
                            if (layerPkgs.length === 0)
                                return null;
                            return (_jsxs("div", { className: "glass-panel p-5 border-slate-800 space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [_jsxs("span", { className: "text-xs font-bold text-cyan-400 uppercase tracking-wider", children: [layerName, " (", layerPkgs.length, " packages)"] }), _jsx("span", { className: "text-[10px] text-slate-500", children: "Substrate Tier" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: layerPkgs.map((pkg) => {
                                            const isSelected = pkg.id === selectedNodeId;
                                            return (_jsxs("div", { onClick: () => setSelectedNodeId(pkg.id), className: `p-3.5 rounded-xl border cursor-pointer transition-all duration-200 space-y-2 ${isSelected
                                                    ? `${pkg.color} ring-2 ring-cyan-400/50 shadow-lg scale-[1.01]`
                                                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "font-bold text-xs flex items-center space-x-1.5", children: [_jsx(Box, { className: "h-3.5 w-3.5 text-cyan-400" }), _jsx("span", { children: pkg.name })] }), _jsx(ArrowRight, { className: `h-3.5 w-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}` })] }), _jsx("div", { className: "text-[10px] text-slate-400 line-clamp-2", children: pkg.description }), _jsxs("div", { className: "flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 font-mono", children: [_jsxs("span", { children: ["Deps: ", pkg.dependencies.length] }), _jsxs("span", { children: ["Dependents: ", pkg.dependents.length] })] })] }, pkg.id));
                                        }) })] }, layerName));
                        }) }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-5 sticky top-6", children: [_jsx("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: _jsxs("div", { children: [_jsx("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30", children: selectedNode.layer }), _jsx("h3", { className: "font-bold text-base text-slate-100 mt-1", children: selectedNode.id })] }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[11px] text-slate-400", children: "Description:" }), _jsx("p", { className: "text-xs text-slate-200 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800", children: selectedNode.description })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("span", { className: "text-[11px] text-slate-400", children: "Build Target:" }), _jsx("div", { className: "text-xs text-cyan-300 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 truncate", children: selectedNode.buildTarget })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("span", { className: "text-[11px] text-slate-400 font-bold", children: ["Direct Dependencies (", selectedNode.dependencies.length, "):"] }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedNode.dependencies.length === 0 ? (_jsx("span", { className: "text-xs text-slate-500 italic", children: "None (Root Substrate)" })) : (selectedNode.dependencies.map((dep, idx) => (_jsx("span", { onClick: () => setSelectedNodeId(dep), className: "text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800 cursor-pointer transition-colors", children: dep }, idx)))) })] }), _jsxs("div", { className: "space-y-2 pt-2 border-t border-slate-800", children: [_jsxs("span", { className: "text-[11px] text-slate-400 font-bold", children: ["Consumers & Dependents (", selectedNode.dependents.length, "):"] }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedNode.dependents.length === 0 ? (_jsx("span", { className: "text-xs text-slate-500 italic", children: "None (Top Application Target)" })) : (selectedNode.dependents.map((dep, idx) => (_jsx("span", { onClick: () => setSelectedNodeId(dep), className: "text-[11px] bg-slate-950 hover:bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-800 cursor-pointer transition-colors", children: dep }, idx)))) })] })] }) })] })] }));
};
//# sourceMappingURL=RepositoryDependencyGraph.js.map