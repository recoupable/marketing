import { describe, expect, it } from "vitest";
import { prefersMarkdown } from "../prefersMarkdown.ts";

describe("prefersMarkdown", () => {
  it("selects Markdown when text/markdown is at least as preferred as text/html", () => {
    expect(prefersMarkdown("text/markdown")).toBe(true);
    expect(prefersMarkdown("text/html;q=0.9, text/markdown")).toBe(true);
    expect(prefersMarkdown("text/plain")).toBe(true);
  });

  it("keeps HTML for browsers and refusals", () => {
    expect(prefersMarkdown("text/html,application/xhtml+xml,*/*;q=0.8")).toBe(false);
    expect(prefersMarkdown("text/markdown;q=0, text/plain")).toBe(false);
    expect(prefersMarkdown(null)).toBe(false);
  });
});
