import { describe, expect, it } from "vitest";
import { sanitizeAcquisitionTags } from "../sanitizeAcquisitionTags";

describe("sanitizeAcquisitionTags", () => {
  it("keeps campaign labels up to 100 characters and drops longer ones", () => {
    expect(sanitizeAcquisitionTags({ utm_source: "x".repeat(100) })).toEqual({ utm_source: "x".repeat(100) });
    expect(sanitizeAcquisitionTags({ utm_source: "x".repeat(101) })).toBeUndefined();
  });
  it("rejects anything that is not a plain label", () => {
    expect(sanitizeAcquisitionTags({ utm_source: "person@example.com" })).toBeUndefined();
    expect(sanitizeAcquisitionTags({ utm_medium: "https://private.test" })).toBeUndefined();
    expect(sanitizeAcquisitionTags({ utm_campaign: "line\nbreak" })).toBeUndefined();
    expect(sanitizeAcquisitionTags(["chatgpt.com"])).toBeUndefined();
  });
});
