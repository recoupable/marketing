"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { SkyArrow } from "./arrow";
import { subscribeToRecoup } from "@/lib/marketing-subscribe";
import { currentReferralAttribution } from "@/lib/referral-attribution";
import "./footer-signup.css";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function FooterSignup() {
  const id = useId();
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const pending = useRef(false);
  const confirmation = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (status === "success") confirmation.current?.focus(); }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || pending.current) return;
    pending.current = true;
    setStatus("loading");
    setError("");
    const result = await subscribeToRecoup({ email, source: "/footer", attribution: currentReferralAttribution() });
    pending.current = false;
    if (result.ok) setStatus("success");
    else { setError(result.error); setStatus("error"); }
  }

  return <div className="footer-signup">
    {status === "success" ? <p className="footer-signup-success" ref={confirmation} tabIndex={-1} role="status"><span aria-hidden="true">✓</span>Thanks! You’re on the list.</p> : <form method="post" onSubmit={submit} aria-label="Subscribe to Recoup insights" aria-busy={status === "loading"} aria-describedby={`${id}-note`}>
      <label className="footer-signup-label" htmlFor={`${id}-email`}>Stay updated with our latest insights.</label>
      <fieldset className="footer-signup-field" disabled={!hydrated || status === "loading"}>
        <input id={`${id}-email`} aria-label="Email address" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Enter your email" value={email} onChange={event => setEmail(event.target.value)} />
        <button type="submit" aria-label={status === "loading" ? "Saving your signup" : "Subscribe"}>{status === "loading" ? <span aria-hidden="true">…</span> : <SkyArrow />}</button>
      </fieldset>
      <p className="footer-signup-note" id={`${id}-note`}>Occasional emails from Recoup. <Link href="/privacy">Privacy policy</Link>.</p>
      {status === "error" && <p className="footer-signup-error" role="alert">{error}</p>}
      <noscript><p className="footer-signup-note">Enable JavaScript to sign up, or follow our <a href="/feed.xml">RSS feed</a>.</p></noscript>
    </form>}
  </div>;
}
