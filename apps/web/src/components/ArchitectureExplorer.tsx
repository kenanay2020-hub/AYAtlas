import React from 'react';
import { Layers, ShieldCheck, Terminal, Cpu, Database, Activity, Lock, ArrowRight, CheckCircle2, FileCode } from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';

interface ArchitectureExplorerProps {
  onSelectComponent: (comp: any) => void;
}

export const ArchitectureExplorer: React.FC<ArchitectureExplorerProps> = ({ onSelectComponent }) => {
  const { snapshot, sourceMode } = useSnapshotContext();

  const layers = [
    {
      ring: 'User / Intent Interface',
      name: 'User Intent & CLI Layer',
      color: 'border-cyan-500/40 bg-cyan-500/5',
      components: [
        { id: 'semantic-cli', label: 'Semantic CLI', path: 'userspace/semantic-cli', status: 'IMPLEMENTED / BOUNDED' },
        { id: 'obs-cli', label: 'OBS CLI', path: 'userspace/obs-cli', status: 'IMPLEMENTED / BOUNDED' },
      ],
    },
    {
      ring: 'Ring3 Policy Runtime',
      name: 'Ring3 Execution & Policy Runtime',
      color: 'border-indigo-500/40 bg-indigo-500/5',
      components: [
        { id: 'ai-runtime', label: 'AI Runtime', path: 'userspace/ai-runtime', status: 'BOUNDED / NO AI AUTHORITY' },
        { id: 'bcib-runtime', label: 'BCIB Runtime', path: 'userspace/bcib-runtime', status: 'IMPLEMENTED' },
        { id: 'dsl-parser', label: 'DSL Parser', path: 'userspace/dsl-parser', status: 'IMPLEMENTED' },
        { id: 'proofd', label: 'proofd Service', path: 'proofd', status: 'OPERATIONAL' },
        { id: 'libayken', label: 'libayken', path: 'userspace/libayken', status: 'OPERATIONAL' },
      ],
    },
    {
      ring: 'Data & Execution Substrate',
      name: 'Substrate Layer (ayken-core)',
      color: 'border-purple-500/40 bg-purple-500/5',
      components: [
        { id: 'abdf', label: 'ABDF Binary Format', path: 'ayken-core/crates/abdf', status: 'OPERATIONAL' },
        { id: 'bcib', label: 'BCIB Instruction IR', path: 'ayken-core/crates/bcib', status: 'OPERATIONAL' },
        { id: 'proof-verifier', label: 'proof-verifier', path: 'ayken-core/crates/proof-verifier', status: 'OPERATIONAL' },
      ],
    },
    {
      ring: 'ABI & Syscall Boundary',
      name: 'Frozen Syscall ABI Contract',
      color: 'border-rose-500/60 bg-rose-500/10',
      isBoundary: true,
      components: [
        { id: 'syscall-abi', label: 'Syscall ABI Boundary', path: 'shared/abi', status: 'FROZEN ANATOMICAL CONTRACT' },
      ],
    },
    {
      ring: 'Ring0 Mechanism Kernel',
      name: 'Ring0 Minimal Mechanism Kernel',
      color: 'border-emerald-500/40 bg-emerald-500/5',
      components: [
        { id: 'kernel-mm', label: 'Memory Management (mm/)', path: 'kernel/mm', status: 'OPERATIONAL MECHANISM' },
        { id: 'kernel-proc', label: 'Process & Ring3 Jump (proc/)', path: 'kernel/proc', status: 'OPERATIONAL MECHANISM' },
        { id: 'kernel-sched', label: 'Scheduler Bridge (sched/)', path: 'kernel/sched', status: 'OPERATIONAL MECHANISM' },
        { id: 'kernel-sys', label: 'Syscall Entry Gateway (sys/)', path: 'kernel/sys', status: 'OPERATIONAL MECHANISM' },
      ],
    },
    {
      ring: 'Boot & Hardware',
      name: 'Platform Initialization',
      color: 'border-slate-700 bg-slate-900/50',
      components: [
        { id: 'bootloader', label: 'UEFI Bootloader', path: 'bootloader/', status: 'OPERATIONAL' },
        { id: 'gnu-efi', label: 'GNU-EFI Tooling', path: 'tools/gnu-efi', status: 'OPERATIONAL' },
      ],
    },
  ];

  // Helper to dynamically match active snapshot files for a given component path
  const getComponentSnapshotFiles = (compPath: string) => {
    if (!snapshot) return [];
    return snapshot.files.filter((f) => f.path.startsWith(compPath) || f.path.includes(compPath));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Layers className="h-5 w-5 text-cyan-400" />
            <span>AykenOS Layered Architecture Explorer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Dynamically matching active repository snapshot file tree against minimal Ring0 execution mechanisms and Ring3 policy runtimes.
          </p>
        </div>
        <div className="flex items-center space-x-4 text-xs font-mono">
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Verified Snapshot Evidence</span>
          </span>
          <span className="flex items-center space-x-1 text-amber-400">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span>Bounded Authority</span>
          </span>
          <span className="flex items-center space-x-1 text-rose-400">
            <span className="h-2 w-2 rounded-full bg-rose-400"></span>
            <span>Frozen Boundary</span>
          </span>
        </div>
      </div>

      {/* Active Substrate Banner */}
      <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
        <span className="text-slate-300">
          Substrate Observation Mode: <strong className="text-cyan-400">{sourceMode.toUpperCase()}</strong> — Dynamically parsed <strong>{snapshot?.files.length || 0}</strong> repository files.
        </span>
        <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
          Phase-24 Governance Substrate
        </span>
      </div>

      {/* Layer Stack */}
      <div className="space-y-4">
        {layers.map((layer, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border ${layer.color} transition-all duration-300 relative`}
          >
            <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                {layer.ring}
              </span>
              <span className="text-sm font-bold text-slate-200">{layer.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {layer.components.map((comp) => {
                const matchedFiles = getComponentSnapshotFiles(comp.path);
                const hasMatched = matchedFiles.length > 0;
                const totalBytes = matchedFiles.reduce((acc, f) => acc + f.size, 0);

                return (
                  <div
                    key={comp.id}
                    onClick={() =>
                      onSelectComponent({
                        id: comp.id,
                        label: comp.label,
                        category: layer.ring,
                        description: `System component ${comp.label} located in ${comp.path}. Verified in active snapshot (${matchedFiles.length} files).`,
                        paths: [comp.path],
                        status: comp.status,
                      })
                    }
                    className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl cursor-pointer transition-all duration-200 group space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-100 group-hover:text-cyan-300">
                        {comp.label}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 truncate">
                      {comp.path}
                    </div>

                    {/* Dynamic Snapshot Match Badge */}
                    <div className="flex items-center justify-between text-[10px] pt-1 font-mono">
                      <span className={`px-2 py-0.5 rounded font-bold border flex items-center space-x-1 ${
                        hasMatched
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{hasMatched ? `${matchedFiles.length} SNAPSHOT FILES` : 'SIMULATED'}</span>
                      </span>

                      {hasMatched && (
                        <span className="text-slate-400">{(totalBytes / 1024).toFixed(1)} KB</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
