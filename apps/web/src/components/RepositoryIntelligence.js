import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Database, GitCompare, AlertTriangle, RefreshCw, AlertCircle } from 'lucide-react';
import { OfflineFixtureRepositorySource, GitHubReadOnlyRepositorySource, LocalReadOnlyRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor } from '@ayatlas/repository-ingestor';
import { ChangeIntelligenceEngine } from '@ayatlas/change-intelligence';
export const RepositoryIntelligence = ({ headSha }) => {
    const [sourceMode, setSourceMode] = useState('fixture');
    const [localPath, setLocalPath] = useState('/Users/asel/Documents/AYAtlas');
    const [targetCommitInput, setTargetCommitInput] = useState('53166ef11223344556677889900aabbccddeeff');
    const [snapshot, setSnapshot] = useState(null);
    const [changeReport, setChangeReport] = useState(null);
    const [impactFilter, setImpactFilter] = useState('ALL');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    async function loadRepositorySnapshot() {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            let source;
            if (sourceMode === 'github') {
                source = new GitHubReadOnlyRepositorySource();
            }
            else if (sourceMode === 'local') {
                source = new LocalReadOnlyRepositorySource(localPath);
            }
            else {
                source = new OfflineFixtureRepositorySource(headSha);
            }
            const ingestor = new RepositoryIngestor(source);
            // Base snapshot
            const baseSnap = await ingestor.ingestSnapshot(headSha, sourceMode);
            setSnapshot(baseSnap);
            // Ingest or compare against target commit
            let targetSnap;
            if (sourceMode === 'fixture') {
                targetSnap = {
                    ...baseSnap,
                    identity: {
                        ...baseSnap.identity,
                        commitSha: targetCommitInput,
                    },
                    files: [
                        ...baseSnap.files,
                        { path: 'userspace/ai-runtime/src/planner_v2.rs', contentDigest: 'sha_planner_v2', size: 1024 },
                        { path: 'docs/phase24-accepted-evidence-planning.md', contentDigest: 'sha_docs_mod', size: 4096 },
                    ],
                };
            }
            else {
                targetSnap = await ingestor.ingestSnapshot(targetCommitInput, sourceMode);
            }
            const changeEngine = new ChangeIntelligenceEngine();
            const report = changeEngine.compareSnapshots(baseSnap, targetSnap);
            setChangeReport(report);
        }
        catch (err) {
            setErrorMessage(err.message || 'Failed to ingest repository snapshot');
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        loadRepositorySnapshot();
    }, [sourceMode, headSha]);
    const filteredChanges = changeReport?.changes.filter((change) => {
        if (impactFilter === 'ALL')
            return true;
        return change.classification === impactFilter;
    });
    const getStatusBadge = () => {
        if (!snapshot)
            return null;
        switch (snapshot.verificationState) {
            case 'DEMO':
                return { label: 'DEMO FIXTURE', badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30' };
            case 'VERIFIED':
                return { label: 'VERIFIED SNAPSHOT', badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' };
            case 'TRUNCATED':
                return { label: 'TRUNCATED TREE', badgeClass: 'bg-red-500/10 text-red-400 border border-red-500/30' };
            case 'UNVERSIONED_LOCAL':
                return { label: 'UNVERSIONED LOCAL', badgeClass: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30' };
            default:
                return { label: snapshot.verificationState, badgeClass: 'bg-slate-800 text-slate-300' };
        }
    };
    const statusBadge = getStatusBadge();
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Database, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Live Repository Intelligence & Provenance Engine" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Deterministic repository ingestion, exact commit locking, SHA-256 manifest digests, and governance impact diffs." })] }), _jsxs("div", { className: "flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-mono", children: [_jsx("span", { className: "text-slate-500 px-2", children: "Adapter Mode:" }), ['fixture', 'local', 'github'].map((mode) => (_jsx("button", { onClick: () => setSourceMode(mode), className: `px-3 py-1 rounded-lg transition-all font-semibold ${sourceMode === mode
                                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200'}`, children: mode.toUpperCase() }, mode)))] })] }), snapshot?.observation.isDemoData && (_jsxs("div", { className: "p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-mono text-amber-300 flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-amber-400 flex-shrink-0" }), _jsxs("span", { children: [_jsx("strong", { children: "DEMO DATA \u2014 NOT LIVE REPOSITORY:" }), " Running in deterministic offline fixture mode. Switch adapter mode to ", _jsx("strong", { children: "LOCAL" }), " or ", _jsx("strong", { children: "GITHUB" }), " to ingest live trees."] })] })), errorMessage && (_jsxs("div", { className: "p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-300", children: ["Error loading snapshot: ", errorMessage] })), sourceMode === 'local' && (_jsxs("div", { className: "glass-panel p-4 border-indigo-500/30 flex items-center space-x-4 text-xs font-mono", children: [_jsx("span", { className: "text-slate-400", children: "Local Directory:" }), _jsx("input", { type: "text", value: localPath, onChange: (e) => setLocalPath(e.target.value), className: "flex-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500" }), _jsxs("button", { onClick: loadRepositorySnapshot, className: "px-3 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-lg hover:bg-indigo-500/30 flex items-center space-x-1.5", children: [_jsx(RefreshCw, { className: `h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}` }), _jsx("span", { children: "Scan Local Tree" })] })] })), snapshot && (_jsxs("div", { className: "glass-panel p-6 border-cyan-500/30 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-xs font-mono text-cyan-400 font-semibold", children: "Active Snapshot Metadata" }), statusBadge && (_jsx("span", { className: `px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${statusBadge.badgeClass}`, children: statusBadge.label }))] }), _jsxs("div", { className: "text-xs font-mono text-slate-400", children: ["Captured At: ", snapshot.observation.capturedAt] })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4 text-xs font-mono", children: [_jsxs("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-500", children: "Target Repository" }), _jsx("div", { className: "text-cyan-400 font-bold", children: snapshot.identity.repository })] }), _jsxs("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-500", children: "Locked Commit SHA" }), _jsxs("div", { className: "text-indigo-300 font-bold", children: [snapshot.identity.commitSha.slice(0, 12), "..."] })] }), _jsxs("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-500", children: "Manifest SHA-256 Digest" }), _jsx("div", { className: "text-emerald-400 font-bold truncate", children: snapshot.identity.manifestDigest })] }), _jsxs("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1", children: [_jsx("div", { className: "text-slate-500", children: "File Tree Manifest" }), _jsxs("div", { className: "text-slate-200 font-bold", children: [snapshot.files.length, " Validated Files"] })] })] })] })), changeReport && (_jsxs("div", { className: "glass-panel p-6 border-slate-800 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(GitCompare, { className: "h-5 w-5 text-indigo-400" }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-bold text-slate-100", children: "Governance Change & Impact Intelligence" }), _jsxs("p", { className: "text-xs text-slate-400", children: ["Comparing Base Commit ", _jsx("span", { className: "font-mono text-indigo-300", children: changeReport.baseCommitSha.slice(0, 8) }), " vs Target Commit ", _jsx("span", { className: "font-mono text-cyan-300", children: changeReport.targetCommitSha.slice(0, 8) })] })] })] }), _jsxs("div", { className: "flex items-center space-x-2 text-xs font-mono", children: [_jsx("span", { className: "text-slate-400", children: "Target Commit:" }), _jsx("input", { type: "text", value: targetCommitInput, onChange: (e) => setTargetCommitInput(e.target.value), className: "bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500 w-44" }), _jsx("button", { onClick: loadRepositorySnapshot, className: "px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded hover:bg-cyan-500/30", children: "Compare" })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs", children: ['ALL', 'CONSTITUTIONAL_REVIEW_REQUIRED', 'AUTHORITY_RELEVANT', 'IMPLEMENTATION_CHANGE'].map((f) => (_jsx("button", { onClick: () => setImpactFilter(f), className: `px-2.5 py-1 rounded text-[11px] font-mono ${impactFilter === f
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                                        : 'text-slate-400 hover:text-slate-200'}`, children: f.replace('_', ' ') }, f))) }), _jsxs("div", { className: "text-xs font-mono text-slate-400", children: ["Overall Authority Impact: ", _jsx("span", { className: "text-amber-400 font-bold", children: changeReport.overallAuthorityImpact })] })] }), _jsxs("div", { className: "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono text-amber-300 flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-amber-400 flex-shrink-0" }), _jsx("span", { children: "INVARIANT ENFORCED: Repository Change != Authority Change. Added code does NOT grant runtime authority." })] }), _jsx("div", { className: "space-y-3", children: filteredChanges?.map((item, idx) => (_jsxs("div", { className: "bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 font-mono text-xs", children: [_jsx("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold ${item.changeType === 'ADDED'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`, children: item.changeType }), _jsx("span", { className: "text-slate-200 font-semibold", children: item.path })] }), _jsx("span", { className: "px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold", children: item.classification })] }), _jsx("p", { className: "text-xs text-slate-400 font-mono", children: item.authorityImpactDescription }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500", children: [_jsxs("span", { children: ["Grants New Authority: ", item.grantsNewAuthority ? 'YES' : 'FALSE (Strict Invariant)'] }), _jsxs("span", { className: `font-semibold ${item.provenanceStatus === 'VERIFIED' ? 'text-emerald-400' : 'text-amber-400'}`, children: ["Engine Provenance: ", item.provenanceStatus] })] })] }, idx))) })] }))] }));
};
//# sourceMappingURL=RepositoryIntelligence.js.map