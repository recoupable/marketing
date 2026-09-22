import { afterEach, describe, expect, it, vi } from "vitest";
import { planDeliveryToken } from "../planDeliveryToken";
import { starterPlan } from "../starterPlan";
import type { WorkflowAnswers } from "../schema";
import { POST } from "@/app/api/workflow-plan/email/route";
const answers: WorkflowAnswers = { bottleneck: ["Catalog reporting"], sources: ["Spreadsheets"], outcome: ["A weekly catalog income report"] };
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe("plan email delivery", () => {
  it("rejects tampered and expired plans", () => {
    const tokens = planDeliveryToken("test-key");
    const token = tokens.issue(answers, starterPlan(answers));
    expect(tokens.verify(token).answers).toEqual(answers);
    expect(() => tokens.verify(token + "x")).toThrow();
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 3600001);
    expect(() => tokens.verify(token)).toThrow();
  });
  it("emails the signed plan with an idempotency key and requires provider acceptance", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("WORKFLOW_PLAN_EMAIL_FROM", "Recoup <plans@example.com>");
    const fetcher = vi.fn().mockResolvedValue(Response.json({ id: "email-1" }));
    vi.stubGlobal("fetch", fetcher);
    const token = planDeliveryToken("test-key").issue(answers, starterPlan(answers));
    const request = () => new Request("https://example.com/api/workflow-plan/email", {
      method: "POST", headers: { origin: "https://example.com" },
      body: JSON.stringify({ email: "test@example.com", token }),
    });
    expect((await POST(request())).status).toBe(200);
    const payload = JSON.parse(fetcher.mock.calls[0][1].body);
    expect(payload.to).toEqual(["test@example.com"]);
    expect(payload.text).toContain("Catalog reporting");
    expect(fetcher.mock.calls[0][1].headers["Idempotency-Key"]).toBeTruthy();
    fetcher.mockResolvedValue(Response.json({ error: "failed" }, { status: 503 }));
    expect((await POST(request())).status).toBe(502);
  });
});
