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


describe("compact project intake", () => {
  const project = { ...valid, source: "/start-project", company: "", message: "",
    qualification: { budget: "$10,000–$25,000", timeline: "Within 1–3 months", tools: "Excel, DISCO" } };

  it("saves an inquiry without a company or essay and preserves qualification", async () => {
    const { handle, calls } = handler();
    expect((await handle(request(project))).status).toBe(200);
    expect(calls[0].body).not.toHaveProperty("company");
    expect(calls[0].body.message).toContain("Email domain (company unverified): example.com");
    expect(calls[0].body.message).toContain("$10,000–$25,000");
    expect(calls[0].body.message).toContain("Within 1–3 months");
    expect(calls[0].body.message).toContain("Excel, DISCO");
  });

  it("accepts omitted optional fields and never assigns a personal email provider as a company", async () => {
    const { handle, calls } = handler();
    expect((await handle(request({ ...project, company: undefined, message: undefined, email: "taylor@gmail.com" }))).status).toBe(200);
    expect(calls[0].body).not.toHaveProperty("company");
    expect(calls[0].body.message).toContain("Company: Not provided");
  });

  it("preserves an optional company, short note, and selected-plan context", async () => {
    const { handle, calls } = handler();
    const message = "Hi!\n\nSelected plan: Partner (annual)";
    expect((await handle(request({ ...project, company: "Example Music", message }))).status).toBe(200);
    expect(calls[0].body.company).toBe("Example Music");
    expect(calls[0].body.message).toContain(message);
  });

  it("requires valid budget and timing before forwarding", async () => {
    const { handle, calls } = handler();
    for (const qualification of [undefined, {}, { ...project.qualification, budget: "" }, { ...project.qualification, timeline: "tomorrow" }]) {
      expect((await handle(request({ ...project, qualification }))).status).toBe(400);
    }
    expect(calls).toHaveLength(0);
  });

  it("keeps other forms and podcast inquiries strict", async () => {
    const { handle, calls } = handler();
    expect((await handle(request({ ...valid, company: "" }))).status).toBe(400);
    expect((await handle(request({ ...valid, message: "" }))).status).toBe(400);
    expect((await handle(request({ ...project, interest: "Podcast guest", qualification: undefined }))).status).toBe(400);
    expect((await handle(request({ ...valid, source: "/start-project", interest: "Podcast guest" }))).status).toBe(200);
    expect(calls).toHaveLength(1);
  });
});
