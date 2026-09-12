import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Every one of these paths answers with a 308; internal links must point at the final page.
const redirectedPaths = [
  "/build/start",
  "/advisory/book",
  "/company/about",
  "/company/recoup-records",
  "/learn",
  "/privacy-policy",
  "/terms-of-use",
];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(ts|tsx|mdx)$/.test(entry.name) ? [path] : [];
  });
}

describe("internal links", () => {
  it("never target a redirected path", () => {
    const offenders: string[] = [];
    for (const file of [
      ...sourceFiles("app"),
      ...sourceFiles("components"),
      ...sourceFiles("lib"),
    ]) {
      const text = readFileSync(file, "utf8");
      for (const path of redirectedPaths) {
        if (new RegExp(`href=["'\`]${path}["'\`?#]`).test(text))
          offenders.push(`${file} -> ${path}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
