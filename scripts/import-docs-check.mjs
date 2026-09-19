import { execFileSync } from 'node:child_process';
execFileSync('pnpm', ['exec', 'vitest', 'run', 'tests/docs-migration.test.ts', 'tests/docs-headings.test.ts'], { stdio: 'inherit' });
