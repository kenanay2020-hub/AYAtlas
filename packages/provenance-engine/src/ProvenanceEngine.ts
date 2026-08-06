import { SourceReference } from '@ayatlas/knowledge-model';

export type ExtractionMethod =
  | 'direct'                // Explicitly stated in canonical source file
  | 'parsed'                // Derived via AST / TOML / YAML parser
  | 'inferred'              // Heuristic assumption
  | 'governance-resolved';   // Ratified decision record

export interface ProvenanceRecord {
  assertionId: string;
  repository: 'kenanay/AykenOS';
  commitSha: string;
  sourcePath: string;
  startLine?: number;
  endLine?: number;
  sourceDigest: string;
  extractionMethod: ExtractionMethod;
  confidence: number; // 0.0 to 1.0 scale
  isStale?: boolean;
}

export class ProvenanceEngine {
  private records: Map<string, ProvenanceRecord> = new Map();

  registerProvenance(record: ProvenanceRecord): void {
    this.records.set(record.assertionId, { ...record, isStale: false });
  }

  getProvenance(assertionId: string): ProvenanceRecord | undefined {
    return this.records.get(assertionId);
  }

  /**
   * Mark all assertions associated with a source path as STALE when source changes.
   */
  markSourcePathStale(sourcePath: string): string[] {
    const staleAssertionIds: string[] = [];
    for (const [id, record] of this.records) {
      if (record.sourcePath === sourcePath) {
        record.isStale = true;
        staleAssertionIds.push(id);
      }
    }
    return staleAssertionIds;
  }

  isProvenanceValid(assertionId: string, currentSourceDigest: string): boolean {
    const record = this.records.get(assertionId);
    if (!record || record.isStale) return false;
    return record.sourceDigest === currentSourceDigest;
  }
}
