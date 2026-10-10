import { execFileSync } from "node:child_process";
execFileSync(process.execPath, ["node_modules/vitest/vitest.mjs", "run", "tests/docs-migration.test.ts", "tests/docs-headings.test.ts"], { stdio: "inherit" });
