import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Layers, FileText } from 'lucide-react';
import { CIVerifier } from '@ayatlas/ci-verifier';
import { useSnapshotContext } from '../context/SnapshotContext';
export const CIVerifierDashboard = () => {
    const { snapshot, sourceMode, headSha } = useSnapshotContext();
    const [report, setReport] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const runVerification = async () => {
        setIsVerifying(true);
        try {
            const verifier = new CIVerifier();
            const res = await verifier.verifyCommit(headSha, sourceMode);
            setReport(res);
        }
        catch (err) {
            console.error('CI Verification Error:', err);
        }
        finally {
            setIsVerifying(false);
        }
    };
    useEffect(() => {
        runVerification();
    }, [sourceMode, headSha]);
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(ShieldCheck, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Constitutional CI Verifier & Gate Inspector" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Automated verification engine validating 5 architecture gates, read-only safety, 5-stage pipeline determinism, and drift invariants." })] }), _jsxs("button", { onClick: runVerification, disabled: isVerifying, className: "px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-md disabled:opacity-50", children: [_jsx(RefreshCw, { className: `h-4 w-4 ${isVerifying ? 'animate-spin' : ''}` }), _jsx("span", { children: isVerifying ? 'VERIFYING GATES...' : 'RUN CI VERIFIER GATES' })] })] }), report && (_jsxs("div", { className: `p-6 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${report.overallPassed
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'}`, children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg ${report.overallPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`, children: report.overallPassed ? _jsx(CheckCircle2, { className: "h-6 w-6" }) : _jsx(AlertTriangle, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("h3", { className: "font-bold text-base text-slate-100", children: ["Overall Verification: ", report.overallPassed ? 'ALL GATES PASSED' : 'VERIFICATION FAILED'] }), _jsx("span", { className: "px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-cyan-300", children: report.sourceMode.toUpperCase() })] }), _jsxs("p", { className: "text-xs text-slate-400 mt-1", children: ["Audit Timestamp: ", report.verificationTimestamp, " | Commit: ", _jsx("strong", { className: "text-cyan-400", children: report.commitSha.slice(0, 8) })] })] })] }), _jsxs("div", { className: "text-right font-mono text-xs space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800", children: [_jsx("div", { className: "text-slate-400", children: "Gate Verification Score" }), _jsxs("div", { className: "text-emerald-400 font-bold text-sm", children: [report.gates.filter((g) => g.passed).length, " / ", report.gates.length, " Gates PASS"] })] })] })), report && (_jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-sm font-bold text-slate-200 flex items-center space-x-2", children: [_jsx(Layers, { className: "h-4 w-4 text-cyan-400" }), _jsx("span", { children: "Constitutional Verification Gates" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: report.gates.map((gate) => (_jsxs("div", { className: `glass-panel p-5 border-slate-800 flex flex-col justify-between space-y-3 ${gate.passed ? 'hover:border-emerald-500/40' : 'border-red-500/40 bg-red-500/5'}`, children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400", children: ["GATE 0", gate.gateNumber] }), _jsx("span", { className: `text-[10px] font-bold px-2.5 py-0.5 rounded border ${gate.passed
                                                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                                        : 'bg-red-500/10 text-red-400 border-red-500/30'}`, children: gate.passed ? 'PASS' : 'FAIL' })] }), _jsx("h4", { className: "font-bold text-xs text-slate-100", children: gate.gateName }), _jsx("p", { className: "text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800", children: gate.summary })] }), gate.details && gate.details.length > 0 && (_jsx("div", { className: "pt-2 border-t border-slate-800 text-[10px] text-slate-400 space-y-1", children: gate.details.slice(0, 2).map((d, dIdx) => (_jsx("div", { className: "truncate text-amber-300", children: d }, dIdx))) }))] }, gate.gateNumber))) })] })), report && (_jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-300 font-bold border-b border-slate-800 pb-3", children: [_jsx(FileText, { className: "h-4 w-4 text-cyan-400" }), _jsx("span", { children: "Generated Markdown Audit Report" })] }), _jsx("pre", { className: "bg-slate-950 p-4 rounded-xl border border-slate-800 text-cyan-300 text-xs font-mono overflow-x-auto leading-relaxed", children: report.summaryMarkdown })] }))] }));
};
//# sourceMappingURL=CIVerifierDashboard.js.map