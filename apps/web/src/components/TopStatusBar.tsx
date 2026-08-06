import React from 'react';
import { ShieldCheck, GitCommit, Layers, RefreshCw, Terminal, Globe, HardDrive } from 'lucide-react';
import { useSnapshotContext, SourceMode } from '../context/SnapshotContext';

interface TopStatusBarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { sourceMode, setSourceMode, headSha, detectedPhase, snapshot, isLoading, refreshSnapshot } = useSnapshotContext();

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 font-mono text-xs">
      {/* Left Branding & Toggle */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          title="Toggle Navigation Sidebar"
        >
          <Layers className="h-4 w-4" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-sm bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            AYAtlas
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Digital Twin v1.0
          </span>
        </div>
      </div>

      {/* Center Substrate Badges */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Source Mode Switcher */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setSourceMode('fixture')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center space-x-1 transition-colors ${
              sourceMode === 'fixture' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="h-3 w-3" />
            <span>FIXTURE</span>
          </button>

          <button
            onClick={() => setSourceMode('local')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center space-x-1 transition-colors ${
              sourceMode === 'local' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HardDrive className="h-3 w-3" />
            <span>LOCAL</span>
          </button>

          <button
            onClick={() => setSourceMode('github')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center space-x-1 transition-colors ${
              sourceMode === 'github' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="h-3 w-3" />
            <span>GITHUB</span>
          </button>
        </div>

        {/* Head SHA */}
        <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          <GitCommit className="h-3.5 w-3.5 text-cyan-400" />
          <span>SHA:</span>
          <span className="text-cyan-400 font-bold">{headSha.slice(0, 8)}</span>
        </div>

        {/* Phase */}
        <div className="flex items-center space-x-1.5 text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          <span>Phase:</span>
          <span className="text-indigo-400 font-bold">{detectedPhase}</span>
        </div>

        {/* Read Only Protection Badge */}
        <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>READ-ONLY ISOLATED</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={refreshSnapshot}
          disabled={isLoading}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
          title="Refresh Snapshot"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
        </button>

        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          Files: <strong className="text-slate-200">{snapshot?.files.length || 0}</strong>
        </span>
      </div>
    </header>
  );
};
