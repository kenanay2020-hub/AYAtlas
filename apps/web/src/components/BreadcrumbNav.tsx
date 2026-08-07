import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbNavProps {
  activeTab: string;
}

export const TAB_MAP: Record<string, { group: string; label: string }> = {
  overview: { group: 'OBSERVE', label: 'Atlas Overview' },
  health: { group: 'OBSERVE', label: 'Health & Trust' },
  timeline: { group: 'OBSERVE', label: 'Evolution Timeline' },

  'technical-atlas': { group: 'EXPLORE', label: 'AykenOS Technical Atlas' },
  'execution-flow': { group: 'EXPLORE', label: 'Execution Flow Canvas' },
  'repo-deps': { group: 'EXPLORE', label: 'Monorepo Topology' },
  architecture: { group: 'EXPLORE', label: 'Architecture Map' },
  graph: { group: 'EXPLORE', label: 'Governance Graph' },
  phases: { group: 'EXPLORE', label: 'Phase Catalog' },
  evidence: { group: 'EXPLORE', label: 'Evidence Boundary' },

  'snapshot-diff': { group: 'ANALYZE', label: 'Snapshot Diff' },
  'ci-verifier': { group: 'ANALYZE', label: 'CI Verifier Gates' },
  query: { group: 'ANALYZE', label: 'Constitutional Query' },
  drift: { group: 'ANALYZE', label: 'Drift & Contradiction' },
  'repo-intel': { group: 'ANALYZE', label: 'Repo Intelligence' },

  learning: { group: 'LEARN & PLAN', label: 'Learning Center' },
  roadmaps: { group: 'LEARN & PLAN', label: 'Roadmaps' },
};

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ activeTab }) => {
  const meta = TAB_MAP[activeTab] || { group: 'ATLAS', label: 'Overview' };

  return (
    <nav className="flex items-center space-x-2 text-xs font-mono text-slate-400 pb-2 border-b border-slate-800/60 mb-4 overflow-x-auto">
      <div className="flex items-center space-x-1 hover:text-slate-200 transition-colors">
        <Home className="h-3.5 w-3.5 text-cyan-400" />
        <span>AykenOS</span>
      </div>
      <ChevronRight className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />

      <span className="text-slate-400 font-semibold">{meta.group}</span>
      <ChevronRight className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />

      <span className="text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
        {meta.label}
      </span>
    </nav>
  );
};
