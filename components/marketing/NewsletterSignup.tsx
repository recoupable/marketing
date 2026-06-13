"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/track";

/**
 * Sitewide newsletter capture (W-09). Named newsletter + three promise
 * checkmarks + email field → existing /api/subscribe (Attio). Used in the
 * footer so the "still researching" majority always has a low-commitment next
 * step, not just /blog. Variant controls chrome: "footer" sits on the dark
 * footer band; "panel" is a standalone card for in-page placement.
 */
const PROMISES = [
  "What's working in AI for music, weekly",
  "Field notes from running our own label",
  "No spam — unsubscribe anytime",
];

export function NewsletterSignup({
  variant = "panel",
}: {
  variant?: "footer" | "panel";
}) {
  const [email, setEmail] = useState("");
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
          utm_source: "website",
          utm_medium: "newsletter",
          utm_campaign: `newsletter-${variant}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      track("Newsletter Subscribed", { source: variant });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const isFooter = variant === "footer";

  if (status === "success") {
    return (
      <div data-testid="newsletter-success" className="text-[13px] text-(--foreground)/60">
        You&apos;re on the list. We&apos;ll send what we learn building agents for music.
      </div>
    );
  }

  return (
    <div data-testid="newsletter-signup">
      <p className="font-ui font-semibold text-[13px] text-(--foreground) mb-1">
        What&apos;s Working — the Recoup newsletter
      </p>
      <ul className="mb-3 space-y-1">
        {PROMISES.map((p) => (
          <li key={p} className="text-[12px] text-(--foreground)/45 flex items-start gap-1.5">
            <span aria-hidden className="text-(--foreground)/35 mt-px">✓</span>
            {p}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className={isFooter ? "flex gap-2" : "flex flex-col sm:flex-row gap-2"}>
        <input
          type="email"
          required
          placeholder="you@label.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          className="flex-1 rounded-lg bg-(--background) px-3.5 py-2.5 text-[13px] text-(--foreground) placeholder:text-(--foreground)/35 focus:outline-none focus:ring-2 focus:ring-(--foreground)/20"
          style={{ boxShadow: "0 0 0 1px var(--border)" }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-(--foreground) text-(--background) px-5 py-2.5 text-[13px] font-ui font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
      </form>
      {status === "error" ? (
        <p className="text-red-500 text-[11px] mt-2">{errorMsg}</p>
      ) : null}
    </div>
  );
}
