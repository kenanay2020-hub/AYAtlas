import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Calendar, CheckSquare, Lock, Plus, Clock, Kanban, X, } from 'lucide-react';
export const RoadmapExplorer = ({ currentPhase, headSha }) => {
    const [activeCategory, setActiveCategory] = useState('AYATLAS_PRODUCT');
    const [viewMode, setViewMode] = useState('KANBAN');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // Initial Sample Data for the 3 Roadmap Categories
    const [items, setItems] = useState([
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
        { id: 'AYATLAS_PRODUCT', label: 'AYAtlas Product Roadmap', editable: true, count: items.filter(i => i.roadmapKind === 'AYATLAS_PRODUCT').length },
        { id: 'AYKENOS_CANONICAL', label: 'AykenOS Canonical Timeline', editable: false, count: items.filter(i => i.roadmapKind === 'AYKENOS_CANONICAL').length },
        { id: 'ANALYSIS_BACKLOG', label: 'Analysis & Research Backlog', editable: true, count: items.filter(i => i.roadmapKind === 'ANALYSIS_BACKLOG').length },
        { id: 'ARCHIVED', label: 'Archived Roadmaps', editable: true, count: items.filter(i => i.roadmapKind === 'ARCHIVED').length },
    ];
    const kanbanColumns = [
        { status: 'BACKLOG', label: 'Backlog' },
        { status: 'READY', label: 'Ready' },
        { status: 'IN_PROGRESS', label: 'In Progress' },
        { status: 'REVIEW', label: 'Review' },
        { status: 'DONE', label: 'Done' },
    ];
    const currentCategoryItems = items.filter((item) => item.roadmapKind === activeCategory);
    const handleUpdateItemStatus = (itemId, newStatus) => {
        setItems((prev) => prev.map((item) => {
            if (item.id === itemId && item.editable) {
                return { ...item, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] };
            }
            return item;
        }));
    };
    const handleCreateNewTask = () => {
        const newTask = {
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
    return (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-slate-100 flex items-center space-x-2", children: [_jsx(Calendar, { className: "h-5 w-5 text-cyan-400" }), _jsx("span", { children: "AYAtlas Platform Roadmaps" })] }), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Separate tracking for editable AYAtlas product tasks versus canonical read-only AykenOS timeline records." })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 text-xs", children: [_jsxs("button", { onClick: () => setViewMode('KANBAN'), className: `px-3 py-1.5 rounded-lg flex items-center space-x-1.5 ${viewMode === 'KANBAN'
                                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                            : 'text-slate-400 hover:text-slate-200'}`, children: [_jsx(Kanban, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Kanban Board" })] }), _jsxs("button", { onClick: () => setViewMode('TIMELINE'), className: `px-3 py-1.5 rounded-lg flex items-center space-x-1.5 ${viewMode === 'TIMELINE'
                                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                            : 'text-slate-400 hover:text-slate-200'}`, children: [_jsx(Clock, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Timeline View" })] })] }), activeCategory !== 'AYKENOS_CANONICAL' && (_jsxs("button", { onClick: handleCreateNewTask, className: "flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { children: "Add Task" })] }))] })] }), _jsx("div", { className: "grid grid-cols-4 gap-3", children: categories.map((cat) => (_jsxs("div", { onClick: () => setActiveCategory(cat.id), className: `glass-panel p-4 cursor-pointer transition-all duration-200 ${activeCategory === cat.id
                        ? 'border-cyan-500/50 bg-slate-900/90 shadow-cyan-500/10'
                        : 'hover:border-slate-700 opacity-80'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-semibold text-slate-100", children: cat.label }), cat.editable ? (_jsx("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30", children: "EDITABLE" })) : (_jsxs("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1", children: [_jsx(Lock, { className: "h-2.5 w-2.5" }), _jsx("span", { children: "READ-ONLY" })] }))] }), _jsxs("div", { className: "text-xs text-slate-400", children: [cat.count, " Items tracked"] })] }, cat.id))) }), viewMode === 'KANBAN' && (_jsx("div", { className: "grid grid-cols-5 gap-4", children: kanbanColumns.map((col) => {
                    const colItems = currentCategoryItems.filter((i) => i.status === col.status);
                    return (_jsx("div", { className: "glass-panel p-3 min-h-[500px] flex flex-col justify-between", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between pb-3 mb-3 border-b border-slate-800", children: [_jsx("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider", children: col.label }), _jsx("span", { className: "text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400", children: colItems.length })] }), _jsx("div", { className: "space-y-3", children: colItems.map((item) => (_jsxs("div", { onClick: () => setSelectedItem(item), className: "bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 p-3.5 rounded-lg cursor-pointer transition-all duration-200 space-y-2 group", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-[11px] font-mono text-cyan-400", children: item.targetVersion }), _jsx("span", { className: `text-[10px] font-mono px-2 py-0.5 rounded ${item.priority === 'CRITICAL'
                                                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                                            : 'bg-slate-800 text-slate-300'}`, children: item.priority })] }), _jsx("h4", { className: "text-xs font-bold text-slate-100 group-hover:text-cyan-300 leading-snug", children: item.title }), _jsx("p", { className: "text-[11px] text-slate-400 line-clamp-2", children: item.description }), _jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono", children: [_jsx("span", { children: item.editable ? 'AYAtlas Task' : 'Canonical Record' }), _jsx("span", { children: item.updatedAt })] })] }, item.id))) })] }) }, col.status));
                }) })), viewMode === 'TIMELINE' && (_jsxs("div", { className: "glass-panel p-6 space-y-4", children: [_jsx("h3", { className: "text-sm font-bold text-slate-200", children: "Chronological Item Flow" }), _jsx("div", { className: "space-y-4 relative border-l-2 border-slate-800 pl-6 ml-4", children: currentCategoryItems.map((item, idx) => (_jsxs("div", { className: "relative group cursor-pointer", onClick: () => setSelectedItem(item), children: [_jsx("div", { className: "absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-cyan-400 border-2 border-slate-950" }), _jsxs("div", { className: "bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-200", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsx("span", { className: "font-semibold text-sm text-slate-100", children: item.title }), _jsx("span", { className: "text-xs font-mono text-cyan-400", children: item.status })] }), _jsx("p", { className: "text-xs text-slate-400", children: item.description })] })] }, item.id))) })] })), selectedItem && (_jsx("div", { className: "fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg bg-slate-950 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between border-b border-slate-800 pb-4 mb-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs font-mono text-cyan-400 font-semibold", children: selectedItem.targetVersion }), selectedItem.editable ? (_jsx("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30", children: "EDITABLE TASK" })) : (_jsxs("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1", children: [_jsx(Lock, { className: "h-2.5 w-2.5" }), _jsx("span", { children: "CANONICAL SOURCE READ-ONLY" })] }))] }), _jsx("h3", { className: "text-lg font-bold text-slate-100 mt-1", children: selectedItem.title })] }), _jsx("button", { onClick: () => setSelectedItem(null), className: "p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 border border-slate-800", children: _jsx(X, { className: "h-5 w-5" }) })] }), selectedItem.editable && (_jsxs("div", { className: "mb-6 space-y-2", children: [_jsx("label", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider", children: "Update Task Status" }), _jsxs("select", { value: selectedItem.status, onChange: (e) => {
                                                const newStatus = e.target.value;
                                                handleUpdateItemStatus(selectedItem.id, newStatus);
                                                setSelectedItem({ ...selectedItem, status: newStatus });
                                            }, className: "w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg p-2.5 font-mono focus:border-cyan-500 outline-none", children: [_jsx("option", { value: "BACKLOG", children: "BACKLOG" }), _jsx("option", { value: "READY", children: "READY" }), _jsx("option", { value: "IN_PROGRESS", children: "IN_PROGRESS" }), _jsx("option", { value: "REVIEW", children: "REVIEW" }), _jsx("option", { value: "DONE", children: "DONE" })] })] })), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider mb-2", children: "Description" }), _jsx("p", { className: "text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800 leading-relaxed", children: selectedItem.description })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider mb-2", children: "Deliverables" }), _jsx("div", { className: "space-y-1.5", children: selectedItem.deliverables.map((del, idx) => (_jsx("div", { className: "text-xs font-mono text-cyan-400 bg-slate-900 p-2 rounded border border-slate-800", children: del }, idx))) })] }), _jsxs("div", { className: "mb-6", children: [_jsx("h4", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider mb-2", children: "Acceptance Criteria" }), _jsx("div", { className: "space-y-1", children: selectedItem.acceptanceCriteria.map((crit, idx) => (_jsxs("div", { className: "flex items-center space-x-2 text-xs text-slate-300", children: [_jsx(CheckSquare, { className: "h-3.5 w-3.5 text-emerald-400 flex-shrink-0" }), _jsx("span", { children: crit })] }, idx))) })] })] }), !selectedItem.editable && (_jsxs("div", { className: "p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs font-mono text-rose-300 flex items-center space-x-2", children: [_jsx(Lock, { className: "h-4 w-4 text-rose-400 flex-shrink-0" }), _jsx("span", { children: "Canonical AykenOS records are source-controlled and read-only." })] }))] }) }))] }));
};
//# sourceMappingURL=RoadmapExplorer.js.map