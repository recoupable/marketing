"use client";

import { useId, useRef, useState } from "react";
import { SkyArrow } from "@/components/sky/arrow";

export function PurchaseButton({
  checkoutUrl,
  price,
  showPrice = false,
}: {
  checkoutUrl?: string;
  price: string;
  showPrice?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    if (!checkoutUrl || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(checkoutUrl, { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Checkout unavailable.");
      window.location.assign(data.url);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Please try again.");
      setBusy(false);
    }
  }
  if (checkoutUrl)
    return (
      <div>
        <button className="kit-button" disabled={busy} onClick={checkout}>
          {busy
            ? "Opening checkout…"
            : `Get the plugin${showPrice ? ` — ${price}` : ""}`}
          <span>
            <SkyArrow />
          </span>
        </button>
        {error && <p role="alert">{error}</p>}
      </div>
    );
  return (
    <>
      <button
        className="kit-button"
        onClick={() => dialog.current?.showModal()}
      >
        Get the plugin{showPrice ? ` — ${price}` : ""}{" "}
        <span>
          <SkyArrow />
        </span>
      </button>
      <dialog
        ref={dialog}
        className="kit-dialog"
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <form method="dialog">
          <button className="kit-close" aria-label="Close purchase preview">
            ×
          </button>
        </form>
        <p className="kit-eyebrow">RECOUP / STARTER</p>
        <h2 id={`${id}-title`}>Your Recoup plugin.</h2>
        <p id={`${id}-description`}>
          The plugin, Recoup access, and ongoing skill updates.
        </p>
        <div className="kit-order">
          <span>Monthly subscription</span>
          <strong>{price}</strong>
        </div>
        <ul className="kit-checks">
          <li>Plugin download + setup guide</li>
          <li>$20 in monthly Recoup usage credits</li>
          <li>Ongoing skill updates while subscribed</li>
        </ul>
        <button className="kit-button kit-disabled" disabled>
          Checkout coming soon
        </button>
        <p className="kit-fine">
          Billed monthly in USD until canceled. Checkout and the download are
          not available in this preview. No payment is collected.
        </p>
      </dialog>
    </>
  );
}
