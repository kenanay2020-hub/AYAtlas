import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/AYAtlas/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@ayatlas/snapshot-model': path.resolve(__dirname, '../../packages/snapshot-model/src/index.ts'),
      '@ayatlas/knowledge-model': path.resolve(__dirname, '../../packages/knowledge-model/src/index.ts'),
      '@ayatlas/repository-parser': path.resolve(__dirname, '../../packages/repository-parser/src/index.ts'),
      '@ayatlas/github-reader': path.resolve(__dirname, '../../packages/github-reader/src/index.ts'),
      '@ayatlas/knowledge-builder': path.resolve(__dirname, '../../packages/knowledge-builder/src/index.ts'),
      '@ayatlas/authority-resolver': path.resolve(__dirname, '../../packages/authority-resolver/src/index.ts'),
      '@ayatlas/graph-engine': path.resolve(__dirname, '../../packages/graph-engine/src/index.ts'),
      '@ayatlas/repository-ingestor': path.resolve(__dirname, '../../packages/repository-ingestor/src/index.ts'),
      '@ayatlas/provenance-engine': path.resolve(__dirname, '../../packages/provenance-engine/src/index.ts'),
      '@ayatlas/change-intelligence': path.resolve(__dirname, '../../packages/change-intelligence/src/index.ts'),
      '@ayatlas/query-engine': path.resolve(__dirname, '../../packages/query-engine/src/index.ts'),
      '@ayatlas/drift-engine': path.resolve(__dirname, '../../packages/drift-engine/src/index.ts'),
      '@ayatlas/ci-verifier': path.resolve(__dirname, '../../packages/ci-verifier/src/index.ts'),
    },
  },
  server: {
    port: 3000,
  },
});
