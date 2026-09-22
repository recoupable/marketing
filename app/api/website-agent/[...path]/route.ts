import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { readGrant, signGrant } from "@/lib/website-agent/tokens";
import { allowRequest } from "@/lib/website-agent/allowRequest";
import { validateChatMessage } from "@/lib/website-agent/validateChatMessage";
export const runtime = "nodejs";
export const maxDuration = 300;
const cookieName = "recoup_website_session";
const fail = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });

async function handle(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const route = path.join("/");
  const create = route === "eve/v1/session" && request.method === "POST";
  const match =
    /^eve\/v1\/session\/([a-zA-Z0-9_-]+)(?:\/(stream|cancel))?$/.exec(route);
  if (
    !create &&
    (!match ||
      (request.method === "GET"
        ? match[2] !== "stream"
        : match[2] === "stream"))
  )
    return fail("Not found", 404);
  const origins =
    process.env.NODE_ENV === "production"
      ? [
          "https://recoupable.dev",
          ...(process.env.VERCEL_URL
            ? [`https://${process.env.VERCEL_URL}`]
            : []),
          ...(process.env.WEBSITE_AGENT_ORIGIN
            ? [process.env.WEBSITE_AGENT_ORIGIN]
            : []),
        ]
      : ["http://127.0.0.1:3017", "http://localhost:3017"];
  if (
    request.method === "POST" &&
    !origins.includes(request.headers.get("origin") ?? "")
  )
    return fail("Invalid origin", 403);
  if (!process.env.WEBSITE_AGENT_SECRET)
    return fail("Chat is not configured yet", 503);
  const existing = readGrant(request.cookies.get(cookieName)?.value, "session");
  if (!create && (!existing || existing.session !== match?.[1]))
    return fail("This conversation is not available in this browser", 403);
  const principal = existing?.principal ?? randomUUID();
  let body: string | undefined;
  if (request.method === "POST") {
    if (
      !(await allowRequest(
        request.headers.get("x-forwarded-for")?.split(",")[0] ?? "local",
      ))
    )
      return fail("Chat is busy. Please try again later.", 429);
    const reader = request.body?.getReader();
    let size = 0;
    const chunks: Uint8Array[] = [];
    if (reader) {
      while (true) {
        const item = await reader.read();
        if (item.done) break;
        size += item.value.byteLength;
        if (size > 12000) {
          await reader.cancel();
          return fail("Message too long", 413);
        }
        chunks.push(item.value);
      }
    }
    try {
      const input = JSON.parse(Buffer.concat(chunks).toString() || "{}");
      if (match?.[2] === "cancel") body = JSON.stringify({});
      else {
        // Never forward arbitrary context, approval responses, models, schemas or delegation settings.
        const validated = validateChatMessage(input);
        if (!validated.success)
          return fail("Please send a message under 6,000 characters", 400);
        body = JSON.stringify({
          ...validated.data,
          ...(create ? { turnPolicy: undefined } : {}),
        });
      }
    } catch {
      return fail("Invalid message", 400);
    }
  }
  const origin =
    process.env.WEBSITE_AGENT_ORIGIN ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://127.0.0.1:3017");
  const target = new URL(`/${route}`, origin);
  if (request.method === "GET") target.search = request.nextUrl.search;
  const grant = signGrant({
    purpose: "internal",
    principal,
    path: `/${route}`,
    method: request.method,
    expires: Date.now() + 60000,
  });
  try {
    const response = await fetch(target, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        "x-recoup-agent-grant": grant,
      },
      body,
      cache: "no-store",
      signal: request.signal,
    });
    if (create && response.ok) {
      const data = await response.json();
      if (typeof data.sessionId !== "string")
        return fail("Could not start the conversation", 502);
      const result = NextResponse.json(data, { status: response.status });
      result.cookies.set(
        cookieName,
        signGrant({
          purpose: "session",
          principal,
          session: data.sessionId,
          expires: Date.now() + 86400000,
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/api/website-agent",
          maxAge: 86400,
        },
      );
      result.headers.set("Cache-Control", "no-store");
      return result;
    }
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.delete("set-cookie");
    headers.set("Cache-Control", "no-store");
    headers.set("X-Accel-Buffering", "no");
    return new Response(response.body, { status: response.status, headers });
  } catch {
    return fail("Could not reach the assistant. Please try again.", 502);
  }
}
export const GET = handle;
export const POST = handle;
