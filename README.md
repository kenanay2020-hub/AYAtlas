# AYAtlas — Architecture Intelligence Platform for AykenOS

[![AYAtlas CI](https://github.com/kenanay2020-hub/AYAtlas/actions/workflows/ci.yml/badge.svg)](https://github.com/kenanay2020-hub/AYAtlas/actions/workflows/ci.yml)
[![Pages Deployment](https://github.com/kenanay2020-hub/AYAtlas/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/kenanay2020-hub/AYAtlas/actions/workflows/deploy-pages.yml)
[![License: Read-Only Isolated](https://img.shields.io/badge/License-Read--Only_Isolated-cyan.svg)](docs/READ_ONLY_CONTRACT.md)

**AYAtlas** is an isolated, read-only **Architecture Intelligence Platform** designed specifically for **AykenOS** (`kenanay/AykenOS`). It transforms raw Git repository commits, code files, phase roadmaps, and evidence claims into a Living Governance Knowledge Graph, automated contradiction detector, and continuous CI enforcer.

---

## 🏛️ Core Constitutional Invariants

AYAtlas strictly enforces six non-negotiable constitutional invariants over the AykenOS substrate:

1. **Read-Only Safety Contract**: AYAtlas contains zero mutating/write capabilities targeting the AykenOS repository.
2. **Mechanism vs Policy Separation**: Ring0 kernel execution mechanisms are strictly decoupled from Ring3 policy runtimes.
3. **Repository Change != Authority Change**: Newly detected implementation code does NOT infer or grant active runtime authority (`grantsNewAuthority = FALSE`).
4. **Validator PASS != Accepted Evidence**: Local validator outputs (proofd/verifier) do NOT equal accepted evidence until exact-subject commit SHA binding and formal governance ratification occur under Phase-24 rules.
5. **Syscall ABI Freeze**: Unauthorized modification of `shared/abi` without a canonical decision record is flagged as `CRITICAL_ABI_FREEZE_VIOLATION`.
6. **Deterministic Knowledge Pipeline**: 5-Stage data transformations yield time-independent, identical SHA-256 payload digests for the same Git SHA.

---

## 📦 Monorepo Package Architecture

AYAtlas is organized as a clean, modular TypeScript monorepo powered by Turbo:

```
AYAtlas/
├── packages/
│   ├── snapshot-model/        # Pure Repository & Observation Schemas (contentDigest, sourceObjectId)
│   ├── knowledge-model/       # Multi-axial Entity, Relation & Assertion Schemas
│   ├── repository-parser/     # Static Code & Frontmatter Parser (Zero code execution)
│   ├── github-reader/         # Read-Only Repository Adapters (Fixture, Local, GitHub REST API)
│   ├── knowledge-builder/     # 5-Stage Deterministic Knowledge Transformation Engine
│   ├── authority-resolver/    # AykenOS Phase Catalog (Phase-0 -> Phase-24) & Authority Boundaries
│   ├── graph-engine/          # Governance Knowledge Graph Relational Engine
│   ├── repository-ingestor/   # Deterministic File Tree Ingestion & SHA-256 Manifest Generator
│   ├── provenance-engine/     # Exact Source Provenance Tracking & Stale State Invalidations
│   ├── change-intelligence/   # Semantic Diff & Architectural Impact Engine
│   ├── query-engine/          # Audit-Traceable Natural Language Constitutional Answer Engine
│   ├── drift-engine/          # Contradiction & Architectural Drift Inspector
│   └── ci-verifier/           # 5-Gate Constitutional Audit CLI (`npx ayatlas-verify`)
├── apps/
│   └── web/                   # React 18 + Vite + Tailwind CSS Dark Glassmorphism Web App
└── docs/                      # Constitutional Policies & Isolation Contracts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm 10+

### Installation & Build

```bash
# Clone the repository
git clone https://github.com/kenanay2020-hub/AYAtlas.git
cd AYAtlas

# Install dependencies across all monorepo workspaces
npm install

# Build all 14 packages and the web application via Turbo
npm run build:all
```

### Running the Web Dashboard Locally

```bash
npm run dev
# Opens the interactive Web Explorer at http://localhost:3000
```

### Running the Unit Test Suite

```bash
npm test
# Executes Vitest across all workspace packages (17 unit tests)
```

### Running the 5-Gate Constitutional CI Enforcer

```bash
npx ayatlas-verify --sha d8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f
```

---

## 🔍 Key Platform Visual Explorers

The AYAtlas Web Console (`apps/web`) provides 11 specialized architectural views:

1. **Atlas Overview**: Substrate metrics,locked SHA, active phase, and high-level component status.
2. **Architecture Health & Trust Dashboard**: Single-pane evaluation of substrate integrity, contract freeze, and overall Trust Score (98/100).
3. **Architecture Evolution Timeline**: Historical trace of invariant additions, capability deprecations, and ABI freezes from Phase-0 to Phase-24.
4. **Governance Knowledge Graph**: Interactive visual node-edge explorer connecting Substrate $\rightarrow$ ABI $\rightarrow$ Authority $\rightarrow$ Evidence.
5. **Constitutional Query Console**: Natural language architectural search yielding audit-traceable `ConstitutionalAnswer` packages.
6. **Contradiction & Drift Inspector**: Real-time audit of ABI violations, phase pointer mismatches, and unratified code additions.
7. **Live Repository Intelligence**: Semantic diff comparing base vs target commit SHAs with `grantsNewAuthority = FALSE` enforcement.
8. **Evidence Boundary Explorer**: 8-Stage evidence verification pipeline and exact-subject SHA binding tracking.
9. **Phase Explorer**: Interactive phase timeline detailing authorized vs forbidden execution scopes.
10. **Roadmaps**: Canonical read-only AykenOS timeline vs editable AYAtlas product roadmap.
11. **Learning Center**: Guided educational paths explaining mechanism vs policy separation and evidence boundaries.

---

## 🤖 Continuous Integration & Verification

AYAtlas integrates seamlessly with GitHub Actions:

- **`ci.yml`**: Automatically runs `npm ci`, `npm run build:all`, `npm test`, and `npx ayatlas-verify` on every commit/PR.
- **`deploy-pages.yml`**: Automatically builds and deploys the static web bundle (`apps/web/dist`) to GitHub Pages upon push to `main`.

---

## 📄 License & Constitutional Policies

This project is governed by the AYAtlas Constitution and Read-Only Contracts:
- [AYATLAS_CONSTITUTION.md](docs/AYATLAS_CONSTITUTION.md)
- [READ_ONLY_CONTRACT.md](docs/READ_ONLY_CONTRACT.md)
- [SOURCE_AUTHORITY_POLICY.md](docs/SOURCE_AUTHORITY_POLICY.md)
- [HISTORICAL_RECORD_POLICY.md](docs/HISTORICAL_RECORD_POLICY.md)
- [NON_INTERVENTION_POLICY.md](docs/NON_INTERVENTION_POLICY.md)
- [TERMINOLOGY.md](docs/TERMINOLOGY.md)
