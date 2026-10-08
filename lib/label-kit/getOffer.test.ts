import { describe, expect, it } from "vitest";
import { getOffer } from "./getOffer";

describe("label kit checkout availability", () => {
  it("keeps checkout closed until price and hosted checkout are configured", () => {
    expect(getOffer({})).toBeNull();
    expect(getOffer({ LABEL_KIT_PRICE_LABEL: "$TBD" })).toBeNull();
    expect(
      getOffer({
        LABEL_KIT_CHECKOUT_URL: "https://buy.stripe.com/test_example",
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
          LABEL_KIT_CHECKOUT_URL: url,
        }),
      ).toBeNull();
    }
  });
  it("enables only a configured Stripe purchase link", () => {
    expect(
      getOffer({
        LABEL_KIT_PRICE_LABEL: " Example price ",
        LABEL_KIT_CHECKOUT_URL: "https://buy.stripe.com/test_example",
      }),
    ).toEqual({
      price: "Example price",
      checkoutUrl: "https://buy.stripe.com/test_example",
    });
  });
});
