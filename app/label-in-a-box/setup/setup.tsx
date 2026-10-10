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
        <div className="setup-icon" aria-hidden="true">
          <Image
            src="/brand/icon-lightmode.svg"
            alt=""
            width={30}
            height={30}
          />
        </div>
        <h1>Your Recoup plugin.</h1>
        <p className="setup-intro">
          One download. Everything you need to get started.
        </p>
        <div className="setup-file">
          <span aria-hidden="true">↓</span>
          <div>
            <strong>recoup-plugin.zip</strong>
            <p>Skills, connected tools & setup instructions</p>
          </div>
        </div>
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
        <p className="setup-note">
          Use the email you paid with. We’ll check your subscription.
        </p>
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
        <div className="setup-next">
          <span>WHAT’S NEXT</span>
          <p>
            Unzip. Open <strong>START HERE.html</strong>.<br />
            Install the plugin and connect your Recoup account.
          </p>
        </div>
      </div>
      <div className="setup-support">
        <a href="mailto:agent@recoupable.dev">Need a hand? ↗</a>
        <a href="https://app.recoupable.dev/plan">Manage subscription ↗</a>
      </div>
    </div>
  );
}
