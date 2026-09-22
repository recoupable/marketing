import { beforeEach, describe, expect, it, vi } from "vitest";
const { lookup, request } = vi.hoisted(() => ({
  lookup: vi.fn(),
  request: vi.fn(),
}));
vi.mock("node:dns/promises", () => ({ lookup }));
vi.mock("node:https", () => ({ request }));
import { readCompanyWebsite } from "./readCompanyWebsite";

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
});
