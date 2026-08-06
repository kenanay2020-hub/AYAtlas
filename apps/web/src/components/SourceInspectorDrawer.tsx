import React from 'react';
import { X, GitCommit, FileCode, ShieldCheck, Database, CheckCircle2, Lock, ExternalLink } from 'lucide-react';

interface SourceInspectorDrawerProps {
  component: any | null;
  onClose: () => void;
  headSha: string;
}

export const SourceInspectorDrawer: React.FC<SourceInspectorDrawerProps> = ({
  component,
  onClose,
  headSha,
}) => {
  if (!component) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-xl bg-slate-950 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Source Component Inspector
              </span>
              <h3 className="text-xl font-bold text-slate-100">{component.label}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-800 border border-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Status & Category */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Category Layer</div>
              <div className="text-sm font-semibold text-cyan-300 font-mono mt-1">
                {component.category}
              </div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Authority Status</div>
              <div className="text-sm font-semibold text-emerald-400 font-mono mt-1">
                {component.status || 'OPERATIONAL'}
              </div>
            </div>
          </div>

          {/* Multi-Axis Status Cards */}
          <div className="space-y-3 mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Multi-Axis Status Model
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400">Implementation Axis:</span>
                <span className="text-emerald-400 font-semibold">IMPLEMENTED / VALIDATED</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400">Authority Axis:</span>
                <span className="text-amber-400 font-semibold">
                  {component.category?.includes('ring3') ? 'BOUNDED_AUTHORITY' : 'ACTIVE_AUTHORITY / FROZEN'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400">Evidence Axis:</span>
                <span className="text-cyan-400 font-semibold">EXACT_SUBJECT_BOUND</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Component Description
            </h4>
            <p className="text-sm text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
              {component.description}
            </p>
          </div>

          {/* Source Paths & Provenance */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Source Paths & Exact Provenance
            </h4>
            <div className="space-y-2">
              {component.paths?.map((pathStr: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs font-mono"
                >
                  <div className="flex items-center space-x-2 text-cyan-400">
                    <FileCode className="h-4 w-4 text-slate-500" />
                    <span>{pathStr}</span>
                  </div>
                  <a
                    href={`https://github.com/kenanay/AykenOS/tree/${headSha}/${pathStr}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View on GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Read-Only Footer Notice */}
        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>AYAtlas Read-Only Provenance</span>
          </div>
          <span className="text-cyan-400 font-semibold">{headSha.slice(0, 8)}</span>
        </div>
      </div>
    </div>
  );
};
