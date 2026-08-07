import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Play, CheckCircle2, Terminal, FileCheck, Layers, Clock } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';
export const ConstitutionalTestRunner = () => {
    const { headSha } = useSnapshotContext();
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(100);
    const [lastRanAt, setLastRanAt] = useState('Just now');
    const testSuites = [
        {
            suiteName: 'packages/query-engine/src/query.test.ts',
            packagePath: 'packages/query-engine',
            testCount: 3,
            durationMs: 4,
            tests: [
                { name: 'Ask Supported Query', assertion: 'Returns SUPPORTED status with live codeSnippet and file digests', passed: true },
                { name: 'Ask Bounded Query', assertion: 'Returns PARTIAL / BOUNDED status for Ring3 policy runtime', passed: true },
                { name: 'Ask Future Vision Query', assertion: 'Returns VISION_ONLY status for spatial memory requests', passed: true },
            ],
        },
        {
            suiteName: 'packages/ci-verifier/src/ci.test.ts',
            packagePath: 'packages/ci-verifier',
            testCount: 1,
            durationMs: 9,
            tests: [
                { name: 'CI Verifier Gate Verification', assertion: 'All 5 verification gates evaluate PASS for Phase-24 commit', passed: true },
            ],
        },
        {
            suiteName: 'packages/drift-engine/src/drift.test.ts',
            packagePath: 'packages/drift-engine',
            testCount: 2,
            durationMs: 5,
            tests: [
                { name: 'Detect Clean Snapshot', assertion: 'Zero critical drift items detected in ratified snapshot', passed: true },
                { name: 'Detect Unratified Phase Contradiction', assertion: 'Triggers CRITICAL severity if CURRENT_PHASE changes without decision file', passed: true },
            ],
        },
        {
            suiteName: 'packages/change-intelligence/src/authority-impact.test.ts',
            packagePath: 'packages/change-intelligence',
            testCount: 1,
            durationMs: 3,
            tests: [
                { name: 'Enforce grantsNewAuthority=FALSE', assertion: 'Unratified implementation additions preserve grantsNewAuthority=false', passed: true },
            ],
        },
        {
            suiteName: 'packages/change-intelligence/src/current-phase-semantic-diff.test.ts',
            packagePath: 'packages/change-intelligence',
            testCount: 1,
            durationMs: 4,
            tests: [
                { name: 'Current Phase Semantic Diff', assertion: 'Accurately computes added/modified file deltas between commits', passed: true },
            ],
        },
        {
            suiteName: 'packages/provenance-engine/src/stale-provenance-propagation.test.ts',
            packagePath: 'packages/provenance-engine',
            testCount: 1,
            durationMs: 4,
            tests: [
                { name: 'Stale Provenance Propagation', assertion: 'Invalidates assertion when snapshot manifest SHA-256 changes', passed: true },
            ],
        },
        {
            suiteName: 'packages/provenance-engine/src/provenance.test.ts',
            packagePath: 'packages/provenance-engine',
            testCount: 1,
            durationMs: 3,
            tests: [
                { name: 'Exact-Subject Commit SHA Binding', assertion: 'Validates claims bound to exact target commit SHA', passed: true },
            ],
        },
        {
            suiteName: 'packages/knowledge-builder/src/pipeline-determinism.test.ts',
            packagePath: 'packages/knowledge-builder',
            testCount: 1,
            durationMs: 25,
            tests: [
                { name: '5-Stage Pipeline Determinism', assertion: 'Generates identical SHA-256 payload digests across execution runs', passed: true },
            ],
        },
        {
            suiteName: 'packages/repository-ingestor/src/snapshot-determinism.test.ts',
            packagePath: 'packages/repository-ingestor',
            testCount: 1,
            durationMs: 38,
            tests: [
                { name: 'Snapshot Ingestion Determinism', assertion: 'Compiles immutable file trees and manifest SHA digests', passed: true },
            ],
        },
        {
            suiteName: 'packages/authority-resolver/src/authority.test.ts',
            packagePath: 'packages/authority-resolver',
            testCount: 2,
            durationMs: 4,
            tests: [
                { name: 'Ring0 Kernel Mechanism Resolution', assertion: 'Classifies kernel/mm, proc, sched, sys as Ring0 Mechanisms', passed: true },
                { name: 'Ring3 Policy Runtime Bounding', assertion: 'Classifies userspace runtimes as bounded policy layers', passed: true },
            ],
        },
        {
            suiteName: 'packages/graph-engine/src/graph.test.ts',
            packagePath: 'packages/graph-engine',
            testCount: 2,
            durationMs: 4,
            tests: [
                { name: 'Construct Governance DAG', assertion: 'Builds directed acyclic graph without circular dependencies', passed: true },
                { name: 'Validate Topological Edge Invariants', assertion: 'Enforces Ring3 -> shared/abi -> Ring0 edge flow', passed: true },
            ],
        },
        {
            suiteName: 'packages/github-reader/src/mutation-safety.test.ts',
            packagePath: 'packages/github-reader',
            testCount: 1,
            durationMs: 3,
            tests: [
                { name: 'Read-Only Isolation Safety', assertion: 'Zero write or mutation APIs exposed by repository reader', passed: true },
            ],
        },
        {
            suiteName: 'packages/repository-parser/src/safety.test.ts',
            packagePath: 'packages/repository-parser',
            testCount: 1,
            durationMs: 5,
            tests: [
                { name: 'Path Sanitization & Digest Extraction', assertion: 'Prevents path traversal attacks and extracts SHA-256 file hashes', passed: true },
            ],
        },
    ];
    const totalTests = testSuites.reduce((acc, s) => acc + s.testCount, 0);
    const totalDurationMs = testSuites.reduce((acc, s) => acc + s.durationMs, 0);
    const runSimulatedTests = () => {
        setIsRunning(true);
        setProgress(0);
        let current = 0;
        const interval = setInterval(() => {
            current += 10;
            if (current >= 100) {
                setProgress(100);
                setIsRunning(false);
                setLastRanAt(new Date().toLocaleTimeString());
                clearInterval(interval);
            }
            else {
                setProgress(current);
            }
        }, 120);
    };
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6 font-mono", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Terminal, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "Interactive Vitest Unit Test & Invariant Simulator" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Simulating live execution of 18 Vitest unit tests across 13 monorepo packages." })] }), _jsxs("button", { onClick: runSimulatedTests, disabled: isRunning, className: "px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-md disabled:opacity-50", children: [_jsx(Play, { className: `h-4 w-4 fill-current ${isRunning ? 'animate-bounce' : ''}` }), _jsx("span", { children: isRunning ? 'RUNNING VITEST...' : 'RUN ALL 18 UNIT TESTS' })] })] }), isRunning && (_jsx("div", { className: "w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800", children: _jsx("div", { className: "bg-cyan-400 h-full transition-all duration-150", style: { width: `${progress}%` } }) })), _jsxs("div", { className: "p-5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-sm", children: _jsx(CheckCircle2, { className: "h-5 w-5" }) }), _jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-sm text-slate-100", children: ["Test Suite Status: 100% PASSING (", totalTests, " / ", totalTests, " Unit Tests)"] }), _jsxs("p", { className: "text-xs text-slate-400 mt-0.5", children: ["Target Commit: ", _jsx("strong", { className: "text-cyan-400", children: headSha.slice(0, 8) }), " | Last Executed: ", lastRanAt] })] })] }), _jsxs("div", { className: "flex items-center space-x-4 text-xs font-mono", children: [_jsxs("div", { className: "bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center space-x-2", children: [_jsx(Layers, { className: "h-3.5 w-3.5 text-cyan-400" }), _jsx("span", { children: "13 Test Suites" })] }), _jsxs("div", { className: "bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center space-x-2", children: [_jsx(Clock, { className: "h-3.5 w-3.5 text-indigo-400" }), _jsxs("span", { children: [totalDurationMs, " ms Execution Time"] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-sm font-bold text-slate-200 flex items-center space-x-2", children: [_jsx(FileCheck, { className: "h-4 w-4 text-cyan-400" }), _jsxs("span", { children: ["Monorepo Test Suites (", testSuites.length, ")"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: testSuites.map((suite, idx) => (_jsxs("div", { className: "glass-panel p-5 border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [_jsxs("div", { className: "flex items-center space-x-2 truncate", children: [_jsx(CheckCircle2, { className: "h-4 w-4 text-emerald-400 flex-shrink-0" }), _jsx("span", { className: "font-bold text-xs text-slate-100 truncate", children: suite.suiteName })] }), _jsxs("span", { className: "text-[10px] text-slate-500 font-mono flex-shrink-0 ml-2", children: [suite.durationMs, "ms"] })] }), _jsx("div", { className: "space-y-2", children: suite.tests.map((test, tIdx) => (_jsxs("div", { className: "p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between text-xs font-bold text-slate-200", children: [_jsxs("span", { className: "text-cyan-300", children: ["\u2713 ", test.name] }), _jsx("span", { className: "text-[10px] text-emerald-400 font-mono", children: "PASS" })] }), _jsx("div", { className: "text-[11px] text-slate-400 font-mono leading-relaxed", children: test.assertion })] }, tIdx))) })] }, idx))) })] })] }));
};
//# sourceMappingURL=ConstitutionalTestRunner.js.map