import { ReadOnlyRepositorySource } from '@ayatlas/github-reader';
import { DerivedArtifactEnvelope } from '@ayatlas/snapshot-model';
import { KnowledgeNode, KnowledgeEdge, KnowledgeGraph } from '@ayatlas/knowledge-model';
export interface Stage1Payload {
    rawFiles: {
        path: string;
        content: string;
        sha: string;
    }[];
}
export interface Stage2Payload {
    currentPhase: number;
    phaseTitle: string;
    subsystems: {
        name: string;
        path: string;
    }[];
}
export interface Stage3Payload {
    entities: KnowledgeNode[];
    relations: KnowledgeEdge[];
}
export interface Stage4Payload {
    layers: {
        name: string;
        description: string;
        components: string[];
    }[];
}
export interface Stage5Payload {
    graph: KnowledgeGraph;
}
export interface PipelineExecutionResult {
    s1: DerivedArtifactEnvelope<Stage1Payload>;
    s2: DerivedArtifactEnvelope<Stage2Payload>;
    s3: DerivedArtifactEnvelope<Stage3Payload>;
    s4: DerivedArtifactEnvelope<Stage4Payload>;
    s5: DerivedArtifactEnvelope<Stage5Payload>;
}
export declare class KnowledgePipelineEngine {
    private source;
    constructor(source: ReadOnlyRepositorySource);
    runFullPipeline(ref?: string): Promise<PipelineExecutionResult>;
}
//# sourceMappingURL=index.d.ts.map