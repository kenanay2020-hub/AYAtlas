import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronRight, Home } from 'lucide-react';
export const TAB_MAP = {
    overview: { group: 'OBSERVE', label: 'Atlas Overview' },
    health: { group: 'OBSERVE', label: 'Health & Trust' },
    timeline: { group: 'OBSERVE', label: 'Evolution Timeline' },
    'technical-atlas': { group: 'EXPLORE', label: 'AykenOS Technical Atlas' },
    'execution-flow': { group: 'EXPLORE', label: 'Execution Flow Canvas' },
    'repo-deps': { group: 'EXPLORE', label: 'Monorepo Topology' },
    architecture: { group: 'EXPLORE', label: 'Architecture Map' },
    graph: { group: 'EXPLORE', label: 'Governance Graph' },
    phases: { group: 'EXPLORE', label: 'Phase Catalog' },
    evidence: { group: 'EXPLORE', label: 'Evidence Boundary' },
    'snapshot-diff': { group: 'ANALYZE', label: 'Snapshot Diff' },
    'ci-verifier': { group: 'ANALYZE', label: 'CI Verifier Gates' },
    query: { group: 'ANALYZE', label: 'Constitutional Query' },
    drift: { group: 'ANALYZE', label: 'Drift & Contradiction' },
    'repo-intel': { group: 'ANALYZE', label: 'Repo Intelligence' },
    learning: { group: 'LEARN & PLAN', label: 'Learning Center' },
    roadmaps: { group: 'LEARN & PLAN', label: 'Roadmaps' },
};
export const BreadcrumbNav = ({ activeTab }) => {
    const meta = TAB_MAP[activeTab] || { group: 'ATLAS', label: 'Overview' };
    return (_jsxs("nav", { className: "flex items-center space-x-2 text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/60 mb-4 overflow-x-auto", children: [_jsxs("div", { className: "flex items-center space-x-1 hover:text-slate-200 transition-colors", children: [_jsx(Home, { className: "h-3.5 w-3.5 text-cyan-400" }), _jsx("span", { children: "AykenOS" })] }), _jsx(ChevronRight, { className: "h-3.5 w-3.5 text-slate-600 flex-shrink-0" }), _jsx("span", { className: "text-slate-400 font-semibold", children: meta.group }), _jsx(ChevronRight, { className: "h-3.5 w-3.5 text-slate-600 flex-shrink-0" }), _jsx("span", { className: "text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800", children: meta.label })] }));
};
//# sourceMappingURL=BreadcrumbNav.js.map