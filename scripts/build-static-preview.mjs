/**
 * Builds the static reading preview for GitHub Pages.
 *
 * Next refuses to export a build that contains a Server Action anywhere in the
 * graph, and a bundler alias does not help: the action modules are detected by
 * their `'use server'` directive, not by who imports them. So for the duration
 * of this build the two action modules are physically replaced by the stubs
 * that sit beside them, and restored afterwards — including when the build
 * fails, or the process is interrupted.
 *
 * The swap is deliberately visible rather than hidden in bundler config: it is
 * the one place where the preview differs from the real service, and it should
 * be easy to find.
 *
 *   node scripts/build-static-preview.mjs [--base-path /vinica]
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const SWAPS = [
  ['src/server/actions/membership.ts', 'src/server/actions/membership.static.ts'],
  ['src/server/actions/orders.ts', 'src/server/actions/orders.static.ts'],
];

const basePathFlag = process.argv.indexOf('--base-path');
const basePath =
  basePathFlag > -1 ? process.argv[basePathFlag + 1] : (process.env.NV_BASE_PATH ?? '');

const originals = new Map();
let restored = false;

function restore() {
  if (restored) return;
  restored = true;
  for (const [real] of SWAPS) {
    const content = originals.get(real);
    if (content !== undefined) writeFileSync(real, content);
  }
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    restore();
    process.exit(130);
  });
}
process.on('exit', restore);

try {
  for (const [real, stub] of SWAPS) {
    originals.set(real, readFileSync(real, 'utf8'));
    writeFileSync(real, readFileSync(stub, 'utf8'));
  }
  console.log(`Building the static reading preview${basePath ? ` at ${basePath}` : ''}…`);

  for (const step of [
    ['node', ['--experimental-strip-types', 'scripts/build-map.mjs']],
    ['node', ['--experimental-strip-types', 'scripts/audit-content.mjs']],
    ['npx', ['next', 'build']],
  ]) {
    const result = spawnSync(step[0], step[1], {
      stdio: 'inherit',
      env: { ...process.env, NV_STATIC_PREVIEW: '1', NV_BASE_PATH: basePath },
    });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
} finally {
  restore();
}

/* GitHub Pages runs Jekyll over the published directory unless told not to,
   and Jekyll drops every path beginning with an underscore — which is all of
   Next's assets. */
writeFileSync('out/.nojekyll', '');
console.log('\nStatic reading preview written to out/');
