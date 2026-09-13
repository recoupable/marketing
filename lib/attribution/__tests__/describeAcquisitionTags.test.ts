import { describe, expect, it } from "vitest";
import { describeAcquisitionTags } from "../describeAcquisitionTags";

describe("describeAcquisitionTags", () => {
  it("writes source, medium and campaign without underscores so CRM markdown renders them", () => {
    expect(describeAcquisitionTags({ utm_source: "pr95", utm_medium: "email", utm_campaign: "sky" })).toBe(
      "source=pr95; medium=email; campaign=sky",
    );
  });
  it("lists only the tags that are present, in a stable order", () => {
    expect(describeAcquisitionTags({ utm_campaign: "sky", utm_source: "pr95" })).toBe("source=pr95; campaign=sky");
    expect(describeAcquisitionTags({})).toBe("");
    expect(describeAcquisitionTags(undefined)).toBe("");
  });
});
