"use client";

import { useEffect, useId, useRef } from "react";
import { SkyArrow } from "@/components/sky/arrow";
import { useSubscribeForm } from "@/hooks/useSubscribeForm";
import { podcastCopy } from "@/lib/copy/podcast";

const consent = "mt-4 text-[#526e7a] text-[11px] leading-[1.6] max-w-[320px] max-[760px]:max-w-none";

/** The sidebar email form; posts through the shared subscribe hook with the /podcast source. */
export function PodcastSubscribe() {
  const id = useId();
  const form = useSubscribeForm("/podcast");
  const confirmation = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (form.status === "success") confirmation.current?.focus();
  }, [form.status]);

  if (form.status === "success") {
    return <p className="mt-[26px] px-5 py-[18px] rounded-xl bg-[#f5fbe9] text-[#234c2c] text-[15px] !leading-[1.6]" ref={confirmation} tabIndex={-1} role="status">{podcastCopy.subscribe.success}</p>;
  }
  return (
    <form className="mt-[26px] w-full max-[760px]:mt-6" method="post" onSubmit={form.submit} aria-busy={form.status === "loading"} aria-describedby={`${id}-consent`}>
      <noscript><p className={consent}>{podcastCopy.subscribe.noScript}</p></noscript>
      <label className="sr-only" htmlFor={`${id}-email`}>{podcastCopy.subscribe.label}</label>
      <fieldset className="m-0 p-0 border-0 min-w-0 flex flex-col items-start gap-4 disabled:opacity-60" disabled={form.busy}>
        <input className="w-full min-h-12 bg-white text-[#152e37] border border-[#78939e] rounded-[9px] text-base px-3.5 py-[13px] placeholder:text-[#607680] placeholder:opacity-100" id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder={podcastCopy.subscribe.placeholder} value={form.email} onChange={(event) => form.setEmail(event.target.value)} />
        <button type="submit" className="button !gap-[22px]">{form.status === "loading" ? "Saving" : podcastCopy.subscribe.action} <SkyArrow /></button>
      </fieldset>
      {form.status === "error" && <p className="mt-3 text-[#9e302a] text-[13px] !leading-[1.6]" role="alert">{form.error}</p>}
      <p id={`${id}-consent`} className={consent}>{podcastCopy.subscribe.consent}</p>
    </form>
  );
}
