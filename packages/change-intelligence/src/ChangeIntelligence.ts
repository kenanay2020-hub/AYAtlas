import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';
import { SnapshotFile } from '@ayatlas/snapshot-model';

export type ImpactClassification =
  | 'INFORMATIONAL'
  | 'IMPLEMENTATION_CHANGE'
  | 'AUTHORITY_RELEVANT'
  | 'EVIDENCE_RELEVANT'
  | 'CONSTITUTIONAL_REVIEW_REQUIRED'
  | 'POTENTIAL_CONTRADICTION';

export type ProvenanceItemStatus =
  | 'VERIFIED'
  | 'STALE'
  | 'MISSING'
  | 'PARTIAL'
  | 'CONFLICTING';

export interface SemanticChangeItem {
  path: string;
  changeType: 'ADDED' | 'MODIFIED' | 'DELETED';
  classification: ImpactClassification;
  authorityImpactDescription: string;
  grantsNewAuthority: boolean; // Must be false for unratified implementation additions
  provenanceStatus: ProvenanceItemStatus;
}

export interface GovernanceChangeReport {
  baseCommitSha: string;
  targetCommitSha: string;
  changes: SemanticChangeItem[];
  overallAuthorityImpact: 'NO_AUTHORITY_CHANGE' | 'AUTHORITY_EXPANDED' | 'GOVERNANCE_REVIEW_REQUIRED' | 'CONTRADICTION_DETECTED';
}

export interface PhaseDiffContext {
  basePhase?: number;
  targetPhase?: number;
  hasCanonicalDecisionFile?: boolean;
}

export class ChangeIntelligenceEngine {
  compareSnapshots(
    baseSnapshot: IngestedRepositorySnapshot,
    targetSnapshot: IngestedRepositorySnapshot,
    phaseContext?: PhaseDiffContext
  ): GovernanceChangeReport {
    const baseFilesMap = new Map<string, SnapshotFile>(
      baseSnapshot.files.map((f) => [f.path, f])
    );
    const targetFilesMap = new Map<string, SnapshotFile>(
      targetSnapshot.files.map((f) => [f.path, f])
    );

    // Auto-detect canonical decision file in target snapshot if not explicitly passed
    const autoDecisionFound = targetSnapshot.files.some(
      (f) => f.path.startsWith('docs/phase') || f.path.startsWith('docs/canonical')
    );

    const hasDecisionFile = phaseContext?.hasCanonicalDecisionFile ?? autoDecisionFound;

    const changes: SemanticChangeItem[] = [];

    // Check for added or modified files in target
    for (const [path, targetFile] of targetFilesMap) {
      const baseFile = baseFilesMap.get(path);

      if (!baseFile) {
        // File Added
        let classification = this.classifyChangePath(path, 'ADDED');
        if (path === 'docs/roadmap/CURRENT_PHASE' && phaseContext && !hasDecisionFile) {
          classification = 'POTENTIAL_CONTRADICTION';
        }

        changes.push({
          path,
          changeType: 'ADDED',
          classification,
          authorityImpactDescription: this.getImpactDescription(path, 'ADDED', phaseContext, hasDecisionFile),
          grantsNewAuthority: false, // Strict invariant: Repository Change != Authority Change
          provenanceStatus: baseSnapshot.observation.isDemoData ? 'PARTIAL' : 'VERIFIED',
        });
      } else if (baseFile.contentDigest !== targetFile.contentDigest) {
        // File Modified
        let classification = this.classifyChangePath(path, 'MODIFIED');
        if (path === 'docs/roadmap/CURRENT_PHASE' && phaseContext && !hasDecisionFile) {
          classification = 'POTENTIAL_CONTRADICTION';
        }

        changes.push({
          path,
          changeType: 'MODIFIED',
          classification,
          authorityImpactDescription: this.getImpactDescription(path, 'MODIFIED', phaseContext, hasDecisionFile),
          grantsNewAuthority: false,
          provenanceStatus: baseSnapshot.observation.isDemoData ? 'PARTIAL' : 'VERIFIED',
        });
      }
    }

    // Check for deleted files
    for (const [path] of baseFilesMap) {
      if (!targetFilesMap.has(path)) {
        changes.push({
          path,
          changeType: 'DELETED',
          classification: this.classifyChangePath(path, 'DELETED'),
          authorityImpactDescription: `File ${path} deleted from repository tree.`,
          grantsNewAuthority: false,
          provenanceStatus: 'STALE',
        });
      }
    }

    const hasContradiction = changes.some((c) => c.classification === 'POTENTIAL_CONTRADICTION');
    const requiresReview = changes.some(
      (c) => c.classification === 'CONSTITUTIONAL_REVIEW_REQUIRED' || c.classification === 'AUTHORITY_RELEVANT'
    );

    return {
      baseCommitSha: baseSnapshot.identity.commitSha,
      targetCommitSha: targetSnapshot.identity.commitSha,
      changes,
      overallAuthorityImpact: hasContradiction
        ? 'CONTRADICTION_DETECTED'
        : requiresReview
        ? 'GOVERNANCE_REVIEW_REQUIRED'
        : 'NO_AUTHORITY_CHANGE',
    };
  }

  private classifyChangePath(path: string, _type: string): ImpactClassification {
    if (path === 'docs/roadmap/CURRENT_PHASE' || path.startsWith('shared/abi')) {
      return 'CONSTITUTIONAL_REVIEW_REQUIRED';
    }
    if (path.startsWith('docs/phase') || path.startsWith('docs/canonical')) {
      return 'AUTHORITY_RELEVANT';
    }
    if (path.startsWith('proofd') || path.includes('verification')) {
      return 'EVIDENCE_RELEVANT';
    }
    if (path.startsWith('userspace/') || path.startsWith('kernel/')) {
      return 'IMPLEMENTATION_CHANGE';
    }
    return 'INFORMATIONAL';
  }

  private getImpactDescription(path: string, type: 'ADDED' | 'MODIFIED' | 'DELETED', phaseCtx?: PhaseDiffContext, hasDecision = true): string {
    if (path === 'docs/roadmap/CURRENT_PHASE') {
      if (phaseCtx && phaseCtx.basePhase && phaseCtx.targetPhase && !hasDecision) {
        return `CURRENT_PHASE changed (${phaseCtx.basePhase} -> ${phaseCtx.targetPhase}) without canonical decision file! Triggers POTENTIAL_CONTRADICTION.`;
      }
      return 'CURRENT_PHASE pointer change detected. Triggers canonical phase resolution audit.';
    }
    if (path.startsWith('userspace/ai-runtime') || path.startsWith('userspace/semantic-cli')) {
      return `Userspace implementation ${type.toLowerCase()}. Invariant enforced: No active authority granted.`;
    }
    return `Path ${path} ${type.toLowerCase()} in repository tree.`;
  }
}
