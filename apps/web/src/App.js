import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { TopStatusBar } from './components/TopStatusBar';
import { SidebarNavigation } from './components/SidebarNavigation';
import { OverviewDashboard } from './components/OverviewDashboard';
import { HealthDashboard } from './components/HealthDashboard';
import { TimelineExplorer } from './components/TimelineExplorer';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { AykenOSTechnicalAtlas } from './components/AykenOSTechnicalAtlas';
import { ExecutionFlowCanvas } from './components/ExecutionFlowCanvas';
import { PhaseExplorer } from './components/PhaseExplorer';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { InteractiveGovernanceGraph } from './components/InteractiveGovernanceGraph';
import { ConstitutionalQueryExplorer } from './components/ConstitutionalQueryExplorer';
import { DriftExplorer } from './components/DriftExplorer';
import { RepositoryIntelligence } from './components/RepositoryIntelligence';
import { RoadmapExplorer } from './components/RoadmapExplorer';
import { InteractiveLearningCenter } from './components/InteractiveLearningCenter';
import { SourceInspectorDrawer } from './components/SourceInspectorDrawer';
import { SnapshotProvider, useSnapshotContext } from './context/SnapshotContext';
function AppContent() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const { headSha, snapshot, detectedPhase } = useSnapshotContext();
    const payloadDigest = snapshot?.identity.manifestDigest || 'sha256_digest_manifest';
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-mono", children: [_jsx(TopStatusBar, { onToggleSidebar: () => setIsSidebarOpen(!isSidebarOpen), isSidebarOpen: isSidebarOpen }), _jsxs("div", { className: "flex-1 flex overflow-hidden", children: [_jsx(SidebarNavigation, { activeTab: activeTab, setActiveTab: setActiveTab, isOpen: isSidebarOpen }), _jsxs("main", { className: "flex-1 overflow-y-auto p-4 sm:p-6 space-y-6", children: [activeTab === 'overview' && (_jsx(OverviewDashboard, { currentPhase: detectedPhase, headSha: headSha, payloadDigest: payloadDigest, onSelectComponent: (comp) => setSelectedComponent(comp) })), activeTab === 'health' && (_jsx(HealthDashboard, { headSha: headSha, currentPhase: detectedPhase })), activeTab === 'timeline' && (_jsx(TimelineExplorer, { headSha: headSha })), activeTab === 'technical-atlas' && (_jsx(AykenOSTechnicalAtlas, {})), activeTab === 'execution-flow' && (_jsx(ExecutionFlowCanvas, {})), activeTab === 'architecture' && (_jsx(ArchitectureExplorer, { onSelectComponent: (comp) => setSelectedComponent(comp) })), activeTab === 'phases' && (_jsx(PhaseExplorer, { currentPhase: detectedPhase, headSha: headSha })), activeTab === 'evidence' && (_jsx(EvidenceExplorer, { headSha: headSha })), activeTab === 'graph' && (_jsx(InteractiveGovernanceGraph, {})), activeTab === 'query' && (_jsx(ConstitutionalQueryExplorer, { headSha: headSha })), activeTab === 'drift' && (_jsx(DriftExplorer, { headSha: headSha })), activeTab === 'repo-intel' && (_jsx(RepositoryIntelligence, { headSha: headSha })), activeTab === 'roadmaps' && (_jsx(RoadmapExplorer, { currentPhase: detectedPhase, headSha: headSha })), activeTab === 'learning' && (_jsx(InteractiveLearningCenter, {}))] })] }), _jsx(SourceInspectorDrawer, { component: selectedComponent, onClose: () => setSelectedComponent(null), headSha: headSha })] }));
}
export function App() {
    return (_jsx(SnapshotProvider, { children: _jsx(AppContent, {}) }));
}
//# sourceMappingURL=App.js.map