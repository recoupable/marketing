import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArguments } from "../lib/cli.ts";

test("CRM updates require an explicit apply flag", () => {
  assert.equal(parseArguments("sync-attio", []).apply, false);
  assert.equal(parseArguments("sync-attio", ["--dry-run"]).apply, false);
  assert.equal(parseArguments("sync-attio", ["--apply"]).apply, true);
});

test("all command help runs without loading credentials or making requests", () => {
  for (const script of ["exportUsers.ts", "syncAttio.ts", "buildDashboard.ts"]) {
    const result = spawnSync(process.execPath, [
      "--experimental-strip-types",
      "--import", fileURLToPath(new URL("./noNetwork.mjs", import.meta.url)),
      fileURLToPath(new URL(`../scripts/${script}`, import.meta.url)), "--help",
    ], { encoding: "utf8", env: { PATH: process.env.PATH } });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Usage:/);
    assert.doesNotMatch(result.stdout, /Fetching|Syncing|Missing required/);
  }
});

test("ambiguous or misspelled write flags fail closed", () => {
  assert.throws(() => parseArguments("sync-attio", ["--apply", "--dry-run"]));
  assert.throws(() => parseArguments("sync-attio", ["--aply"]));
  assert.throws(() => parseArguments("export-users", ["--apply"]));
});

test("help takes priority and is safe for every command", () => {
  for (const command of ["sync-attio", "export-users", "dashboard"] as const) {
    assert.equal(parseArguments(command, ["--help"]).help, true);
    assert.equal(parseArguments(command, ["--help", "--apply"]).help, true);
  }
});

test("valid filters are preserved and invalid filters rejected", () => {
  assert.deepEqual(parseArguments("export-users", ["--", "--segment", "new", "--email-only"]), {
    help: false, apply: false, emailOnly: true, segment: "new",
  });
  assert.throws(() => parseArguments("sync-attio", ["--segment"]));
  assert.throws(() => parseArguments("sync-attio", ["--segment", "everyone"]));
  assert.throws(() => parseArguments("dashboard", ["--segment", "new"]));
});
