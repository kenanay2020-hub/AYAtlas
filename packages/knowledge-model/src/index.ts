import { z } from 'zod';

/**
 * Discriminated Union for Source Reference
 */
export type SourceReference =
  | {
      sourceType: 'SOURCE_CODE' | 'CANONICAL_DOCUMENT' | 'HISTORICAL_DOCUMENT';
      repository: 'kenanay/AykenOS';
      ref: string;
      headSha: string;
      path: string;
      startLine?: number;
      endLine?: number;
    }
  | {
      sourceType: 'WORKFLOW_DEFINITION';
      repository: 'kenanay/AykenOS';
      ref: string;
      headSha: string;
      path: string;
    }
  | {
      sourceType: 'WORKFLOW_RUN';
      repository: 'kenanay/AykenOS';
      ref: string;
      headSha: string;
      workflowRunId: string;
      path?: string;
    }
  | {
      sourceType: 'COMMIT';
      repository: 'kenanay/AykenOS';
      ref: string;
      headSha: string;
      commitSha: string;
    }
  | {
      sourceType: 'PULL_REQUEST';
      repository: 'kenanay/AykenOS';
      ref: string;
      headSha: string;
      pullRequestNumber: number;
    }
  | {
      sourceType: 'REPOSITORY_TREE';
      repository: 'kenanay/AykenOS';
      ref: string;
      headSha: string;
      path: string;
    };

/**
 * Assertion Classification Kind
 */
export type AssertionKind =
  | 'REPOSITORY_FACT'
  | 'CANONICAL_STATUS'
  | 'HISTORICAL_RECORD'
  | 'DERIVED_RELATION'
  | 'EDUCATIONAL_EXPLANATION'
  | 'INFERENCE'
  | 'UNKNOWN';

/**
 * Multi-Axis Component Status
 */
export interface MultiAxisStatus {
  implementation: 'ABSENT' | 'PLANNED' | 'SKELETON' | 'IMPLEMENTED' | 'VALIDATED';
  authority: 'NO_AUTHORITY' | 'PLANNING_ONLY' | 'BOUNDED_AUTHORITY' | 'ACTIVE_AUTHORITY' | 'FROZEN';
  evidence:
    | 'NO_EVIDENCE'
    | 'OBSERVED_ARTIFACT'
    | 'LOCAL_VALIDATION_PASS'
    | 'REMOTE_WORKFLOW_PASS'
    | 'EXACT_SUBJECT_BOUND'
    | 'GOVERNANCE_REVIEWED'
    | 'ACCEPTANCE_PENDING'
    | 'ACCEPTED_EVIDENCE';
}

/**
 * Entity Types in Knowledge Graph
 */
export type EntityType =
  | 'REPOSITORY'
  | 'SNAPSHOT'
  | 'DIRECTORY'
  | 'SOURCE_FILE'
  | 'COMPONENT'
  | 'ARCHITECTURE_LAYER'
  | 'PHASE'
  | 'DOCUMENT'
  | 'DECISION'
  | 'EVIDENCE_ARTIFACT'
  | 'WORKFLOW'
  | 'CI_GATE'
  | 'CONCEPT'
  | 'SYSCALL'
  | 'CRATE'
  | 'RUNTIME_SERVICE';

/**
 * Controlled Relation Vocabulary
 */
export type RelationType =
  | 'CONTAINS'
  | 'DEPENDS_ON'
  | 'USES'
  | 'PRODUCES'
  | 'SUBMITS_TO'
  | 'VERIFIED_BY'
  | 'VALIDATED_BY'
  | 'GUARDED_BY'
  | 'GOVERNED_BY'
  | 'DOCUMENTED_BY'
  | 'INTRODUCED_IN'
  | 'CLOSED_IN'
  | 'SUPERSEDED_BY'
  | 'REFERENCES'
  | 'BOUND_TO'
  | 'DOES_NOT_AUTHORIZE';

/**
 * Knowledge Assertion
 */
export interface KnowledgeAssertion {
  id: string;
  subjectId: string;
  predicate: string;
  objectId?: string;
  literalValue?: unknown;
  kind: AssertionKind;
  confidence: 'EXACT' | 'SUPPORTED' | 'INFERRED' | 'UNKNOWN';
  supportingSources: SourceReference[];
  derivationRuleId?: string;
  explanation?: string;
}

/**
 * Knowledge Node
 */
export interface KnowledgeNode {
  id: string;
  label: string;
  entityType: EntityType;
  category: 'boot' | 'ring0' | 'abi' | 'ring3' | 'substrate' | 'verification' | 'tooling' | 'governance' | 'ci';
  status: MultiAxisStatus;
  description: string;
  sources: SourceReference[];
  metadata?: Record<string, unknown>;
}

/**
 * Knowledge Edge / Relationship
 */
export interface KnowledgeEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relation: RelationType;
  confidence: 'EXACT' | 'SUPPORTED' | 'INFERRED';
  sources: SourceReference[];
}

/**
 * Complete Knowledge Graph Schema
 */
export interface KnowledgeGraph {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
  assertions: KnowledgeAssertion[];
}

/**
 * Roadmap Schemas
 */
export type RoadmapKind =
  | 'AYATLAS_PRODUCT'
  | 'AYKENOS_CANONICAL'
  | 'ANALYSIS_BACKLOG'
  | 'ARCHIVED';

export type RoadmapItemStatus =
  | 'BACKLOG'
  | 'READY'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'REVIEW'
  | 'DONE'
  | 'CANCELLED';

export interface RoadmapItem {
  id: string;
  roadmapKind: RoadmapKind;
  title: string;
  description: string;
  milestoneId?: string;
  parentId?: string;
  dependencyIds: string[];
  status: RoadmapItemStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  acceptanceCriteria: string[];
  deliverables: string[];
  targetVersion?: string;
  startDate?: string;
  targetDate?: string;
  completedAt?: string;
  sourceReferences?: SourceReference[];
  editable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RoadmapRevision {
  id: string;
  roadmapItemId: string;
  changedAt: string;
  changedBy: string;
  before: unknown;
  after: unknown;
  changeReason?: string;
}
