import React, { useState } from 'react';
import { Network, Info, Shield, Layers, Search, Filter } from 'lucide-react';
import { useSnapshotContext, CONCEPT_GLOSSARY } from '../context/SnapshotContext';

interface GraphNode {
  id: string;
  label: string;
  category: 'RING0' | 'RING3' | 'ABI' | 'EVIDENCE' | 'GOVERNANCE';
  x: number;
  y: number;
  codePath: string;
  description: string;
  trExplanation: string;
}

interface GraphEdge {
  from: string;
  to: string;
  relation: 'GOVERNS' | 'BOUNDS' | 'VERIFIES' | 'FROZEN_BY';
}

export const InteractiveGovernanceGraph: React.FC = () => {
  const { snapshot, sourceMode } = useSnapshotContext();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-ring0');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const nodes: GraphNode[] = [
    {
      id: 'node-ring0',
      label: 'Ring0 Kernel Mechanism',
      category: 'RING0',
      x: 350,
      y: 320,
      codePath: 'kernel/mm, kernel/proc',
      description: 'Pure hardware execution mechanisms without domain or business policy rules.',
      trExplanation: 'Donanım üzerinde çalışan ve yalnızca güvenli hafıza/proses yürütmesi sağlayan çekirdek mekanizması.',
    },
    {
      id: 'node-ring3',
      label: 'Ring3 Policy Runtime',
      category: 'RING3',
      x: 180,
      y: 120,
      codePath: 'userspace/semantic-cli',
      description: 'Application logic & user constraints outside kernel. Policy presence != Authority grant.',
      trExplanation: 'Sistemin ne yapacağını belirleyen ancak doğrudan çekirdek yetkisi içermeyen kullanıcı alanı katmanı.',
    },
    {
      id: 'node-abi',
      label: 'Frozen Syscall ABI',
      category: 'ABI',
      x: 520,
      y: 180,
      codePath: 'shared/abi/syscalls.h',
      description: 'Immutable system call interface boundary between Ring3 and Ring0.',
      trExplanation: 'Ring3 ile Ring0 arasında değişmezliği anayasal olarak dondurulmuş sistem çağrı arayüzü.',
    },
    {
      id: 'node-evidence',
      label: 'Accepted Evidence Claim',
      category: 'EVIDENCE',
      x: 650,
      y: 350,
      codePath: 'docs/evidence/RATIFIED_CLAIMS.md',
      description: 'Validator PASS != Accepted Evidence. Requires exact-subject SHA binding.',
      trExplanation: 'Doğrulayıcı testi geçse bile kabul edilmiş kanıt olması için exact-subject SHA bağı gereklidir.',
    },
    {
      id: 'node-phase24',
      label: 'Phase-24 Governance Pointer',
      category: 'GOVERNANCE',
      x: 350,
      y: 60,
      codePath: 'docs/roadmap/CURRENT_PHASE',
      description: 'Ratified Phase-24 governance execution boundary under AykenOS Constitution.',
      trExplanation: 'AykenOS Anayasası altında onaylanmış ve yürürlükte olan Faz-24 yönetişim sınırı.',
    },
  ];

  const edges: GraphEdge[] = [
    { from: 'node-phase24', to: 'node-ring3', relation: 'GOVERNS' },
    { from: 'node-ring3', to: 'node-abi', relation: 'BOUNDS' },
    { from: 'node-abi', to: 'node-ring0', relation: 'FROZEN_BY' },
    { from: 'node-ring0', to: 'node-evidence', relation: 'VERIFIES' },
    { from: 'node-phase24', to: 'node-evidence', relation: 'GOVERNS' },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const filteredNodes = nodes.filter((n) => filterCategory === 'ALL' || n.category === filterCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Network className="h-5 w-5 text-cyan-400" />
            <span>Interactive Governance Knowledge Graph Canvas</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visual node-edge canvas representing relational architectural edges (GOVERNS, BOUNDS, VERIFIES, FROZEN_BY).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {['ALL', 'RING0', 'RING3', 'ABI', 'EVIDENCE', 'GOVERNANCE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded text-[11px] font-semibold transition-colors ${
                filterCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Details Drawer Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Interactive SVG Canvas */}
        <div className="lg:col-span-2 glass-panel p-4 border-slate-800 relative bg-slate-950/80 min-h-[440px] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 text-[11px] text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
            <Info className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive Nodes: Click any node to inspect governance relations</span>
          </div>

          <svg className="w-full h-[400px] z-0">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="20"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
              </marker>
            </defs>

            {/* Render Edges */}
            {edges.map((edge, idx) => {
              const sourceNode = nodes.find((n) => n.id === edge.from);
              const targetNode = nodes.find((n) => n.id === edge.to);
              if (!sourceNode || !targetNode) return null;

              const isSelected = selectedNodeId === edge.from || selectedNodeId === edge.to;

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isSelected ? '#06b6d4' : '#334155'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    strokeDasharray={edge.relation === 'FROZEN_BY' ? '4 4' : 'none'}
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={(sourceNode.x + targetNode.x) / 2}
                    y={(sourceNode.y + targetNode.y) / 2 - 6}
                    fill={isSelected ? '#67e8f9' : '#64748b'}
                    fontSize="10"
                    textAnchor="middle"
                    className="font-mono font-bold"
                  >
                    {edge.relation}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNodeId === node.id;
              let fillBg = '#0f172a';
              let strokeColor = '#334155';

              if (node.category === 'RING0') strokeColor = '#ec4899';
              if (node.category === 'RING3') strokeColor = '#6366f1';
              if (node.category === 'ABI') strokeColor = '#f59e0b';
              if (node.category === 'EVIDENCE') strokeColor = '#10b981';
              if (node.category === 'GOVERNANCE') strokeColor = '#06b6d4';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 26 : 22}
                    fill={isSelected ? strokeColor : fillBg}
                    fillOpacity={isSelected ? 0.3 : 0.9}
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  <text
                    x={node.x}
                    y={node.y + 36}
                    fill={isSelected ? '#f8fafc' : '#94a3b8'}
                    fontSize="11"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                    className="select-none"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 z-10">
            <span>Snapshot Source: <strong className="text-cyan-400">{sourceMode.toUpperCase()}</strong></span>
            <span>Total Graph Edges: <strong className="text-slate-200">{edges.length}</strong></span>
          </div>
        </div>

        {/* Selected Node Details Drawer */}
        <div className="glass-panel p-5 border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <Shield className="h-5 w-5 text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-100">{selectedNode.label}</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 text-[11px]">Category:</span>
              <div className="mt-1 font-bold text-cyan-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                {selectedNode.category}
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[11px]">Code Location:</span>
              <div className="mt-1 font-mono text-cyan-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                {selectedNode.codePath}
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-[11px]">Turkish Explanation (Türkçe Açıklama):</span>
              <p className="mt-1 text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800">
                {selectedNode.trExplanation}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[11px]">Technical Invariant:</span>
              <p className="mt-1 text-slate-400 leading-relaxed bg-slate-900/60 p-3 rounded border border-slate-800">
                {selectedNode.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
