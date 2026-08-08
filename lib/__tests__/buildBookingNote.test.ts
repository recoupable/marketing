import { describe, it, expect } from "vitest";
import { buildBookingNote } from "@/lib/buildBookingNote";

const base = {
  company: "Test Co",
  package: "retained-advisor" as const,
};

describe("buildBookingNote", () => {
  it("titles the note so it is findable in Attio", () => {
    const { title } = buildBookingNote(base);
    expect(title).toBe("Advisory Inquiry: Retained Advisor ($5,000/mo)");
  });

  it("includes every supplied qualifying field", () => {
    const { content } = buildBookingNote({
      ...base,
      role: "Label Owner / GM",
      rosterSize: "21-50 artists",
      message: "We manage 30 artists",
    });
    expect(content).toContain("Package: Retained Advisor ($5,000/mo)");
    expect(content).toContain("Company: Test Co");
    expect(content).toContain("Role: Label Owner / GM");
    expect(content).toContain("Roster Size: 21-50 artists");
    expect(content).toContain("Message: We manage 30 artists");
    expect(content).toContain("Source: website /advisory/book");
  });

  it("omits optional fields that were not supplied rather than printing blanks", () => {
    const { content } = buildBookingNote(base);
    expect(content).not.toContain("Role:");
    expect(content).not.toContain("Roster Size:");
    expect(content).not.toContain("Message:");
    expect(content).not.toContain("undefined");
  });

  it("falls back to the raw package key if it is ever unlabelled", () => {
    const { title } = buildBookingNote({ ...base, package: "unknown-tier" as never });
    expect(title).toBe("Advisory Inquiry: unknown-tier");
  });
});
