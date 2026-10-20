import release from "@/content/label-kit/release.json";
import { readVerifiedPlugin } from "@/lib/label-kit/readVerifiedPlugin";
import { get } from "@vercel/blob";
import { requirePluginPurchase } from "@/lib/label-kit/requirePluginPurchase";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requirePluginPurchase(request);
    const path = process.env.LABEL_KIT_BLOB_PATH;
    if (
      path !== `label-kit/${release.version}.zip` ||
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
    const bytes = await readVerifiedPlugin(file.stream);
    return new Response(bytes, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="recoup-plugin.zip"',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Length": String(bytes.byteLength),
        "X-Recoup-Release": release.version,
        "X-Recoup-Source": release.sourceCommit,
        "X-Recoup-Content-SHA256": release.customerContentSha256,
        "X-Recoup-Archive-SHA256": release.sha256,
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
