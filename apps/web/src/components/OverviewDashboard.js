import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck, Cpu, Terminal, Layers, AlertTriangle, Activity, ArrowRight } from 'lucide-react';
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
            badgeClass: 'status-badge-operational',
            desc: 'Frozen constitutional interface contract between Ring0 mechanism and Ring3 policy.',
            componentId: 'syscall-abi',
            paths: ['shared/abi/syscall_nums.h'],
        },
        {
            title: 'Ring3 Userspace Policy',
            codeRef: 'userspace/ (minimal, semantic-cli)',
            status: 'IMPLEMENTED / BOUNDED',
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
    return (_jsxs("div", { className: "space-[#space] p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "glass-panel p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950/90 border-cyan-500/30", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("span", { className: "text-2xl font-bold text-slate-100", children: "AykenOS System Status" }), _jsxs("span", { className: "px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30", children: ["ACTIVE PHASE: Phase-", currentPhase] })] }), _jsx("p", { className: "text-sm text-slate-300 max-w-3xl leading-relaxed", children: "AykenOS is an execution-centric operating system architecture separating minimal Ring0 mechanisms from Ring3 policies. Currently operating under Phase-24 exact-subject evidence planning and accepted-evidence boundary specifications." })] }), _jsxs("div", { className: "text-right text-xs font-mono space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800", children: [_jsx("div", { className: "text-slate-400", children: "Deterministic Digest" }), _jsxs("div", { className: "text-cyan-400 font-semibold", children: [payloadDigest.slice(0, 16), "..."] }), _jsx("div", { className: "text-slate-500 text-[10px]", children: "SHA-256 Payload Hash" })] })] }), _jsxs("div", { className: "mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-amber-400 flex-shrink-0" }), _jsxs("span", { children: [_jsx("strong", { children: "Phase-24 Authority Notice:" }), " Code existence in Ring3 (Semantic CLI, AI Runtime, Admission Receipts) does NOT grant runtime execution authority or create accepted evidence without explicit exact-subject governance approval."] })] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center", children: _jsx(Cpu, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Ring0 Kernel" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Operational" }), _jsx("div", { className: "text-[11px] text-emerald-400 font-mono", children: "Mechanism Core" })] })] }), _jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center", children: _jsx(Terminal, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Ring3 Userspace" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Bounded" }), _jsx("div", { className: "text-[11px] text-amber-400 font-mono", children: "No General Authority" })] })] }), _jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center", children: _jsx(ShieldCheck, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "Syscall ABI" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "Frozen Contract" }), _jsx("div", { className: "text-[11px] text-cyan-400 font-mono", children: "Preserving Changes Only" })] })] }), _jsxs("div", { className: "glass-panel p-4 flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center", children: _jsx(Activity, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsx("div", { className: "text-xs text-slate-400 uppercase tracking-wider font-semibold", children: "CI Integrity" }), _jsx("div", { className: "text-lg font-bold text-slate-100", children: "20+ Workflows" }), _jsx("div", { className: "text-[11px] text-indigo-400 font-mono", children: "5 Gate Families" })] })] })] }), _jsxs("div", { children: [_jsxs("h2", { className: "text-base font-bold text-slate-200 mb-3 flex items-center space-x-2", children: [_jsx(Layers, { className: "h-4 w-4 text-cyan-400" }), _jsx("span", { children: "AykenOS System Categorization & Health Matrix" })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: categories.map((cat, idx) => (_jsxs("div", { onClick: () => onSelectComponent({
                                id: cat.componentId,
                                label: cat.title,
                                category: cat.codeRef,
                                description: cat.desc,
                                paths: cat.paths,
                                status: cat.status,
                            }), className: "glass-panel-hover p-4 cursor-pointer flex flex-col justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-semibold text-sm text-slate-100", children: cat.title }), _jsx("span", { className: cat.badgeClass, children: cat.status })] }), _jsx("div", { className: "text-xs font-mono text-cyan-400/80 mb-2", children: cat.codeRef }), _jsx("p", { className: "text-xs text-slate-400 leading-relaxed mb-3", children: cat.desc })] }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-500", children: [_jsx("span", { children: "View Component & Provenance" }), _jsx(ArrowRight, { className: "h-3.5 w-3.5 text-cyan-400" })] })] }, idx))) })] })] }));
};
//# sourceMappingURL=OverviewDashboard.js.map