import { beforeEach, describe, expect, it, vi } from "vitest";
import { EventEmitter } from "node:events";
const { lookup, request } = vi.hoisted(() => ({
  lookup: vi.fn(),
  request: vi.fn(),
}));
vi.mock("node:dns/promises", () => ({ lookup }));
vi.mock("node:https", () => ({ request }));
import { readCompanyWebsite } from "./readCompanyWebsite";

function respond(statusCode: number, contentType = "text/html") {
  lookup.mockResolvedValue([{ address: "8.8.8.8", family: 4 }]);
  request.mockImplementation((_url, _options, callback) => {
    const req = Object.assign(new EventEmitter(), {
      end: () => {
        const res = Object.assign(new EventEmitter(), {
          statusCode,
          headers: { "content-type": contentType },
          resume: () => req.emit("close"),
        });
        callback(res);
        res.emit(
          "data",
          Buffer.from("<p>Public company information. ".repeat(10)),
        );
        res.emit("end");
        req.emit("close");
      },
    });
    return req;
  });
}

describe("company website access", () => {
  beforeEach(() => vi.clearAllMocks());
  it.each([
    "http://example.com",
    "https://user:pass@example.com",
    "https://example.com:8443",
  ])("rejects unsafe URL %s", async (url) => {
    await expect(readCompanyWebsite(url)).rejects.toThrow();
    expect(request).not.toHaveBeenCalled();
  });
  it.each([
    "127.0.0.1",
    "10.1.2.3",
    "169.254.169.254",
    "192.168.1.1",
    "172.16.0.1",
    "100.64.0.1",
  ])("blocks private destination %s", async (address) => {
    lookup.mockResolvedValue([{ address, family: 4 }]);
    await expect(readCompanyWebsite("https://example.com")).rejects.toThrow(
      "public company website",
    );
    expect(request).not.toHaveBeenCalled();
  });
  it("rejects mixed public/private DNS results", async () => {
    lookup.mockResolvedValue([
      { address: "8.8.8.8", family: 4 },
      { address: "10.0.0.1", family: 4 },
    ]);
    await expect(readCompanyWebsite("example.com")).rejects.toThrow();
    expect(request).not.toHaveBeenCalled();
  });
  it.each([404, 403, 503])(
    "preserves HTTP %s instead of losing the failure reason",
    async (statusCode) => {
      respond(statusCode);
      await expect(
        readCompanyWebsite("https://example.com/missing-page"),
      ).rejects.toMatchObject({
        reason: "http",
        statusCode,
        message: `This page returned HTTP ${statusCode}.`,
      });
    },
  );
  it("distinguishes an unsupported format from a missing page", async () => {
    respond(200, "application/pdf");
    await expect(
      readCompanyWebsite("https://example.com/report"),
    ).rejects.toMatchObject({
      reason: "unsupported",
      statusCode: undefined,
    });
  });
  it("still returns readable pages and their source URL", async () => {
    respond(200);
    const page = await readCompanyWebsite("https://example.com/about");
    expect(page.url).toBe("https://example.com/about");
    expect(page.text).toContain("Public company information.");
  });
});
