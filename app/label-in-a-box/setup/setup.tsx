"use client";
import Link from "next/link";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export function Setup() {
  const { ready, authenticated, login, logout, getAccessToken } = usePrivy();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [client, setClient] = useState("Claude Code");
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
          <p>
            Music-business skills and setup guides. Return here for the latest
            updates.
          </p>
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
            Download started. Unzip it, then follow the setup below.
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
          {["Claude Code", "Claude web", "ChatGPT"].map((name) => (
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
          <div>
            <ol>
              <li>
                Unzip your download and open that folder in your terminal.
              </li>
              <li>
                Start Claude with the bundled plugin:
                <code>claude --plugin-dir ./recoup-plugin</code>
              </li>
              <li>
                Ask: “Connect my Recoup account.” Use your subscription email.
              </li>
            </ol>
            <p className="setup-note">
              Some skills require local scripts, network access, or additional
              services. Follow the included README before running them.
            </p>
          </div>
        ) : client === "Claude web" ? (
          <div>
            <p>
              Open Customize → Skills and upload individual ZIPs from the{" "}
              <code>claude-skills</code> folder.
            </p>
            <p>
              Uploading skills does not connect Recoup tools. Connected
              workflows still need client-specific authentication and network
              access.
            </p>
            <a
              href="https://support.claude.com/en/articles/12512180-use-skills-in-claude"
              target="_blank"
              rel="noreferrer"
            >
              Claude’s skills guide ↗
            </a>
          </div>
        ) : (
          <div>
            <p>
              <strong>ChatGPT connection is not ready for this release.</strong>
            </p>
            <p>
              ChatGPT uses a custom MCP app, not a Claude plugin ZIP. We’re
              verifying Recoup authentication and supported plans before
              enabling this setup.
            </p>
            <a
              href="https://help.openai.com/en/articles/12584461-developer-mode-and-full-mcp-connectors-in-chatgpt"
              target="_blank"
              rel="noreferrer"
            >
              ChatGPT’s custom app guide ↗
            </a>
          </div>
        )}
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
