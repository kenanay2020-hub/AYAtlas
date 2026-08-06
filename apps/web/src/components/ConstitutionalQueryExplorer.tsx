import React, { useState } from 'react';
import { HelpCircle, Search, ShieldCheck, AlertTriangle, FileCode, CheckCircle2, ArrowRight, BookOpen, Lock } from 'lucide-react';
import { ConstitutionalQueryEngine, ConstitutionalAnswer } from '@ayatlas/query-engine';
import { ProvenanceRecord } from '@ayatlas/provenance-engine';

interface ConstitutionalQueryExplorerProps {
  headSha: string;
}

export const ConstitutionalQueryExplorer: React.FC<ConstitutionalQueryExplorerProps> = ({ headSha }) => {
  const [engine] = useState(() => new ConstitutionalQueryEngine());
  const [queryInput, setQueryInput] = useState<string>('Semantic CLI neden aktif yetkiye sahip değildir?');
  const [answer, setAnswer] = useState<ConstitutionalAnswer>(() =>
    engine.askConstitutionalQuery('Semantic CLI neden aktif yetkiye sahip değildir?', undefined, headSha)
  );

  const presetQueries = [
    'Semantic CLI neden aktif yetkiye sahip değildir?',
    'Phase-24 neye izin veriyor?',
    'Validator PASS neden accepted evidence değildir?',
    'Bu commit ABI sınırını değiştirdi mi?',
  ];

  const handleRunQuery = (q: string) => {
    setQueryInput(q);
    const res = engine.askConstitutionalQuery(q, undefined, headSha);
    setAnswer(res);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-cyan-400" />
            <span>Constitutional Query & Explanation Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Natural language architectural inquiry returning audit-traceable explanation packages (ConstitutionalAnswer).
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Canonical SHA:</span>
          <span className="text-cyan-400 font-bold">{headSha.slice(0, 8)}</span>
        </div>
      </div>

      {/* Query Search Bar */}
      <div className="glass-panel p-4 border-cyan-500/30 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRunQuery(queryInput)}
              placeholder="Ask an architectural or governance question..."
              className="w-full bg-slate-950 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 text-slate-100 text-xs font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={() => handleRunQuery(queryInput)}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-all flex items-center space-x-2"
          >
            <span>Evaluate Query</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Preset Prompt Cards */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-1">
          <span className="text-[11px] text-slate-500 font-mono flex-shrink-0">Presets:</span>
          {presetQueries.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleRunQuery(pq)}
              className="text-[11px] font-mono px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-slate-800 hover:border-cyan-500/50 flex-shrink-0"
            >
              {pq}
            </button>
          ))}
        </div>
      </div>

      {/* Structured ConstitutionalAnswer Package Display */}
      {answer && (
        <div className="space-y-6">
          {/* Answer Disclaimer Invariant Banner */}
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-mono text-amber-300 flex items-center space-x-2">
            <Lock className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span>{answer.disclaimerNotice}</span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Conclusion & Invariants Panel */}
            <div className="col-span-2 space-y-4">
              {/* Conclusion Box */}
              <div className="glass-panel p-6 border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                      Architectural Conclusion
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Status: {answer.status}
                  </span>
                </div>

                <p className="text-sm text-slate-100 font-medium leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  {answer.conclusion}
                </p>
              </div>

              {/* Applied Constitutional Invariants */}
              <div className="glass-panel p-5 border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Applied Constitutional Invariants
                </h4>

                <div className="space-y-2">
                  {answer.appliedInvariants.map((inv: string, idx: number) => (
                    <div
                      key={idx}
                      className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300 flex items-center space-x-2"
                    >
                      <ShieldCheck className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <span>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Lineage & Reasoning Sources Panel */}
            <div className="space-y-4">
              <div className="glass-panel p-6 border-indigo-500/30 space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                    Direct Provenance Lineage
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">Supporting Sources</h4>
                </div>

                <div className="space-y-3">
                  {answer.directSources.map((source: ProvenanceRecord, idx: number) => (
                    <div key={idx} className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-xs font-mono space-y-1.5">
                      <div className="flex items-center justify-between text-cyan-400">
                        <span className="font-semibold">{source.sourcePath}</span>
                        <span className="text-[10px] text-slate-500">{source.extractionMethod}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Assertion ID: {source.assertionId}</div>
                      <div className="text-[11px] text-emerald-400">Confidence Score: {(source.confidence * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
