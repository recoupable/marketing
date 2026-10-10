"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export function Setup() {
  const { ready, authenticated, login, logout, getAccessToken } = usePrivy();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  async function download() {
    setBusy(true);
    setError("");
    try {
      const token = await getAccessToken();
      if (!token) throw new Error("Sign in again to download your plugin.");
      const response = await fetch("/api/label-kit/download", {
        headers: { Authorization: `Bearer ${token}` },
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
          disabled={!ready || busy}
          onClick={() => (authenticated ? void download() : login())}
        >
          {busy
            ? "Checking access…"
            : authenticated
              ? "Download plugin ↓"
              : "Sign in to download →"}
        </button>
        <p className="setup-note">Use your checkout email.</p>
        {authenticated && (
          <button
            className="setup-text-button"
            onClick={() => {
              setDownloaded(false);
              setError("");
              void logout();
            }}
          >
            Use another email
          </button>
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
