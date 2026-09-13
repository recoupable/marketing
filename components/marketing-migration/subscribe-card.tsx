"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import type { SubscribeSource } from "@/lib/marketing-subscribe";
import { useSubscribeForm } from "@/hooks/useSubscribeForm";
import "./subscribe-card.css";

export function SubscribeCard({ source }: { source: SubscribeSource }) {
  const id = useId();
  const form = useSubscribeForm(source);
  const confirmation = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (form.status === "success") confirmation.current?.focus();
  }, [form.status]);

  return (
    <section className="mm-subscribe" aria-labelledby={`${id}-title`}>
      <div className="mm-subscribe-copy">
        <p className="sp-kicker">RECOUP / FIELD NOTES</p>
        <h2 id={`${id}-title`}>
          Get occasional AI notes
          <br />
          from Recoup.
        </h2>
        <p>
          Ideas, workflows, and practical notes on AI in the business of music.
        </p>
        {source === "/playbook" && (
          <p className="mm-subscribe-access">
            The playbook is yours to read and download. Signing up is optional.
          </p>
        )}
      </div>
      {form.status === "success" ? (
        <div className="mm-subscribe-confirmation" role="status">
          <span aria-hidden="true">✓</span>
          <h3 ref={confirmation} tabIndex={-1}>
            Your signup is saved.
          </h3>
          <p>You’re on the list for occasional AI notes from Recoup.</p>
          <Link href="/resources">
            Explore more resources <SkyArrow />
          </Link>
        </div>
      ) : (
        <form
          method="post"
          action={source}
          onSubmit={form.submit}
          aria-label="Subscribe to Recoup notes"
          aria-describedby={`${id}-consent`}
          aria-busy={form.status === "loading"}
        >
          <noscript>
            <p className="mm-subscribe-no-script">
              Enable JavaScript to use this signup form, or follow the{" "}
              <a href="/feed.xml">RSS feed</a>.
            </p>
          </noscript>
          <fieldset className="mm-subscribe-guard" disabled={form.busy}>
            <div className="mm-subscribe-fields">
              <div>
                <label htmlFor={`${id}-name`}>
                  Name <span>(optional)</span>
                </label>
                <input
                  id={`${id}-name`}
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  onChange={(event) => form.setName(event.target.value)}
                  disabled={form.status === "loading"}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor={`${id}-email`}>Email address</label>
                <input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(event) => form.setEmail(event.target.value)}
                  disabled={form.status === "loading"}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <button className="sp-button" type="submit" disabled={form.busy}>
              {form.status === "loading"
                ? "Saving your signup…"
                : "Subscribe to the notes"}
              <span>
                <SkyArrow />
              </span>
            </button>
          </fieldset>
          <p className="mm-subscribe-consent" id={`${id}-consent`}>
            By subscribing, you agree to receive occasional emails from Recoup.{" "}
            <Link href="/privacy">Privacy policy</Link>.
          </p>
          {form.status === "error" && (
            <p className="mm-subscribe-error" role="alert">
              {form.error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}
