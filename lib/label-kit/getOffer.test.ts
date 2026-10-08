import { describe, expect, it } from "vitest";
import { getOffer } from "./getOffer";

describe("label kit checkout availability", () => {
  it("ignores legacy one-time checkout configuration", () => {
    expect(getOffer({})).toBeNull();
    expect(
      getOffer({
        LABEL_KIT_PRICE_LABEL: "$99",
        LABEL_KIT_CHECKOUT_URL: "https://buy.stripe.com/old_one_time",
      }),
    ).toBeNull();
  });
  it("rejects malformed, insecure and unrelated destinations", () => {
    for (const url of [
      "bad",
      "javascript:alert(1)",
      "http://buy.stripe.com/test",
      "https://example.com/test",
      "https://buy.stripe.com.evil.com/test",
      "https://user:pass@buy.stripe.com/test",
      "https://buy.stripe.com/",
    ]) {
      expect(
        getOffer({
          LABEL_KIT_PRICE_LABEL: "Example price",
          LABEL_KIT_STARTER_CHECKOUT_URL: url,
        }),
      ).toBeNull();
    }
  });
  it("enables only a configured Stripe purchase link", () => {
    expect(
      getOffer({
        LABEL_KIT_PRICE_LABEL: " Example price ",
        LABEL_KIT_STARTER_CHECKOUT_URL: "https://buy.stripe.com/test_example",
      }),
    ).toEqual({
      price: "$19/month",
      checkoutUrl: "https://buy.stripe.com/test_example",
    });
  });
});
