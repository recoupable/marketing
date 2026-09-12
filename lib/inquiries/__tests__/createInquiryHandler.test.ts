import { describe, expect, it } from "vitest";
import { createInquiryHandler } from "../createInquiryHandler";

const now = 1_800_000_000_000;
const valid = {
  name: "Taylor Example", email: "taylor@example.com", company: "Example Music",
  interest: "Custom systems", message: "We want to make our catalog searchable.",
  website: "", startedAt: now - 5_000, source: "/operations/contact",
};

function request(body: unknown) {
  return new Request("https://recoup.test/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://recoup.test" },
    body: JSON.stringify(body),
  });
}

function handler() {
  const calls: { url: string; body: Record<string, unknown> }[] = [];
  const handle = createInquiryHandler({
    getApiUrl: () => "https://api.recoup.test/api", now: () => now,
    fetch: async (input, init) => {
      calls.push({ url: String(input), body: JSON.parse(String(init?.body)) });
      return Response.json({ status: "success" });
    },
  });
  return { handle, calls };
}

describe("createInquiryHandler", () => {
  it("forwards the page the visitor submitted from as the lead source", async () => {
    const { handle, calls } = handler();
    expect((await handle(request(valid))).status).toBe(200);
    expect(calls[0].url).toBe("https://api.recoup.test/api/leads");
    expect(calls[0].body.source).toBe("/operations/contact");
    expect(calls[0].body.kind).toBe("booking");
  });

  it("returns the submission fingerprint in the receipt and writes the same id into the note", async () => {
    const { handle, calls } = handler();
    const receipt = await (await handle(request(valid))).json();
    expect(receipt.ok).toBe(true);
    expect(receipt.submission_id).toMatch(/^[a-f\d]{64}$/);
    expect(String(calls[0].body.message)).toContain(`Submission ID: ${receipt.submission_id}`);
  });

  it("rejects a missing or unknown source before any api call", async () => {
    const { handle, calls } = handler();
    // JSON.stringify drops an undefined key, so this body arrives without a source.
    for (const body of [{ ...valid, source: undefined }, { ...valid, source: "/music-videos" }, { ...valid, source: "" }]) {
      expect((await handle(request(body))).status).toBe(400);
    }
    expect(calls).toHaveLength(0);
  });
});
