import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { AlertOctagon, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { DriftDetectionEngine } from '@ayatlas/drift-engine';
import { OfflineFixtureRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor } from '@ayatlas/repository-ingestor';
export const DriftExplorer = ({ headSha }) => {
    const [report, setReport] = useState(null);
    const [severityFilter, setSeverityFilter] = useState('ALL');
    useEffect(() => {
        async function runAudit() {
            const source = new OfflineFixtureRepositorySource(headSha);
            const ingestor = new RepositoryIngestor(source);
            const baseSnap = await ingestor.ingestSnapshot(headSha, 'fixture');
            // Inject unratified ABI file into tree to demonstrate drift audit capability
            const snapshotWithDrift = {
                ...baseSnap,
                files: [
                    ...baseSnap.files,
                    { path: 'shared/abi/custom_syscall.h', contentDigest: 'sha_custom_abi', size: 120 },
                ],
            };
            const engine = new DriftDetectionEngine();
            const audit = engine.auditSnapshot(snapshotWithDrift);
            setReport(audit);
        }
        runAudit();
    }, [headSha]);
    const filteredDriftItems = report?.driftItems.filter((item) => {
        if (severityFilter === 'ALL')
            return true;
        return item.severity === severityFilter;
    });
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(AlertOctagon, { className: "h-5 w-5 text-amber-400" }), _jsx("span", { children: "Contradiction & Architectural Drift Inspector" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Continuous auditing of ABI freeze violations, unratified implementation additions, and evidence claims." })] }), report?.hasCriticalViolations ? (_jsxs("div", { className: "flex items-center space-x-2 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/30 text-xs font-mono text-red-400 font-bold", children: [_jsx(ShieldAlert, { className: "h-4 w-4 text-red-400" }), _jsx("span", { children: "CRITICAL DRIFT DETECTED" })] })) : (_jsxs("div", { className: "flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-400" }), _jsx("span", { children: "NO CRITICAL DRIFT" })] }))] }), report && (_jsxs("div", { className: "grid grid-cols-4 gap-4 text-xs font-mono", children: [_jsxs("div", { className: "glass-panel p-4 border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-400", children: "Audit Target SHA" }), _jsxs("div", { className: "text-cyan-400 font-bold", children: [report.snapshotHeadSha.slice(0, 12), "..."] })] }), _jsxs("div", { className: "glass-panel p-4 border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-400", children: "Total Drift Count" }), _jsxs("div", { className: "text-amber-400 font-bold", children: [report.totalDriftCount, " Items Detected"] })] }), _jsxs("div", { className: "glass-panel p-4 border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-400", children: "Critical Violations" }), _jsx("div", { className: `font-bold ${report.hasCriticalViolations ? 'text-red-400' : 'text-emerald-400'}`, children: report.hasCriticalViolations ? 'YES (ABI / Phase Contradiction)' : 'NONE' })] }), _jsxs("div", { className: "glass-panel p-4 border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-400", children: "Audit Status" }), _jsx("div", { className: "text-slate-200 font-bold", children: "Audit Completed" })] })] })), report && (_jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [_jsx("h3", { className: "text-base font-bold text-slate-100", children: "Architectural Drift Items & Governance Remediations" }), _jsx("div", { className: "flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono", children: ['ALL', 'CRITICAL', 'WARNING', 'INFORMATIONAL'].map((sev) => (_jsx("button", { onClick: () => setSeverityFilter(sev), className: `px-3 py-1 rounded text-[11px] font-semibold ${severityFilter === sev
                                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                        : 'text-slate-400 hover:text-slate-200'}`, children: sev }, sev))) })] }), _jsx("div", { className: "space-y-4", children: filteredDriftItems?.map((item) => {
                            const isCritical = item.severity === 'CRITICAL';
                            return (_jsxs("div", { className: `p-5 rounded-xl border space-y-3 transition-all ${isCritical
                                    ? 'bg-red-500/5 border-red-500/30 hover:border-red-500/50'
                                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'}`, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 font-mono text-xs", children: [_jsx("span", { className: `px-2.5 py-0.5 rounded text-[10px] font-bold ${isCritical
                                                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                                                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'}`, children: item.severity }), _jsx("span", { className: "text-slate-100 font-bold", children: item.title })] }), _jsx("span", { className: "text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800", children: item.category })] }), _jsx("div", { children: _jsxs("span", { className: "text-[11px] font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800", children: ["Path: ", item.affectedPath] }) }), _jsx("p", { className: "text-xs text-slate-300 leading-relaxed font-mono", children: item.description }), _jsxs("div", { className: "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono text-amber-300 flex items-center space-x-2", children: [_jsx(ArrowRight, { className: "h-3.5 w-3.5 text-amber-400 flex-shrink-0" }), _jsxs("span", { children: [_jsx("strong", { children: "Remediation Recommendation:" }), " ", item.remediationRecommendation] })] })] }, item.id));
                        }) })] }))] }));
};
//# sourceMappingURL=DriftExplorer.js.map