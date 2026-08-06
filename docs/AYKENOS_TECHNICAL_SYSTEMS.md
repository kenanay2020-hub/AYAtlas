# AykenOS Technical Systems Specification & 4-State Classification

Architect & Developer: **Kenan AY**

This document specifies the technical system classification model used by AYAtlas to map active repository structures, governance contracts, and future spatial computing vision.

---

## 4-State System Classification Model

AYAtlas enforces a strict 4-state classification model to prevent conflating architectural vision with active repository execution:

1. **`VERIFIED_IMPLEMENTATION`**: Code, structure, or binary crates are verified to exist in the active Git repository tree (e.g. `kernel/mm`, `ayken-core/crates/bcib`).
2. **`BOUNDED`**: Implementation exists in Ring3 policy runtime (e.g. `userspace/semantic-cli`), but is explicitly bounded with `grantsNewAuthority = FALSE`.
3. **`GOVERNANCE_ONLY`**: Non-executable architectural or constitutional contracts (e.g. `shared/abi/syscalls.h` ABI freeze, `docs/roadmap/CURRENT_PHASE`).
4. **`VISION_NOT_VERIFIED`**: Future spatial computing or GPU-first operating vision (Spatial Memory, Scene Graph OS, Gaussian Splatting / Voxel Data Types) that are not yet verified in the active Git repository tree.

---

## Technical Systems Catalog Summary

| System ID | Technical System Name | Category | Classification State | Candidate Paths |
| :--- | :--- | :--- | :--- | :--- |
| `ring0-kernel` | Minimal Ring0 Mechanism Kernel | `CORE_MECHANISM` | `VERIFIED_IMPLEMENTATION` | `kernel/kernel.c`, `kernel/mm` |
| `frozen-abi` | Frozen Syscall ABI Boundary | `CORE_MECHANISM` | `GOVERNANCE_ONLY` | `shared/abi/syscalls.h` |
| `bcib-representation` | BCIB Binary Instruction Representation | `DATA_SUBSTRATE` | `VERIFIED_IMPLEMENTATION` | `ayken-core/crates/bcib` |
| `abdf-binary-format` | ABDF Typed Binary Data Format | `DATA_SUBSTRATE` | `VERIFIED_IMPLEMENTATION` | `ayken-core/crates/abdf` |
| `semantic-cli` | Semantic CLI Policy Runtime | `POLICY_RUNTIME` | `BOUNDED` | `userspace/semantic-cli` |
| `proofd-verification` | proofd Verification Service | `GOVERNANCE` | `VERIFIED_IMPLEMENTATION` | `proofd/src/main.rs` |
| `spatial-memory` | Spatial Memory Architecture | `SPATIAL_VISION` | `VISION_NOT_VERIFIED` | `kernel/spatial_mm` |
| `scene-graph-os` | Scene Graph Operating Model | `SPATIAL_VISION` | `VISION_NOT_VERIFIED` | `userspace/scene-graph` |
| `gaussian-voxel-types` | Native Gaussian / Voxel Data Types | `SPATIAL_VISION` | `VISION_NOT_VERIFIED` | `ayken-core/crates/voxel-types` |
| `gpu-first-scheduler` | GPU-first Scheduler | `SPATIAL_VISION` | `VISION_NOT_VERIFIED` | `kernel/sched/gpu_sched.c` |
