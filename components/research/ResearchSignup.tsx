"use client";

import { useState, useRef, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { postLead } from "@/lib/leads/postLead";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { effectiveAcquisitionTags } from "@/lib/attribution/effectiveAcquisitionTags";
import { trackEvent } from "@/lib/analytics/trackEvent";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function ResearchSignup() {
  const hydrated = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "success" | "error">("idle");
  const pending = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("busy");
    try {
      const result = await postLead({
        kind: "subscribe", email: email.trim(), source: "/research",
        newsletter_consent: "recoup-research-v1",
        ...effectiveAcquisitionTags(currentReferralAttribution()),
        utm_id: new URLSearchParams(window.location.search).get("utm_id") || undefined,
      });
      setStatus(result.ok ? "success" : "error");
      if (result.ok) trackEvent("subscribe_submitted", { source: "/research" });
    } catch { setStatus("error"); }
    finally { pending.current = false; }
  }
  if (status === "success") return <p role="status">You’re subscribed to Recoup Research. Read your first example below.</p>;
  return <form onSubmit={submit} aria-label="Subscribe to Recoup Research">
    <label htmlFor="research-email">Your email</label>
    <div className="research-fields">
      <input id="research-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} placeholder="you@company.com" disabled={!hydrated || status === "busy"} />
      <button className="sp-button" disabled={!hydrated || status === "busy"} type="submit">{status === "busy" ? "Joining…" : "Subscribe ↗"}</button>
    </div>
    <p className="research-note">Recoup Research, by email. Unsubscribe anytime. <Link href="/privacy">Privacy</Link>.</p>
    {status === "error" && <p role="alert">We couldn’t confirm your subscription. Please try again later. You can still read the example below.</p>}
  </form>;
}
