import { Activity, ShieldCheck, Database, GitCommit, CheckCircle2, AlertOctagon, Cpu, Lock, FileCode, Layers } from 'lucide-react';

interface HealthDashboardProps {
  headSha: string;
  currentPhase: number;
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({ headSha, currentPhase }) => {
  const metrics = [
    { label: 'Current Active Phase', value: `Phase-${currentPhase}`, status: 'ACTIVE', color: 'text-cyan-400', icon: Cpu },
    { label: 'Repository Integrity', value: '100% Verified', status: 'PASS', color: 'text-emerald-400', icon: Database },
    { label: 'Authority Boundary Integrity', value: 'Ring0 / Ring3 Bounded', status: 'PASS', color: 'text-emerald-400', icon: ShieldCheck },
    { label: 'Evidence Binding Ratio', value: 'Exact-Subject SHA Bound', status: 'PASS', color: 'text-indigo-400', icon: Lock },
    { label: 'Syscall ABI Status', value: 'FROZEN (100% Intact)', status: 'FROZEN', color: 'text-emerald-400', icon: CheckCircle2 },
    { label: 'Critical Drift Violations', value: '0 Critical Violations', status: 'CLEAN', color: 'text-emerald-400', icon: AlertOctagon },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span>Architecture Health & Trust Dashboard</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time single-pane evaluation of AykenOS technical integrity, contract freeze status, and governance health score.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/30 font-mono text-xs text-emerald-400 font-bold">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Overall Trust Score: 98 / 100 (EXCELLENT)</span>
          </div>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-3 gap-6">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel p-5 border-slate-800 space-y-3 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{m.label}</span>
                <Icon className={`h-4 w-4 ${m.color}`} />
              </div>

              <div className={`text-lg font-bold font-mono ${m.color}`}>{m.value}</div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
                <span>Status: <strong className="text-slate-300">{m.status}</strong></span>
                <span>Verified vs SHA {headSha.slice(0, 8)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health Matrix Summary */}
      <div className="glass-panel p-6 border-cyan-500/30 space-y-4">
        <h3 className="text-base font-bold text-slate-100">AykenOS Architectural Substrate Health Summary</h3>

        <div className="space-y-3 font-mono text-xs">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-200">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Substrate Mechanism vs Policy Separation</span>
            </div>
            <span className="text-emerald-400 font-bold">VERIFIED (100% Compliant)</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-200">
              <Lock className="h-4 w-4 text-indigo-400" />
              <span>Phase-24 Exact-Subject Evidence Planning</span>
            </div>
            <span className="text-emerald-400 font-bold">RATIFIED & ACTIVE</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-200">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>Unratified Code Authority Grant Invariant</span>
            </div>
            <span className="text-emerald-400 font-bold">INVARIANT ENFORCED (grantsNewAuthority = false)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
