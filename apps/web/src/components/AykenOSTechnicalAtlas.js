import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Cpu, ShieldCheck, Layers, Eye, CheckCircle2 } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';
import { resolveCatalogWithSnapshot } from '../aykenosCatalog';
export const AykenOSTechnicalAtlas = () => {
    const { snapshot, sourceMode } = useSnapshotContext();
    const [filterStatus, setFilterStatus] = useState('ALL');
    const resolvedCatalog = resolveCatalogWithSnapshot(snapshot);
    const filteredCatalog = resolvedCatalog.filter((item) => {
        if (filterStatus === 'ALL')
            return true;
        return item.status === filterStatus;
    });
    const getStatusBadge = (status) => {
        switch (status) {
            case 'VERIFIED_IMPLEMENTATION':
                return (_jsxs("span", { className: "flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30", children: [_jsx(CheckCircle2, { className: "h-3 w-3" }), _jsx("span", { children: "VERIFIED IMPLEMENTATION" })] }));
            case 'BOUNDED':
                return (_jsxs("span", { className: "flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30", children: [_jsx(Layers, { className: "h-3 w-3" }), _jsx("span", { children: "BOUNDED AUTHORITY" })] }));
            case 'GOVERNANCE_ONLY':
                return (_jsxs("span", { className: "flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30", children: [_jsx(ShieldCheck, { className: "h-3 w-3" }), _jsx("span", { children: "GOVERNANCE CONTRACT" })] }));
            case 'VISION_NOT_VERIFIED':
                return (_jsxs("span", { className: "flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30", children: [_jsx(Eye, { className: "h-3 w-3" }), _jsx("span", { children: "VISION \u2014 NOT VERIFIED" })] }));
        }
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Cpu, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "AykenOS Technical Systems Atlas" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "4-State classification matching verified implementations, bounded runtimes, governance contracts, and future spatial vision." })] }), _jsx("div", { className: "flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs", children: ['ALL', 'VERIFIED_IMPLEMENTATION', 'BOUNDED', 'GOVERNANCE_ONLY', 'VISION_NOT_VERIFIED'].map((st) => (_jsx("button", { onClick: () => setFilterStatus(st), className: `px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${filterStatus === st
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'text-slate-400 hover:text-slate-200'}`, children: st === 'ALL' ? 'ALL SYSTEMS' : st.replace('_', ' ') }, st))) })] }), _jsxs("div", { className: "p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(ShieldCheck, { className: "h-5 w-5 text-cyan-400 flex-shrink-0" }), _jsxs("span", { className: "text-slate-300", children: ["Active Snapshot Source: ", _jsx("strong", { className: "text-cyan-400", children: sourceMode.toUpperCase() }), " \u2014 Matching candidate paths against ", snapshot?.files.length || 0, " repository files."] })] }), _jsxs("span", { className: "text-[11px] text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800", children: ["Catalog Total: ", _jsxs("strong", { children: [resolvedCatalog.length, " Systems"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredCatalog.map((item) => {
                    const hasEvidence = item.matchedPaths && item.matchedPaths.length > 0;
                    return (_jsxs("div", { className: "glass-panel p-5 border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-sm text-slate-100", children: item.nameTr }), _jsx("div", { className: "text-[11px] text-slate-400", children: item.nameEn })] }), getStatusBadge(item.status)] }), _jsx("p", { className: "text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800", children: item.summaryTr }), _jsx("div", { className: "text-[11px] text-slate-400 leading-relaxed", children: item.techDetailEn }), _jsxs("div", { className: "space-y-1.5 pt-2 border-t border-slate-800/80", children: [_jsx("span", { className: "text-[10px] text-slate-500 uppercase tracking-wider font-bold", children: "Candidate Code Paths:" }), _jsx("div", { className: "space-y-1", children: item.candidatePaths.map((cp, idx) => {
                                                    const isMatched = item.matchedPaths?.includes(cp);
                                                    return (_jsxs("div", { className: `text-[10px] font-mono px-2.5 py-1 rounded border flex items-center justify-between ${isMatched
                                                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-bold'
                                                            : 'bg-slate-950 text-slate-400 border-slate-800'}`, children: [_jsx("span", { className: "truncate", children: cp }), isMatched ? (_jsx("span", { className: "text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded", children: "MATCHED" })) : (_jsx("span", { className: "text-[9px] text-slate-600", children: "UNMATCHED" }))] }, idx));
                                                }) })] })] }), _jsx("div", { className: "pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400", children: _jsx("div", { className: "flex flex-wrap gap-1", children: item.concepts.map((c, idx) => (_jsxs("span", { className: "bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-cyan-300", children: ["#", c] }, idx))) }) })] }, item.id));
                }) })] }));
};
//# sourceMappingURL=AykenOSTechnicalAtlas.js.map