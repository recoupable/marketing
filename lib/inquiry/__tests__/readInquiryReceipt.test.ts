import { describe, expect, it } from "vitest";
import { readInquiryReceipt } from "../readInquiryReceipt";

const id = "a".repeat(64);

describe("readInquiryReceipt", () => {
  it("returns the submission id from a saved-inquiry receipt", async () => {
    expect(await readInquiryReceipt(Response.json({ ok: true, submission_id: id }))).toEqual({ submissionId: id });
  });
  it("rejects every other 2xx shape, including a receipt without its id", async () => {
    for (const response of [
      Response.json({ ok: true }),
      Response.json({ ok: true, submission_id: id }, { status: 202 }),
      Response.json({ ok: true, submission_id: "not-a-fingerprint" }),
      Response.json({ ok: true, submission_id: id, ignored: true }),
      Response.json({ ok: false, submission_id: id }),
      Response.json({ ok: "true", submission_id: id }),
      Response.json([{ ok: true, submission_id: id }]),
      Response.json(null),
      new Response(null, { status: 204 }),
      new Response("<html>Gateway page</html>", { headers: { "Content-Type": "text/html" } }),
      new Response('{"ok":', { headers: { "Content-Type": "application/json" } }),
      Response.json({ ok: true, submission_id: id }, { status: 503 }),
    ]) expect(await readInquiryReceipt(response)).toBeNull();
  });
});
