import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Terminal,
  FileCode,
  CheckCircle2,
  Lock,
  Activity,
  Layers,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useSnapshotContext } from '../context/SnapshotContext';

export interface ExecutionStageNode {
  id: string;
  stepNumber: number;
  titleTr: string;
  titleEn: string;
  ring: 'RING3' | 'SUBSTRATE' | 'ABI' | 'RING0' | 'EVIDENCE';
  codePath: string;
  summaryTr: string;
  techDetailEn: string;
  constitutionalRule: string;
  badge: string;
  badgeColor: string;
}

export const EXECUTION_STAGES: ExecutionStageNode[] = [
  {
    id: 'user-intent',
    stepNumber: 1,
    titleTr: 'Kullanıcı Niyeti (User Intent)',
    titleEn: 'User Intent Capture',
    ring: 'RING3',
    codePath: 'userspace/semantic-cli/src/main.rs',
    summaryTr: 'Kullanıcının sisteme ilettiği doğal dil veya komut satir isteği.',
    techDetailEn: 'High-level user request submitted to Ring3 userspace runtime. Represents raw unvalidated intent.',
    constitutionalRule: 'Implementation existence in Ring3 does NOT grant runtime execution authority.',
    badge: 'UNVALIDATED INTENT',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
  },
  {
    id: 'semantic-cli',
    titleTr: 'Semantic CLI Ayrıştırma',
    stepNumber: 2,
    titleEn: 'Semantic CLI Intent Parsing',
    ring: 'RING3',
    codePath: 'userspace/semantic-cli/src/parser.rs',
    summaryTr: 'Niyetin DSL kuralları ve BCIB komut yapısına dönüştürülmesi.',
    techDetailEn: 'Ring3 policy parser. Converts semantic intent strings into structured BCIB instruction candidates.',
    constitutionalRule: 'Semantic CLI execution operates under grantsNewAuthority = FALSE isolation.',
    badge: 'BOUNDED POLICY',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'bcib-encoder',
    stepNumber: 3,
    titleTr: 'BCIB İkili Komut Kodlama',
    titleEn: 'BCIB Binary Command Encoding',
    ring: 'SUBSTRATE',
    codePath: 'ayken-core/crates/bcib/src/lib.rs',
    summaryTr: 'Komutların deterministik BCIB (Binary Command & Instruction) formatına serileştirilmesi.',
    techDetailEn: 'Anatomical BCIB encoding generating canonical byte-aligned instruction frames.',
    constitutionalRule: 'BCIB streams enforce strict binary layout determinism before touching ABI boundaries.',
    badge: 'CANONICAL SUBSTRATE',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'syscall-abi',
    stepNumber: 4,
    titleTr: 'Dondurulmuş Sistem Çağrısı Arayüzü',
    titleEn: 'Frozen Syscall ABI Boundary',
    ring: 'ABI',
    codePath: 'shared/abi/syscalls.h',
    summaryTr: 'Komutun dondurulmuş değişmez sistem çağrısı sınırından Ring0 çekirdeğine iletilmesi.',
    techDetailEn: 'Immutable Syscall ABI boundary (`shared/abi`). System call registers and anatomical traps.',
    constitutionalRule: 'Modifying shared/abi syscall numbers triggers CRITICAL_ABI_FREEZE_VIOLATION.',
    badge: 'FROZEN CONTRACT',
    badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  },
  {
    id: 'ring0-kernel',
    stepNumber: 5,
    titleTr: 'Minimal Ring0 Çekirdek Yürütmesi',
    titleEn: 'Minimal Ring0 Mechanism Kernel Execution',
    ring: 'RING0',
    codePath: 'kernel/sys/syscall.c',
    summaryTr: 'Saf donanım mekanizması üzerinde komutun politika içermeden çalıştırılması.',
    techDetailEn: 'Ring0 mechanism kernel. Executes hardware instructions, manages memory mapping and registers without business policy.',
    constitutionalRule: 'Ring0 provides pure hardware execution mechanisms isolated from domain policies.',
    badge: 'MECHANISM CORE',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'execution-trace',
    stepNumber: 6,
    titleTr: 'Yürütme İzi ve İkili Özet',
    titleEn: 'Execution Trace & Output Digest',
    ring: 'SUBSTRATE',
    codePath: 'kernel/trace/tracer.c',
    summaryTr: 'Çekirdek yürütme çıktısının SHA-256 ikili özeti ve kayıt izi.',
    techDetailEn: 'Deterministic execution output capture generating cryptographic SHA-256 payload digest.',
    constitutionalRule: 'Raw execution trace outputs are evidence candidates, not accepted evidence.',
    badge: 'EVIDENCE CANDIDATE',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'proofd-verifier',
    stepNumber: 7,
    titleTr: 'proofd Kanıt Doğrulayıcı',
    titleEn: 'proofd Verification Engine',
    ring: 'EVIDENCE',
    codePath: 'proofd/src/main.rs',
    summaryTr: 'Kanıt adayının exact-subject commit SHA bağı ve doğrulayıcı testleriyle doğrulanması.',
    techDetailEn: 'Verification engine validating exact-subject SHA binding and assertion predicates.',
    constitutionalRule: 'Validator PASS status is a prerequisite but NOT equivalent to Accepted Evidence.',
    badge: 'EXACT-SUBJECT BINDING',
    badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
  },
  {
    id: 'accepted-evidence',
    stepNumber: 8,
    titleTr: 'Kabul Edilmiş Anayasal Kanıt',
    titleEn: 'Ratified Accepted Evidence Entry',
    ring: 'EVIDENCE',
    codePath: 'docs/roadmap/CURRENT_PHASE',
    summaryTr: 'Exact-subject commit SHA ile mühürlenmiş anayasal kabul edilmiş kanıt girdisi.',
    techDetailEn: 'Ratified governance evidence entry permanently bound to active commit SHA in Phase-24 plan.',
    constitutionalRule: 'Accepted Evidence permanently binds execution output to ratified Git commit SHA.',
    badge: 'RATIFIED EVIDENCE',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
];

export const ExecutionFlowCanvas: React.FC = () => {
  const { headSha, snapshot } = useSnapshotContext();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedStage, setSelectedStage] = useState<ExecutionStageNode>(EXECUTION_STAGES[0]);

  // Simulation timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          const next = prev >= EXECUTION_STAGES.length ? 1 : prev + 1;
          setSelectedStage(EXECUTION_STAGES[next - 1]);
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNextStep = () => {
    setActiveStep((prev) => {
      const next = prev >= EXECUTION_STAGES.length ? 1 : prev + 1;
      setSelectedStage(EXECUTION_STAGES[next - 1]);
      return next;
    });
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(1);
    setSelectedStage(EXECUTION_STAGES[0]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            <span>End-to-End Execution & Evidence Flow Canvas</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulate complete execution journey from Ring3 User Intent through BCIB, Syscall ABI, Ring0 Kernel to proofd Accepted Evidence.
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>{isPlaying ? 'PAUSE SIMULATION' : 'PLAY FLOW'}</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={isPlaying}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center space-x-1"
          >
            <span>NEXT STEP</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Flow Canvas Diagram (Horizontal Step Pipeline) */}
      <div className="glass-panel p-6 bg-slate-950/80 border-slate-800 overflow-x-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-3">
          <span className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Active Step: <strong>Step {activeStep} / {EXECUTION_STAGES.length}</strong></span>
          </span>
          <span className="text-[11px] font-mono text-cyan-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            HEAD SHA: <strong>{headSha.slice(0, 8)}</strong>
          </span>
        </div>

        {/* Pipeline Nodes Flow */}
        <div className="flex items-center space-x-3 min-w-[1000px] py-4">
          {EXECUTION_STAGES.map((stage, idx) => {
            const isActive = stage.stepNumber === activeStep;
            const isPassed = stage.stepNumber < activeStep;

            return (
              <React.Fragment key={stage.id}>
                {/* Node Box */}
                <div
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStep(stage.stepNumber);
                    setSelectedStage(stage);
                  }}
                  className={`flex-1 p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                    isActive
                      ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/10 scale-105 z-10'
                      : isPassed
                      ? 'bg-slate-900/90 border-emerald-500/40 text-slate-300'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className={`px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                        0{stage.stepNumber}
                      </span>
                      <span className="text-[9px] text-slate-400">{stage.ring}</span>
                    </div>
                    <div className={`font-bold text-xs line-clamp-1 ${isActive ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {stage.titleTr}
                    </div>
                    <div className="text-[9px] text-slate-400 truncate font-mono">
                      {stage.codePath}
                    </div>
                  </div>

                  <div className="mt-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border inline-block ${stage.badgeColor}`}>
                      {stage.badge}
                    </span>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {idx < EXECUTION_STAGES.length - 1 && (
                  <ArrowRight
                    className={`h-5 w-5 flex-shrink-0 transition-colors ${
                      isPassed ? 'text-emerald-400' : isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-700'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Drawer Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stage Specification */}
        <div className="lg:col-span-2 glass-panel p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <span className="h-7 w-7 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-xs">
                #{selectedStage.stepNumber}
              </span>
              <div>
                <h3 className="font-bold text-base text-slate-100">{selectedStage.titleTr}</h3>
                <div className="text-xs text-slate-400">{selectedStage.titleEn}</div>
              </div>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${selectedStage.badgeColor}`}>
              {selectedStage.badge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Ring & Layer:</div>
              <div className="text-cyan-300 font-bold">{selectedStage.ring} LAYER</div>
            </div>

            <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Code Reference:</div>
              <div className="text-slate-200 font-bold truncate">{selectedStage.codePath}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300">Açıklama (Turkish Summary):</div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
              {selectedStage.summaryTr}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300">Technical Details (English Spec):</div>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
              {selectedStage.techDetailEn}
            </p>
          </div>
        </div>

        {/* Constitutional Rules & Governance Panel */}
        <div className="glass-panel p-6 border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-100">Anayasal Yürütme Kuralı</h3>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-400">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>Constitutional Invariant Rule #{selectedStage.stepNumber}</span>
              </div>
              <p className="leading-relaxed">
                {selectedStage.constitutionalRule}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-slate-400">Exact-Subject SHA Binding:</div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-mono text-[11px] truncate">
                {headSha}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Read-Only Substrate Protection</span>
            <span className="text-emerald-400 font-bold">ISOLATED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
