import { describe, expect, it } from "vitest";
import { readInquiryFailure } from "../readInquiryFailure";

describe("readInquiryFailure", () => {
  it("never displays or tracks arbitrary response text", async () => {
    const failure = await readInquiryFailure(Response.json({ ok: false, code: "someone@example.com", error: "provider secret" }, { status: 400 }));
    expect(failure.reason).toBe("validation");
    expect(JSON.stringify(failure)).not.toContain("someone@example.com");
    expect(JSON.stringify(failure)).not.toContain("provider secret");
  });

  it("does not let an unexpected code reclassify a server outage as a rejection", async () => {
    expect(await readInquiryFailure(Response.json({ ok: false, code: "blocked" }, { status: 503 })))
      .toMatchObject({ event: "inquiry_failed", reason: "unavailable" });
  });

  it("handles non-JSON gateway errors and an already-consumed invalid receipt", async () => {
    expect(await readInquiryFailure(new Response("Gateway error", { status: 502 })))
      .toMatchObject({ event: "inquiry_failed", reason: "unavailable" });
    const response = Response.json({ ok: true });
    await response.json();
    expect(await readInquiryFailure(response)).toMatchObject({ event: "inquiry_failed", reason: "invalid_receipt" });
  });
});
