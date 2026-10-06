import { describe, expect, it } from "vitest";
import { parseAcquisitionTags } from "../parseAcquisitionTags";
import { captureReferralAttribution } from "../captureReferralAttribution";
import { readReferralAttribution } from "../readReferralAttribution";
import { inquiryMessageWithContext } from "../inquiryMessageWithContext";

describe("paid creative attribution", () => {
  it("carries creative and stable IDs through a later untagged visit into the inquiry", () => {
    const values = new Map<string,string>();
    const store = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key,value); } };
    captureReferralAttribution("?utm_source=chatgpt&utm_content=report&campaign_id=c123&ad_group_id=g123&ad_id=a123&oppref=private-click",store);
    captureReferralAttribution("",store);
    const message = inquiryMessageWithContext("Our workflow", "/royalty-reporting", readReferralAttribution(store));
    expect(message).toContain("content=report; campaign id=c123; ad group id=g123; ad id=a123");
    expect(message).not.toContain("private-click");
  });
  it("rejects URLs, emails, and unexpanded macro values", () => {
    expect(parseAcquisitionTags("?utm_content=person%40example.com&ad_id=%7Bad_id%7D&campaign_id=https%3A%2F%2Fprivate.test")).toBeUndefined();
  });
});
