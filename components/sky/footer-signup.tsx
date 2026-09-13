"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { SkyArrow } from "./arrow";
import { useSubscribeForm } from "@/hooks/useSubscribeForm";
import "./footer-signup.css";

export function FooterSignup() {
  const id = useId();
  const form = useSubscribeForm("/footer");
  const confirmation = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (form.status === "success") confirmation.current?.focus();
  }, [form.status]);

  return (
    <div className="footer-signup">
      {form.status === "success" ? (
        <p
          className="footer-signup-success"
          ref={confirmation}
          tabIndex={-1}
          role="status"
        >
          <span aria-hidden="true">✓</span>Thanks! You’re on the list.
        </p>
      ) : (
        <form
          method="post"
          onSubmit={form.submit}
          aria-label="Subscribe to Recoup insights"
          aria-busy={form.status === "loading"}
          aria-describedby={`${id}-note`}
        >
          <label className="footer-signup-label" htmlFor={`${id}-email`}>
            Stay updated with our latest insights.
          </label>
          <fieldset className="footer-signup-field" disabled={form.busy}>
            <input
              id={`${id}-email`}
              aria-label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="Enter your email"
              value={form.email}
              onChange={(event) => form.setEmail(event.target.value)}
            />
            <button
              type="submit"
              aria-label={
                form.status === "loading" ? "Saving your signup" : "Subscribe"
              }
            >
              {form.status === "loading" ? (
                <span aria-hidden="true">…</span>
              ) : (
                <SkyArrow />
              )}
            </button>
          </fieldset>
          <p className="footer-signup-note" id={`${id}-note`}>
            Occasional emails from Recoup.{" "}
            <Link href="/privacy">Privacy policy</Link>.
          </p>
          {form.status === "error" && (
            <p className="footer-signup-error" role="alert">
              {form.error}
            </p>
          )}
          <noscript>
            <p className="footer-signup-note">
              Enable JavaScript to sign up, or follow our{" "}
              <a href="/feed.xml">RSS feed</a>.
            </p>
          </noscript>
        </form>
      )}
    </div>
  );
}
