import { NextRequest } from "next/server";
import { getAgentContentIndex, readAgentContent } from "@/lib/agent-content";
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") ?? "/";
  const entry = getAgentContentIndex().find(item => new URL(item.url).pathname === path);
  if (!entry) return new Response("Not found", { status: 404 });
  const chunks: string[] = [];
  let offset: number | null = 0;
  while (offset !== null) {
    const result = await readAgentContent({ id: entry.id, offset, maxLength: 12000 });
    chunks.push(result.markdown); offset = result.nextOffset;
  }
  return new Response(chunks.join(""), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
