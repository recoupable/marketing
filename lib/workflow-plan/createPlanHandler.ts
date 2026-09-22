import { requestSchema } from "./schema";
import { starterPlan } from "./starterPlan";
import type { generatePlan } from "./generatePlan";

export function createPlanHandler(deps: {
  generate: typeof generatePlan;
  enabled: () => boolean;
  allow: (request: Request) => boolean;
}) {
  return async (request: Request) => {
    const json = (body: unknown, status = 200) =>
      Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
    try {
      const origin = new URL(request.headers.get("origin") || "");
      if (
        origin.host !==
          (request.headers.get("host") || new URL(request.url).host) ||
        !["http:", "https:"].includes(origin.protocol)
      )
        throw new Error("origin");
    } catch {
      return json({ error: "Please create your plan from this website." }, 403);
    }
    const reader = request.body?.getReader();
    let raw = "";
    let bytes = 0;
    const decoder = new TextDecoder();
    if (!reader) return json({ error: "Please check your answers." }, 400);
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 14000) {
          await reader.cancel();
          return json({ error: "Please shorten your answers." }, 413);
        }
        raw += decoder.decode(value, { stream: true });
      }
      raw += decoder.decode();
    } catch {
      return json({ error: "Please try again." }, 400);
    }
    let input;
    try {
      input = requestSchema.safeParse(JSON.parse(raw));
    } catch {
      return json({ error: "Please check your answers." }, 400);
    }
    if (!input.success)
      return json({ error: "Please complete all three questions." }, 400);
    const { answers, plan, question } = input.data;
    if (!deps.enabled()) {
      return question
        ? json(
            {
              error:
                "Follow-up chat is unavailable. Your plan is still available below.",
            },
            503,
          )
        : json({ plan: starterPlan(answers), mode: "starter" });
    }
    if (!deps.allow(request))
      return json(
        {
          error:
            "You’ve made several requests. Please try again later; your answers are saved in this tab.",
        },
        429,
      );
    try {
      return json(
        await deps.generate(
          answers,
          AbortSignal.any([request.signal, AbortSignal.timeout(25000)]),
          plan && question ? { plan, question } : undefined,
        ),
      );
    } catch {
      return question
        ? json({ error: "That reply didn’t finish. Please try again." }, 503)
        : json({ plan: starterPlan(answers), mode: "starter" });
    }
  };
}
