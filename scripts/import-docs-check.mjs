import { execFileSync } from 'node:child_process';
execFileSync(process.execPath,['--test','tests/docs-migration.test.ts','tests/docs-headings.test.ts'],{stdio:'inherit'});
