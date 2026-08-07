import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck, Cpu, Terminal, Layers, AlertTriangle, Lock, ArrowRight, User } from 'lucide-react';
export const OverviewDashboard = ({ currentPhase, headSha, payloadDigest, onSelectComponent, }) => {
    const categories = [
        {
            title: 'Boot & Platform Startup',
            codeRef: 'bootloader/, tools/gnu-efi',
            status: 'OPERATIONAL',
            badgeClass: 'status-badge-operational',
            desc: 'UEFI initialization, kernel ELF loader, memory map transfer, initial page tables.',
            componentId: 'bootloader',
            paths: ['bootloader/efi_main.c'],
        },
        {
            title: 'Ring0 Kernel Core',
            codeRef: 'kernel/ (arch, mm, proc, sched, sys)',
            status: 'OPERATIONAL',
            badgeClass: 'status-badge-operational',
            desc: 'Minimal mechanism kernel. Architecture init, memory manager, process context & ring3 jump.',
            componentId: 'kernel-core',
            paths: ['kernel/kernel.c', 'kernel/mm/page_alloc.c'],
        },
        {
            title: 'ABI & Syscall Boundary',
            codeRef: 'shared/abi, kernel/sys',
            status: 'FROZEN CONTRACT',
            badgeClass: 'status-badge-frozen',
            desc: 'Shared Syscall ABI. Immutable syscall table numbers and anatomical headers.',
            componentId: 'syscall-abi',
            paths: ['shared/abi/syscalls.h'],
        },
        {
            title: 'Ring3 Policy Runtime',
            codeRef: 'userspace/ (semantic-cli, runtimes)',
            status: 'BOUNDED AUTHORITY',
            badgeClass: 'status-badge-bounded',
            desc: 'Userspace policy interface. Includes Semantic CLI and minimal round-trip binaries.',
            componentId: 'semantic-cli',
            paths: ['userspace/semantic-cli/src/main.rs'],
        },
        {
            title: 'Data & Execution Substrate',
            codeRef: 'ayken-core/crates/ (abdf, bcib)',
            status: 'OPERATIONAL SUBSTRATE',
            badgeClass: 'status-badge-operational',
            desc: 'Typed ABDF binary data format and deterministic BCIB binary instruction representation.',
            componentId: 'abdf-substrate',
            paths: ['ayken-core/crates/abdf/src/lib.rs', 'ayken-core/crates/bcib/src/lib.rs'],
        },
        {
            title: 'Verification & Evidence',
            codeRef: 'proofd, proof-verifier, tools/verification',
            status: 'GOVERNANCE BOUNDARY',
            badgeClass: 'status-badge-governance',
            desc: 'Evidence candidates, exact-subject binding, validator outputs vs accepted-evidence boundaries.',
            componentId: 'proofd-service',
            paths: ['proofd/src/main.rs', 'tools/verification/proof_verifier.py'],
        },
        {
            title: 'Tooling & CI Infrastructure',
            codeRef: 'tools/, .github/workflows',
            status: 'ACTIVE GATES',
            badgeClass: 'status-badge-operational',
            desc: '20+ workflow CI gates categorized into Architecture, Runtime, Contract, Evidence, and Governance families.',
            componentId: 'ci-gates',
            paths: ['.github/workflows/ci-freeze.yml'],
        },
        {
            title: 'Constitutional Governance',
            codeRef: 'docs/roadmap/CURRENT_PHASE',
            status: 'PHASE-24 ACTIVE',
            badgeClass: 'status-badge-governance',
            desc: 'Phase-24 accepted-evidence planning, exact-subject expectation, zero downstream authority creation.',
            componentId: 'phase-governance',
            paths: ['docs/roadmap/CURRENT_PHASE'],
        },
    ];
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "glass-panel p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950/90 border-cyan-500/30", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-2", children: [_jsx("span", { className: "text-2xl font-bold text-slate-100", children: "AykenOS System Status" }), _jsxs("span", { className: "px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30", children: ["ACTIVE PHASE: Phase-", currentPhase] }), _jsxs("span", { className: "px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1", children: [_jsx(User, { className: "h-3.5 w-3.5 text-indigo-400" }), _jsx("span", { children: "Mimar & Geli\u015Ftiren: Kenan AY" })] })] }), _jsxs("p", { className: "text-sm text-slate-300 max-w-3xl leading-relaxed", children: ["AykenOS is an execution-centric operating system architecture separating minimal Ring0 mechanisms from Ring3 policies. Designed & Developed by ", _jsx("strong", { children: "Kenan AY" }), ". Operating under Phase-24 exact-subject evidence planning and accepted-evidence boundary specifications."] })] }), _jsxs("div", { className: "text-right text-xs font-mono space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800", children: [_jsx("div", { className: "text-slate-400", children: "Deterministic Digest" }), _jsxs("div", { className: "text-cyan-400 font-semibold", children: [payloadDigest.slice(0, 16), "..."] }), _jsx("div", { className: "text-slate-500 text-[10px]", children: "SHA-256 Payload Hash" })] })] }), _jsxs("div", { className: "mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-amber-400 flex-shrink-0" }), _jsxs("span", { children: [_jsx("strong", { children: "Phase-24 Authority Notice:" }), " Code existence in Ring3 (Semantic CLI, AI Runtime, Admission Receipts) does NOT grant runtime execution authority or create accepted evidence without explicit exact-subject governance approval."] })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center", children: _jsx(Cpu, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Ring0 Kernel" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Operational" }), _jsx("div", { className: "text-[11px] text-emerald-400 font-mono", children: "Mechanism Core" })] })] }), _jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center", children: _jsx(Lock, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Syscall ABI" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Frozen" }), _jsx("div", { className: "text-[11px] text-amber-400 font-mono", children: "shared/abi" })] })] }), _jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center", children: _jsx(Terminal, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Ring3 Policy" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Bounded" }), _jsx("div", { className: "text-[11px] text-indigo-400 font-mono", children: "Semantic CLI" })] })] }), _jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Evidence Status" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Exact-Subject" }), _jsx("div", { className: "text-[11px] text-cyan-400 font-mono", children: "Phase-24 Plan" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h2", { className: "text-lg font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Layers, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "AykenOS Substrate Architecture Components" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: categories.map((cat, idx) => (_jsxs("div", { onClick: () => onSelectComponent(cat), className: "glass-panel p-5 cursor-pointer hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("h3", { className: "font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors", children: cat.title }), _jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold ${cat.badgeClass}`, children: cat.status })] }), _jsx("div", { className: "text-[11px] font-mono text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 truncate", children: cat.codeRef }), _jsx("p", { className: "text-xs text-slate-400 leading-relaxed", children: cat.desc })] }), _jsxs("div", { className: "pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors", children: [_jsx("span", { children: "Inspect Component Source" }), _jsx(ArrowRight, { className: "h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" })] })] }, idx))) })] })] }));
};
//# sourceMappingURL=OverviewDashboard.js.map