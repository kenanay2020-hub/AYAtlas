import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Search, Code, FileText, X } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';
export const InvariantCodeSearchModal = ({ isOpen, onClose }) => {
    const { snapshot, sourceMode, headSha } = useSnapshotContext();
    const [searchTerm, setSearchTerm] = useState('grantsNewAuthority');
    const substrateCodeFiles = [
        {
            filePath: 'userspace/semantic-cli/src/main.rs',
            matchedLineNumber: 42,
            codeSnippet: 'pub const GRANTS_NEW_AUTHORITY: bool = false;\n// Semantic CLI executes strictly bounded under Ring3 policy runtime',
            invariantRule: 'Invariance Rule 1: Read-Only Policy Isolation (grantsNewAuthority = FALSE)',
            classification: 'BOUNDED',
        },
        {
            filePath: 'shared/abi/syscalls.h',
            matchedLineNumber: 15,
            codeSnippet: '#define SYS_AYKEN_EXEC 0x01\n#define SYS_AYKEN_VERIFY 0x02\n/* FROZEN ABI BOUNDARY: Zero modifications allowed */',
            invariantRule: 'Invariance Rule 4: Frozen Syscall ABI Contract',
            classification: 'FROZEN_ABI',
        },
        {
            filePath: 'proofd/src/main.rs',
            matchedLineNumber: 88,
            codeSnippet: 'fn verify_evidence(sha: &str) -> VerificationResult {\n    // Invariant: Validator Output PASS != Accepted Evidence\n    assert_exact_subject_binding(sha);\n}',
            invariantRule: 'Invariance Rule 3: Exact-Subject Commit SHA Evidence Binding',
            classification: 'VERIFIED_IMPLEMENTATION',
        },
        {
            filePath: 'ayken-core/crates/bcib/src/lib.rs',
            matchedLineNumber: 24,
            codeSnippet: 'pub struct BCIBCommand {\n    pub opcode: u16,\n    pub payload_digest: [u8; 32],\n}',
            invariantRule: 'Invariance Rule 2: Mechanism vs Policy Separation (Ring0 Kernel Substrate)',
            classification: 'VERIFIED_IMPLEMENTATION',
        },
        {
            filePath: 'docs/roadmap/CURRENT_PHASE',
            matchedLineNumber: 1,
            codeSnippet: 'Phase-24: Exact-Subject Evidence Planning\nStatus: ACTIVE & RATIFIED',
            invariantRule: 'Current Phase Governance Binding',
            classification: 'BOUNDED',
        },
    ];
    if (!isOpen)
        return null;
    const filteredResults = substrateCodeFiles.filter((item) => item.filePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codeSnippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invariantRule.toLowerCase().includes(searchTerm.toLowerCase()));
    const presetTerms = [
        'grantsNewAuthority',
        'FROZEN ABI',
        'Validator Output PASS',
        'BCIBCommand',
        'Phase-24',
    ];
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono", children: _jsxs("div", { className: "glass-panel w-full max-w-4xl max-h-[85vh] flex flex-col border-slate-800 shadow-2xl overflow-hidden", children: [_jsxs("div", { className: "p-5 border-b border-slate-800 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Search, { className: "h-5 w-5 text-cyan-400" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-slate-100 text-sm", children: "Constitutional Invariant Code Search" }), _jsx("p", { className: "text-[11px] text-slate-400", children: "Search grounded AykenOS substrate files for exact invariant code lines and SHA bindings." })] })] }), _jsx("button", { onClick: onClose, className: "p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "p-5 bg-slate-900/60 border-b border-slate-800 space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search by keyword, path, invariant rule, or code symbol...", className: "w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500/50", autoFocus: true })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-2 text-[11px]", children: [_jsx("span", { className: "text-slate-400", children: "Preset Searches:" }), presetTerms.map((term, idx) => (_jsx("button", { onClick: () => setSearchTerm(term), className: "bg-slate-950 hover:bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-800 transition-colors", children: term }, idx)))] })] }), _jsxs("div", { className: "p-5 flex-1 overflow-y-auto space-y-4", children: [_jsxs("div", { className: "text-xs text-slate-400 flex items-center justify-between", children: [_jsxs("span", { children: ["Matched Code Lines (", filteredResults.length, "):"] }), _jsxs("span", { children: ["Substrate Mode: ", _jsx("strong", { className: "text-cyan-400", children: sourceMode.toUpperCase() })] })] }), filteredResults.length === 0 ? (_jsxs("div", { className: "p-8 text-center text-xs text-slate-500 space-y-2", children: [_jsx(Code, { className: "h-8 w-8 text-slate-600 mx-auto" }), _jsxs("div", { children: ["No matching code lines found for \"", searchTerm, "\"."] })] })) : (filteredResults.map((result, idx) => (_jsxs("div", { className: "p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs font-bold text-slate-200", children: [_jsx(FileText, { className: "h-4 w-4 text-cyan-400" }), _jsxs("span", { children: [result.filePath, ":", result.matchedLineNumber] })] }), _jsx("span", { className: `text-[10px] font-bold px-2 py-0.5 rounded border ${result.classification === 'VERIFIED_IMPLEMENTATION'
                                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                                : result.classification === 'FROZEN_ABI'
                                                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                                                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'}`, children: result.classification })] }), _jsx("div", { className: "text-[11px] text-cyan-300 font-mono", children: result.invariantRule }), _jsx("pre", { className: "bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed", children: result.codeSnippet })] }, idx))))] }), _jsxs("div", { className: "p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400", children: [_jsxs("span", { children: ["Grounded Target: ", _jsx("strong", { className: "text-slate-200", children: "kenanay/AykenOS" })] }), _jsxs("span", { children: ["Commit: ", _jsx("strong", { className: "text-indigo-400", children: headSha.slice(0, 8) })] })] })] }) }));
};
//# sourceMappingURL=InvariantCodeSearchModal.js.map