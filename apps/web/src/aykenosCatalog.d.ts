import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
export type TechnicalSystemStatus = 'VERIFIED_IMPLEMENTATION' | 'BOUNDED' | 'GOVERNANCE_ONLY' | 'VISION_NOT_VERIFIED';
export interface TechnicalSystemItem {
    id: string;
    nameTr: string;
    nameEn: string;
    category: 'CORE_MECHANISM' | 'POLICY_RUNTIME' | 'DATA_SUBSTRATE' | 'GOVERNANCE' | 'SPATIAL_VISION';
    summaryTr: string;
    techDetailEn: string;
    status: TechnicalSystemStatus;
    candidatePaths: string[];
    matchedPaths?: string[];
    concepts: string[];
}
export declare const AYKENOS_TECHNICAL_CATALOG: TechnicalSystemItem[];
export declare function resolveCatalogWithSnapshot(snapshot: IngestedRepositorySnapshot | null): TechnicalSystemItem[];
//# sourceMappingURL=aykenosCatalog.d.ts.map