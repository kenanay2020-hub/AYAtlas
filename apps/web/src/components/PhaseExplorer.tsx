import React, { useState } from 'react';
import { Flag, CheckCircle2, Clock, AlertTriangle, ShieldCheck, FileText, GitCommit, Lock, ChevronRight } from 'lucide-react';
import { AYKENOS_PHASE_CATALOG, PhaseRecord } from '@ayatlas/authority-resolver';

interface PhaseExplorerProps {
  currentPhase: number;
  headSha: string;
}

export const PhaseExplorer: React.FC<PhaseExplorerProps> = ({ currentPhase, headSha }) => {
  const [selectedPhase, setSelectedPhase] = useState<PhaseRecord>(
    AYKENOS_PHASE_CATALOG.find((p) => p.phase === currentPhase) || AYKENOS_PHASE_CATALOG[AYKENOS_PHASE_CATALOG.length - 1]
  );

  const phase24Records = [
    { name: '1. Pointer Transition Record', path: 'docs/phase24-pointer-transition.md', desc: 'Initial phase transition entry.' },
    { name: '2. Governance Overview Record', path: 'docs/phase24-governance-overview.md', desc: 'System governance principles for Phase-24.' },
    { name: '3. Initial Governance Boundary Record', path: 'docs/phase24-initial-boundary.md', desc: 'Strict boundary specification.' },
    { name: '4. Exact-Subject Evidence Expectation Record', path: 'docs/phase24-exact-subject-expectations.md', desc: 'Exact SHA expectation rules.' },
    { name: '5. Objective, Scope and Sequencing Record', path: 'docs/phase24-objective-scope.md', desc: 'Sequence and roadmap definition.' },
    { name: '6. Accepted-Evidence Boundary Planning Record', path: 'docs/phase24-accepted-evidence-planning.md', desc: 'Accepted evidence boundary specs.' },
    { name: '7. Precision Correction Record (P2)', path: 'docs/phase24-p2-precision-correction.md', desc: 'P2 clarification: No downstream authority creation.' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Flag className="h-5 w-5 text-cyan-400" />
            <span>AykenOS Phase & Governance Explorer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracking phase progression from Phase-0 through Phase-24 accepted-evidence planning and exact-subject binding.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Current Phase:</span>
          <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
            Phase-{currentPhase} (ACTIVE)
          </span>
        </div>
      </div>

      {/* Phase Timeline Cards */}
      <div className="grid grid-cols-5 gap-3">
        {AYKENOS_PHASE_CATALOG.map((p) => {
          const isSelected = selectedPhase.phase === p.phase;
          const isActive = p.status === 'ACTIVE';
          return (
            <div
              key={p.phase}
              onClick={() => setSelectedPhase(p)}
              className={`glass-panel p-4 cursor-pointer transition-all duration-200 relative ${
                isSelected
                  ? 'border-cyan-500/60 bg-slate-900/90 shadow-cyan-500/10'
                  : 'hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-100">Phase-{p.phase}</span>
                {isActive ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    CLOSED
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-300 font-medium line-clamp-2">{p.title}</div>
            </div>
          );
        })}
      </div>

      {/* Selected Phase Deep Dive */}
      <div className="grid grid-cols-3 gap-6">
        {/* Main Details Panel */}
        <div className="col-span-2 space-y-6">
          <div className="glass-panel p-6 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Phase Specification
                </span>
                <h3 className="text-lg font-bold text-slate-100">{selectedPhase.title}</h3>
              </div>
              <span
                className={`text-xs font-mono px-3 py-1 rounded-full font-semibold ${
                  selectedPhase.status === 'ACTIVE'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {selectedPhase.status}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Objective</h4>
              <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {selectedPhase.objective}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Authorized Scope</h4>
              <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {selectedPhase.scope}
              </p>
            </div>

            {/* Explicitly Unauthorized Scope */}
            <div>
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                <span>Explicitly Unauthorized Scope in Phase-{selectedPhase.phase}</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedPhase.unauthorizedScope.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-xs font-mono text-rose-300 bg-rose-500/10 p-2 rounded border border-rose-500/20 flex items-center space-x-1.5"
                  >
                    <Lock className="h-3 w-3 text-rose-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Phase-24 Decision Records Side Panel */}
        <div className="space-y-4">
          <div className="glass-panel p-5 border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>Phase-24 Decision Records</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Chronological decision sequence established in main repository:
            </p>

            <div className="space-y-2">
              {phase24Records.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="text-cyan-300 font-semibold">{rec.name}</div>
                  <div className="text-[10px] text-slate-500">{rec.path}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
