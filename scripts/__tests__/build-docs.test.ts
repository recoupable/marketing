import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const generated = ["inventory.json", "manifest.json", "navigation.json"];

describe("pnpm docs:build", () => {
  it("regenerates the committed docs snapshot from content/docs/source without drift", () => {
    const out = mkdtempSync(path.join(tmpdir(), "docs-build-"));
    try {
      execFileSync(process.execPath, [path.join(root, "scripts/build-docs.mjs"), "--out", out], { cwd: root, stdio: "pipe" });
      for (const file of generated) {
        expect(readFileSync(path.join(out, file), "utf8"), file).toBe(readFileSync(path.join(root, "content/docs", file), "utf8"));
      }
      expect(readFileSync(path.join(out, "llms-full.txt"), "utf8")).toBe(
        readFileSync(path.join(root, "content/docs/source/llms-full.txt"), "utf8"),
      );
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  }, 120_000);

  it("preserves failed-read and admission contracts in the retained AI export, with stable public links", () => {
    const out = mkdtempSync(path.join(tmpdir(), "docs-ai-export-"));
    try {
      execFileSync(process.execPath, [path.join(root, "scripts/build-docs.mjs"), "--out", out], {
        cwd: root,
        env: { ...process.env, NEXT_PUBLIC_SITE_URL: "https://preview.example" },
        stdio: "pipe",
      });
      const text = readFileSync(path.join(out, "llms-full.txt"), "utf8");
      const pages = JSON.parse(readFileSync(path.join(out, "manifest.json"), "utf8"));
      expect(text).toMatch(/^# Recoup developer documentation\n/);
      expect(text.match(/^Source: /gm)).toHaveLength(pages.length);
      expect(text).toContain("Source: https://recoupable.dev/docs/api-reference/chat/workflow");
      expect(text).not.toContain("preview.example");
      expect(text).not.toMatch(/\]\(\/docs(?:[\/)#])/);
      expect(text).not.toContain("the submitted new turn is not saved on that resume path");
      const operations = [...text.matchAll(/## Operation and referenced schemas\n\n```json\n([\s\S]*?)\n```/g)]
        .map(match => JSON.parse(match[1]))
        .filter(value => value.openapi && value.paths);
      const cases = [
        ["research", "post", "/api/chat"],
        ["research", "get", "/api/chat/{chatId}/stream"],
        ["sessions", "get", "/api/sessions/{sessionId}/chats"],
        ["sessions", "post", "/api/sessions/{sessionId}/chats"],
        ["sessions", "get", "/api/sessions/{sessionId}/chats/{chatId}"],
        ["sessions", "patch", "/api/sessions/{sessionId}/chats/{chatId}"],
        ["sessions", "delete", "/api/sessions/{sessionId}/chats/{chatId}"],
        ["sessions", "post", "/api/sessions/{sessionId}/chats/{chatId}/read"],
      ];
      for (const [name, method, route] of cases) {
        const source = JSON.parse(readFileSync(path.join(root, `content/docs/source/api-reference/openapi/${name}.json`), "utf8"));
        const slices = operations.filter(value => value.paths[route]?.[method]);
        expect(slices.length, `${method} ${route}`).toBeGreaterThan(0);
        for (const slice of slices) {
          expect(slice.paths[route][method].responses["500"]).toEqual(source.paths[route][method].responses["500"]);
          if (route === "/api/chat" && method === "post") {
            for (const status of ["409", "503"]) {
              expect(slice.paths[route][method].responses[status]).toEqual(source.paths[route][method].responses[status]);
              expect(slice.paths[route][method].responses[status]).toBeDefined();
            }
          }
          if (name === "research") {
            const lifecycle = (parameters: { name: string }[]) => parameters.filter(parameter => parameter.name === "streamLifecycle");
            expect(lifecycle(slice.paths[route][method].parameters)).toEqual(lifecycle(source.paths[route][method].parameters));
            expect(lifecycle(slice.paths[route][method].parameters)).toHaveLength(1);
          }
          const references = [...JSON.stringify(slice).matchAll(/"\$ref":"(#\/[^\"]+)"/g)];
          for (const [, reference] of references) {
            const target = reference.slice(2).split("/").reduce((value, key) => value?.[key.replaceAll("~1", "/").replaceAll("~0", "~")], slice);
            expect(target, reference).toBeDefined();
          }
        }
      }
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  }, 120_000);
});
