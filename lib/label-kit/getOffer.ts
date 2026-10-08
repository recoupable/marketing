/** Fail closed until both a price label and the hosted product checkout are ready. */
export function getOffer(
  environment: Record<string, string | undefined> = process.env,
) {
  const price = environment.LABEL_KIT_PRICE_LABEL?.trim();
  const value = environment.LABEL_KIT_CHECKOUT_URL?.trim();
  if (!price || !value) return null;
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
