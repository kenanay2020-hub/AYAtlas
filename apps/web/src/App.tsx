import React, { useState, useEffect } from 'react';
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
  const [selectedComponent, setSelectedComponent] = useState<any | null>(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        headSha={headSha}
        currentPhase={currentPhase}
      />

      <main className="flex-1 py-6">
        {activeTab === 'overview' && (
          <OverviewDashboard
            currentPhase={currentPhase}
            headSha={headSha}
            payloadDigest={payloadDigest}
            onSelectComponent={(comp: any) => setSelectedComponent(comp)}
          />
        )}

        {activeTab === 'health' && (
          <HealthDashboard
            headSha={headSha}
            currentPhase={currentPhase}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineExplorer
            headSha={headSha}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureExplorer
            onSelectComponent={(comp: any) => setSelectedComponent(comp)}
          />
        )}

        {activeTab === 'phases' && (
          <PhaseExplorer
            currentPhase={currentPhase}
            headSha={headSha}
          />
        )}

        {activeTab === 'evidence' && (
          <EvidenceExplorer
            headSha={headSha}
          />
        )}

        {activeTab === 'graph' && (
          <GovernanceKnowledgeGraph
            headSha={headSha}
          />
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
            currentPhase={currentPhase}
            headSha={headSha}
          />
        )}

        {activeTab === 'learning' && (
          <div className="p-6 max-w-7xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-slate-100">AykenOS Deep Learning Center</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-5 border-cyan-500/30">
                <h3 className="font-bold text-base text-cyan-300 mb-2">Path 1: Mechanism vs Policy</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Learn why AykenOS separates Ring0 kernel execution mechanisms from Ring3 policy runtimes.
                </p>
                <span className="text-xs text-cyan-400 font-mono font-semibold">Lesson 1 / 4 Completed</span>
              </div>

              <div className="glass-panel p-5 border-indigo-500/30">
                <h3 className="font-bold text-base text-indigo-300 mb-2">Path 2: Evidence & Authority</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Understand why validator output does not equal accepted evidence and how exact-subject binding works.
                </p>
                <span className="text-xs text-indigo-400 font-mono font-semibold">Lesson 1 / 3 Completed</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <SourceInspectorDrawer
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        headSha={headSha}
      />
    </div>
  );
}
