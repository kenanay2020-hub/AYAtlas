#!/usr/bin/env node
import { CIVerifier } from './CIVerifier';

async function main() {
  const args = process.argv.slice(2);
  let commitSha = 'd8018a2c3b4a5e6f7a8b9c0d1e2f3a4b5c6d7e8f';
  let sourceMode: 'fixture' | 'local' | 'github' = 'fixture';
  let customPath: string | undefined = undefined;

  const shaIdx = args.indexOf('--sha');
  if (shaIdx !== -1 && args[shaIdx + 1]) {
    commitSha = args[shaIdx + 1];
  }

  const sourceIdx = args.indexOf('--source');
  if (sourceIdx !== -1 && args[sourceIdx + 1]) {
    const val = args[sourceIdx + 1].toLowerCase();
    if (val === 'github' || val === 'local' || val === 'fixture') {
      sourceMode = val;
    }
  }

  const pathIdx = args.indexOf('--path');
  if (pathIdx !== -1 && args[pathIdx + 1]) {
    customPath = args[pathIdx + 1];
  }

  console.log(`[AYAtlas CI Enforcer] Running 5-Gate Constitutional Audit for commit ${commitSha.slice(0, 8)}...`);
  console.log(`[AYAtlas CI Enforcer] Source Mode: ${sourceMode.toUpperCase()}`);

  const verifier = new CIVerifier();
  const report = await verifier.verifyCommit(commitSha, sourceMode, customPath);

  console.log('\n' + report.summaryMarkdown + '\n');

  if (!report.overallPassed) {
    console.error('❌ [AYAtlas CI Enforcer] Verification FAILED due to critical constitutional violations.');
    process.exit(1);
  } else {
    console.log('✅ [AYAtlas CI Enforcer] All 5 Constitutional Gates PASSED.');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal CI Verifier Error:', err);
  process.exit(1);
});
