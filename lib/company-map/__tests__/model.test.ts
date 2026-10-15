import { describe, it, expect } from "vitest";
import model from "../model.json";
import publicCopy from "../public-copy.json";

describe("public operating model boundary", () => {
  it("contains only model fields, never private research or adoption claims", () => {
    expect(Object.keys(model).sort()).toEqual([
      "domains",
      "edges",
      "nodes",
      "workflows",
    ]);
    for (const d of model.domains)
      expect(Object.keys(d).sort()).toEqual(["id", "label", "summary"]);
    for (const n of model.nodes)
      expect(Object.keys(n).sort()).toEqual([
        "domain",
        "fields",
        "id",
        "label",
        "rules",
        "summary",
        "technicalLabel",
      ]);
    for (const e of model.edges)
      expect(Object.keys(e).sort()).toEqual([
        "id",
        "relation",
        "source",
        "target",
      ]);
    for (const w of model.workflows)
      expect(Object.keys(w).sort()).toEqual([
        "id",
        "label",
        "nodes",
        "summary",
      ]);
    expect(JSON.stringify(model)).not.toMatch(
      /\/Users\/|box\.com\/(file|folder|s)\/|github\.com\/recoupable\/(business|projects)|src-[a-f0-9]{20}|\bproposed\b|roadmap-\d|Source reference omitted/i,
    );
  });
  it("retains reviewed public relationship wording", () => {
    for (const [id, relation] of Object.entries(publicCopy.relations)) {
      expect(model.edges.find((edge) => edge.id === id)?.relation).toBe(relation);
    }
  });
  it("has complete traversable relationships and every company area", () => {
    expect(model.edges.length).toBeGreaterThan(0);
    expect(model.workflows.length).toBeGreaterThan(0);
    const nodes = new Set(model.nodes.map((n) => n.id));
    const domains = new Set(model.domains.map((d) => d.id));
    expect(domains.size).toBe(16);
    expect(nodes.size).toBe(model.nodes.length);
    for (const n of model.nodes) expect(domains.has(n.domain)).toBe(true);
    for (const d of domains)
      expect(model.nodes.some((n) => n.domain === d)).toBe(true);
    for (const e of model.edges) {
      expect(nodes.has(e.source)).toBe(true);
      expect(nodes.has(e.target)).toBe(true);
    }
    for (const w of model.workflows) {
      expect(w.nodes.length).toBeGreaterThan(0);
      for (const n of w.nodes) expect(nodes.has(n)).toBe(true);
    }
  });
});
