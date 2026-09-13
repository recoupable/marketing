import { describe, expect, it } from "vitest";
import { docs } from "../../docs";
import { getAgentContentIndex } from "../getAgentContentIndex";

describe("docsEntries", () => {
  it("uses the normalized docs collection, so fallback source titles read as display titles", () => {
    const index = getAgentContentIndex();
    for (const page of docs) {
      const entry = index.find(
        (item) => item.id === `docs:${page.slug || "index"}`,
      );
      expect(entry?.title, page.slug).toBe(page.title);
      expect(entry?.title, page.slug).not.toBe(page.slug);
    }
  });
});
