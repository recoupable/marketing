import { siteConfig } from "@/lib/config";

const API_KEY =
  process.env.RECOUP_PROD_API_KEY || process.env.RECOUP_DEV_API_KEY;

const SYSTEM_PROMPT = `You are a music industry AI assistant on the Recoup website demo. Keep responses concise (under 200 words). Always format with rich markdown:

- Use **bold** for artist names, numbers, and key metrics
- Use bullet points (- ) for lists
- Use ### for section headers when covering multiple topics
- Use > blockquotes for recommendations or key takeaways
- Keep it scannable — short paragraphs, clear hierarchy
- Be specific with data — include numbers, percentages, cities
- End with a clear next step or recommendation`;

/**
 * POST /api/demo
 *
 * Proxies to the Recoup chat API with a system prompt
 * that enforces rich markdown formatting.
 */
export async function POST(request: Request): Promise<Response> {
  if (!API_KEY) {
    return Response.json({ error: "Demo not configured" }, { status: 503 });
  }

  const body = await request.json();

  let userText = "";

  if (typeof body.prompt === "string") {
    userText = body.prompt.trim();
  } else if (Array.isArray(body.messages)) {
    const lastUserMsg = [...body.messages]
      .reverse()
      .find((m: { role: string }) => m.role === "user");

    if (lastUserMsg) {
      if (typeof lastUserMsg.content === "string") {
        userText = lastUserMsg.content.trim();
      } else if (Array.isArray(lastUserMsg.parts)) {
        userText = lastUserMsg.parts
          .filter((p: { type: string }) => p.type === "text")
          .map((p: { text: string }) => p.text)
          .join("")
          .trim();
      } else if (Array.isArray(lastUserMsg.content)) {
        userText = lastUserMsg.content
          .filter((p: { type: string }) => p.type === "text")
          .map((p: { text: string }) => p.text)
          .join("")
          .trim();
      }
    }
  }

  if (!userText) {
    return Response.json({ error: "No message found" }, { status: 400 });
  }

  const prompt = `${SYSTEM_PROMPT}\n\nUser: ${userText}`;

  const res = await fetch(`${siteConfig.apiUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok || !res.body) {
    return Response.json({ error: "API error" }, { status: res.status });
  }

  return new Response(res.body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
