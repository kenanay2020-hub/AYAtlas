import { z } from 'zod';
/**
 * Pure Snapshot Identity (Immutable across observations)
 */
export declare const SnapshotIdentitySchema: z.ZodObject<{
    repository: z.ZodLiteral<"kenanay/AykenOS">;
    commitSha: z.ZodString;
    manifestDigest: z.ZodString;
}, "strip", z.ZodTypeAny, {
    repository: "kenanay/AykenOS";
    commitSha: string;
    manifestDigest: string;
}, {
    repository: "kenanay/AykenOS";
    commitSha: string;
    manifestDigest: string;
}>;
export type SnapshotIdentity = z.infer<typeof SnapshotIdentitySchema>;
/**
 * Snapshot Observation (Timestamp and source mode metadata)
 */
export interface SnapshotObservation {
    capturedAt: string;
    sourceMode: 'local' | 'github' | 'fixture';
    isDemoData: boolean;
}
export interface SnapshotFile {
    path: string;
    size: number;
    contentDigest: string;
    sourceObjectId?: string;
    content?: string;
}
export interface RepositorySnapshot {
    identity: SnapshotIdentity;
    observation: SnapshotObservation;
    branch: string;
    readerVersion: string;
    parserVersion: string;
    knowledgeSchemaVersion: string;
}
/**
 * Derived Artifact Envelope Schema
 */
export interface DerivedArtifactMetadata {
    sourceHeadSha: string;
    sourceSnapshotId: string;
    pipelineStage: 1 | 2 | 3 | 4 | 5;
    generatorVersion: string;
    schemaVersion: string;
    generatedAt: string;
    payloadDigest: string;
}
export interface DerivedArtifactEnvelope<T> {
    metadata: DerivedArtifactMetadata;
    payload: T;
}
/**
 * Pure TypeScript SHA-256 Implementation (Zero Node/Browser external dependency).
 */
export declare function sha256Pure(ascii: string): string;
/**
 * Recursively canonicalize a JSON-compatible value.
 */
export declare function canonicalizeJson(val: unknown): unknown;
/**
 * Calculate SHA-256 digest over canonicalized JSON payload.
 */
export declare function calculateCanonicalDigest(payload: unknown): string;
export declare function createArtifactEnvelope<T>(payload: T, meta: Omit<DerivedArtifactMetadata, 'payloadDigest'>): DerivedArtifactEnvelope<T>;
//# sourceMappingURL=index.d.ts.map