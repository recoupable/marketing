import { expect, it } from "vitest";
import { validateInsightSources } from "./validateInsightSources";
it("accepts real excerpts with typography differences", () => {
  expect(
    validateInsightSources(
      [
        {
          url: "https://example.com",
          quote: '"Our catalog includes 100 works"',
        },
      ],
      {
        "https://example.com": "Our catalog includes 100 works and recordings.",
      },
    ),
  ).toBeUndefined();
});
it("rejects fabricated quotes and unread source URLs", () => {
  expect(
    validateInsightSources(
      [{ url: "https://example.com", quote: "We lose royalties" }],
      { "https://example.com": "Our catalog includes 100 works." },
    ),
  ).toContain("does not match");
  expect(
    validateInsightSources(
      [{ url: "https://other.com", quote: "Our catalog" }],
      { "https://example.com": "Our catalog" },
    ),
  ).toContain("Read");
});
