import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { OfflineFixtureRepositorySource, GitHubReadOnlyRepositorySource, LocalReadOnlyRepositorySource } from '@ayatlas/github-reader';
import { RepositoryIngestor } from '@ayatlas/repository-ingestor';
import { GovernanceKnowledgeGraphEngine } from '@ayatlas/graph-engine';
import { parsePhasePointer } from '@ayatlas/authority-resolver';
export const CONCEPT_GLOSSARY = {
    ring0: {
        term: 'Ring0 Kernel Mechanism',
        trName: 'Ring0 Çekirdek Mekanizması',
        simpleDef: 'Donanım üzerinde doğrudan çalışan ve tek görevi güvenli çalıştırma (execution) sağlamak olan en yetkili çekirdek katmanı.',
        techDef: 'Ring0 kernel mechanisms provide pure hardware isolation, memory management, and process scheduling without embedding business or domain policy rules.',
        codePath: 'kernel/mm, kernel/proc',
        category: 'RING',
    },
    ring3: {
        term: 'Ring3 Policy Runtime',
        trName: 'Ring3 Politika Katmanı',
        simpleDef: 'Sistemin ne yapacağına karar veren ama çekirdek yetkilerine doğrudan sahip olmayan kullanıcı alanı politikaları.',
        techDef: 'Ring3 policy runtimes encode application logic and execution constraints outside the kernel. Policy runtime code presence does NOT grant active execution authority.',
        codePath: 'userspace/semantic-cli, ayken-core/crates/abdf',
        category: 'POLICY',
    },
    abi: {
        term: 'Frozen Syscall ABI',
        trName: 'Dondurulmuş Sistem Çağrısı Arayüzü',
        simpleDef: 'Ring3 ile Ring0 arasında değişmezliği anayasal olarak garanti edilmiş sistem çağrı arayüzü.',
        techDef: 'Shared Syscall ABI defined under shared/abi. Unauthorized modification without formal governance decision is flagged as CRITICAL_ABI_FREEZE_VIOLATION.',
        codePath: 'shared/abi/syscalls.h',
        category: 'ABI',
    },
    evidence: {
        term: 'Accepted Evidence Boundary',
        trName: 'Kabul Edilmiş Kanıt Sınırı',
        simpleDef: 'Bir testin başarılı olması tek başına kabul edilmiş kanıt değildir; doğrulama çıktısı exact-subject commit SHA ile bağlanmalıdır.',
        techDef: 'Validator output (PASS) != Accepted Evidence. Accepted evidence requires exact-subject SHA binding and formal governance ratification under Phase-24 rules.',
        codePath: 'docs/evidence/RATIFIED_CLAIMS.md',
        category: 'EVIDENCE',
    },
    authority: {
        term: 'Newly Detected Code != Authority Grant',
        trName: 'Yeni Kod Varlığı ≠ Yetki Devri',
        simpleDef: 'Depoya yeni bir kod dosyasının eklenmiş olması, o kodun sistemde hemen yetkili olarak çalışacağı anlamına gelmez.',
        techDef: 'Code existence in repository tree does NOT infer or grant runtime authority. GrantsNewAuthority is strictly FALSE until governance decision ratification.',
        codePath: 'docs/roadmap/CURRENT_PHASE',
        category: 'GOVERNANCE',
    },
};
const SnapshotContext = createContext(undefined);
export const SnapshotProvider = ({ children }) => {
    const [sourceMode, setSourceMode] = useState('fixture');
    const [headSha, setHeadSha] = useState('d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8a');
    const [localPath, setLocalPath] = useState('/Users/asel/Documents/AykenOS');
    const [snapshot, setSnapshot] = useState(null);
    const [graphEngine] = useState(() => new GovernanceKnowledgeGraphEngine());
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [detectedPhase, setDetectedPhase] = useState(24);
    const loadSnapshot = async () => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            let source;
            if (sourceMode === 'github') {
                source = new GitHubReadOnlyRepositorySource();
            }
            else if (sourceMode === 'local') {
                source = new LocalReadOnlyRepositorySource(localPath);
            }
            else {
                source = new OfflineFixtureRepositorySource(headSha);
            }
            const ingestor = new RepositoryIngestor(source);
            const ingestedSnap = await ingestor.ingestSnapshot(headSha, sourceMode);
            setSnapshot(ingestedSnap);
            // Dynamically extract Phase from snapshot files content if present
            const phaseFile = ingestedSnap.files.find((f) => f.path.includes('CURRENT_PHASE'));
            if (phaseFile) {
                let content = phaseFile.content;
                if (!content) {
                    try {
                        content = await source.getFile(phaseFile.path, headSha).then(res => res.content);
                    }
                    catch {
                        // fallback
                    }
                }
                const parsed = parsePhasePointer(content);
                if (parsed) {
                    setDetectedPhase(parsed.phase);
                }
                else {
                    setDetectedPhase(24);
                }
            }
        }
        catch (err) {
            setErrorMessage(err.message || 'Failed to ingest repository snapshot');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadSnapshot();
    }, [sourceMode, headSha, localPath]);
    return (_jsx(SnapshotContext.Provider, { value: {
            sourceMode,
            setSourceMode,
            headSha,
            setHeadSha,
            localPath,
            setLocalPath,
            snapshot,
            graphEngine,
            isLoading,
            errorMessage,
            refreshSnapshot: loadSnapshot,
            detectedPhase,
        }, children: children }));
};
export const useSnapshotContext = () => {
    const ctx = useContext(SnapshotContext);
    if (!ctx) {
        throw new Error('useSnapshotContext must be used within a SnapshotProvider');
    }
    return ctx;
};
//# sourceMappingURL=SnapshotContext.js.map