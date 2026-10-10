import { describe, expect, it } from "vitest";
import { getOffer } from "./getOffer";
const ready = {
  LABEL_KIT_CHECKOUT_ENABLED: "true",
  LABEL_KIT_BLOB_PATH: "label-kit/v1.zip",
  LABEL_KIT_BLOB_READ_WRITE_TOKEN: "test-token",
};
describe("plugin checkout activation", () => {
  it("does not activate from the legacy one-time payment link", () => {
    expect(
      getOffer({
        LABEL_KIT_PRICE_LABEL: "$99",
        LABEL_KIT_CHECKOUT_URL: "https://buy.stripe.com/old",
      }),
    ).toBeNull();
  });
  it("requires explicit activation, private file configuration", () => {
    for (const key of Object.keys(ready))
      expect(getOffer({ ...ready, [key]: undefined })).toBeNull();
    expect(
      getOffer({
        ...ready,
        LABEL_KIT_BLOB_PATH: "https://example.com/file.zip",
      }),
    ).toBeNull();
  });
  it("uses Starter pricing and creates checkout on demand", () => {
    expect(getOffer(ready)).toEqual({
      price: "$19/month",
      checkoutUrl: "/api/label-kit/checkout",
    });
  });
});
