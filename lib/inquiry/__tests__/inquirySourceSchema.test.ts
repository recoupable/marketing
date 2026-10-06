import { describe, expect, it } from "vitest";
import { inquirySourceSchema } from "../inquirySourceSchema";

describe("inquirySourceSchema", () => {
  it("accepts the supported inquiry pages", () => {
    for (const source of ["/contact", "/start-project", "/acquisitions/contact", "/operations/contact", "/royalty-reporting"]) {
      expect(inquirySourceSchema.parse(source)).toBe(source);
    }
  });
  it("rejects anything else, so a caller cannot invent a source", () => {
    for (const source of ["/music-videos", "", "contact", "/start-project/", undefined, 42]) {
      expect(inquirySourceSchema.safeParse(source).success).toBe(false);
    }
  });
});
