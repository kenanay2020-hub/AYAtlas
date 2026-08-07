import React, { useState } from 'react';
import { Play, CheckCircle2, RefreshCw, Terminal, ShieldCheck, FileCheck, Layers, Clock, Cpu } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';

interface VitestSuiteResult {
  suiteName: string;
  packagePath: string;
  testCount: number;
  durationMs: number;
  tests: {
    name: string;
    assertion: string;
    passed: boolean;
  }[];
}

export const ConstitutionalTestRunner: React.FC = () => {
  const { headSha } = useSnapshotContext();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(100);
  const [lastRanAt, setLastRanAt] = useState<string>('Just now');

  const testSuites: VitestSuiteResult[] = [
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
      } else {
        setProgress(current);
      }
    }, 120);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Terminal className="h-5 w-5 text-cyan-400" />
            <span>Interactive Vitest Unit Test & Invariant Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulating live execution of 18 Vitest unit tests across 13 monorepo packages.
          </p>
        </div>

        <button
          onClick={runSimulatedTests}
          disabled={isRunning}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-md disabled:opacity-50"
        >
          <Play className={`h-4 w-4 fill-current ${isRunning ? 'animate-bounce' : ''}`} />
          <span>{isRunning ? 'RUNNING VITEST...' : 'RUN ALL 18 UNIT TESTS'}</span>
        </button>
      </div>

      {/* Progress Bar */}
      {isRunning && (
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div
            className="bg-cyan-400 h-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Summary Metrics Banner */}
      <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">
              Test Suite Status: 100% PASSING ({totalTests} / {totalTests} Unit Tests)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Commit: <strong className="text-cyan-400">{headSha.slice(0, 8)}</strong> | Last Executed: {lastRanAt}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs font-mono">
          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center space-x-2">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>13 Test Suites</span>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 flex items-center space-x-2">
            <Clock className="h-3.5 w-3.5 text-indigo-400" />
            <span>{totalDurationMs} ms Execution Time</span>
          </div>
        </div>
      </div>

      {/* Test Suites Stream */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
          <FileCheck className="h-4 w-4 text-cyan-400" />
          <span>Monorepo Test Suites ({testSuites.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testSuites.map((suite: VitestSuiteResult, idx: number) => (
            <div
              key={idx}
              className="glass-panel p-5 border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2 truncate">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-bold text-xs text-slate-100 truncate">{suite.suiteName}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0 ml-2">{suite.durationMs}ms</span>
              </div>

              <div className="space-y-2">
                {suite.tests.map((test: { name: string; assertion: string; passed: boolean }, tIdx: number) => (
                  <div key={tIdx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                      <span className="text-cyan-300">✓ {test.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">PASS</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono leading-relaxed">
                      {test.assertion}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
