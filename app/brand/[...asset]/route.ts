import { serveAsset } from "@/lib/brand-studio/serve-asset";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ asset: string[] }> };
export async function GET(request: Request, { params }: Context) {
  const { asset } = await params;
  if (
    asset.length === 1 &&
    ["index.html", "finals.html", "experiments.html"].includes(asset[0])
  ) {
    const url = new URL(request.url);
    url.pathname =
      asset[0] === "experiments.html" ? "/brand/experiments" : "/brand";
    return Response.redirect(url, 307);
  }
  return serveAsset(request, asset);
}
export const HEAD = GET;
