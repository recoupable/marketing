/** Enable only a separately configured, fulfillment-ready Starter checkout. */
export function getOffer(
  environment: Record<string, string | undefined> = process.env,
) {
  const price = "$19/month";
  const value = environment.LABEL_KIT_STARTER_CHECKOUT_URL?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "buy.stripe.com" ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname === "/"
    )
      return null;
    return { price, checkoutUrl: url.toString() };
  } catch {
    return null;
  }
}
