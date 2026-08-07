export type FileCategory = 'SOURCE' | 'GOVERNANCE' | 'TEST' | 'GENERATED' | 'BINARY' | 'VENDOR' | 'BUILD_ARTIFACT' | 'DOCUMENTATION';
export declare class FileClassifier {
    classify(filePath: string): FileCategory;
    isRelevantForKnowledge(category: FileCategory): boolean;
}
//# sourceMappingURL=repository-classifier.d.ts.map