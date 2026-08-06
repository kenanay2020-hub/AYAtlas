import React, { useState, useEffect } from 'react';
import { AlertOctagon, ShieldAlert, AlertTriangle, CheckCircle2, FileCode, ArrowRight, RefreshCw, Filter } from 'lucide-react';
import { DriftDetectionEngine, DriftAuditReport, DriftItem } from '@ayatlas/drift-engine';
import { OfflineFixtureRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor } from '@ayatlas/repository-ingestor';

interface DriftExplorerProps {
  headSha: string;
}

export const DriftExplorer: React.FC<DriftExplorerProps> = ({ headSha }) => {
  const [report, setReport] = useState<DriftAuditReport | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

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
    if (severityFilter === 'ALL') return true;
    return item.severity === severityFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <AlertOctagon className="h-5 w-5 text-amber-400" />
            <span>Contradiction & Architectural Drift Inspector</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Continuous auditing of ABI freeze violations, unratified implementation additions, and evidence claims.
          </p>
        </div>

        {report?.hasCriticalViolations ? (
          <div className="flex items-center space-x-2 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/30 text-xs font-mono text-red-400 font-bold">
            <ShieldAlert className="h-4 w-4 text-red-400" />
            <span>CRITICAL DRIFT DETECTED</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>NO CRITICAL DRIFT</span>
          </div>
        )}
      </div>

      {/* Overview Audit Summary Matrix */}
      {report && (
        <div className="grid grid-cols-4 gap-4 text-xs font-mono">
          <div className="glass-panel p-4 border-slate-800 space-y-1">
            <div className="text-slate-400">Audit Target SHA</div>
            <div className="text-cyan-400 font-bold">{report.snapshotHeadSha.slice(0, 12)}...</div>
          </div>

          <div className="glass-panel p-4 border-slate-800 space-y-1">
            <div className="text-slate-400">Total Drift Count</div>
            <div className="text-amber-400 font-bold">{report.totalDriftCount} Items Detected</div>
          </div>

          <div className="glass-panel p-4 border-slate-800 space-y-1">
            <div className="text-slate-400">Critical Violations</div>
            <div className={`font-bold ${report.hasCriticalViolations ? 'text-red-400' : 'text-emerald-400'}`}>
              {report.hasCriticalViolations ? 'YES (ABI / Phase Contradiction)' : 'NONE'}
            </div>
          </div>

          <div className="glass-panel p-4 border-slate-800 space-y-1">
            <div className="text-slate-400">Audit Status</div>
            <div className="text-slate-200 font-bold">Audit Completed</div>
          </div>
        </div>
      )}

      {/* Drift Items List Panel */}
      {report && (
        <div className="glass-panel p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-100">Architectural Drift Items & Governance Remediations</h3>

            {/* Severity Filter */}
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              {['ALL', 'CRITICAL', 'WARNING', 'INFORMATIONAL'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-3 py-1 rounded text-[11px] font-semibold ${
                    severityFilter === sev
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Drift Cards */}
          <div className="space-y-4">
            {filteredDriftItems?.map((item) => {
              const isCritical = item.severity === 'CRITICAL';
              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-xl border space-y-3 transition-all ${
                    isCritical
                      ? 'bg-red-500/5 border-red-500/30 hover:border-red-500/50'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-mono text-xs">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          isCritical
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}
                      >
                        {item.severity}
                      </span>
                      <span className="text-slate-100 font-bold">{item.title}</span>
                    </div>

                    <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      Path: {item.affectedPath}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono">{item.description}</p>

                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono text-amber-300 flex items-center space-x-2">
                    <ArrowRight className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                    <span>
                      <strong>Remediation Recommendation:</strong> {item.remediationRecommendation}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
