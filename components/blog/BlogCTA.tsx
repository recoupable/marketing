"use client";

import { useState, type FormEvent } from "react";

/**
 * Inline email capture CTA for blog posts.
 * Appears after the post body, before related posts.
 * Posts to /api/subscribe with utm_campaign=blog-cta.
 */
export function BlogCTA({ postSlug }: { postSlug?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
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
          utm_source: "website",
          utm_medium: "blog-cta",
          utm_campaign: "blog-cta",
          source_post_slug: postSlug,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  if (status === "success") {
    return (
      <div className="my-12 rounded-2xl border border-green-500/20 bg-green-500/5 p-8 text-center">
        <div className="text-2xl mb-2">✅</div>
        <p className="font-semibold mb-1">You&apos;re on the list.</p>
        <p className="text-sm text-[var(--muted-foreground)]">
          We&apos;ll send you what we learn building agents for music. No fluff.
        </p>
        <a
          href="/consulting"
          className="inline-block mt-4 text-sm underline hover:text-[var(--foreground)] text-[var(--muted-foreground)]"
        >
          Want it implemented in your stack? Talk to us →
        </a>
      </div>
    );
  }

  return (
    <div className="my-12 rounded-2xl bg-[#080808] p-8">
      <div className="max-w-lg mx-auto text-center">
        <h3 className="font-pixel text-xl tracking-tight mb-2 text-white">
          AI is changing the music business fast.
        </h3>
        <p className="text-sm text-white/55 mb-6">
          Notes on AI agents for music — research, open tools, and what we learn
          running our own label. For labels, managers, and distributors.
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            placeholder="you@label.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.14)" }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-white text-[#0a0a0a] px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "..." : "Subscribe →"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-red-400 text-xs mt-2">{errorMsg}</p>
        )}
        <p className="text-[10px] text-white/40 mt-3">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
