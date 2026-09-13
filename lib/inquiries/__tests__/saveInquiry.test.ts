import { describe, expect, it } from "vitest";
import { saveInquiry } from "../saveInquiry";
import type { Inquiry } from "../validateInquiry";

const inquiry: Inquiry = {
  name: "Taylor Example", email: "taylor@example.com", company: "Example Music",
  interest: "Custom systems", message: "We want to make our catalog searchable.",
  source: "/contact", startedAt: 1_800_000_000_000,
};

describe("saveInquiry", () => {
  it("resolves only for a 200 whose body says status success", async () => {
    await expect(saveInquiry(inquiry, "f".repeat(64), "https://api.recoup.test/api", async () => Response.json({ status: "success" }))).resolves.toBeUndefined();
  });
  it("treats an accepted-but-unconfirmed 202 as unavailable, like postLead", async () => {
    await expect(saveInquiry(inquiry, "f".repeat(64), "https://api.recoup.test/api", async () => Response.json({ status: "success" }, { status: 202 }))).rejects.toMatchObject({ status: 503 });
  });
  it("treats a 200 without the success status as unavailable", async () => {
    await expect(saveInquiry(inquiry, "f".repeat(64), "https://api.recoup.test/api", async () => Response.json({ status: "error" }))).rejects.toMatchObject({ status: 503 });
  });
});
