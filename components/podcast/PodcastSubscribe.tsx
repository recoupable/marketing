"use client";

import { useEffect, useId, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { useSubscribeForm } from "@/hooks/useSubscribeForm";
import { podcastCopy } from "@/lib/copy/podcast";

/** The sidebar email form; posts through the shared subscribe hook with the /podcast source. */
export function PodcastSubscribe() {
  const id = useId();
  const form = useSubscribeForm("/podcast");
  const confirmation = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (form.status === "success") confirmation.current?.focus();
  }, [form.status]);

  if (form.status === "success") {
    return <p className="podcast-subscribe-success" ref={confirmation} tabIndex={-1} role="status">{podcastCopy.subscribe.success}</p>;
  }
  return (
    <form className="podcast-subscribe" method="post" onSubmit={form.submit} aria-busy={form.status === "loading"} aria-describedby={`${id}-consent`}>
      <noscript><p className="podcast-subscribe-consent">{podcastCopy.subscribe.noScript}</p></noscript>
      <label className="sr-only" htmlFor={`${id}-email`}>{podcastCopy.subscribe.label}</label>
      <fieldset disabled={form.busy}>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder={podcastCopy.subscribe.placeholder} value={form.email} onChange={(event) => form.setEmail(event.target.value)} />
        <button type="submit" className="button">{form.status === "loading" ? "Saving" : podcastCopy.subscribe.action} <SkyArrow /></button>
      </fieldset>
      {form.status === "error" && <p className="podcast-subscribe-error" role="alert">{form.error}</p>}
      <p id={`${id}-consent`} className="podcast-subscribe-consent">{podcastCopy.subscribe.consent}</p>
    </form>
  );
}
