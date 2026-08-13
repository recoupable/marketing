import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createAttioNote } from "@/lib/createAttioNote";

describe("createAttioNote", () => {
  beforeEach(() => {
    vi.stubEnv("ATTIO_API_KEY", "test-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("posts the note against the person record", async () => {
    const res = await createAttioNote({
      recordId: "rec_123",
      title: "Advisory Inquiry",
      content: "Package: Retained Advisor",
    });
    expect(res.success).toBe(true);

    const [url, init] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toBe("https://api.attio.com/v2/notes");
    expect(init?.method).toBe("POST");
    expect(JSON.parse(String(init?.body)).data).toEqual({
      title: "Advisory Inquiry",
      content: "Package: Retained Advisor",
      format: "plaintext",
      parent_object: "people",
      parent_record_id: "rec_123",
    });
  });

  it("reports failure instead of throwing when Attio rejects the note", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("nope", { status: 400 }));
    const res = await createAttioNote({ recordId: "r", title: "t", content: "c" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("400");
  });

  it("reports failure when the key is missing", async () => {
    vi.unstubAllEnvs();
    const res = await createAttioNote({ recordId: "r", title: "t", content: "c" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("ATTIO_API_KEY");
  });

  it("reports failure instead of throwing when the network call rejects", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("socket hang up"));
    const res = await createAttioNote({ recordId: "r", title: "t", content: "c" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("socket hang up");
  });
});
