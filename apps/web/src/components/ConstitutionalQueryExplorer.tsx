import React, { useState } from 'react';
import { HelpCircle, Search, FileText, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { ConstitutionalQueryEngine, ConstitutionalAnswerPackage } from '@ayatlas/query-engine';
import { useSnapshotContext } from '../context/SnapshotContext';

export const ConstitutionalQueryExplorer: React.FC<{ headSha: string }> = ({ headSha }) => {
  const { snapshot, sourceMode } = useSnapshotContext();
  const [queryInput, setQueryInput] = useState<string>('Semantic CLI neden aktif yetkiye sahip değil?');
  const [answer, setAnswer] = useState<ConstitutionalAnswerPackage | null>(() => {
    const engine = new ConstitutionalQueryEngine();
    return engine.askConstitutionalQuery('Semantic CLI neden aktif yetkiye sahip değil?', snapshot || undefined, headSha);
  });

  const presetQueries = [
    'Semantic CLI neden aktif yetkiye sahip değil?',
    'Phase-24 neye izin veriyor?',
    'Validator PASS neden accepted evidence değil?',
    'Bu commit ABI sınırını değiştirdi mi?',
  ];

  const handleAsk = (qText: string) => {
    setQueryInput(qText);
    const engine = new ConstitutionalQueryEngine();
    const res = engine.askConstitutionalQuery(qText, snapshot || undefined, headSha);
    setAnswer(res);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-cyan-400" />
            <span>Constitutional Natural Language Query Console</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Grounded architectural answers bound to exact file trees, SHA-256 manifest digests, and reasoning paths.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <span>Source Mode: <strong className="text-cyan-400">{sourceMode.toUpperCase()}</strong></span>
        </div>
      </div>

      {/* Query Search Bar & Presets */}
      <div className="glass-panel p-5 border-slate-800 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk(queryInput)}
              placeholder="Ask any architectural or governance question..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button
            onClick={() => handleAsk(queryInput)}
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md"
          >
            Ask Engine
          </button>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-[11px] text-slate-400">Preset Queries:</span>
          {presetQueries.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(pq)}
              className="text-[11px] bg-slate-950 hover:bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-800 transition-colors"
            >
              {pq}
            </button>
          ))}
        </div>
      </div>

      {/* Answer Package Output */}
      {answer && (
        <div className="glass-panel p-6 border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-100">Grounded Constitutional Answer Package</h3>
            </div>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg border border-emerald-500/40 font-bold">
              STATUS: {answer.governanceStatus}
            </span>
          </div>

          {/* Bilingual Answer Summaries */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 text-[11px]">Türkçe Özet (Summary):</span>
              <p className="mt-1 text-slate-100 font-bold leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm">
                {answer.answerSummaryTr}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[11px]">English Technical Summary:</span>
              <p className="mt-1 text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                {answer.answerSummaryEn}
              </p>
            </div>
          </div>

          {/* Reasoning Chain */}
          <div className="space-y-2 text-xs">
            <span className="text-slate-400 text-[11px]">Reasoning Chain Path:</span>
            <div className="space-y-1">
              {answer.reasoningChain.map((step, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <ArrowRight className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grounded Source Files & SHA-256 Digests */}
          <div className="space-y-2 text-xs">
            <span className="text-slate-400 text-[11px]">Grounded Repository Files ({answer.groundedFiles.length} matched):</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {answer.groundedFiles.map((gf, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold">
                    <FileText className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{gf.path}</span>
                  </div>
                  <div className="text-[10px] text-cyan-400 truncate">Digest: {gf.digest}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
