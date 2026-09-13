import { afterEach, describe, expect, it } from "vitest";
import { captureReferralAttribution } from "../captureReferralAttribution";
import { referralAttributionListeners } from "../referralAttributionListeners";

function session() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) || null, setItem: (key: string, value: string) => { values.set(key, value); } };
}

afterEach(() => referralAttributionListeners.clear());

describe("captureReferralAttribution notifications", () => {
  it("notifies subscribers after storing new tags, so mounted app links re-read the store", () => {
    let calls = 0;
    referralAttributionListeners.add(() => { calls++; });
    const store = session();
    captureReferralAttribution("?utm_source=pr95", store);
    expect(calls).toBe(1);
    captureReferralAttribution("?utm_source=launch&utm_campaign=sky", store);
    expect(calls).toBe(2);
  });
  it("stays silent when the query carries no tags", () => {
    let calls = 0;
    referralAttributionListeners.add(() => { calls++; });
    captureReferralAttribution("?workflow=AI%20strategy", session());
    expect(calls).toBe(0);
  });
});
