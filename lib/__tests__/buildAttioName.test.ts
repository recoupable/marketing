import { describe, it, expect } from "vitest";
import { buildAttioName } from "@/lib/buildAttioName";

describe("buildAttioName", () => {
  it("returns undefined when no name is supplied, so the key can be omitted", () => {
    expect(buildAttioName(undefined)).toBeUndefined();
    expect(buildAttioName("")).toBeUndefined();
    expect(buildAttioName("   ")).toBeUndefined();
  });

  it("sends full_name for a two-part name — Attio 400s without it", () => {
    expect(buildAttioName("Ada Lovelace")).toEqual([
      { first_name: "Ada", last_name: "Lovelace", full_name: "Ada Lovelace" },
    ]);
  });

  it("sends an empty last_name for a single-word name, never undefined", () => {
    const values = buildAttioName("Prince");
    expect(values).toEqual([
      { first_name: "Prince", last_name: "", full_name: "Prince" },
    ]);
    // JSON.stringify drops undefined keys — assert the key survives the wire.
    expect(JSON.parse(JSON.stringify(values))[0]).toHaveProperty("last_name");
  });

  it("keeps every part after the first in last_name", () => {
    expect(buildAttioName("Ada King Lovelace")).toEqual([
      { first_name: "Ada", last_name: "King Lovelace", full_name: "Ada King Lovelace" },
    ]);
  });

  it("trims surrounding and repeated whitespace", () => {
    expect(buildAttioName("  Ada   Lovelace  ")).toEqual([
      { first_name: "Ada", last_name: "Lovelace", full_name: "Ada Lovelace" },
    ]);
  });
});
