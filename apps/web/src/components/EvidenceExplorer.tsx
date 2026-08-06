import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, Lock, CheckCircle2, FileCode, Check } from 'lucide-react';
import { AYKENOS_EVIDENCE_CHAIN, EvidenceChainStep } from '@ayatlas/authority-resolver';

interface EvidenceExplorerProps {
  headSha: string;
}

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({ headSha }) => {
  const [selectedStep, setSelectedStep] = useState<EvidenceChainStep>(AYKENOS_EVIDENCE_CHAIN[3]); // Default: Validator Output

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
            <span>Evidence Intelligence & Governance Boundary</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visualizing the strict constitutional boundary separating raw execution output, validator output, exact-subject binding, and accepted evidence.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 text-xs font-mono text-amber-300">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>INVARIANT: Validator PASS != Accepted Evidence</span>
        </div>
      </div>

      {/* 8-Step Visual Chain */}
      <div className="glass-panel p-6 border-cyan-500/30 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Sequential Evidence & Authority Verification Pipeline
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {AYKENOS_EVIDENCE_CHAIN.map((step, idx) => {
            const isSelected = selectedStep.id === step.id;
            const isAcceptedStep = step.stage === 'ACCEPTED_EVIDENCE';
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? 'border-cyan-500/60 bg-slate-900/90 shadow-cyan-500/10'
                    : isAcceptedStep
                    ? 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{step.stepName}</span>
                  {step.isAuthorityGranted ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      AUTHORITY RATIFIED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      NO AUTHORITY
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">{step.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Inspector Panel */}
      <div className="glass-panel p-6 border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Evidence Stage Deep Inspection
            </span>
            <h3 className="text-lg font-bold text-slate-100">{selectedStep.stepName}</h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Stage: {selectedStep.stage}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Description</h4>
            <p className="text-xs text-slate-300 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
              {selectedStep.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
              <Lock className="h-3.5 w-3.5 text-amber-400" />
              <span>Constitutional Governance Constraint</span>
            </h4>
            <p className="text-xs text-amber-300 bg-amber-500/10 p-3.5 rounded-lg border border-amber-500/20 leading-relaxed font-mono">
              {selectedStep.governanceConstraint}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Associated Repository Code Paths</h4>
          <div className="flex space-x-2">
            {selectedStep.codePaths.map((p, idx) => (
              <span key={idx} className="text-xs font-mono text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
