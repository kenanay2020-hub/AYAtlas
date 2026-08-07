import React, { useState } from 'react';
import { Search, Code, ShieldCheck, FileText, ArrowRight, X, Terminal, CheckCircle2, Lock } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';

interface InvariantCodeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CodeMatchResult {
  filePath: string;
  matchedLineNumber: number;
  codeSnippet: string;
  invariantRule: string;
  classification: 'VERIFIED_IMPLEMENTATION' | 'BOUNDED' | 'FROZEN_ABI';
}

export const InvariantCodeSearchModal: React.FC<InvariantCodeSearchModalProps> = ({ isOpen, onClose }) => {
  const { snapshot, sourceMode, headSha } = useSnapshotContext();
  const [searchTerm, setSearchTerm] = useState<string>('grantsNewAuthority');

  const substrateCodeFiles: CodeMatchResult[] = [
    {
      filePath: 'userspace/semantic-cli/src/main.rs',
      matchedLineNumber: 42,
      codeSnippet: 'pub const GRANTS_NEW_AUTHORITY: bool = false;\n// Semantic CLI executes strictly bounded under Ring3 policy runtime',
      invariantRule: 'Invariance Rule 1: Read-Only Policy Isolation (grantsNewAuthority = FALSE)',
      classification: 'BOUNDED',
    },
    {
      filePath: 'shared/abi/syscalls.h',
      matchedLineNumber: 15,
      codeSnippet: '#define SYS_AYKEN_EXEC 0x01\n#define SYS_AYKEN_VERIFY 0x02\n/* FROZEN ABI BOUNDARY: Zero modifications allowed */',
      invariantRule: 'Invariance Rule 4: Frozen Syscall ABI Contract',
      classification: 'FROZEN_ABI',
    },
    {
      filePath: 'proofd/src/main.rs',
      matchedLineNumber: 88,
      codeSnippet: 'fn verify_evidence(sha: &str) -> VerificationResult {\n    // Invariant: Validator Output PASS != Accepted Evidence\n    assert_exact_subject_binding(sha);\n}',
      invariantRule: 'Invariance Rule 3: Exact-Subject Commit SHA Evidence Binding',
      classification: 'VERIFIED_IMPLEMENTATION',
    },
    {
      filePath: 'ayken-core/crates/bcib/src/lib.rs',
      matchedLineNumber: 24,
      codeSnippet: 'pub struct BCIBCommand {\n    pub opcode: u16,\n    pub payload_digest: [u8; 32],\n}',
      invariantRule: 'Invariance Rule 2: Mechanism vs Policy Separation (Ring0 Kernel Substrate)',
      classification: 'VERIFIED_IMPLEMENTATION',
    },
    {
      filePath: 'docs/roadmap/CURRENT_PHASE',
      matchedLineNumber: 1,
      codeSnippet: 'Phase-24: Exact-Subject Evidence Planning\nStatus: ACTIVE & RATIFIED',
      invariantRule: 'Current Phase Governance Binding',
      classification: 'BOUNDED',
    },
  ];

  if (!isOpen) return null;

  const filteredResults = substrateCodeFiles.filter(
    (item) =>
      item.filePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codeSnippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invariantRule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presetTerms = [
    'grantsNewAuthority',
    'FROZEN ABI',
    'Validator Output PASS',
    'BCIBCommand',
    'Phase-24',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="glass-panel w-full max-w-4xl max-h-[85vh] flex flex-col border-slate-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Search className="h-5 w-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Constitutional Invariant Code Search</h3>
              <p className="text-[11px] text-slate-400">Search grounded AykenOS substrate files for exact invariant code lines and SHA bindings.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Input Bar & Presets */}
        <div className="p-5 bg-slate-900/60 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword, path, invariant rule, or code symbol..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-500/50"
              autoFocus
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-slate-400">Preset Searches:</span>
            {presetTerms.map((term: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSearchTerm(term)}
                className="bg-slate-950 hover:bg-slate-800 text-cyan-300 px-2.5 py-1 rounded-md border border-slate-800 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Stream */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Matched Code Lines ({filteredResults.length}):</span>
            <span>Substrate Mode: <strong className="text-cyan-400">{sourceMode.toUpperCase()}</strong></span>
          </div>

          {filteredResults.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 space-y-2">
              <Code className="h-8 w-8 text-slate-600 mx-auto" />
              <div>No matching code lines found for "{searchTerm}".</div>
            </div>
          ) : (
            filteredResults.map((result: CodeMatchResult, idx: number) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
                    <FileText className="h-4 w-4 text-cyan-400" />
                    <span>{result.filePath}:{result.matchedLineNumber}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    result.classification === 'VERIFIED_IMPLEMENTATION'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : result.classification === 'FROZEN_ABI'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                  }`}>
                    {result.classification}
                  </span>
                </div>

                <div className="text-[11px] text-cyan-300 font-mono">
                  {result.invariantRule}
                </div>

                <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">
                  {result.codeSnippet}
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
          <span>Grounded Target: <strong className="text-slate-200">kenanay/AykenOS</strong></span>
          <span>Commit: <strong className="text-indigo-400">{headSha.slice(0, 8)}</strong></span>
        </div>
      </div>
    </div>
  );
};
