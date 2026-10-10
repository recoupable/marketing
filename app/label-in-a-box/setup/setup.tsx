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
    <div className="plugin-setup">
      <Link href="/label-in-a-box" className="setup-back">
        ← Back to the plugin
      </Link>
      <div className="setup-heading">
        <h1>Meet your new music team.</h1>
        <p>Install Recoup in the AI you already use.</p>
      </div>
      <div className="setup-workspace">
        <aside className="setup-product" aria-label="Your plugin">
          <div className="setup-product-top">
            <div className="setup-icon" aria-hidden="true">
              <Image
                src="/brand/icon-lightmode.svg"
                alt=""
                width={26}
                height={26}
              />
            </div>
            <span className="setup-label">RECOUP / PLUGIN</span>
          </div>
          <h2>
            Your music business.
            <br />
            Connected.
          </h2>
          <p>Music-business skills and tools, together in your AI.</p>
          <ul className="setup-includes">
            <li>
              <span>01</span> Research artists
            </li>
            <li>
              <span>02</span> Plan releases
            </li>
            <li>
              <span>03</span> Create campaigns
            </li>
          </ul>
          <div className="setup-action">
            <button
              className="setup-download-button"
              disabled={!ready || busy}
              onClick={() => (authenticated ? void download() : login())}
            >
              {busy
                ? "Checking access…"
                : authenticated
                  ? "Download plugin"
                  : "Sign in to download"}
              <span aria-hidden="true">↓</span>
            </button>
            <p>Codex ZIP · Skills + MCP included</p>
            <p>Sign in with your checkout email.</p>
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
              <p role="status">
                Downloaded. Follow the Codex steps to install.
              </p>
            )}
          </div>
        </aside>
        <section className="setup-install" aria-labelledby="install-heading">
          <div className="setup-install-heading">
            <span className="setup-label">SETUP</span>
            <a
              href="https://github.com/recoupable/skills#install"
              target="_blank"
              rel="noreferrer"
            >
              Install guide ↗
            </a>
          </div>
          <h2 id="install-heading">Choose your AI.</h2>
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
          <ol className="setup-steps" key={client}>
            <li>
              <span className="setup-step-number">1</span>
              <div>
                <h3>
                  {client === "Claude Code"
                    ? "Add the marketplace"
                    : client === "Codex"
                      ? "Download & unzip"
                      : "Get the plugin"}
                </h3>
                {client === "Claude Code" ? (
                  <CopyCommand command="/plugin marketplace add recoupable/skills" />
                ) : (
                  <p>
                    {client === "Codex" ? (
                      "Sign in, download the ZIP, then unzip it."
                    ) : (
                      <>
                        Get the plugin from the{" "}
                        <a href="https://github.com/recoupable/skills#install">
                          Recoup repository ↗
                        </a>
                        .
                      </>
                    )}
                  </p>
                )}
              </div>
            </li>
            <li>
              <span className="setup-step-number">2</span>
              <div>
                <h3>Install Recoup</h3>
                {client === "Claude Code" ? (
                  <CopyCommand command="/plugin install recoup-skills@recoup" />
                ) : (
                  <p>
                    In {client}’s local-plugin installer, select the plugin
                    folder.
                  </p>
                )}
              </div>
            </li>
            <li>
              <span className="setup-step-number">3</span>
              <div>
                <h3>Connect your account</h3>
                <p>
                  {client === "Claude Code" ? (
                    <>
                      Open <code>/mcp</code> and select Recoup.
                    </>
                  ) : (
                    "Open the plugin’s Recoup connection."
                  )}{" "}
                  Sign in with your checkout email and review permissions.
                </p>
              </div>
            </li>
          </ol>
          <div className="setup-first-job">
            <span className="setup-label">TRY IT</span>
            <p>“List my artists.”</p>
            <span>A quick check that you’re connected.</span>
          </div>
          <details className="setup-details">
            <summary>Compatibility & usage</summary>
            <p>
              ChatGPT plugin distribution still requires submission and review.
              Some REST-only workflows need separate credentials. Starter
              includes $20 in monthly Recoup usage credits; your AI subscription
              is separate. Download updates manually.
            </p>
          </details>
        </section>
      </div>
      <div className="setup-support">
        <span>
          Need a hand? <a href="mailto:agent@recoupable.dev">Talk to us ↗</a>
        </span>
        <a href="https://app.recoupable.dev/plan">Manage subscription ↗</a>
      </div>
    </div>
  );
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }
  return (
    <>
      <div className="setup-command">
        <code>{command}</code>
        <button onClick={() => void copy()} aria-label={`Copy ${command}`}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <span className="setup-copy-status" role="status">
        {failed
          ? "Select and copy the command manually."
          : copied
            ? "Command copied."
            : ""}
      </span>
    </>
  );
}
