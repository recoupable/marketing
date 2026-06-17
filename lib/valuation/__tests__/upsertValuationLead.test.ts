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

const LIST_ID = "f5abf9c0-b0a0-4d47-a6b1-37072e415e65";
const personOk = () =>
  new Response(JSON.stringify({ data: { id: { record_id: "rec_123" } } }), { status: 200 });
const noteOk = () => new Response(JSON.stringify({ data: { id: { note_id: "note_1" } } }), { status: 200 });
// GET /objects/people/records/{id}/entries — record's list memberships
const entriesEmpty = () => new Response(JSON.stringify({ data: [] }), { status: 200 });
const entriesOnBoard = () =>
  new Response(JSON.stringify({ data: [{ list_id: LIST_ID }] }), { status: 200 });
const entryOk = () => new Response(JSON.stringify({ data: {} }), { status: 200 });

// Default happy path: person assert, note, membership (empty), entry create.
const happyPath = () =>
  vi
    .fn()
    .mockResolvedValueOnce(personOk())
    .mockResolvedValueOnce(noteOk())
    .mockResolvedValueOnce(entriesEmpty())
    .mockResolvedValueOnce(entryOk());

describe("upsertValuationLead", () => {
  beforeEach(() => vi.stubEnv("ATTIO_API_KEY", "test-key"));
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("asserts the person by email, writes the attributes, and returns the record link", async () => {
    const fetchMock = happyPath();
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(true);
    expect(res.recordUrl).toBe("https://app.attio.com/recoup/person/rec_123/overview");

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

  it("attaches a chronology note for this run (every run, incl. re-runs)", async () => {
    const fetchMock = happyPath();
    vi.stubGlobal("fetch", fetchMock);

    await upsertValuationLead(lead);

    const [noteUrl, noteInit] = fetchMock.mock.calls[1];
    expect(String(noteUrl)).toMatch(/\/notes$/);
    const note = JSON.parse(noteInit.body).data;
    expect(note.parent_object).toBe("people");
    expect(note.parent_record_id).toBe("rec_123");
    expect(note.format).toBe("markdown");
    expect(note.title).toContain("Mac Miller");
    expect(note.content).toContain("Mac Miller");
    expect(note.content).toContain("$54,600,000");
  });

  it("adds the person to the pipeline at New when they're not already on it", async () => {
    const fetchMock = happyPath();
    vi.stubGlobal("fetch", fetchMock);

    await upsertValuationLead(lead);

    // call[2] = look up the record's existing list memberships
    const [entriesUrl] = fetchMock.mock.calls[2];
    expect(String(entriesUrl)).toContain("/objects/people/records/rec_123/entries");

    // call[3] = create the entry at stage New
    const [createUrl, createInit] = fetchMock.mock.calls[3];
    expect(String(createUrl)).toMatch(/\/lists\/valuation_leads\/entries$/);
    const data = JSON.parse(createInit.body).data;
    expect(data.parent_object).toBe("people");
    expect(data.parent_record_id).toBe("rec_123");
    expect(data.entry_values.stage).toEqual(["New"]);
  });

  it("notes the re-run but does NOT add a duplicate card or reset the stage", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(personOk())
      .mockResolvedValueOnce(noteOk())
      .mockResolvedValueOnce(entriesOnBoard());
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(true);
    // assert + note + membership check, but NO create-entry call
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("omits follower_count when it is not known", async () => {
    const fetchMock = happyPath();
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

  it("fails fast (no note, no list work) when the person assert errors", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response("bad", { status: 400 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await upsertValuationLead(lead);
    expect(res.success).toBe(false);
    expect(res.error).toContain("400");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
