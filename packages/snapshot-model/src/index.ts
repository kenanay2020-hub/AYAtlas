import { z } from 'zod';

/**
 * Pure Snapshot Identity (Immutable across observations)
 */
export const SnapshotIdentitySchema = z.object({
  repository: z.literal('kenanay/AykenOS'),
  commitSha: z.string(),
  manifestDigest: z.string(),
});

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
  payloadDigest: string; // SHA-256 hash of canonical payload JSON
}

export interface DerivedArtifactEnvelope<T> {
  metadata: DerivedArtifactMetadata;
  payload: T;
}

/**
 * Pure TypeScript SHA-256 Implementation (Zero Node/Browser external dependency).
 */
export function sha256Pure(ascii: string): string {
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i: number, j: number;

  const result: string[] = [];
  const words: number[] = [];
  const asciiLength = ascii[lengthProperty];

  const hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;

  const isComposite: Record<number, boolean> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 300; i += candidate) {
        isComposite[i] = true;
      }
      if (primeCounter < 8) {
        hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      }
      k[primeCounter] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
      primeCounter++;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) {
    ascii += '\x00';
  }

  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return ''; // ASCII check
    words[i >> 2] |= j << ((3 - (i % 4)) * 8);
  }
  words[words[lengthProperty]] = (asciiLength * 8) / maxWord | 0;
  words[words[lengthProperty]] = asciiLength * 8;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];

      const s0 =
        ((w15 >>> 7) | (w15 << 25)) ^
        ((w15 >>> 18) | (w15 << 14)) ^
        (w15 >>> 3);
      const s1 =
        ((w2 >>> 17) | (w2 << 15)) ^
        ((w2 >>> 19) | (w2 << 13)) ^
        (w2 >>> 10);

      w[i] =
        i < 16
          ? w[i]
          : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

      const a = hash[0], e = hash[4];
      const temp1 =
        hash[7] +
        (((e >>> 6) | (e << 26)) ^
          ((e >>> 11) | (e << 21)) ^
          ((e >>> 25) | (e << 7))) +
        ((e & hash[5]) ^ (~e & hash[6])) +
        k[i] +
        w[i];
      const temp2 =
        (((a >>> 2) | (a << 30)) ^
          ((a >>> 13) | (a << 19)) ^
          ((a >>> 22) | (a << 10))) +
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));

      hash[7] = hash[6];
      hash[6] = hash[5];
      hash[5] = hash[4];
      hash[4] = (hash[3] + temp1) | 0;
      hash[3] = hash[2];
      hash[2] = hash[1];
      hash[1] = hash[0];
      hash[0] = (temp1 + temp2) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result.push((b < 16 ? '0' : '') + b.toString(16));
    }
  }

  return result.join('');
}

/**
 * Recursively canonicalize a JSON-compatible value.
 */
export function canonicalizeJson(val: unknown): unknown {
  if (val === null || val === undefined) {
    return null;
  }
  if (typeof val === 'string') {
    return val.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }
  if (typeof val === 'number' || typeof val === 'boolean') {
    return val;
  }
  if (Array.isArray(val)) {
    return val.map((item) => canonicalizeJson(item));
  }
  if (typeof val === 'object') {
    const sortedObj: Record<string, unknown> = {};
    const keys = Object.keys(val as Record<string, unknown>).sort();
    for (const key of keys) {
      const propVal = (val as Record<string, unknown>)[key];
      if (propVal !== undefined) {
        sortedObj[key] = canonicalizeJson(propVal);
      }
    }
    return sortedObj;
  }
  return String(val);
}

/**
 * Calculate SHA-256 digest over canonicalized JSON payload.
 */
export function calculateCanonicalDigest(payload: unknown): string {
  const canonicalObj = canonicalizeJson(payload);
  const canonicalJsonString = JSON.stringify(canonicalObj);
  return sha256Pure(canonicalJsonString);
}

export function createArtifactEnvelope<T>(
  payload: T,
  meta: Omit<DerivedArtifactMetadata, 'payloadDigest'>
): DerivedArtifactEnvelope<T> {
  const payloadDigest = calculateCanonicalDigest(payload);
  return {
    metadata: {
      ...meta,
      payloadDigest,
    },
    payload,
  };
}
