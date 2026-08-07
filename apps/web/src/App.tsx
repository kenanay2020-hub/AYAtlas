import React, { useState, useEffect } from 'react';
import { TopStatusBar } from './components/TopStatusBar';
import { SidebarNavigation } from './components/SidebarNavigation';
import { BreadcrumbNav } from './components/BreadcrumbNav';
import { OverviewDashboard } from './components/OverviewDashboard';
import { HealthDashboard } from './components/HealthDashboard';
import { TimelineExplorer } from './components/TimelineExplorer';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { AykenOSTechnicalAtlas } from './components/AykenOSTechnicalAtlas';
import { ExecutionFlowCanvas } from './components/ExecutionFlowCanvas';
import { RepositoryDependencyGraph } from './components/RepositoryDependencyGraph';
import { PhaseExplorer } from './components/PhaseExplorer';
import { EvidenceExplorer } from './components/EvidenceExplorer';
import { InteractiveGovernanceGraph } from './components/InteractiveGovernanceGraph';
import { SnapshotDiffViewer } from './components/SnapshotDiffViewer';
import { CIVerifierDashboard } from './components/CIVerifierDashboard';
import { ConstitutionalTestRunner } from './components/ConstitutionalTestRunner';
import { ConstitutionalQueryExplorer } from './components/ConstitutionalQueryExplorer';
import { DriftExplorer } from './components/DriftExplorer';
import { RepositoryIntelligence } from './components/RepositoryIntelligence';
import { RoadmapExplorer } from './components/RoadmapExplorer';
import { InteractiveLearningCenter } from './components/InteractiveLearningCenter';
import { SourceInspectorDrawer } from './components/SourceInspectorDrawer';
import { InvariantCodeSearchModal } from './components/InvariantCodeSearchModal';
import { SnapshotProvider, useSnapshotContext } from './context/SnapshotContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any | null>(null);
  const { headSha, snapshot, detectedPhase } = useSnapshotContext();
  const payloadDigest = snapshot?.identity.manifestDigest || 'sha256_digest_manifest';

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-mono">
      {/* Top Status Bar */}
      <TopStatusBar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Flex Layout: Sidebar + Main Content Viewport */}
      <div className="flex-1 flex overflow-hidden">
        <SidebarNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Breadcrumb Path Navigation Header */}
          <BreadcrumbNav activeTab={activeTab} />

          {activeTab === 'overview' && (
            <OverviewDashboard
              currentPhase={detectedPhase}
              headSha={headSha}
              payloadDigest={payloadDigest}
              onSelectComponent={(comp: any) => setSelectedComponent(comp)}
            />
          )}

          {activeTab === 'health' && (
            <HealthDashboard
              headSha={headSha}
              currentPhase={detectedPhase}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineExplorer
              headSha={headSha}
            />
          )}

          {activeTab === 'technical-atlas' && (
            <AykenOSTechnicalAtlas />
          )}

          {activeTab === 'execution-flow' && (
            <ExecutionFlowCanvas />
          )}

          {activeTab === 'repo-deps' && (
            <RepositoryDependencyGraph />
          )}

          {activeTab === 'architecture' && (
            <ArchitectureExplorer
              onSelectComponent={(comp: any) => setSelectedComponent(comp)}
            />
          )}

          {activeTab === 'phases' && (
            <PhaseExplorer
              currentPhase={detectedPhase}
              headSha={headSha}
            />
          )}

          {activeTab === 'evidence' && (
            <EvidenceExplorer
              headSha={headSha}
            />
          )}

          {activeTab === 'graph' && (
            <InteractiveGovernanceGraph />
          )}

          {activeTab === 'test-runner' && (
            <ConstitutionalTestRunner />
          )}

          {activeTab === 'snapshot-diff' && (
            <SnapshotDiffViewer />
          )}

          {activeTab === 'ci-verifier' && (
            <CIVerifierDashboard />
          )}

          {activeTab === 'query' && (
            <ConstitutionalQueryExplorer
              headSha={headSha}
            />
          )}

          {activeTab === 'drift' && (
            <DriftExplorer
              headSha={headSha}
            />
          )}

          {activeTab === 'repo-intel' && (
            <RepositoryIntelligence
              headSha={headSha}
            />
          )}

          {activeTab === 'roadmaps' && (
            <RoadmapExplorer
              currentPhase={detectedPhase}
              headSha={headSha}
            />
          )}

          {activeTab === 'learning' && (
            <InteractiveLearningCenter />
          )}
        </main>
      </div>

      <SourceInspectorDrawer
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        headSha={headSha}
      />

      <InvariantCodeSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <SnapshotProvider>
      <AppContent />
    </SnapshotProvider>
  );
}
