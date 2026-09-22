import { describe, expect, it, vi } from "vitest";
import { captureWorkflowLead } from "../captureWorkflowLead";
import type { WorkflowAnswers } from "../schema";

const answers: WorkflowAnswers = {
  bottleneck: ["Catalog reporting"], sources: ["Spreadsheets"],
  outcome: ["A weekly catalog income report"],
};
describe("workflow lead capture", () => {
  it("validates contact details before sending", async () => {
    const fetcher = vi.fn();
    expect((await captureWorkflowLead({ name: "", email: "invalid" }, answers, fetcher)).ok).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });
  it("saves contact and answers with the workflow source and requires a receipt", async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ status: "success" }));
    expect((await captureWorkflowLead({ name: " Test ", email: "test@example.com" }, answers, fetcher)).ok).toBe(true);
    expect(JSON.parse(fetcher.mock.calls[0][1].body)).toMatchObject({
      name: "Test", email: "test@example.com", source: "/workflow-plan", audit_answers: answers,
    });
    fetcher.mockResolvedValue(Response.json({ status: "error" }, { status: 503 }));
    expect((await captureWorkflowLead({ name: "Test", email: "test@example.com" }, answers, fetcher)).ok).toBe(false);
  });
});
