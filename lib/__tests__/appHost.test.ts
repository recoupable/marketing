import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const retiredHosts = ["teams.recoupable.dev", "developers.recoupable.com", "chat.recoupable.com"];
const roots = ["app", "components", "lib", "hooks", "public"];
const extensions = [".ts", ".tsx", ".txt", ".md"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === "__tests__" ? [] : sourceFiles(path);
    return extensions.some((ext) => name.endsWith(ext)) ? [path] : [];
  });
}

describe("app host", () => {
  it("links only the current app host", () => {
    const offenders = roots.flatMap(sourceFiles).filter((path) => {
      const text = readFileSync(path, "utf8");
      return retiredHosts.some((host) => text.includes(host));
    });
    expect(offenders).toStrictEqual([]);
  });
});
