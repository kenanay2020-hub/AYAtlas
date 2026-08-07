import React from 'react';
export interface ExecutionStageNode {
    id: string;
    stepNumber: number;
    titleTr: string;
    titleEn: string;
    ring: 'RING3' | 'SUBSTRATE' | 'ABI' | 'RING0' | 'EVIDENCE';
    codePath: string;
    summaryTr: string;
    techDetailEn: string;
    constitutionalRule: string;
    badge: string;
    badgeColor: string;
}
export declare const EXECUTION_STAGES: ExecutionStageNode[];
export declare const ExecutionFlowCanvas: React.FC;
//# sourceMappingURL=ExecutionFlowCanvas.d.ts.map