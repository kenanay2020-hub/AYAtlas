import React from 'react';
import {
  LayoutDashboard,
  Activity,
  GitCommit,
  Layers,
  Network,
  HelpCircle,
  AlertOctagon,
  GitBranch,
  ShieldCheck,
  Map,
  BookOpen,
  ChevronRight,
  UserCheck,
  Cpu,
} from 'lucide-react';

interface SidebarNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const menuGroups = [
    {
      groupTitle: 'OBSERVE',
      items: [
        { id: 'overview', label: 'Atlas Overview', icon: LayoutDashboard },
        { id: 'health', label: 'Health & Trust', icon: Activity },
        { id: 'timeline', label: 'Evolution Timeline', icon: GitCommit },
      ],
    },
    {
      groupTitle: 'EXPLORE',
      items: [
        { id: 'technical-atlas', label: 'AykenOS Technical Atlas', icon: Cpu },
        { id: 'architecture', label: 'Architecture Map', icon: Layers },
        { id: 'graph', label: 'Governance Graph', icon: Network },
        { id: 'phases', label: 'Phase Catalog', icon: GitBranch },
        { id: 'evidence', label: 'Evidence Boundary', icon: ShieldCheck },
      ],
    },
    {
      groupTitle: 'ANALYZE',
      items: [
        { id: 'query', label: 'Constitutional Query', icon: HelpCircle },
        { id: 'drift', label: 'Drift & Contradiction', icon: AlertOctagon },
        { id: 'repo-intel', label: 'Repo Intelligence', icon: GitCommit },
      ],
    },
    {
      groupTitle: 'LEARN & PLAN',
      items: [
        { id: 'learning', label: 'Learning Center', icon: BookOpen },
        { id: 'roadmaps', label: 'Roadmaps', icon: Map },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-3.5rem)] font-mono">
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {menuGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-2">
            <div className="text-[10px] font-bold text-slate-500 tracking-wider px-2">
              {group.groupTitle}
            </div>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Developer Credit & Substrate Reference */}
      <div className="p-4 border-t border-slate-800 text-[10px] text-slate-400 space-y-1.5 bg-slate-950/60">
        <div className="flex items-center space-x-1.5 text-cyan-300 font-bold">
          <UserCheck className="h-3.5 w-3.5 text-cyan-400" />
          <span>Geliştiren / Mimar: Kenan AY</span>
        </div>
        <div>Target Repository: <strong className="text-slate-300">kenanay/AykenOS</strong></div>
        <div>Constitution: <strong className="text-emerald-400">Ratified Phase-24</strong></div>
      </div>
    </aside>
  );
};
