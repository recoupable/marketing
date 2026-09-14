/** Preserve existing bookmarks while /brand is the canonical application page. */
type Context = { params: Promise<{ asset?: string[] }> };
export async function GET(request: Request, { params }: Context) {
  const { asset = [] } = await params;
  const url = new URL(request.url);
  url.pathname =
    "/brand" +
    (asset.length ? "/" + asset.map(encodeURIComponent).join("/") : "");
  return Response.redirect(url, 307);
}
export const HEAD = GET;
