import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const generated = ["inventory.json", "manifest.json", "navigation.json"];

describe("pnpm docs:build", () => {
  it("regenerates the committed docs snapshot from content/docs/source without drift", () => {
    const out = mkdtempSync(path.join(tmpdir(), "docs-build-"));
    execFileSync(process.execPath, [path.join(root, "scripts/build-docs.mjs"), "--out", out], { cwd: root, stdio: "pipe" });
    for (const file of generated) {
      expect(readFileSync(path.join(out, file), "utf8"), file).toBe(readFileSync(path.join(root, "content/docs", file), "utf8"));
    }
  }, 120_000);
});
