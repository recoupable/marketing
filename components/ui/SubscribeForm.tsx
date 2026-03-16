"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Email subscribe form with UTM attribution capture.
 *
 * Reads UTM params from the URL and sends them along with the email
 * to POST /api/subscribe → Attio CRM.
 *
 * Usage: <SubscribeForm /> (place anywhere — homepage, blog posts, etc.)
 */
export function SubscribeForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Capture UTM params from URL on mount
  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  useEffect(() => {
    setUtmParams({
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
    });
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ...utmParams,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[var(--muted)] rounded-lg p-6 text-center">
        <p className="text-[var(--foreground)] font-medium">
          You&apos;re in! 🎵
        </p>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          Check your inbox for a welcome email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading"}
        className="flex-1 px-4 py-3 rounded-md border border-[var(--border)] bg-white text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)] disabled:opacity-50"
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[var(--brand)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--brand-light)] transition-colors disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 mt-1 sm:mt-0 sm:self-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
