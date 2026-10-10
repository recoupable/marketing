"use client";
import Link from "next/link";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export function Setup() {
  const { ready, authenticated, login, logout, getAccessToken } = usePrivy();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [client, setClient] = useState("Codex");
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
    <main className="plugin-setup">
      <Link href="/label-in-a-box" className="setup-back">
        ← Recoup plugin
      </Link>
      <p className="setup-label">YOUR MUSIC BUSINESS STARTS HERE</p>
      <h1>Let’s put it to work.</h1>
      <p className="setup-intro">
        Get your plugin. Connect your AI. Give it its first job.
      </p>
      <section className="setup-download">
        <div>
          <span className="setup-label">01 / YOUR DOWNLOAD</span>
          <h2>Recoup plugin</h2>
          <p>Music-business skills + the Recoup MCP connection. One plugin.</p>
        </div>
        <div className="setup-action">
          <button
            disabled={!ready || busy}
            onClick={() => (authenticated ? void download() : login())}
          >
            {busy
              ? "Checking access…"
              : authenticated
                ? "Download plugin ↓"
                : "Sign in to download →"}
          </button>
          <p>Use the same email you used at checkout.</p>
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
        </div>
        {error && (
          <p className="setup-error" role="alert">
            {error}
          </p>
        )}
        {downloaded && (
          <p role="status">
            Download started. Follow the install steps for your AI below.
          </p>
        )}
      </section>
      <section className="setup-connect">
        <span className="setup-label">02 / CONNECT YOUR AI</span>
        <h2>Where do you work?</h2>
        <div
          className="setup-clients"
          role="group"
          aria-label="Choose your AI client"
        >
          {["Codex", "Claude Code", "Cursor"].map((name) => (
            <button
              key={name}
              aria-pressed={client === name}
              onClick={() => setClient(name)}
            >
              {name}
            </button>
          ))}
        </div>
        {client === "Claude Code" ? (
          <ol>
            <li>
              In Claude Code, add Recoup’s marketplace:
              <code>/plugin marketplace add recoupable/skills</code>
            </li>
            <li>
              Install the plugin:
              <code>/plugin install recoup-skills@recoup</code>
            </li>
            <li>
              Open <code>/mcp</code>, select Recoup, and sign in with your
              subscription email.
            </li>
          </ol>
        ) : (
          <ol>
            <li>
              {client === "Codex"
                ? "Unzip the customer plugin download."
                : "Get the Recoup plugin from its source repository."}
            </li>
            <li>
              Use {client}’s local-plugin install flow to select the plugin
              folder.
            </li>
            <li>
              Open the plugin’s Recoup connection and sign in with your
              subscription email.
            </li>
          </ol>
        )}
        <p className="setup-note">
          Review the requested permissions, then ask your AI to list your
          artists to confirm the connection. Some REST-only workflows still
          require separate credentials.
        </p>
        <a
          href="https://github.com/recoupable/skills#install"
          target="_blank"
          rel="noreferrer"
        >
          Official install guide ↗
        </a>
        <p className="setup-note">
          ChatGPT distribution still requires submission and review. It is not
          an available install option here yet.
        </p>
      </section>
      <section className="setup-prompt">
        <span className="setup-label">03 / YOUR FIRST REQUEST</span>
        <h2>Start with your next release.</h2>
        <blockquote>
          “Help me plan my next release. Ask for the artist, song, release date,
          and goals first.”
        </blockquote>
      </section>
      <footer>
        <a href="https://app.recoupable.dev/plan">Manage subscription ↗</a>
        <a href="mailto:agent@recoupable.dev">Need a hand?</a>
        <p>
          Starter includes $20 in monthly Recoup usage credits. Your AI
          subscription is separate. Updates are downloaded manually.
        </p>
      </footer>
    </main>
  );
}
