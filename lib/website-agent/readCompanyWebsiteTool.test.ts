import { beforeEach, describe, expect, it, vi } from "vitest";
import { WebsiteReadError } from "./WebsiteReadError";

const { read, update } = vi.hoisted(() => ({ read: vi.fn(), update: vi.fn() }));
vi.mock("eve/tools", () => ({ defineTool: (tool: unknown) => tool }));
vi.mock("./readCompanyWebsite", () => ({ readCompanyWebsite: read }));
vi.mock("../../agent/lib/research", () => ({ research: { update } }));
import websiteTool from "../../agent/tools/read_company_website";

const execute = (
  websiteTool as unknown as {
    execute: (input: { url: string }) => Promise<Record<string, unknown>>;
  }
).execute;

describe("website research recovery", () => {
  beforeEach(() => vi.clearAllMocks());

  it("preserves successful research when a later page is missing", async () => {
    let evidence: Record<string, string> = {};
    update.mockImplementation((save) => {
      evidence = save(evidence);
    });
    read.mockResolvedValueOnce({
      url: "https://example.com/",
      text: "Known company facts",
    });
    await execute({ url: "https://example.com/" });

    read.mockRejectedValueOnce(new WebsiteReadError("http", 404));
    const failure = await execute({ url: "https://example.com/missing" });
    expect(failure).toMatchObject({ reason: "http", statusCode: 404 });
    expect(failure.guidance).toContain("Keep the successfully read sources");
    expect(evidence).toEqual({ "https://example.com/": "Known company facts" });
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("does not expose arbitrary network error details to the agent", async () => {
    read.mockRejectedValueOnce(new Error("private diagnostic details"));
    const failure = await execute({ url: "https://example.com/" });
    expect(failure).toMatchObject({
      reason: "unavailable",
      error: "This page could not be read.",
    });
    expect(JSON.stringify(failure)).not.toContain("private diagnostic details");
  });
});
