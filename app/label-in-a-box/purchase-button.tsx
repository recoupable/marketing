"use client";

import { useId, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";

export function PurchaseButton({ checkoutUrl }: { checkoutUrl?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  if (checkoutUrl)
    return (
      <a className="kit-button" href={checkoutUrl}>
        Get the toolkit{" "}
        <span>
          <SkyArrow />
        </span>
      </a>
    );
  return (
    <>
      <button
        className="kit-button"
        onClick={() => dialog.current?.showModal()}
      >
        Get the toolkit{" "}
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
        <p className="kit-eyebrow">RECOUP / DIGITAL DOWNLOAD</p>
        <h2 id={`${id}-title`}>Your label kit.</h2>
        <p id={`${id}-description`}>
          Skills, MCP setup, and music-business workflows in one ZIP.
        </p>
        <div className="kit-order">
          <span>One-time purchase</span>
          <strong>Price coming soon</strong>
        </div>
        <ul className="kit-checks">
          <li>Curated Recoup Skills</li>
          <li>MCP connection guide</li>
          <li>Artist and release starter templates</li>
        </ul>
        <button className="kit-button kit-disabled" disabled>
          Checkout coming soon
        </button>
        <p className="kit-fine">
          This is a preview. No payment is collected and the download is not
          available yet.
        </p>
      </dialog>
    </>
  );
}
