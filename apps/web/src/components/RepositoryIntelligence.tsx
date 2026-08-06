import React, { useState, useEffect } from 'react';
import { Database, GitCommit, GitCompare, ShieldCheck, AlertTriangle, Lock, FileCode, CheckCircle2, RefreshCw, AlertCircle, Server } from 'lucide-react';
import { OfflineFixtureRepositorySource, GitHubReadOnlyRepositorySource, LocalReadOnlyRepositorySource, ReadOnlyRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor, IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
import { ChangeIntelligenceEngine, GovernanceChangeReport } from '@ayatlas/change-intelligence';

interface RepositoryIntelligenceProps {
  headSha: string;
}

export const RepositoryIntelligence: React.FC<RepositoryIntelligenceProps> = ({ headSha }) => {
  const [sourceMode, setSourceMode] = useState<'fixture' | 'github' | 'local'>('fixture');
  const [localPath, setLocalPath] = useState<string>('/Users/asel/Documents/AYAtlas');
  const [targetCommitInput, setTargetCommitInput] = useState<string>('53166ef11223344556677889900aabbccddeeff');

  const [snapshot, setSnapshot] = useState<IngestedRepositorySnapshot | null>(null);
  const [changeReport, setChangeReport] = useState<GovernanceChangeReport | null>(null);
  const [impactFilter, setImpactFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadRepositorySnapshot() {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      let source: ReadOnlyRepositorySource;
      if (sourceMode === 'github') {
        source = new GitHubReadOnlyRepositorySource();
      } else if (sourceMode === 'local') {
        source = new LocalReadOnlyRepositorySource(localPath);
      } else {
        source = new OfflineFixtureRepositorySource(headSha);
      }

      const ingestor = new RepositoryIngestor(source);

      // Base snapshot
      const baseSnap = await ingestor.ingestSnapshot(headSha, sourceMode);
      setSnapshot(baseSnap);

      // Ingest or compare against target commit
      let targetSnap: IngestedRepositorySnapshot;
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
      } else {
        targetSnap = await ingestor.ingestSnapshot(targetCommitInput, sourceMode);
      }

      const changeEngine = new ChangeIntelligenceEngine();
      const report = changeEngine.compareSnapshots(baseSnap, targetSnap);
      setChangeReport(report);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to ingest repository snapshot');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadRepositorySnapshot();
  }, [sourceMode, headSha]);

  const filteredChanges = changeReport?.changes.filter((change) => {
    if (impactFilter === 'ALL') return true;
    return change.classification === impactFilter;
  });

  const getStatusBadge = () => {
    if (!snapshot) return null;
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header & Source Mode Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Database className="h-5 w-5 text-cyan-400" />
            <span>Live Repository Intelligence & Provenance Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Deterministic repository ingestion, exact commit locking, SHA-256 manifest digests, and governance impact diffs.
          </p>
        </div>

        {/* Source Mode Toggle */}
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-500 px-2">Adapter Mode:</span>
          {(['fixture', 'local', 'github'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSourceMode(mode)}
              className={`px-3 py-1 rounded-lg transition-all font-semibold ${
                sourceMode === mode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Banner */}
      {snapshot?.observation.isDemoData && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-mono text-amber-300 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>DEMO DATA — NOT LIVE REPOSITORY:</strong> Running in deterministic offline fixture mode. Switch adapter mode to <strong>LOCAL</strong> or <strong>GITHUB</strong> to ingest live trees.
          </span>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-300">
          Error loading snapshot: {errorMessage}
        </div>
      )}

      {/* Local Path Controls */}
      {sourceMode === 'local' && (
        <div className="glass-panel p-4 border-indigo-500/30 flex items-center space-x-4 text-xs font-mono">
          <span className="text-slate-400">Local Directory:</span>
          <input
            type="text"
            value={localPath}
            onChange={(e) => setLocalPath(e.target.value)}
            className="flex-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={loadRepositorySnapshot}
            className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-lg hover:bg-indigo-500/30 flex items-center space-x-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Scan Local Tree</span>
          </button>
        </div>
      )}

      {/* Snapshot Metadata Panel */}
      {snapshot && (
        <div className="glass-panel p-6 border-cyan-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold">Active Snapshot Metadata</span>
              {statusBadge && (
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${statusBadge.badgeClass}`}>
                  {statusBadge.label}
                </span>
              )}
            </div>
            <div className="text-xs font-mono text-slate-400">Captured At: {snapshot.observation.capturedAt}</div>
          </div>

          <div className="grid grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-500">Target Repository</div>
              <div className="text-cyan-400 font-bold">{snapshot.identity.repository}</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-500">Locked Commit SHA</div>
              <div className="text-indigo-300 font-bold">{snapshot.identity.commitSha.slice(0, 12)}...</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-500">Manifest SHA-256 Digest</div>
              <div className="text-emerald-400 font-bold truncate">{snapshot.identity.manifestDigest}</div>
            </div>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <div className="text-slate-500">File Tree Manifest</div>
              <div className="text-slate-200 font-bold">{snapshot.files.length} Validated Files</div>
            </div>
          </div>
        </div>
      )}

      {/* Change Intelligence & Governance Impact Analyzer */}
      {changeReport && (
        <div className="glass-panel p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <GitCompare className="h-5 w-5 text-indigo-400" />
              <div>
                <h3 className="text-base font-bold text-slate-100">Governance Change & Impact Intelligence</h3>
                <p className="text-xs text-slate-400">
                  Comparing Base Commit <span className="font-mono text-indigo-300">{changeReport.baseCommitSha.slice(0, 8)}</span> vs Target Commit <span className="font-mono text-cyan-300">{changeReport.targetCommitSha.slice(0, 8)}</span>
                </p>
              </div>
            </div>

            {/* Target Commit Input */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-slate-400">Target Commit:</span>
              <input
                type="text"
                value={targetCommitInput}
                onChange={(e) => setTargetCommitInput(e.target.value)}
                className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-cyan-300 focus:outline-none focus:border-cyan-500 w-44"
              />
              <button
                onClick={loadRepositorySnapshot}
                className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded hover:bg-cyan-500/30"
              >
                Compare
              </button>
            </div>
          </div>

          {/* Impact Classification Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {['ALL', 'CONSTITUTIONAL_REVIEW_REQUIRED', 'AUTHORITY_RELEVANT', 'IMPLEMENTATION_CHANGE'].map((f) => (
                <button
                  key={f}
                  onClick={() => setImpactFilter(f)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono ${
                    impactFilter === f
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-400">
              Overall Authority Impact: <span className="text-amber-400 font-bold">{changeReport.overallAuthorityImpact}</span>
            </div>
          </div>

          {/* Invariant Alert */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs font-mono text-amber-300 flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span>INVARIANT ENFORCED: Repository Change != Authority Change. Added code does NOT grant runtime authority.</span>
          </div>

          {/* Semantic Change Items */}
          <div className="space-y-3">
            {filteredChanges?.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.changeType === 'ADDED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.changeType}
                    </span>
                    <span className="text-slate-200 font-semibold">{item.path}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 font-semibold">
                    {item.classification}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-mono">{item.authorityImpactDescription}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                  <span>Grants New Authority: {item.grantsNewAuthority ? 'YES' : 'FALSE (Strict Invariant)'}</span>
                  <span className={`font-semibold ${item.provenanceStatus === 'VERIFIED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    Engine Provenance: {item.provenanceStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
