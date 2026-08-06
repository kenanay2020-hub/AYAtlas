import React from 'react';
import { ShieldCheck, Cpu, Terminal, Layers, FileCode, CheckCircle2, AlertTriangle, Activity, Lock, ArrowRight, User } from 'lucide-react';
import { MultiAxisStatus } from '@ayatlas/knowledge-model';

interface OverviewDashboardProps {
  currentPhase: number;
  headSha: string;
  payloadDigest: string;
  onSelectComponent: (comp: any) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  currentPhase,
  headSha,
  payloadDigest,
  onSelectComponent,
}) => {
  const categories = [
    {
      title: 'Boot & Platform Startup',
      codeRef: 'bootloader/, tools/gnu-efi',
      status: 'OPERATIONAL',
      badgeClass: 'status-badge-operational',
      desc: 'UEFI initialization, kernel ELF loader, memory map transfer, initial page tables.',
      componentId: 'bootloader',
      paths: ['bootloader/efi_main.c'],
    },
    {
      title: 'Ring0 Kernel Core',
      codeRef: 'kernel/ (arch, mm, proc, sched, sys)',
      status: 'OPERATIONAL',
      badgeClass: 'status-badge-operational',
      desc: 'Minimal mechanism kernel. Architecture init, memory manager, process context & ring3 jump.',
      componentId: 'kernel-core',
      paths: ['kernel/kernel.c', 'kernel/mm/page_alloc.c'],
    },
    {
      title: 'ABI & Syscall Boundary',
      codeRef: 'shared/abi, kernel/sys',
      status: 'FROZEN CONTRACT',
      badgeClass: 'status-badge-frozen',
      desc: 'Shared Syscall ABI. Immutable syscall table numbers and anatomical headers.',
      componentId: 'syscall-abi',
      paths: ['shared/abi/syscalls.h'],
    },
    {
      title: 'Ring3 Policy Runtime',
      codeRef: 'userspace/ (semantic-cli, runtimes)',
      status: 'BOUNDED AUTHORITY',
      badgeClass: 'status-badge-bounded',
      desc: 'Userspace policy interface. Includes Semantic CLI and minimal round-trip binaries.',
      componentId: 'semantic-cli',
      paths: ['userspace/semantic-cli/src/main.rs'],
    },
    {
      title: 'Data & Execution Substrate',
      codeRef: 'ayken-core/crates/ (abdf, bcib)',
      status: 'OPERATIONAL SUBSTRATE',
      badgeClass: 'status-badge-operational',
      desc: 'Typed ABDF binary data format and deterministic BCIB binary instruction representation.',
      componentId: 'abdf-substrate',
      paths: ['ayken-core/crates/abdf/src/lib.rs', 'ayken-core/crates/bcib/src/lib.rs'],
    },
    {
      title: 'Verification & Evidence',
      codeRef: 'proofd, proof-verifier, tools/verification',
      status: 'GOVERNANCE BOUNDARY',
      badgeClass: 'status-badge-governance',
      desc: 'Evidence candidates, exact-subject binding, validator outputs vs accepted-evidence boundaries.',
      componentId: 'proofd-service',
      paths: ['proofd/src/main.rs', 'tools/verification/proof_verifier.py'],
    },
    {
      title: 'Tooling & CI Infrastructure',
      codeRef: 'tools/, .github/workflows',
      status: 'ACTIVE GATES',
      badgeClass: 'status-badge-operational',
      desc: '20+ workflow CI gates categorized into Architecture, Runtime, Contract, Evidence, and Governance families.',
      componentId: 'ci-gates',
      paths: ['.github/workflows/ci-freeze.yml'],
    },
    {
      title: 'Constitutional Governance',
      codeRef: 'docs/roadmap/CURRENT_PHASE',
      status: 'PHASE-24 ACTIVE',
      badgeClass: 'status-badge-governance',
      desc: 'Phase-24 accepted-evidence planning, exact-subject expectation, zero downstream authority creation.',
      componentId: 'phase-governance',
      paths: ['docs/roadmap/CURRENT_PHASE'],
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-950/90 border-cyan-500/30">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-slate-100">AykenOS System Status</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                ACTIVE PHASE: Phase-{currentPhase}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1">
                <User className="h-3.5 w-3.5 text-indigo-400" />
                <span>Mimar & Geliştiren: Kenan AY</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              AykenOS is an execution-centric operating system architecture separating minimal Ring0 mechanisms from Ring3 policies. 
              Designed & Developed by <strong>Kenan AY</strong>. Operating under Phase-24 exact-subject evidence planning and accepted-evidence boundary specifications.
            </p>
          </div>
          <div className="text-right text-xs font-mono space-y-1 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
            <div className="text-slate-400">Deterministic Digest</div>
            <div className="text-cyan-400 font-semibold">{payloadDigest.slice(0, 16)}...</div>
            <div className="text-slate-500 text-[10px]">SHA-256 Payload Hash</div>
          </div>
        </div>

        {/* Phase 24 Authority Notice */}
        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span>
            <strong>Phase-24 Authority Notice:</strong> Code existence in Ring3 (Semantic CLI, AI Runtime, Admission Receipts) 
            does NOT grant runtime execution authority or create accepted evidence without explicit exact-subject governance approval.
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ring0 Kernel</div>
            <div className="text-lg font-bold text-slate-100">Operational</div>
            <div className="text-[11px] text-emerald-400 font-mono">Mechanism Core</div>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Syscall ABI</div>
            <div className="text-lg font-bold text-slate-100">Frozen</div>
            <div className="text-[11px] text-amber-400 font-mono">shared/abi</div>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Ring3 Policy</div>
            <div className="text-lg font-bold text-slate-100">Bounded</div>
            <div className="text-[11px] text-indigo-400 font-mono">Semantic CLI</div>
          </div>
        </div>

        <div className="glass-panel p-4 flex items-center space-x-4">
          <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Evidence Status</div>
            <div className="text-lg font-bold text-slate-100">Exact-Subject</div>
            <div className="text-[11px] text-cyan-400 font-mono">Phase-24 Plan</div>
          </div>
        </div>
      </div>

      {/* Component Grid */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
          <Layers className="h-5 w-5 text-cyan-400" />
          <span>AykenOS Substrate Architecture Components</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectComponent(cat)}
              className="glass-panel p-5 cursor-pointer hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {cat.title}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${cat.badgeClass}`}>
                    {cat.status}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 truncate">
                  {cat.codeRef}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                <span>Inspect Component Source</span>
                <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
