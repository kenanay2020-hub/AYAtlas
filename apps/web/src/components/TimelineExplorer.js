import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { History, ArrowRight } from 'lucide-react';
export const TimelineExplorer = ({ headSha }) => {
    const timelineEvents = [
        {
            phase: 'Phase-24',
            title: 'Exact-Subject Evidence Planning',
            status: 'ACTIVE & RATIFIED',
            changes: [
                'Added Invariant: Validator Output PASS != Accepted Evidence',
                'Frozen Syscall ABI boundary maintained (zero ABI modifications allowed)',
                'Expanded proofd exact-subject SHA binding rules',
                'Bounded Semantic CLI execution scope under Ring3 userspace',
            ],
            commitSha: headSha.slice(0, 8),
            date: '2026-08-06',
        },
        {
            phase: 'Phase-23',
            title: 'BCIB Substrate & Syscall ABI Freeze',
            status: 'COMPLETED & FROZEN',
            changes: [
                'Frozen Ring0 kernel syscall table (`shared/abi/syscall_nums.h`)',
                'Implemented BCIB substrate typed memory layout',
                'Ratified Non-Intervention & Isolation Policy',
            ],
            commitSha: '4fa9c813',
            date: '2026-07-15',
        },
        {
            phase: 'Phase-22',
            title: 'Evidence Verification Subsystem',
            status: 'COMPLETED',
            changes: [
                'Created proofd verification engine',
                'Established 8-Stage Sequential Evidence Verification Chain',
            ],
            commitSha: '9c8a7b6a',
            date: '2026-06-01',
        },
    ];
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(History, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Architecture Evolution Timeline & Memory" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Historical trace of AykenOS invariant additions, capability deprecations, ABI freezes, and evidence boundary expansions." })] }), _jsxs("div", { className: "flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono", children: [_jsx("span", { className: "text-slate-400", children: "Timeline Range:" }), _jsx("span", { className: "text-cyan-400 font-bold", children: "Phase-0 $\\rightarrow$ Phase-24" })] })] }), _jsx("div", { className: "space-y-6 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800", children: timelineEvents.map((event, idx) => (_jsxs("div", { className: "relative pl-12 space-y-3", children: [_jsx("div", { className: "absolute left-3.5 top-1.5 h-5 w-5 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center -translate-x-1/2", children: _jsx("div", { className: "h-2 w-2 rounded-full bg-cyan-400" }) }), _jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-4 hover:border-cyan-500/40 transition-all", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [_jsxs("div", { className: "flex items-center space-x-3 font-mono text-xs", children: [_jsx("span", { className: "px-3 py-1 rounded-full font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30", children: event.phase }), _jsx("span", { className: "text-slate-100 font-bold text-sm", children: event.title })] }), _jsxs("div", { className: "flex items-center space-x-3 text-xs font-mono", children: [_jsx("span", { className: "text-slate-500", children: event.date }), _jsx("span", { className: "px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30", children: event.status })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider", children: "Architectural & Invariant Changes:" }), _jsx("div", { className: "space-y-1.5", children: event.changes.map((change, cIdx) => (_jsxs("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center space-x-2", children: [_jsx(ArrowRight, { className: "h-3.5 w-3.5 text-cyan-400 flex-shrink-0" }), _jsx("span", { children: change })] }, cIdx))) })] }), _jsxs("div", { className: "flex items-center justify-between pt-2 text-[11px] font-mono text-slate-500", children: [_jsxs("span", { children: ["Locked Commit: ", _jsx("strong", { className: "text-indigo-400", children: event.commitSha })] }), _jsx("span", { children: "Ratified Governance Record" })] })] })] }, idx))) })] }));
};
//# sourceMappingURL=TimelineExplorer.js.map