"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { subscribeToRecoup, type SubscribeSource } from "@/lib/marketing-subscribe";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { trackEvent } from "@/lib/analytics/trackEvent";
import "./subscribe-card.css";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function SubscribeCard({ source }: { source: SubscribeSource }) {
  const id = useId();
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const pending = useRef(false);
  const confirmation = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (status === "success") confirmation.current?.focus(); }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || pending.current) return;
    pending.current = true;
    setStatus("loading");
    setError("");
    const result = await subscribeToRecoup({ name, email, source, attribution: currentReferralAttribution() });
    pending.current = false;
    if (result.ok) {
      setStatus("success");
      trackEvent("subscribe_submitted", { source });
    } else { setError(result.error); setStatus("error"); }
  }

  return <section className="mm-subscribe" aria-labelledby={`${id}-title`}>
    <div className="mm-subscribe-copy"><p className="sp-kicker">RECOUP / FIELD NOTES</p><h2 id={`${id}-title`}>Get occasional AI notes<br />from Recoup.</h2><p>Ideas, workflows, and practical notes on AI in the business of music.</p>{source === "/playbook" && <p className="mm-subscribe-access">The playbook is yours to read and download. Signing up is optional.</p>}</div>
    {status === "success" ? <div className="mm-subscribe-confirmation" role="status"><span aria-hidden="true">✓</span><h3 ref={confirmation} tabIndex={-1}>Your signup is saved.</h3><p>You’re on the list for occasional AI notes from Recoup.</p><Link href="/resources">Explore more resources <SkyArrow /></Link></div> : <form method="post" action={source} onSubmit={submit} aria-label="Subscribe to Recoup notes" aria-describedby={`${id}-consent`} aria-busy={status === "loading"}>
      <noscript><p className="mm-subscribe-no-script">Enable JavaScript to use this signup form, or follow the <a href="/feed.xml">RSS feed</a>.</p></noscript>
      <fieldset className="mm-subscribe-guard" disabled={!hydrated || status === "loading"}>
      <div className="mm-subscribe-fields"><div><label htmlFor={`${id}-name`}>Name <span>(optional)</span></label><input id={`${id}-name`} type="text" name="name" autoComplete="name" maxLength={100} value={name} onChange={event => setName(event.target.value)} disabled={status === "loading"} placeholder="Your name" /></div><div><label htmlFor={`${id}-email`}>Email address</label><input id={`${id}-email`} type="email" name="email" autoComplete="email" required maxLength={254} value={email} onChange={event => setEmail(event.target.value)} disabled={status === "loading"} placeholder="you@company.com" /></div></div>
      <button className="sp-button" type="submit" disabled={!hydrated || status === "loading"}>{status === "loading" ? "Saving your signup…" : "Subscribe to the notes"}<span><SkyArrow /></span></button>
      </fieldset>
      <p className="mm-subscribe-consent" id={`${id}-consent`}>By subscribing, you agree to receive occasional emails from Recoup. <Link href="/privacy">Privacy policy</Link>.</p>
      {status === "error" && <p className="mm-subscribe-error" role="alert">{error}</p>}
    </form>}
  </section>;
}
