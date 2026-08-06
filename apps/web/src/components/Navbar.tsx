import React from 'react';
import { Layers, Compass, GitCommit, ShieldCheck, Database, BookOpen, Calendar, Flag, Network, Server, HelpCircle, AlertOctagon, Lock, Activity, History } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  headSha: string;
  currentPhase: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  headSha,
  currentPhase,
}) => {
  const tabs = [
    { id: 'overview', label: 'Atlas Overview', icon: Compass },
    { id: 'health', label: 'Health & Trust', icon: Activity },
    { id: 'timeline', label: 'Timeline', icon: History },
    { id: 'graph', label: 'Governance Graph', icon: Network },
    { id: 'query', label: 'Query Console', icon: HelpCircle },
    { id: 'drift', label: 'Drift Inspector', icon: AlertOctagon },
    { id: 'repo-intel', label: 'Repo Intelligence', icon: Server },
    { id: 'architecture', label: 'Architecture Map', icon: Layers },
    { id: 'phases', label: 'Phases', icon: Flag },
    { id: 'evidence', label: 'Evidence Boundary', icon: ShieldCheck },
    { id: 'roadmaps', label: 'Roadmaps', icon: Calendar },
    { id: 'learning', label: 'Learning Center', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/80 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-100 tracking-tight">AYAtlas</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">
                v1.0 Platform
              </span>
            </div>
            <p className="text-xs text-slate-400">Architecture Intelligence Platform for AykenOS</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Snapshot Badge & Read-Only Status */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="flex items-center space-x-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Target:</span>
            <span className="text-cyan-400 font-semibold">kenanay/AykenOS</span>
            <span className="text-slate-600">|</span>
            <GitCommit className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-indigo-300">{headSha.slice(0, 8)}</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-bold">Phase-{currentPhase}</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400">
            <Lock className="h-3.5 w-3.5" />
            <span className="font-semibold text-[11px]">READ-ONLY ISOLATED</span>
          </div>
        </div>
      </div>
    </header>
  );
};
