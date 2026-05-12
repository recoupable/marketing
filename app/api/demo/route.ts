import {
  streamText,
  convertToModelMessages,
  stepCountIs,
  type UIMessage,
} from "ai";
import { demoTools } from "@/lib/agent/tools";
import { RECOUP_DEMO_SYSTEM_PROMPT } from "@/lib/agent/system-prompt";

const DEFAULT_MODEL = "anthropic/claude-sonnet-4.6";

/**
 * Maximum agent-loop steps for a single user message. AI SDK v6 defaults to
 * 1 (one LLM call, no looping after tool results). We bump this to 5 so the
 * model can: 1) call a tool, 2) receive the result, 3) write a closing
 * sentence, with headroom for one or two follow-up tool calls if the model
 * decides to chain. Cost-bounded by design.
 */
const MAX_STEPS = 5;

/**
 * POST /api/demo
 *
 * Marketing hero demo agent loop. Uses Vercel AI Gateway (model strings are
 * auto-resolved when AI_GATEWAY_API_KEY is set in the environment) to call
 * the LLM with the demo tool registry, then streams a UI-message-compatible
 * response back to `useChat` on the client.
 *
 * Tools live in `lib/agent/tools/` — add new ones there and register in
 * `lib/agent/tools/index.ts`.
 */
export async function POST(request: Request): Promise<Response> {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ error: "Demo not configured" }, { status: 503 });
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: "messages required" }, { status: 400 });
  }

  const model = process.env.RECOUP_DEMO_MODEL || DEFAULT_MODEL;

  // `convertToModelMessages` is async in AI SDK v6 — it returns Promise<ModelMessage[]>.
  const modelMessages = await convertToModelMessages(body.messages);

  const result = streamText({
    model,
    system: RECOUP_DEMO_SYSTEM_PROMPT,
    messages: modelMessages,
    tools: demoTools,
    stopWhen: stepCountIs(MAX_STEPS),
  });

  return result.toUIMessageStreamResponse();
}
