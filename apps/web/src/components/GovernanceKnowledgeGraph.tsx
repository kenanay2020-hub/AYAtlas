import React, { useState } from 'react';
import { Network, ShieldCheck, Lock, ArrowRight, Layers, GitCommit, FileText, CheckCircle2 } from 'lucide-react';
import { GovernanceKnowledgeGraphEngine, GovernanceGraphNode } from '@ayatlas/graph-engine';

interface GovernanceKnowledgeGraphProps {
  headSha: string;
}

export const GovernanceKnowledgeGraph: React.FC<GovernanceKnowledgeGraphProps> = ({ headSha }) => {
  const [engine] = useState(() => new GovernanceKnowledgeGraphEngine());
  const [selectedNodeId, setSelectedNodeId] = useState<string>('phase-24');

  const nodes = engine.getAllNodes();
  const edges = engine.getAllEdges();
  const neighborhood = engine.getNeighborhood(selectedNodeId);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Network className="h-5 w-5 text-cyan-400" />
            <span>Interactive Governance Knowledge Graph</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Cross-document reasoning engine connecting constitutional invariants, phase decisions, ABI boundaries, and evidence chains.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Canonical SHA:</span>
          <span className="text-cyan-400 font-bold">{headSha.slice(0, 8)}</span>
        </div>
      </div>

      {/* Graph Visual Grid & Neighborhood Inspection */}
      <div className="grid grid-cols-3 gap-6">
        {/* Graph Node Selection Matrix */}
        <div className="col-span-2 space-y-4">
          <div className="glass-panel p-6 border-cyan-500/30 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Constitutional Knowledge Graph Topology Nodes
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-cyan-500/70 bg-slate-900/90 shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold">
                        {node.domain}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{node.authorityClass}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-100 mb-1">{node.label}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{node.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Relational Edges List */}
          <div className="glass-panel p-5 border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              System Relationships & Governance Invariants
            </h4>

            <div className="space-y-2">
              {edges.map((edge) => (
                <div
                  key={edge.id}
                  className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2 text-cyan-300">
                    <span className="font-semibold">{edge.sourceId}</span>
                    <span className="text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px]">
                      {edge.relation}
                    </span>
                    <span className="font-semibold">{edge.targetId}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{edge.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Neighborhood Inspector Drawer Panel */}
        <div className="space-y-4">
          {neighborhood && (
            <div className="glass-panel p-6 border-cyan-500/30 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Cross-Document Neighborhood
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1">{neighborhood.targetNode.label}</h3>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Domain & Authority</h4>
                <div className="flex space-x-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                    {neighborhood.targetNode.domain}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                    {neighborhood.targetNode.authorityClass}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Node Description</h4>
                <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {neighborhood.targetNode.description}
                </p>
              </div>

              {/* Connected Nodes */}
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Connected Governance Nodes</h4>
                <div className="space-y-2">
                  {neighborhood.connectedNodes.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setSelectedNodeId(n.id)}
                      className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs font-mono cursor-pointer hover:border-cyan-500/40 flex items-center justify-between"
                    >
                      <span className="text-cyan-300 font-semibold">{n.label}</span>
                      <ArrowRight className="h-3 w-3 text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
