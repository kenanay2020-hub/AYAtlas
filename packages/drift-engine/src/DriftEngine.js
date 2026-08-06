export class DriftDetectionEngine {
    auditSnapshot(snapshot, _graph) {
        const driftItems = [];
        // Audit 1: ABI Freeze Violations
        const abiFiles = snapshot.files.filter((f) => f.path.startsWith('shared/abi'));
        for (const abiFile of abiFiles) {
            if (abiFile.path.endsWith('custom_syscall.h') || abiFile.path.endsWith('draft_abi.h')) {
                driftItems.push({
                    id: `drift-abi-${abiFile.path}`,
                    category: 'CRITICAL_ABI_FREEZE_VIOLATION',
                    severity: 'CRITICAL',
                    title: 'Frozen Syscall ABI Boundary Violation',
                    affectedPath: abiFile.path,
                    description: `Unratified ABI modification detected in ${abiFile.path}. Syscall ABI boundary is FROZEN under AykenOS Constitution.`,
                    remediationRecommendation: 'Revert unratified ABI change or submit formal Phase-25 RFC decision document for governance review.',
                });
            }
        }
        // Audit 2: Phase Pointer Contradiction
        const currentPhaseFile = snapshot.files.find((f) => f.path === 'docs/roadmap/CURRENT_PHASE');
        const hasP25DecisionDoc = snapshot.files.some((f) => f.path.includes('phase25-decision'));
        if (currentPhaseFile && !hasP25DecisionDoc && snapshot.files.some((f) => f.path.includes('phase25'))) {
            driftItems.push({
                id: 'drift-phase-pointer',
                category: 'PHASE_POINTER_CONTRADICTION',
                severity: 'CRITICAL',
                title: 'Phase Pointer vs Decision Set Mismatch',
                affectedPath: 'docs/roadmap/CURRENT_PHASE',
                description: 'Phase-25 reference detected in repository tree without canonical Phase-25 decision set.',
                remediationRecommendation: 'Add ratified Phase-25 canonical decision document or update CURRENT_PHASE pointer.',
            });
        }
        // Audit 3: Unratified Implementation Drift
        const aiRuntimeFiles = snapshot.files.filter((f) => f.path.startsWith('userspace/ai-runtime'));
        if (aiRuntimeFiles.length > 0) {
            driftItems.push({
                id: 'drift-ai-runtime-unratified',
                category: 'UNRATIFIED_IMPLEMENTATION_DRIFT',
                severity: 'WARNING',
                title: 'Unratified Ring3 Policy Runtime Addition',
                affectedPath: 'userspace/ai-runtime/',
                description: 'Ring3 AI runtime implementation detected. Invariant enforced: Code existence does NOT grant active execution authority.',
                remediationRecommendation: 'Keep authority status as BOUNDED under Phase-24 until exact-subject ratification.',
            });
        }
        // Audit 4: Unbound Evidence Claim
        const evidenceFiles = snapshot.files.filter((f) => f.path.startsWith('tools/verification'));
        for (const evFile of evidenceFiles) {
            if (evFile.path.endsWith('unbound_claim.json')) {
                driftItems.push({
                    id: `drift-evidence-${evFile.path}`,
                    category: 'UNBOUND_EVIDENCE_CLAIM',
                    severity: 'WARNING',
                    title: 'Evidence Claim Lacking Exact-Subject SHA Binding',
                    affectedPath: evFile.path,
                    description: 'Evidence candidate claim lacks exact commit SHA binding d8018a2c...',
                    remediationRecommendation: 'Bind evidence candidate to exact commit SHA before submitting to governance review.',
                });
            }
        }
        const hasCriticalViolations = driftItems.some((d) => d.severity === 'CRITICAL');
        return {
            snapshotHeadSha: snapshot.identity.commitSha,
            auditTimestamp: snapshot.observation.capturedAt,
            driftItems,
            hasCriticalViolations,
            totalDriftCount: driftItems.length,
        };
    }
}
//# sourceMappingURL=DriftEngine.js.map