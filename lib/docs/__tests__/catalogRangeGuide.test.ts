import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { docs } from "@/lib/docs";
import { docsLlmsFullText } from "@/lib/docs/docsLlmsFullText";
import releases from "../../../content/docs/source/api-reference/openapi/releases.json";

const source = readFileSync(
  "content/docs/source/api-reference/songs/catalog-streams.mdx",
  "utf8",
);
const page = docs.find(
  (item) => item.slug === "api-reference/songs/catalog-streams",
)!;
const paths = releases.paths;
const streams = paths["/api/catalogs/{catalogId}/streams"].get.parameters.find(
  (parameter) => parameter.name === "days",
)!;
const playcount = paths[
  "/api/catalogs/{catalogId}/playcount-history"
].get.parameters.find((parameter) => parameter.name === "days")!;

describe("catalog range guidance without generated parameter tables", () => {
  it("keeps both operation limits and the stream example in the maintained page body", () => {
    expect(source).toContain(
      `from ${streams.schema.minimum} to ${streams.schema.maximum} days`,
    );
    expect(source).toContain(`For example, use \`days=${streams.example}\``);
    expect(source).toContain(
      `separate ${playcount.schema.maximum}-day maximum`,
    );
    expect(source).toContain(
      "A supported date range does not prove complete measurements or historical backfill.",
    );
  });

  it("retains the same written guidance in generated pages and full AI text", async () => {
    expect(page.body.trim()).not.toBe("");
    const text = await docsLlmsFullText([page]);
    for (const sentence of source
      .split("---")
      .slice(2)
      .join("---")
      .trim()
      .split("\n\n")
      .slice(1)) {
      expect(page.body).toContain(sentence);
      expect(text).toContain(sentence);
    }
  });
});
