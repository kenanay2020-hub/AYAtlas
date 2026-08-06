import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layers, ArrowRight } from 'lucide-react';
export const ArchitectureExplorer = ({ onSelectComponent }) => {
    const layers = [
        {
            ring: 'User / Intent Interface',
            name: 'User Intent & CLI Layer',
            color: 'border-cyan-500/40 bg-cyan-500/5',
            components: [
                { id: 'semantic-cli', label: 'Semantic CLI', path: 'userspace/semantic-cli', status: 'IMPLEMENTED / BOUNDED' },
                { id: 'obs-cli', label: 'OBS CLI', path: 'userspace/obs-cli', status: 'IMPLEMENTED / BOUNDED' },
            ],
        },
        {
            ring: 'Ring3 Policy Runtime',
            name: 'Ring3 Execution & Policy Runtime',
            color: 'border-indigo-500/40 bg-indigo-500/5',
            components: [
                { id: 'ai-runtime', label: 'AI Runtime', path: 'userspace/ai-runtime', status: 'BOUNDED / NO AI AUTHORITY' },
                { id: 'bcib-runtime', label: 'BCIB Runtime', path: 'userspace/bcib-runtime', status: 'IMPLEMENTED' },
                { id: 'dsl-parser', label: 'DSL Parser', path: 'userspace/dsl-parser', status: 'IMPLEMENTED' },
                { id: 'proofd', label: 'proofd Service', path: 'userspace/proofd', status: 'OPERATIONAL' },
                { id: 'libayken', label: 'libayken', path: 'userspace/libayken', status: 'OPERATIONAL' },
            ],
        },
        {
            ring: 'Data & Execution Substrate',
            name: 'Substrate Layer (ayken-core)',
            color: 'border-purple-500/40 bg-purple-500/5',
            components: [
                { id: 'abdf', label: 'ABDF Binary Format', path: 'ayken-core/crates/abdf', status: 'OPERATIONAL' },
                { id: 'bcib', label: 'BCIB Instruction IR', path: 'ayken-core/crates/bcib', status: 'OPERATIONAL' },
                { id: 'proof-verifier', label: 'proof-verifier', path: 'ayken-core/crates/proof-verifier', status: 'OPERATIONAL' },
            ],
        },
        {
            ring: 'ABI & Syscall Boundary',
            name: 'Frozen Syscall ABI Contract',
            color: 'border-rose-500/60 bg-rose-500/10',
            isBoundary: true,
            components: [
                { id: 'syscall-abi', label: 'Syscall ABI Boundary', path: 'shared/abi', status: 'FROZEN ANATOMICAL CONTRACT' },
            ],
        },
        {
            ring: 'Ring0 Mechanism Kernel',
            name: 'Ring0 Minimal Mechanism Kernel',
            color: 'border-emerald-500/40 bg-emerald-500/5',
            components: [
                { id: 'kernel-mm', label: 'Memory Management (mm/)', path: 'kernel/mm', status: 'OPERATIONAL MECHANISM' },
                { id: 'kernel-proc', label: 'Process & Ring3 Jump (proc/)', path: 'kernel/proc', status: 'OPERATIONAL MECHANISM' },
                { id: 'kernel-sched', label: 'Scheduler Bridge (sched/)', path: 'kernel/sched', status: 'OPERATIONAL MECHANISM' },
                { id: 'kernel-sys', label: 'Syscall Entry Gateway (sys/)', path: 'kernel/sys', status: 'OPERATIONAL MECHANISM' },
            ],
        },
        {
            ring: 'Boot & Hardware',
            name: 'Platform Initialization',
            color: 'border-slate-700 bg-slate-900/50',
            components: [
                { id: 'bootloader', label: 'UEFI Bootloader', path: 'bootloader/', status: 'OPERATIONAL' },
                { id: 'gnu-efi', label: 'GNU-EFI Tooling', path: 'tools/gnu-efi', status: 'OPERATIONAL' },
            ],
        },
    ];
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Layers, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "AykenOS Layered Architecture Explorer" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Visualizing the strict separation between Ring3 policy runtimes and minimal Ring0 execution mechanism kernel." })] }), _jsxs("div", { className: "flex items-center space-x-4 text-xs font-mono", children: [_jsxs("span", { className: "flex items-center space-x-1 text-emerald-400", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400" }), _jsx("span", { children: "Operational" })] }), _jsxs("span", { className: "flex items-center space-x-1 text-amber-400", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-amber-400" }), _jsx("span", { children: "Bounded Authority" })] }), _jsxs("span", { className: "flex items-center space-x-1 text-rose-400", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-rose-400" }), _jsx("span", { children: "Frozen Boundary" })] })] })] }), _jsx("div", { className: "space-y-4", children: layers.map((layer, idx) => (_jsxs("div", { className: `p-5 rounded-xl border ${layer.color} transition-all duration-300 relative`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold", children: layer.ring }), _jsx("span", { className: "text-sm font-bold text-slate-200", children: layer.name })] }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: layer.components.map((comp) => (_jsxs("div", { onClick: () => onSelectComponent({
                                    id: comp.id,
                                    label: comp.label,
                                    category: layer.ring,
                                    description: `System component ${comp.label} located in ${comp.path}`,
                                    paths: [comp.path],
                                    status: comp.status,
                                }), className: "bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-lg cursor-pointer transition-all duration-200 group", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "font-semibold text-xs text-slate-100 group-hover:text-cyan-300", children: comp.label }), _jsx(ArrowRight, { className: "h-3 w-3 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" })] }), _jsx("div", { className: "text-[11px] font-mono text-slate-400", children: comp.path }), _jsx("div", { className: "mt-2 text-[10px] font-mono text-cyan-400/90", children: comp.status })] }, comp.id))) })] }, idx))) })] }));
};
//# sourceMappingURL=ArchitectureExplorer.js.map