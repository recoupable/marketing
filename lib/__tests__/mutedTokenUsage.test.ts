import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../..");
const SCANNED_DIRS = ["app", "components", "lib"];
const SOURCE_EXTENSIONS = [".tsx", ".ts"];

const SKIPPED_DIRS = new Set(["node_modules", ".next", "__tests__"]);

/**
 * Every source file under the scanned directories. `__tests__` is skipped so
 * this guard does not match the literal it searches for in its own source.
 */
function collectSourceFiles(dir: string): string[] {
  const entries = readdirSync(dir);
  return entries.flatMap((entry) => {
    if (SKIPPED_DIRS.has(entry)) return [];
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return collectSourceFiles(full);
    return SOURCE_EXTENSIONS.includes(path.extname(full)) ? [full] : [];
  });
}

/**
 * `--muted` is a surface color (#f7f7f7 light, #151515 dark). Using it as a text
 * color renders text the same shade as the card behind it: measured at 1.08:1 in
 * dark and 1.07:1 in light on /pricing, against a WCAG AA floor of 4.5:1. The
 * text token is `--muted-foreground` (#6b6b6b light, #a0a0a0 dark).
 */
describe("muted token usage", () => {
  it("never uses the --muted surface token as a text color", () => {
    const offenders = SCANNED_DIRS.flatMap((dir) =>
      collectSourceFiles(path.join(ROOT, dir))
        .filter((file) => readFileSync(file, "utf8").includes("text-[var(--muted)]"))
        .map((file) => path.relative(ROOT, file)),
    );

    expect(offenders).toEqual([]);
  });
});
