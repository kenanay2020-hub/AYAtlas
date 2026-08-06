export type ExtractionMethod = 'direct' | 'parsed' | 'inferred' | 'governance-resolved';
export interface ProvenanceRecord {
    assertionId: string;
    repository: 'kenanay/AykenOS';
    commitSha: string;
    sourcePath: string;
    startLine?: number;
    endLine?: number;
    sourceDigest: string;
    extractionMethod: ExtractionMethod;
    confidence: number;
    isStale?: boolean;
}
export declare class ProvenanceEngine {
    private records;
    registerProvenance(record: ProvenanceRecord): void;
    getProvenance(assertionId: string): ProvenanceRecord | undefined;
    /**
     * Mark all assertions associated with a source path as STALE when source changes.
     */
    markSourcePathStale(sourcePath: string): string[];
    isProvenanceValid(assertionId: string, currentSourceDigest: string): boolean;
}
//# sourceMappingURL=ProvenanceEngine.d.ts.map