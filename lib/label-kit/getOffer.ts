/** Activation is explicit and requires private delivery configuration. */
export function getOffer(
  environment: Record<string, string | undefined> = process.env,
) {
  if (
    environment.LABEL_KIT_CHECKOUT_ENABLED !== "true" ||
    !environment.LABEL_KIT_BLOB_PATH?.startsWith("label-kit/") ||
    !environment.LABEL_KIT_BLOB_READ_WRITE_TOKEN
  )
    return null;
  return { price: "$19/month", checkoutUrl: "/api/label-kit/checkout" };
}
