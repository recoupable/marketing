import { describe, expect, it, vi } from "vitest";
import { answersSchema, draftAnswersSchema, planSchema } from "../schema";
import { starterPlan } from "../starterPlan";
import { planText } from "../planText";
import { createPlanHandler } from "../createPlanHandler";

const answers = {
  bottleneck: ["Missing royalties" as const],
  sources: ["Spreadsheets" as const],
  outcome: ["A royalty review queue" as const],
};
function request(body: unknown, origin = "https://example.com") {
  return new Request("https://example.com/api/workflow-plan", {
    method: "POST",
    headers: { origin },
    body: JSON.stringify(body),
  });
}

describe("workflow planning", () => {
  it("accepts partial drafts but requires complete answers for generation", () => {
    const draft = { ...answers, sources: [], outcome: [] };
    expect(draftAnswersSchema.safeParse(draft).success).toBe(true);
    expect(answersSchema.safeParse(draft).success).toBe(false);
    expect(
      answersSchema.safeParse({ ...answers, outcome: ["Unknown choice"] }).success,
    ).toBe(false);
  });
  it("gives each workflow a valid bounded starter plan and carries context", () => {
    for (const bottleneck of answersSchema.shape.bottleneck.element.options) {
      const input = { ...answers, bottleneck: [bottleneck] };
      const plan = starterPlan(input);
      expect(planSchema.safeParse(plan).success).toBe(true);
      expect(planText(input, plan)).toContain(answers.outcome[0]);
      expect(planText(input, plan).length).toBeLessThan(5000);
    }
    expect(starterPlan(answers).review).toContain("before contacting a payer");
  });
  it("preserves multiple selections through generation and rejects an empty selection", async () => {
    const input = { ...answers, bottleneck: ["Catalog reporting", "Pitching for briefs"], outcome: ["A weekly catalog income report", "A shortlist for each brief"] };
    expect(answersSchema.safeParse({ ...input, bottleneck: [] }).success).toBe(false);
    const parsed = answersSchema.parse(input);
    const plan = starterPlan(parsed);
    expect(planSchema.safeParse(plan).success).toBe(true);
    expect(plan.title).toBe("Choose your first workflow pilot");
    expect(planText(parsed, plan)).toContain("Catalog reporting, Pitching for briefs");
    const generate = vi.fn().mockResolvedValue({ plan, mode: "personalized" });
    const handler = createPlanHandler({ generate, enabled: () => true, allow: () => true });
    expect((await handler(request({ answers: input }))).status).toBe(200);
    expect(generate.mock.calls[0][0].bottleneck).toEqual(input.bottleneck);
    expect(generate.mock.calls[0][0].outcome).toEqual(input.outcome);
    expect(planText(parsed, plan)).toContain(input.outcome.join("; "));
    expect(answersSchema.safeParse({ ...input, outcome: [] }).success).toBe(false);
  });
  it("blocks cross-origin and invalid requests before generating", async () => {
    const generate = vi.fn();
    const handler = createPlanHandler({
      generate,
      enabled: () => true,
      allow: () => true,
    });
    expect(
      (await handler(request({ answers }, "https://elsewhere.test"))).status,
    ).toBe(403);
    expect((await handler(request({ answers: {} }))).status).toBe(400);
    expect(generate).not.toHaveBeenCalled();
  });
  it("provides an honest fallback without calling AI when disabled", async () => {
    const generate = vi.fn();
    const handler = createPlanHandler({
      generate,
      enabled: () => false,
      allow: () => true,
    });
    const response = await handler(request({ answers }));
    expect((await response.json()).mode).toBe("starter");
    expect(generate).not.toHaveBeenCalled();
  });
  it("handles provider failures and rate limits without dropping answers", async () => {
    const generate = vi
      .fn()
      .mockRejectedValue(new Error("secret provider details"));
    const handler = createPlanHandler({
      generate,
      enabled: () => true,
      allow: () => true,
    });
    expect((await (await handler(request({ answers }))).json()).mode).toBe(
      "starter",
    );
    const followup = await handler(
      request({
        answers,
        plan: starterPlan(answers),
        question: "What should I do first?",
      }),
    );
    expect(followup.status).toBe(503);
    expect(await followup.text()).not.toContain("secret");
    const limited = createPlanHandler({
      generate,
      enabled: () => true,
      allow: () => false,
    });
    expect((await limited(request({ answers }))).status).toBe(429);
  });
  it("returns generated plans and passes bounded follow-up context", async () => {
    const generate = vi
      .fn()
      .mockResolvedValue({ plan: starterPlan(answers), mode: "personalized" });
    const handler = createPlanHandler({
      generate,
      enabled: () => true,
      allow: () => true,
    });
    expect((await (await handler(request({ answers }))).json()).mode).toBe(
      "personalized",
    );
    generate.mockResolvedValue({
      reply: "Choose a completed reporting period.",
    });
    const response = await handler(
      request({
        answers,
        plan: starterPlan(answers),
        question: "Where should I start?",
      }),
    );
    expect((await response.json()).reply).toContain("reporting period");
    expect(generate.mock.calls[1][2].question).toBe("Where should I start?");
  });
});
