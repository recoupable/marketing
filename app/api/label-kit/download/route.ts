import { get } from "@vercel/blob";
import { requireSubscription } from "@/lib/label-kit/requireSubscription";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireSubscription(request);
    const path = process.env.LABEL_KIT_BLOB_PATH;
    if (
      !path?.startsWith("label-kit/") ||
      !process.env.LABEL_KIT_BLOB_READ_WRITE_TOKEN
    )
      return Response.json(
        { error: "The download is not available yet." },
        { status: 503 },
      );
    const file = await get(path, {
      access: "private",
      token: process.env.LABEL_KIT_BLOB_READ_WRITE_TOKEN,
      useCache: false,
    });
    if (!file || file.statusCode !== 200)
      return Response.json(
        { error: "The download is temporarily unavailable. Please retry." },
        { status: 503 },
      );
    return new Response(file.stream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="recoup-plugin.zip"',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return error instanceof Response
      ? error
      : Response.json(
          { error: "The download is temporarily unavailable. Please retry." },
          { status: 503 },
        );
  }
}
