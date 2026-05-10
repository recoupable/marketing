"use client";

import { useState, type FormEvent } from "react";

/**
 * Email capture form for the AI Music Marketing Playbook lead magnet.
 * Posts to /api/subscribe with utm_campaign=ai-playbook.
 */
export function PlaybookForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          utm_source: "website",
          utm_medium: "lead-magnet",
          utm_campaign: "ai-playbook",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-xl font-bold mb-2">You&apos;re in.</h3>
        <p className="text-[var(--muted-foreground)] text-sm mb-4">
          Your playbook is ready.
        </p>
        <a
          href="/playbook/download"
          className="inline-block rounded-lg bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Read the Playbook →
        </a>
        <p className="text-[var(--muted-foreground)] text-xs mt-3">
          Want hands-on help?{" "}
          <a href="/advisory" className="underline hover:text-[var(--foreground)]">
            Book an advisory session
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
      />
      <input
        type="email"
        required
        placeholder="you@label.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]/20"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Get the Free Playbook →"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-xs text-center">{errorMsg}</p>
      )}
      <p className="text-[10px] text-[var(--muted-foreground)] text-center">
        No spam. Unsubscribe anytime. We&apos;ll also send occasional insights on AI in music.
      </p>
    </form>
  );
}
