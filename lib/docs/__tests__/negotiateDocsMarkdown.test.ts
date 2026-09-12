import { describe, expect, it } from "vitest";
import { negotiateDocsMarkdown } from "@/lib/docs/negotiateDocsMarkdown";

describe("negotiateDocsMarkdown", () => {
  it("rewrites a docs page to its raw markdown when the client accepts text/markdown", () => {
    expect(negotiateDocsMarkdown("/docs/quickstart", "text/markdown")).toBe("/docs/raw/quickstart.md");
    expect(negotiateDocsMarkdown("/docs/api-reference/artists/list", "text/markdown;q=0.9, */*;q=0.1")).toBe("/docs/raw/api-reference/artists/list.md");
  });

  it("rewrites when text/plain is accepted without text/html", () => {
    expect(negotiateDocsMarkdown("/docs/quickstart", "text/plain")).toBe("/docs/raw/quickstart.md");
    expect(negotiateDocsMarkdown("/docs/quickstart", "text/html, text/plain")).toBeNull();
  });

  it("rewrites a .md suffix regardless of the Accept header", () => {
    expect(negotiateDocsMarkdown("/docs/quickstart.md", null)).toBe("/docs/raw/quickstart.md");
    expect(negotiateDocsMarkdown("/docs/quickstart.md", "text/html")).toBe("/docs/raw/quickstart.md");
  });

  it("maps the docs index to the raw index page", () => {
    expect(negotiateDocsMarkdown("/docs", "text/markdown")).toBe("/docs/raw/index.md");
    expect(negotiateDocsMarkdown("/docs/", "text/markdown")).toBe("/docs/raw/index.md");
  });

  it("leaves browser requests and wildcard accepts alone", () => {
    expect(negotiateDocsMarkdown("/docs/quickstart", "text/html,application/xhtml+xml,*/*;q=0.8")).toBeNull();
    expect(negotiateDocsMarkdown("/docs/quickstart", "*/*")).toBeNull();
    expect(negotiateDocsMarkdown("/docs/quickstart", null)).toBeNull();
  });

  it("never rewrites the raw, spec, or api-reference overview paths", () => {
    expect(negotiateDocsMarkdown("/docs/raw/quickstart.md", "text/markdown")).toBeNull();
    expect(negotiateDocsMarkdown("/docs/spec/accounts.json", "text/markdown")).toBeNull();
    expect(negotiateDocsMarkdown("/docs/api-reference", "text/markdown")).toBeNull();
    expect(negotiateDocsMarkdown("/pricing", "text/markdown")).toBeNull();
  });
});
