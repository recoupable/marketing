import { siteConfig } from "@/lib/config";

/** A private purchase link authorizes the file only, not a Recoup login. */
export async function requirePluginPurchase(request: Request) {
  const sessionId = request.headers.get("x-plugin-purchase");
  if (!sessionId || !/^cs_(?:test_|live_)?[A-Za-z0-9]{20,240}$/.test(sessionId))
    throw Response.json(
      { error: "Open the private download link in your purchase email." },
      { status: 401 },
    );
  const response = await fetch(`${siteConfig.apiUrl}/plugin/download-access`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (response.status === 403)
    throw Response.json(
      {
        error:
          "Payment is pending or this subscription is inactive. If you just paid, try again in a moment.",
      },
      { status: 403 },
    );
  if (!response.ok || (await response.json()).allowed !== true)
    throw Response.json(
      { error: "We couldn’t verify your purchase. Please try again." },
      { status: 503 },
    );
}
