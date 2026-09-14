import { describe, expect, it } from "vitest";
import {
  assetStage,
  reviewExportSchema,
  reviewsSchema,
  reviewSummary,
  type Asset,
} from "../reviews";
const asset: Asset = {
  id: "test-art",
  title: "Test artwork",
  code: "T01",
  group: "podcast",
  collection: "Test",
  preview: "assets/test.png",
  files: [],
  stage: "experiment",
};
describe("Review migration", () => {
  it("retains old decisions and separates final placement from approval", () => {
    const old = reviewsSchema.parse({
      "test-art": { status: "approved", note: "Keep this color." },
    });
    expect(assetStage(asset, old)).toBe("experiment");
    const moved = reviewsSchema.parse({
      "test-art": { ...old["test-art"], stage: "final" },
    });
    expect(assetStage(asset, moved)).toBe("final");
    expect(moved["test-art"].note).toBe("Keep this color.");
    expect(reviewSummary([asset], moved)).toContain("KEEP");
    expect(reviewSummary([asset], moved)).toContain("/brand/assets/test.png");
  });
  it("imports existing exports and rejects malformed decisions", () => {
    expect(
      reviewExportSchema.parse({
        schema: "recoup-brand-review-v1",
        reviews: {
          "test-art": {
            status: "needs-changes",
            note: "Adjust",
            stage: "experiment",
          },
        },
      }).reviews["test-art"].status,
    ).toBe("needs-changes");
    for (const review of [
      { status: "final", note: "" },
      { status: "approved", note: 123 },
      { status: "approved", note: "", stage: "wrong" },
      { status: "proposed", note: "a".repeat(2001) },
    ])
      expect(reviewsSchema.safeParse({ "test-art": review }).success).toBe(
        false,
      );
  });
});
