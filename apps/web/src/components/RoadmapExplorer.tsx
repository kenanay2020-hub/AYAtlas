import React, { useState } from 'react';
import {
  Calendar,
  CheckSquare,
  Lock,
  Edit3,
  Plus,
  Clock,
  Layers,
  Kanban,
  GitCommit,
  Tag,
  ShieldCheck,
  AlertTriangle,
  FileCode,
  X,
} from 'lucide-react';
import { RoadmapItem, RoadmapKind, RoadmapItemStatus } from '@ayatlas/knowledge-model';

interface RoadmapExplorerProps {
  currentPhase: number;
  headSha: string;
}

export const RoadmapExplorer: React.FC<RoadmapExplorerProps> = ({ currentPhase, headSha }) => {
  const [activeCategory, setActiveCategory] = useState<RoadmapKind>('AYATLAS_PRODUCT');
  const [viewMode, setViewMode] = useState<'KANBAN' | 'TIMELINE' | 'RELEASE'>('KANBAN');
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Initial Sample Data for the 3 Roadmap Categories
  const [items, setItems] = useState<RoadmapItem[]>([
    // AYAtlas Product Roadmap (Editable)
    {
      id: 'm0-const',
      roadmapKind: 'AYATLAS_PRODUCT',
      title: 'Milestone 0 — Constitution & Security Contracts',
      description: 'Define read-only contract, source authority rules, and historical record policies.',
      status: 'DONE',
      priority: 'CRITICAL',
      targetVersion: 'v0.1',
      acceptanceCriteria: ['6 policy documents in docs/', 'Zero-mutation HTTP test pass'],
      deliverables: ['AYATLAS_CONSTITUTION.md', 'READ_ONLY_CONTRACT.md'],
      dependencyIds: [],
      editable: true,
      createdAt: '2026-08-06',
      updatedAt: '2026-08-06',
    },
    {
      id: 'm1-model',
      roadmapKind: 'AYATLAS_PRODUCT',
      title: 'Milestone 1 — Knowledge Foundation Schemas',
      description: 'Construct MultiAxisStatus, EntityType, RelationType, and canonical JSON hasher.',
      status: 'DONE',
      priority: 'CRITICAL',
      targetVersion: 'v0.1',
      acceptanceCriteria: ['Zod runtime validations', 'Pure SHA-256 canonical serializer'],
      deliverables: ['@ayatlas/snapshot-model', '@ayatlas/knowledge-model'],
      dependencyIds: ['m0-const'],
      editable: true,
      createdAt: '2026-08-06',
      updatedAt: '2026-08-06',
    },
    {
      id: 'm3-pipeline',
      roadmapKind: 'AYATLAS_PRODUCT',
      title: 'Milestone 3 — Deterministic 5-Stage Pipeline',
      description: 'Implement 5-stage data processing engine producing SHA-256 payload digests.',
      status: 'DONE',
      priority: 'HIGH',
      targetVersion: 'v0.2',
      acceptanceCriteria: ['Pipeline payloadDigest matching test pass'],
      deliverables: ['@ayatlas/knowledge-builder'],
      dependencyIds: ['m1-model'],
      editable: true,
      createdAt: '2026-08-06',
      updatedAt: '2026-08-06',
    },
    {
      id: 'm4-slice',
      roadmapKind: 'AYATLAS_PRODUCT',
      title: 'Milestone 4 — First Vertical Slice & Web UI',
      description: 'Deploy React 18 + Vite + Tailwind glassmorphism platform UI with Source Inspector.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      targetVersion: 'v0.3',
      acceptanceCriteria: ['Vite production build clean', 'Interactive Layer Explorer'],
      deliverables: ['apps/web', 'OverviewDashboard.tsx', 'ArchitectureExplorer.tsx'],
      dependencyIds: ['m3-pipeline'],
      editable: true,
      createdAt: '2026-08-06',
      updatedAt: '2026-08-06',
    },
    {
      id: 'm6-evidence',
      roadmapKind: 'AYATLAS_PRODUCT',
      title: 'Milestone 6 — Evidence Intelligence Explorer',
      description: 'Build interactive evidence boundary graph detailing validator outputs vs accepted evidence.',
      status: 'BACKLOG',
      priority: 'MEDIUM',
      targetVersion: 'v0.5',
      acceptanceCriteria: ['Exact-subject binding visualizer'],
      deliverables: ['EvidenceBoundaryGraph.tsx'],
      dependencyIds: ['m4-slice'],
      editable: true,
      createdAt: '2026-08-06',
      updatedAt: '2026-08-06',
    },

    // AykenOS Canonical Timeline (READ-ONLY)
    {
      id: 'ayken-p19',
      roadmapKind: 'AYKENOS_CANONICAL',
      title: 'Phase-19 — Bounded Admission & Receipt Substrate',
      description: 'Established receipt generation and bounded resource admission substrate.',
      status: 'DONE',
      priority: 'HIGH',
      targetVersion: 'Phase-19',
      acceptanceCriteria: ['Phase-19 closure decision record'],
      deliverables: ['userspace/phase19-admission-receipt'],
      dependencyIds: [],
      editable: false,
      createdAt: '2026-05-10',
      updatedAt: '2026-05-10',
      sourceReferences: [
        {
          sourceType: 'CANONICAL_DOCUMENT',
          repository: 'kenanay/AykenOS',
          ref: 'main',
          headSha,
          path: 'userspace/phase19-admission-receipt',
        },
      ],
    },
    {
      id: 'ayken-p24',
      roadmapKind: 'AYKENOS_CANONICAL',
      title: 'Phase-24 — Accepted-Evidence Boundary Planning',
      description: 'Current official phase establishing exact-subject evidence expectations and zero downstream authority creation.',
      status: 'IN_PROGRESS',
      priority: 'CRITICAL',
      targetVersion: 'Phase-24',
      acceptanceCriteria: ['Exact-subject decision boundary planning'],
      deliverables: ['docs/roadmap/CURRENT_PHASE', 'docs/phase24-accepted-evidence-planning.md'],
      dependencyIds: ['ayken-p19'],
      editable: false,
      createdAt: '2026-08-01',
      updatedAt: '2026-08-06',
      sourceReferences: [
        {
          sourceType: 'CANONICAL_DOCUMENT',
          repository: 'kenanay/AykenOS',
          ref: 'main',
          headSha,
          path: 'docs/roadmap/CURRENT_PHASE',
        },
      ],
    },

    // Analysis Backlog (Editable Observation Cards)
    {
      id: 'analysis-01',
      roadmapKind: 'ANALYSIS_BACKLOG',
      title: 'Observation — Semantic CLI Authority Boundary Clarification',
      description: 'Verification that Semantic CLI execution is bounded and cannot grant Ring0 runtime activation.',
      status: 'REVIEW',
      priority: 'HIGH',
      targetVersion: 'Analysis-v1',
      acceptanceCriteria: ['AuthorityResolver validation check'],
      deliverables: ['Analysis Warning Card'],
      dependencyIds: [],
      editable: true,
      createdAt: '2026-08-06',
      updatedAt: '2026-08-06',
    },
  ]);

  const categories = [
    { id: 'AYATLAS_PRODUCT' as RoadmapKind, label: 'AYAtlas Product Roadmap', editable: true, count: items.filter(i => i.roadmapKind === 'AYATLAS_PRODUCT').length },
    { id: 'AYKENOS_CANONICAL' as RoadmapKind, label: 'AykenOS Canonical Timeline', editable: false, count: items.filter(i => i.roadmapKind === 'AYKENOS_CANONICAL').length },
    { id: 'ANALYSIS_BACKLOG' as RoadmapKind, label: 'Analysis & Research Backlog', editable: true, count: items.filter(i => i.roadmapKind === 'ANALYSIS_BACKLOG').length },
    { id: 'ARCHIVED' as RoadmapKind, label: 'Archived Roadmaps', editable: true, count: items.filter(i => i.roadmapKind === 'ARCHIVED').length },
  ];

  const kanbanColumns: { status: RoadmapItemStatus; label: string }[] = [
    { status: 'BACKLOG', label: 'Backlog' },
    { status: 'READY', label: 'Ready' },
    { status: 'IN_PROGRESS', label: 'In Progress' },
    { status: 'REVIEW', label: 'Review' },
    { status: 'DONE', label: 'Done' },
  ];

  const currentCategoryItems = items.filter((item) => item.roadmapKind === activeCategory);

  const handleUpdateItemStatus = (itemId: string, newStatus: RoadmapItemStatus) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId && item.editable) {
          return { ...item, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return item;
      })
    );
  };

  const handleCreateNewTask = () => {
    const newTask: RoadmapItem = {
      id: `task-${Date.now()}`,
      roadmapKind: activeCategory,
      title: 'New AYAtlas Product Task',
      description: 'Task description and goals...',
      status: 'BACKLOG',
      priority: 'MEDIUM',
      targetVersion: 'v0.4',
      acceptanceCriteria: ['Criteria 1'],
      deliverables: ['Deliverable 1'],
      dependencyIds: [],
      editable: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setItems([newTask, ...items]);
    setSelectedItem(newTask);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-cyan-400" />
            <span>AYAtlas Platform Roadmaps</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Separate tracking for editable AYAtlas product tasks versus canonical read-only AykenOS timeline records.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 text-xs">
            <button
              onClick={() => setViewMode('KANBAN')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 ${
                viewMode === 'KANBAN'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Kanban className="h-3.5 w-3.5" />
              <span>Kanban Board</span>
            </button>

            <button
              onClick={() => setViewMode('TIMELINE')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 ${
                viewMode === 'TIMELINE'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Timeline View</span>
            </button>
          </div>

          {activeCategory !== 'AYKENOS_CANONICAL' && (
            <button
              onClick={handleCreateNewTask}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity"
            >
              <Plus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-4 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`glass-panel p-4 cursor-pointer transition-all duration-200 ${
              activeCategory === cat.id
                ? 'border-cyan-500/50 bg-slate-900/90 shadow-cyan-500/10'
                : 'hover:border-slate-700 opacity-80'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-100">{cat.label}</span>
              {cat.editable ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  EDITABLE
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                  <Lock className="h-2.5 w-2.5" />
                  <span>READ-ONLY</span>
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">{cat.count} Items tracked</div>
          </div>
        ))}
      </div>

      {/* Kanban Board View */}
      {viewMode === 'KANBAN' && (
        <div className="grid grid-cols-5 gap-4">
          {kanbanColumns.map((col) => {
            const colItems = currentCategoryItems.filter((i) => i.status === col.status);
            return (
              <div key={col.status} className="glass-panel p-3 min-h-[500px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {col.label}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {colItems.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 p-3.5 rounded-lg cursor-pointer transition-all duration-200 space-y-2 group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-cyan-400">{item.targetVersion}</span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              item.priority === 'CRITICAL'
                                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {item.priority}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 leading-snug">
                          {item.title}
                        </h4>

                        <p className="text-[11px] text-slate-400 line-clamp-2">{item.description}</p>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                          <span>{item.editable ? 'AYAtlas Task' : 'Canonical Record'}</span>
                          <span>{item.updatedAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'TIMELINE' && (
        <div className="glass-panel p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Chronological Item Flow</h3>
          <div className="space-y-4 relative border-l-2 border-slate-800 pl-6 ml-4">
            {currentCategoryItems.map((item, idx) => (
              <div key={item.id} className="relative group cursor-pointer" onClick={() => setSelectedItem(item)}>
                <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-cyan-400 border-2 border-slate-950"></div>
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-slate-100">{item.title}</span>
                    <span className="text-xs font-mono text-cyan-400">{item.status}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item Inspection & Edit Drawer/Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-950 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedItem.targetVersion}</span>
                    {selectedItem.editable ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        EDITABLE TASK
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                        <Lock className="h-2.5 w-2.5" />
                        <span>CANONICAL SOURCE READ-ONLY</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedItem.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status Controls if Editable */}
              {selectedItem.editable && (
                <div className="mb-6 space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Update Task Status
                  </label>
                  <select
                    value={selectedItem.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as RoadmapItemStatus;
                      handleUpdateItemStatus(selectedItem.id, newStatus);
                      setSelectedItem({ ...selectedItem, status: newStatus });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 font-mono focus:border-cyan-500 outline-none"
                  >
                    <option value="BACKLOG">BACKLOG</option>
                    <option value="READY">READY</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="REVIEW">REVIEW</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Deliverables</h4>
                <div className="space-y-1.5">
                  {selectedItem.deliverables.map((del, idx) => (
                    <div key={idx} className="text-xs font-mono text-cyan-400 bg-slate-900 p-2 rounded border border-slate-800">
                      {del}
                    </div>
                  ))}
                </div>
              </div>

              {/* Acceptance Criteria */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Acceptance Criteria</h4>
                <div className="space-y-1">
                  {selectedItem.acceptanceCriteria.map((crit, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckSquare className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{crit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Read-Only Banner if Canonical */}
            {!selectedItem.editable && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-mono text-rose-300 flex items-center space-x-2">
                <Lock className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>Canonical AykenOS records are source-controlled and read-only.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
