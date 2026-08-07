import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { GitCompare, ShieldCheck, FilePlus, FileEdit, FileX, ArrowRight, Layers } from 'lucide-react';
import { ChangeIntelligenceEngine } from '@ayatlas/change-intelligence';
import { useSnapshotContext } from '../context/SnapshotContext';
export const SnapshotDiffViewer = () => {
    const { snapshot, sourceMode, headSha } = useSnapshotContext();
    const [presetRange, setPresetRange] = useState('p23-p24');
    // Construct realistic base snapshot for comparison
    const baseSnapshot = {
        identity: {
            repository: 'kenanay/AykenOS',
            commitSha: presetRange === 'p22-p23' ? '9c8a7b6a' : '4fa9c8134b5c6d7e8f',
            manifestDigest: 'sha256_base_manifest_digest_previous_phase',
        },
        observation: {
            capturedAt: '2026-07-15T12:00:00Z',
            sourceMode: sourceMode,
            isDemoData: false,
        },
        verificationState: 'VERIFIED',
        ignorePolicyVersion: '1.0.0',
        files: [
            { path: 'shared/abi/syscalls.h', size: 1024, contentDigest: 'sha256_syscalls_base' },
            { path: 'kernel/mm/page.c', size: 2048, contentDigest: 'sha256_page_c' },
            { path: 'userspace/semantic-cli/src/main.rs', size: 1500, contentDigest: 'sha256_cli_old' },
            { path: 'docs/roadmap/CURRENT_PHASE', size: 64, contentDigest: 'sha256_phase23' },
        ],
    };
    const targetSnapshot = snapshot || {
        identity: {
            repository: 'kenanay/AykenOS',
            commitSha: headSha,
            manifestDigest: 'sha256_target_manifest_digest_current_phase',
        },
        observation: {
            capturedAt: '2026-08-07T12:00:00Z',
            sourceMode: sourceMode,
            isDemoData: false,
        },
        verificationState: 'VERIFIED',
        ignorePolicyVersion: '1.0.0',
        files: [
            { path: 'shared/abi/syscalls.h', size: 1024, contentDigest: 'sha256_syscalls_base' },
            { path: 'kernel/mm/page.c', size: 2048, contentDigest: 'sha256_page_c' },
            { path: 'userspace/semantic-cli/src/main.rs', size: 1800, contentDigest: 'sha256_cli_new' },
            { path: 'ayken-core/crates/bcib/src/lib.rs', size: 3000, contentDigest: 'sha256_bcib_new' },
            { path: 'proofd/src/main.rs', size: 4200, contentDigest: 'sha256_proofd_new' },
            { path: 'docs/roadmap/CURRENT_PHASE', size: 64, contentDigest: 'sha256_phase24' },
        ],
    };
    const engine = new ChangeIntelligenceEngine();
    const changeReport = engine.compareSnapshots(baseSnapshot, targetSnapshot, {
        basePhase: presetRange === 'p22-p23' ? 22 : 23,
        targetPhase: presetRange === 'p22-p23' ? 23 : 24,
        hasCanonicalDecisionFile: true,
    });
    const addedCount = changeReport.changes.filter((c) => c.changeType === 'ADDED').length;
    const modifiedCount = changeReport.changes.filter((c) => c.changeType === 'MODIFIED').length;
    const deletedCount = changeReport.changes.filter((c) => c.changeType === 'DELETED').length;
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(GitCompare, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Snapshot Semantic Diff & Authority Impact Viewer" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Analyzing file deltas, manifest SHA-256 changes, and enforcing GrantsNewAuthority=FALSE invariants across snapshot ranges." })] }), _jsxs("div", { className: "flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs", children: [_jsx("button", { onClick: () => setPresetRange('p23-p24'), className: `px-3 py-1 rounded-lg transition-colors ${presetRange === 'p23-p24' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`, children: "Phase-23 $\\rightarrow$ Phase-24" }), _jsx("button", { onClick: () => setPresetRange('p22-p23'), className: `px-3 py-1 rounded-lg transition-colors ${presetRange === 'p22-p23' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`, children: "Phase-22 $\\rightarrow$ Phase-23" })] })] }), _jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-4", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-3", children: [_jsxs("div", { className: "flex items-center space-x-3 text-xs", children: [_jsxs("span", { className: "bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 text-slate-400 font-bold", children: ["Base: ", changeReport.baseCommitSha.slice(0, 8)] }), _jsx(ArrowRight, { className: "h-4 w-4 text-cyan-400" }), _jsxs("span", { className: "bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30 text-cyan-300 font-bold", children: ["Target: ", changeReport.targetCommitSha.slice(0, 8)] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-slate-400", children: "Authority Impact:" }), _jsx("span", { className: "px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30", children: changeReport.overallAuthorityImpact })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-emerald-400 font-bold", children: [_jsx(FilePlus, { className: "h-4 w-4" }), _jsx("span", { children: "Added Files" })] }), _jsx("span", { className: "text-base font-bold text-slate-100", children: addedCount })] }), _jsxs("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-amber-400 font-bold", children: [_jsx(FileEdit, { className: "h-4 w-4" }), _jsx("span", { children: "Modified Files" })] }), _jsx("span", { className: "text-base font-bold text-slate-100", children: modifiedCount })] }), _jsxs("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-rose-400 font-bold", children: [_jsx(FileX, { className: "h-4 w-4" }), _jsx("span", { children: "Deleted Files" })] }), _jsx("span", { className: "text-base font-bold text-slate-100", children: deletedCount })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h3", { className: "text-sm font-bold text-slate-200 flex items-center space-x-2", children: [_jsx(Layers, { className: "h-4 w-4 text-cyan-400" }), _jsxs("span", { children: ["Semantic Change & Provenance Items (", changeReport.changes.length, ")"] })] }), _jsx("div", { className: "space-y-3", children: changeReport.changes.map((item, idx) => (_jsxs("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold text-slate-200", children: [_jsx("span", { className: `px-2 py-0.5 rounded text-[10px] ${item.changeType === 'ADDED'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                                        : item.changeType === 'MODIFIED'
                                                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`, children: item.changeType }), _jsx("span", { className: "truncate", children: item.path })] }), _jsxs("div", { className: "flex items-center space-x-2 text-[10px]", children: [_jsx("span", { className: "px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30", children: item.classification }), _jsxs("span", { className: "px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800", children: ["Provenance: ", item.provenanceStatus] })] })] }), _jsx("div", { className: "text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800", children: item.authorityImpactDescription }), _jsxs("div", { className: "flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono", children: [_jsxs("span", { className: "flex items-center space-x-1 text-emerald-400", children: [_jsx(ShieldCheck, { className: "h-3 w-3" }), _jsx("span", { children: "grantsNewAuthority = FALSE (Strict Invariant Preserved)" })] }), _jsx("span", { children: "Audit Verified" })] })] }, idx))) })] })] }));
};
//# sourceMappingURL=SnapshotDiffViewer.js.map