"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Setup() {
  const [purchase, setPurchase] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const readPurchase = () => {
      setPurchase(
        new URLSearchParams(window.location.hash.slice(1)).get("purchase") ??
          "",
      );
      setReady(true);
    };
    readPurchase();
    window.addEventListener("hashchange", readPurchase);
    return () => window.removeEventListener("hashchange", readPurchase);
  }, []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  async function download() {
    setBusy(true);
    setDownloaded(false);
    setError("");
    try {
      if (!purchase)
        throw new Error(
          "Open the private download link in your purchase email.",
        );
      const response = await fetch("/api/label-kit/download", {
        headers: { "X-Plugin-Purchase": purchase },
        cache: "no-store",
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Download unavailable.");
      }
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "recoup-plugin.zip";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      setDownloaded(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Please retry.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="plugin-setup">
      <Link href="/label-in-a-box" className="setup-back">
        ← Recoup plugin
      </Link>
      <div className="setup-download-card">
        <div className="setup-package" aria-hidden="true">
          <div className="setup-package-back" />
          <div className="setup-package-front">
            <Image
              src="/brand/icon-darkmode.svg"
              alt=""
              width={42}
              height={42}
            />
            <span>
              RECOUP<span>↓ ZIP</span>
            </span>
          </div>
        </div>
        <h1>Recoup plugin</h1>
        <p className="setup-intro">Skills, tools & setup guide.</p>
        <button
          className="setup-download-button"
          disabled={!ready || busy || !purchase}
          onClick={() => void download()}
        >
          {busy ? "Preparing download…" : "Download plugin ↓"}
        </button>
        {ready && !purchase && (
          <p className="setup-note">
            Open the download link in your purchase email.
          </p>
        )}
        {error && (
          <p className="setup-error" role="alert">
            {error}
          </p>
        )}
        {downloaded && (
          <p className="setup-status" role="status">
            Download started. Unzip it and open START HERE.html.
          </p>
        )}
        <p className="setup-next">
          Unzip, then open <strong>START HERE.html</strong>.
        </p>
      </div>
      <div className="setup-support">
        <a href="mailto:agent@recoupable.dev">Help ↗</a>
        <a href="https://app.recoupable.dev/plan">Manage subscription</a>
      </div>
    </div>
  );
}
