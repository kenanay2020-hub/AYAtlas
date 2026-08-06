import React, { useState } from 'react';
import { Cpu, ShieldCheck, Layers, Eye, CheckCircle2, AlertTriangle, HelpCircle, Code, ArrowRight } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';
import { resolveCatalogWithSnapshot, TechnicalSystemItem, TechnicalSystemStatus } from '../aykenosCatalog';

export const AykenOSTechnicalAtlas: React.FC = () => {
  const { snapshot, sourceMode } = useSnapshotContext();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const resolvedCatalog = resolveCatalogWithSnapshot(snapshot);

  const filteredCatalog = resolvedCatalog.filter((item) => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  const getStatusBadge = (status: TechnicalSystemStatus) => {
    switch (status) {
      case 'VERIFIED_IMPLEMENTATION':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3" />
            <span>VERIFIED IMPLEMENTATION</span>
          </span>
        );
      case 'BOUNDED':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            <Layers className="h-3 w-3" />
            <span>BOUNDED AUTHORITY</span>
          </span>
        );
      case 'GOVERNANCE_ONLY':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="h-3 w-3" />
            <span>GOVERNANCE CONTRACT</span>
          </span>
        );
      case 'VISION_NOT_VERIFIED':
        return (
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Eye className="h-3 w-3" />
            <span>VISION — NOT VERIFIED</span>
          </span>
        );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <span>AykenOS Technical Systems Atlas</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            4-State classification matching verified implementations, bounded runtimes, governance contracts, and future spatial vision.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          {['ALL', 'VERIFIED_IMPLEMENTATION', 'BOUNDED', 'GOVERNANCE_ONLY', 'VISION_NOT_VERIFIED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                filterStatus === st
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {st === 'ALL' ? 'ALL SYSTEMS' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Banner */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="h-5 w-5 text-cyan-400 flex-shrink-0" />
          <span className="text-slate-300">
            Active Snapshot Source: <strong className="text-cyan-400">{sourceMode.toUpperCase()}</strong> — Matching candidate paths against {snapshot?.files.length || 0} repository files.
          </span>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          Catalog Total: <strong>{resolvedCatalog.length} Systems</strong>
        </span>
      </div>

      {/* Grid of Technical Systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCatalog.map((item) => {
          const hasEvidence = item.matchedPaths && item.matchedPaths.length > 0;
          return (
            <div
              key={item.id}
              className="glass-panel p-5 border-slate-800 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{item.nameTr}</h3>
                    <div className="text-[11px] text-slate-400">{item.nameEn}</div>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {item.summaryTr}
                </p>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  {item.techDetailEn}
                </div>

                {/* Candidate & Matched Evidence Paths */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Candidate Code Paths:</span>
                  <div className="space-y-1">
                    {item.candidatePaths.map((cp, idx) => {
                      const isMatched = item.matchedPaths?.includes(cp);
                      return (
                        <div
                          key={idx}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded border flex items-center justify-between ${
                            isMatched
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 font-bold'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          <span className="truncate">{cp}</span>
                          {isMatched ? (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 rounded">MATCHED</span>
                          ) : (
                            <span className="text-[9px] text-slate-600">UNMATCHED</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Concepts & Footer */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex flex-wrap gap-1">
                  {item.concepts.map((c, idx) => (
                    <span key={idx} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-cyan-300">
                      #{c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
