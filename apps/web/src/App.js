import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { HealthDashboard } from './components/HealthDashboard';
import { TimelineExplorer } from './components/TimelineExplorer';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { PhaseExplorer } from './components/PhaseExplorer';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { GovernanceKnowledgeGraph } from './components/GovernanceKnowledgeGraph';
import { ConstitutionalQueryExplorer } from './components/ConstitutionalQueryExplorer';
import { DriftExplorer } from './components/DriftExplorer';
import { RepositoryIntelligence } from './components/RepositoryIntelligence';
import { RoadmapExplorer } from './components/RoadmapExplorer';
import { SourceInspectorDrawer } from './components/SourceInspectorDrawer';
import { OfflineFixtureRepositorySource } from '@ayatlas/github-reader';
import { KnowledgePipelineEngine } from '@ayatlas/knowledge-builder';
export function App() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [headSha, setHeadSha] = useState('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f');
    const [currentPhase, setCurrentPhase] = useState(24);
    const [payloadDigest, setPayloadDigest] = useState('');
    useEffect(() => {
        async function loadPipelineData() {
            const source = new OfflineFixtureRepositorySource(headSha);
            const engine = new KnowledgePipelineEngine(source);
            const pipelineRes = await engine.runFullPipeline();
            setPayloadDigest(pipelineRes.s5.metadata.payloadDigest);
            setCurrentPhase(pipelineRes.s2.payload.currentPhase);
        }
        loadPipelineData();
    }, [headSha]);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200", children: [_jsx(Navbar, { activeTab: activeTab, setActiveTab: setActiveTab, headSha: headSha, currentPhase: currentPhase }), _jsxs("main", { className: "flex-1 py-6", children: [activeTab === 'overview' && (_jsx(OverviewDashboard, { currentPhase: currentPhase, headSha: headSha, payloadDigest: payloadDigest, onSelectComponent: (comp) => setSelectedComponent(comp) })), activeTab === 'health' && (_jsx(HealthDashboard, { headSha: headSha, currentPhase: currentPhase })), activeTab === 'timeline' && (_jsx(TimelineExplorer, { headSha: headSha })), activeTab === 'architecture' && (_jsx(ArchitectureExplorer, { onSelectComponent: (comp) => setSelectedComponent(comp) })), activeTab === 'phases' && (_jsx(PhaseExplorer, { currentPhase: currentPhase, headSha: headSha })), activeTab === 'evidence' && (_jsx(EvidenceExplorer, { headSha: headSha })), activeTab === 'graph' && (_jsx(GovernanceKnowledgeGraph, { headSha: headSha })), activeTab === 'query' && (_jsx(ConstitutionalQueryExplorer, { headSha: headSha })), activeTab === 'drift' && (_jsx(DriftExplorer, { headSha: headSha })), activeTab === 'repo-intel' && (_jsx(RepositoryIntelligence, { headSha: headSha })), activeTab === 'roadmaps' && (_jsx(RoadmapExplorer, { currentPhase: currentPhase, headSha: headSha })), activeTab === 'learning' && (_jsxs("div", { className: "p-6 max-w-7xl mx-auto space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-slate-100", children: "AykenOS Deep Learning Center" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "glass-panel p-5 border-cyan-500/30", children: [_jsx("h3", { className: "font-bold text-base text-cyan-300 mb-2", children: "Path 1: Mechanism vs Policy" }), _jsx("p", { className: "text-xs text-slate-400 mb-4", children: "Learn why AykenOS separates Ring0 kernel execution mechanisms from Ring3 policy runtimes." }), _jsx("span", { className: "text-xs text-cyan-400 font-mono font-semibold", children: "Lesson 1 / 4 Completed" })] }), _jsxs("div", { className: "glass-panel p-5 border-indigo-500/30", children: [_jsx("h3", { className: "font-bold text-base text-indigo-300 mb-2", children: "Path 2: Evidence & Authority" }), _jsx("p", { className: "text-xs text-slate-400 mb-4", children: "Understand why validator output does not equal accepted evidence and how exact-subject binding works." }), _jsx("span", { className: "text-xs text-indigo-400 font-mono font-semibold", children: "Lesson 1 / 3 Completed" })] })] })] }))] }), _jsx(SourceInspectorDrawer, { component: selectedComponent, onClose: () => setSelectedComponent(null), headSha: headSha })] }));
}
//# sourceMappingURL=App.js.map