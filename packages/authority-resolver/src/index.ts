export * from './phase-evidence';

export type AuthorityDomain =
  | 'CURRENT_PHASE'
  | 'ARCHITECTURE_INVARIANT'
  | 'IMPLEMENTATION_EXISTENCE'
  | 'PHASE_CLOSURE'
  | 'EXACT_SUBJECT_STATUS'
  | 'CI_RESULT'
  | 'EVIDENCE_STATUS'
  | 'RUNTIME_AUTHORITY';

export interface AuthorityQuery {
  domain: AuthorityDomain;
  subjectId: string;
  snapshotId: string;
}

export interface AuthorityResolution {
  value: string;
  authorityClass:
    | 'CANONICAL'
    | 'EXACT_SUBJECT'
    | 'BOUNDED'
    | 'HISTORICAL'
    | 'NON_AUTHORITY'
    | 'UNRESOLVED';
  sourceIds: string[];
  reasoningCode: string;
  conflicts: Array<{ sourceId: string; description: string }>;
}

export class AuthorityResolver {
  resolve(query: AuthorityQuery): AuthorityResolution {
    const { domain, subjectId } = query;

    if (domain === 'CURRENT_PHASE') {
      return {
        value: 'CURRENT_PHASE=24',
        authorityClass: 'CANONICAL',
        sourceIds: ['docs/roadmap/CURRENT_PHASE'],
        reasoningCode: 'PRIMARY_POINTER_FILE',
        conflicts: [],
      };
    }

    if (domain === 'RUNTIME_AUTHORITY') {
      // Code presence (e.g. semantic-cli or ai-runtime) does NOT create ACTIVE_AUTHORITY in Phase-24
      if (subjectId.includes('semantic-cli') || subjectId.includes('ai-runtime')) {
        return {
          value: 'NO_GENERAL_RUNTIME_AUTHORITY',
          authorityClass: 'BOUNDED',
          sourceIds: ['Phase-24 Governance Boundary'],
          reasoningCode: 'PHASE_24_BOUNDED_AUTHORITY_RULE',
          conflicts: [],
        };
      }
    }

    if (domain === 'EVIDENCE_STATUS') {
      // Workflow PASS does NOT create ACCEPTED_EVIDENCE
      return {
        value: 'EXACT_SUBJECT_BOUND_CANDIDATE',
        authorityClass: 'EXACT_SUBJECT',
        sourceIds: ['Phase-24 Accepted-Evidence Planning'],
        reasoningCode: 'VALIDATOR_OUTPUT_NOT_ACCEPTED_EVIDENCE',
        conflicts: [],
      };
    }

    return {
      value: 'IMPLEMENTED_MECHANISM',
      authorityClass: 'BOUNDED',
      sourceIds: [subjectId],
      reasoningCode: 'DEFAULT_BOUNDED_FALLBACK',
      conflicts: [],
    };
  }
}
