import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createAttioContact } from "@/lib/attio";

/** Reads the JSON body of the nth fetch call made by the helper. */
function bodyOfCall(n = 0) {
  const [, init] = vi.mocked(fetch).mock.calls[n];
  return JSON.parse(String(init?.body));
}

describe("createAttioContact", () => {
  beforeEach(() => {
    vi.stubEnv("ATTIO_API_KEY", "test-key");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ data: { id: { record_id: "rec_123" } } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("sends matching_attribute as a query param, not in the body", async () => {
    const res = await createAttioContact({ email: "artist@example.com", source: "x" });
    expect(res.success).toBe(true);

    const [url] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toContain("matching_attribute=email_addresses");
    expect(bodyOfCall()).not.toHaveProperty("matching_attribute");
    expect(bodyOfCall().data.values.email_addresses).toEqual([
      { email_address: "artist@example.com" },
    ]);
  });

  // The regression this suite previously missed: it asserted the query param and
  // the email array but never the `name` value shape, so a payload Attio 400s on
  // shipped and stayed green for seven weeks. See recoupable/chat#1800.
  it("sends first_name, last_name AND full_name for a full name", async () => {
    await createAttioContact({ email: "a@b.com", name: "Ada Lovelace" });
    expect(bodyOfCall().data.values.name).toEqual([
      { first_name: "Ada", last_name: "Lovelace", full_name: "Ada Lovelace" },
    ]);
  });

  it("sends a string last_name for a single-word name, never undefined", async () => {
    await createAttioContact({ email: "a@b.com", name: "Prince" });
    const name = bodyOfCall().data.values.name[0];
    expect(name).toEqual({ first_name: "Prince", last_name: "", full_name: "Prince" });
    expect(name).toHaveProperty("last_name");
  });

  it("omits the name key entirely when no name is supplied", async () => {
    await createAttioContact({ email: "a@b.com" });
    expect(bodyOfCall().data.values).not.toHaveProperty("name");
  });

  it("returns the created record id so callers can attach a note", async () => {
    const res = await createAttioContact({ email: "a@b.com", name: "Ada Lovelace" });
    expect(res).toMatchObject({ success: true, recordId: "rec_123" });
  });

  it("returns an error (does not throw) when the key is missing", async () => {
    vi.unstubAllEnvs();
    const res = await createAttioContact({ email: "a@b.com" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("ATTIO_API_KEY");
  });

  it("returns the Attio error body on a non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response("bad request", { status: 400 }));
    const res = await createAttioContact({ email: "a@b.com" });
    expect(res.success).toBe(false);
    expect(res.error).toContain("400");
  });
});
