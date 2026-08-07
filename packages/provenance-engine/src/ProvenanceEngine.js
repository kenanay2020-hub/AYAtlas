export class ProvenanceEngine {
    records = new Map();
    registerProvenance(record) {
        this.records.set(record.assertionId, { ...record, isStale: false });
    }
    getProvenance(assertionId) {
        return this.records.get(assertionId);
    }
    /**
     * Mark all assertions associated with a source path as STALE when source changes.
     */
    markSourcePathStale(sourcePath) {
        const staleAssertionIds = [];
        for (const [id, record] of this.records) {
            if (record.sourcePath === sourcePath) {
                record.isStale = true;
                staleAssertionIds.push(id);
            }
        }
        return staleAssertionIds;
    }
    isProvenanceValid(assertionId, currentSourceDigest) {
        const record = this.records.get(assertionId);
        if (!record || record.isStale)
            return false;
        return record.sourceDigest === currentSourceDigest;
    }
}
//# sourceMappingURL=ProvenanceEngine.js.map