import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OfflineFixtureRepositorySource, GitHubReadOnlyRepositorySource, LocalReadOnlyRepositorySource, ReadOnlyRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor, IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
import { GovernanceKnowledgeGraphEngine } from '@ayatlas/graph-engine';

export type SourceMode = 'fixture' | 'local' | 'github';

interface SnapshotContextType {
  sourceMode: SourceMode;
  setSourceMode: (mode: SourceMode) => void;
  headSha: string;
  setHeadSha: (sha: string) => void;
  localPath: string;
  setLocalPath: (path: string) => void;
  snapshot: IngestedRepositorySnapshot | null;
  graphEngine: GovernanceKnowledgeGraphEngine;
  isLoading: boolean;
  errorMessage: string | null;
  refreshSnapshot: () => Promise<void>;
}

const SnapshotContext = createContext<SnapshotContextType | undefined>(undefined);

export const SnapshotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sourceMode, setSourceMode] = useState<SourceMode>('fixture');
  const [headSha, setHeadSha] = useState<string>('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f');
  const [localPath, setLocalPath] = useState<string>('/Users/asel/Documents/AYAtlas');
  const [snapshot, setSnapshot] = useState<IngestedRepositorySnapshot | null>(null);
  const [graphEngine] = useState(() => new GovernanceKnowledgeGraphEngine());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSnapshot = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      let source: ReadOnlyRepositorySource;
      if (sourceMode === 'github') {
        source = new GitHubReadOnlyRepositorySource();
      } else if (sourceMode === 'local') {
        source = new LocalReadOnlyRepositorySource(localPath);
      } else {
        source = new OfflineFixtureRepositorySource(headSha);
      }

      const ingestor = new RepositoryIngestor(source);
      const ingestedSnap = await ingestor.ingestSnapshot(headSha, sourceMode);
      setSnapshot(ingestedSnap);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to ingest repository snapshot');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSnapshot();
  }, [sourceMode, headSha, localPath]);

  return (
    <SnapshotContext.Provider
      value={{
        sourceMode,
        setSourceMode,
        headSha,
        setHeadSha,
        localPath,
        setLocalPath,
        snapshot,
        graphEngine,
        isLoading,
        errorMessage,
        refreshSnapshot: loadSnapshot,
      }}
    >
      {children}
    </SnapshotContext.Provider>
  );
};

export const useSnapshotContext = (): SnapshotContextType => {
  const ctx = useContext(SnapshotContext);
  if (!ctx) {
    throw new Error('useSnapshotContext must be used within a SnapshotProvider');
  }
  return ctx;
};
