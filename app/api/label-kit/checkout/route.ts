import { getOffer } from "@/lib/label-kit/getOffer";
import { siteConfig } from "@/lib/config";
export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin)
    return Response.json(
      { error: "Please start checkout from the plugin page." },
      { status: 403 },
    );
  if (!getOffer())
    return Response.json(
      { error: "Checkout is not available yet." },
      { status: 503 },
    );
  try {
    const response = await fetch(
      `${siteConfig.apiUrl}/subscriptions/sessions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "starter",
          fulfillment: "recoup-plugin",
          successUrl: `${origin}/label-in-a-box/setup#purchase={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/label-in-a-box?checkout=canceled`,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
      },
    );
    if (!response.ok) throw new Error("Checkout unavailable");
    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !("url" in data) ||
      typeof data.url !== "string"
    )
      throw new Error("Invalid checkout response");
    const url = new URL(data.url);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "checkout.stripe.com" ||
      url.username ||
      url.password ||
      url.port
    )
      throw new Error("Invalid checkout destination");
    return Response.json(
      { url: url.toString() },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "We couldn’t open checkout. Please try again." },
      { status: 503 },
    );
  }
}
