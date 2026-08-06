import { IngestedRepositorySnapshot } from '@ayatlas/repository-ingestor';

export type TechnicalSystemStatus =
  | 'VERIFIED_IMPLEMENTATION'
  | 'BOUNDED'
  | 'GOVERNANCE_ONLY'
  | 'VISION_NOT_VERIFIED';

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

export const AYKENOS_TECHNICAL_CATALOG: TechnicalSystemItem[] = [
  // CORE MECHANISMS & SUBSTRATES
  {
    id: 'ring0-kernel',
    nameTr: 'Minimal Ring0 Çekirdek Mekanizması',
    nameEn: 'Minimal Ring0 Mechanism Kernel',
    category: 'CORE_MECHANISM',
    summaryTr: 'Yalnızca donanım izolasyonu, hafıza yönetimi ve proses yürütmesi sağlayan politika kurallarından arındırılmış çekirdek.',
    techDetailEn: 'Minimal Ring0 execution mechanism. Provides memory allocation, hardware interrupts, and context switching without business policy rules.',
    status: 'VERIFIED_IMPLEMENTATION',
    candidatePaths: ['kernel/kernel.c', 'kernel/mm/page_alloc.c', 'kernel/sys/syscall.c'],
    concepts: ['Ring0', 'Mechanism Core', 'Hardware Isolation'],
  },
  {
    id: 'frozen-abi',
    nameTr: 'Dondurulmuş Sistem Çağrısı Arayüzü',
    nameEn: 'Frozen Syscall ABI Boundary',
    category: 'CORE_MECHANISM',
    summaryTr: 'Ring3 ile Ring0 arasında anayasal olarak dondurulmuş değişmez sistem çağrı tabloları.',
    techDetailEn: 'Immutable Syscall ABI defined under shared/abi. Unauthorized modification triggers CRITICAL_ABI_FREEZE_VIOLATION.',
    status: 'GOVERNANCE_ONLY',
    candidatePaths: ['shared/abi/syscalls.h', 'shared/abi/types.h'],
    concepts: ['Syscall ABI', 'Frozen Contract', 'Anatomical Boundary'],
  },
  {
    id: 'bcib-representation',
    nameTr: 'BCIB İkili Komut Temsili',
    nameEn: 'BCIB Binary Instruction Representation',
    category: 'DATA_SUBSTRATE',
    summaryTr: 'AykenOS içinde deterministik yürütme sağlanan ikili komut dizilimi.',
    techDetailEn: 'Binary Command & Instruction Representation (BCIB) providing canonical execution encoding.',
    status: 'VERIFIED_IMPLEMENTATION',
    candidatePaths: ['ayken-core/crates/bcib/src/lib.rs', 'ayken-core/crates/bcib'],
    concepts: ['BCIB', 'Deterministic Encoding', 'Instruction Stream'],
  },
  {
    id: 'abdf-binary-format',
    nameTr: 'ABDF Tipli İkili Veri Biçimi',
    nameEn: 'ABDF Typed Binary Data Format',
    category: 'DATA_SUBSTRATE',
    summaryTr: 'AykenOS veri katmanında kullanılan tipli, deterministik ikili serileştirme biçimi.',
    techDetailEn: 'Anatomical Binary Data Format (ABDF) for strict binary serialization across Ring0/Ring3 boundaries.',
    status: 'VERIFIED_IMPLEMENTATION',
    candidatePaths: ['ayken-core/crates/abdf/src/lib.rs', 'ayken-core/crates/abdf'],
    concepts: ['ABDF', 'Typed Binary', 'Deterministic Serialization'],
  },
  {
    id: 'semantic-cli',
    nameTr: 'Semantic CLI Politika Arayüzü',
    nameEn: 'Semantic CLI Policy Runtime',
    category: 'POLICY_RUNTIME',
    summaryTr: 'Kullanıcı alandaki niyet (intent) ayrıştırma arayüzü; varlığı otomatik yetki devretmez.',
    techDetailEn: 'Ring3 policy interface. Parses user intents into BCIB instruction streams. GrantsNewAuthority is strictly FALSE.',
    status: 'BOUNDED',
    candidatePaths: ['userspace/semantic-cli/src/main.rs', 'userspace/semantic-cli'],
    concepts: ['Semantic CLI', 'Ring3 Policy', 'Bounded Authority'],
  },
  {
    id: 'proofd-verification',
    nameTr: 'proofd Doğrulama Servisi',
    nameEn: 'proofd Verification Service',
    category: 'GOVERNANCE',
    summaryTr: 'Doğrulayıcı çıktılarını (PASS) exact-subject commit SHA bağı ile eşleştiren kanıt servisi.',
    techDetailEn: 'Evidence candidate verifier. Evaluates execution outputs against exact-subject SHA binding requirements.',
    status: 'VERIFIED_IMPLEMENTATION',
    candidatePaths: ['proofd/src/main.rs', 'tools/verification/proof_verifier.py'],
    concepts: ['proofd', 'Exact-Subject Binding', 'Accepted Evidence'],
  },

  // FUTURE SPATIAL ARCHITECTURE VISION (VISION_NOT_VERIFIED)
  {
    id: 'spatial-memory',
    nameTr: 'Uzamsal Bellek Mimarisi',
    nameEn: 'Spatial Memory Architecture',
    category: 'SPATIAL_VISION',
    summaryTr: '3B nesne koordinatlarını ve hacimsel verileri bellek katmanında birinci sınıf nesne olarak işleyen gelecek vizyonu.',
    techDetailEn: 'Volumetric and spatial memory address space for native 3D spatial computing objects.',
    status: 'VISION_NOT_VERIFIED',
    candidatePaths: ['kernel/spatial_mm', 'ayken-core/crates/spatial-mem'],
    concepts: ['Spatial Memory', 'Volumetric Allocator', '3D Coordinate Page Table'],
  },
  {
    id: 'scene-graph-os',
    nameTr: 'Sahne Grafı İşletim Modeli',
    nameEn: 'Scene Graph Operating Model',
    category: 'SPATIAL_VISION',
    summaryTr: 'İşletim sistemi pencere mantığını 3B nesne hiyerarşisi (Scene Graph) olarak temsil eden mimari yön.',
    techDetailEn: 'Hierarchical scene graph spatial windowing and compositor runtime.',
    status: 'VISION_NOT_VERIFIED',
    candidatePaths: ['userspace/scene-graph', 'ayken-core/crates/scene-compositor'],
    concepts: ['Scene Graph', 'Spatial Windowing', '3D Compositor'],
  },
  {
    id: 'gaussian-voxel-types',
    nameTr: 'Yerel Gaussian / Voksel Veri Tipleri',
    nameEn: 'Native Gaussian / Voxel Data Types',
    category: 'SPATIAL_VISION',
    summaryTr: '3B Splatting ve Voksel verilerini donanım seviyesinde destekleyen veri substratı vizyonu.',
    techDetailEn: 'First-class Gaussian Splatting and Voxel primitives in kernel data pipelines.',
    status: 'VISION_NOT_VERIFIED',
    candidatePaths: ['ayken-core/crates/voxel-types', 'kernel/drivers/gaussian'],
    concepts: ['Gaussian Splatting', 'Voxel Primitives', '3D Data Substrate'],
  },
  {
    id: 'gpu-first-scheduler',
    nameTr: 'GPU-Öncelikli Görev Zamanlayıcı',
    nameEn: 'GPU-first Scheduler',
    category: 'SPATIAL_VISION',
    summaryTr: 'Yapay zeka ve uzamsal hesaplama yüklerini doğrudan GPU üzerinde zamanlayan paralel çekirdek zamanlayıcısı.',
    techDetailEn: 'Parallel GPU-first scheduler for neural & spatial execution graphs.',
    status: 'VISION_NOT_VERIFIED',
    candidatePaths: ['kernel/sched/gpu_sched.c', 'kernel/drivers/gpu'],
    concepts: ['GPU Scheduler', 'Neural Execution Graph', 'Parallel Time Slice'],
  },
];

export function resolveCatalogWithSnapshot(
  snapshot: IngestedRepositorySnapshot | null
): TechnicalSystemItem[] {
  if (!snapshot) return AYKENOS_TECHNICAL_CATALOG;

  const filePaths = snapshot.files.map((f) => f.path);

  return AYKENOS_TECHNICAL_CATALOG.map((item) => {
    const matched = item.candidatePaths.filter((cp) =>
      filePaths.some((fp) => fp.startsWith(cp) || fp.includes(cp))
    );

    let resolvedStatus = item.status;
    if (item.category !== 'SPATIAL_VISION') {
      if (matched.length > 0) {
        resolvedStatus = 'VERIFIED_IMPLEMENTATION';
      }
    } else {
      resolvedStatus = matched.length > 0 ? 'VERIFIED_IMPLEMENTATION' : 'VISION_NOT_VERIFIED';
    }

    return {
      ...item,
      status: resolvedStatus,
      matchedPaths: matched,
    };
  });
}
