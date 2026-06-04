import { CUSTOMER_LOGOS, type CustomerLogo } from "@/lib/customerLogos";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const logo: CustomerLogo | undefined = CUSTOMER_LOGOS.find((entry) => entry.slug === slug);

  if (!logo) {
    return new Response("Not found", { status: 404 });
  }

  const logoPath = path.join(
    process.cwd(),
    "design",
    "logos",
    "customers",
    logo.fileName,
  );

  try {
    const svg = await readFile(logoPath, "utf8");
    const normalizedSvg = svg.replace(/<svg\b([^>]*)>/, (_match, attrs) => {
      let nextAttrs = attrs
        .replace(/\swidth="[^"]*"/, "")
        .replace(/\sheight="[^"]*"/, "");

      if (logo.viewBoxOverride) {
        if (/\sviewBox="[^"]*"/.test(nextAttrs)) {
          nextAttrs = nextAttrs.replace(
            /\sviewBox="[^"]*"/,
            ` viewBox="${logo.viewBoxOverride}"`,
          );
        } else {
          nextAttrs = `${nextAttrs} viewBox="${logo.viewBoxOverride}"`;
        }
      }

      return `<svg${nextAttrs}>`;
    });

    return new Response(normalizedSvg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error(`Failed to load customer logo ${slug}:`, error);
    return new Response("Failed to load logo", { status: 500 });
  }
}
