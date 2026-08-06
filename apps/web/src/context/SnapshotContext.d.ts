import React, { ReactNode } from 'react';
import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
import { GovernanceKnowledgeGraphEngine } from '@ayatlas/graph-engine';
export type SourceMode = 'fixture' | 'local' | 'github';
export interface ConceptGlossaryItem {
    term: string;
    trName: string;
    simpleDef: string;
    techDef: string;
    codePath?: string;
    category: 'RING' | 'POLICY' | 'EVIDENCE' | 'ABI' | 'GOVERNANCE';
}
export declare const CONCEPT_GLOSSARY: Record<string, ConceptGlossaryItem>;
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
    detectedPhase: number;
}
export declare const SnapshotProvider: React.FC<{
    children: ReactNode;
}>;
export declare const useSnapshotContext: () => SnapshotContextType;
export {};
//# sourceMappingURL=SnapshotContext.d.ts.map