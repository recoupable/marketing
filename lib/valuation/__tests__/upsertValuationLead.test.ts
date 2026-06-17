import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { upsertValuationLead } from "@/lib/valuation/upsertValuationLead";

const lead = {
  email: "artist@example.com",
  artistName: "Mac Miller",
  artistId: "4LLpKhyESsyAXpc4laK94U",
  valueBand: { low: 37_500_000, central: 54_600_000, high: 76_800_000 },
  lifetimeStreams: 22_000_000_000,
  followerCount: 13_000_000,
};

const personOk = () =>
  new Response(JSON.stringify({ data: { id: { record_id: "rec_123" } } }), { status: 200 });
const queryEmpty = () => new Response(JSON.stringify({ data: [] }), { status: 200 });
const queryFound = () =>
  new Response(JSON.stringify({ data: [{ id: { entry_id: "ent_1" } }] }), { status: 200 });
const entryOk = () => new Response(JSON.stringify({ data: {} }), { status: 200 });

describe("upsertValuationLead", () => {
  beforeEach(() => vi.stubEnv("ATTIO_API_KEY", "test-key"));
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("asserts the person by email and writes the qualifying attributes", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(personOk())
      .mockResolvedValueOnce(queryEmpty())
      .mockResolvedValueOnce(entryOk());
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(true);

    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/objects/people/records");
    expect(String(url)).toContain("matching_attribute=email_addresses");
    expect(init.method).toBe("PUT");
    const values = JSON.parse(init.body).data.values;
    expect(values.email_addresses).toEqual([{ email_address: "artist@example.com" }]);
    expect(values.lead_source).toBe("Catalog Valuation");
    expect(values.est_catalog_value).toBe(54_600_000); // band central = lead score
    expect(values.looked_up_artist).toBe("Mac Miller");
    expect(values.spotify_artist_url).toBe(
      "https://open.spotify.com/artist/4LLpKhyESsyAXpc4laK94U",
    );
    expect(values.lifetime_streams).toBe(22_000_000_000);
    expect(values.follower_count).toBe(13_000_000);
    expect(values.valued_at).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("adds the person to the pipeline at New when they're not already on it", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(personOk())
      .mockResolvedValueOnce(queryEmpty())
      .mockResolvedValueOnce(entryOk());
    vi.stubGlobal("fetch", fetchMock);

    await upsertValuationLead(lead);

    // call[1] = query existing entries for the parent record
    const [queryUrl, queryInit] = fetchMock.mock.calls[1];
    expect(String(queryUrl)).toContain("/lists/valuation_leads/entries/query");
    expect(JSON.parse(queryInit.body).filter.parent_record_id).toBe("rec_123");

    // call[2] = create the entry at stage New
    const [createUrl, createInit] = fetchMock.mock.calls[2];
    expect(String(createUrl)).toMatch(/\/lists\/valuation_leads\/entries$/);
    const data = JSON.parse(createInit.body).data;
    expect(data.parent_object).toBe("people");
    expect(data.parent_record_id).toBe("rec_123");
    expect(data.entry_values.stage).toEqual(["New"]);
  });

  it("does NOT add a duplicate card (or reset the stage) when already on the board", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(personOk())
      .mockResolvedValueOnce(queryFound());
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(2); // assert + query, NO create
  });

  it("omits follower_count when it is not known", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(personOk())
      .mockResolvedValueOnce(queryEmpty())
      .mockResolvedValueOnce(entryOk());
    vi.stubGlobal("fetch", fetchMock);

    const { followerCount: _omit, ...noFollowers } = lead;
    await upsertValuationLead(noFollowers);

    const values = JSON.parse(fetchMock.mock.calls[0][1].body).data.values;
    expect(values).not.toHaveProperty("follower_count");
  });

  it("returns an error without calling Attio when the key is missing", async () => {
    vi.unstubAllEnvs();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(false);
    expect(res.error).toContain("ATTIO_API_KEY");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("fails fast (no list work) when the person assert errors", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response("bad", { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(false);
    expect(res.error).toContain("400");
    expect(fetchMock).toHaveBeenCalledTimes(1); // did not query or create an entry
  });
});
