import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw, Terminal, Layers, FileText, Cpu, Lock } from 'lucide-react';
import { CIVerifier, CIVerificationReport } from '@ayatlas/ci-verifier';
import { useSnapshotContext } from '../context/SnapshotContext';

export const CIVerifierDashboard: React.FC = () => {
  const { snapshot, sourceMode, headSha } = useSnapshotContext();
  const [report, setReport] = useState<CIVerificationReport | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const runVerification = async () => {
    setIsVerifying(true);
    try {
      const verifier = new CIVerifier();
      const res = await verifier.verifyCommit(headSha, sourceMode);
      setReport(res);
    } catch (err) {
      console.error('CI Verification Error:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    runVerification();
  }, [sourceMode, headSha]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span>Constitutional CI Verifier & Gate Inspector</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated verification engine validating 5 architecture gates, read-only safety, 5-stage pipeline determinism, and drift invariants.
          </p>
        </div>

        <button
          onClick={runVerification}
          disabled={isVerifying}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-md disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isVerifying ? 'animate-spin' : ''}`} />
          <span>{isVerifying ? 'VERIFYING GATES...' : 'RUN CI VERIFIER GATES'}</span>
        </button>
      </div>

      {/* Overall Verification Status Banner */}
      {report && (
        <div className={`p-6 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
          report.overallPassed
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg ${
              report.overallPassed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
            }`}>
              {report.overallPassed ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-slate-100">
                  Overall Verification: {report.overallPassed ? 'ALL GATES PASSED' : 'VERIFICATION FAILED'}
                </h3>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-cyan-300">
                  {report.sourceMode.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Audit Timestamp: {report.verificationTimestamp} | Commit: <strong className="text-cyan-400">{report.commitSha.slice(0, 8)}</strong>
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs space-y-1 bg-slate-950/80 p-3 rounded-lg border border-slate-800">
            <div className="text-slate-400">Gate Verification Score</div>
            <div className="text-emerald-400 font-bold text-sm">
              {report.gates.filter((g) => g.passed).length} / {report.gates.length} Gates PASS
            </div>
          </div>
        </div>
      )}

      {/* 5 Verification Gates Grid */}
      {report && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Constitutional Verification Gates</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.gates.map((gate) => (
              <div
                key={gate.gateNumber}
                className={`glass-panel p-5 border-slate-800 flex flex-col justify-between space-y-3 ${
                  gate.passed ? 'hover:border-emerald-500/40' : 'border-red-500/40 bg-red-500/5'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                      GATE 0{gate.gateNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                      gate.passed
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {gate.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-100">{gate.gateName}</h4>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                    {gate.summary}
                  </p>
                </div>

                {gate.details && gate.details.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
                    {gate.details.slice(0, 2).map((d, dIdx) => (
                      <div key={dIdx} className="truncate text-amber-300">
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated Markdown Audit Report Box */}
      {report && (
        <div className="glass-panel p-6 border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-xs text-slate-300 font-bold border-b border-slate-800 pb-3">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span>Generated Markdown Audit Report</span>
          </div>

          <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-cyan-300 text-xs font-mono overflow-x-auto leading-relaxed">
            {report.summaryMarkdown}
          </pre>
        </div>
      )}
    </div>
  );
};
