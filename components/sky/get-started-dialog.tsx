"use client";

import { useId, type Ref } from "react";
import { AppLink } from "@/components/analytics/AppLink";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { getStartedCopy } from "@/lib/copy/get-started";
import { SkyArrow } from "./arrow";
import { NavProductArt } from "./nav-product-art";
import "./get-started-dialog.css";

export function GetStartedDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const titleId = useId();

  return (
    <dialog
      ref={ref}
      className="ss-start-dialog"
      aria-labelledby={titleId}
      onClick={event => {
        if (event.target instanceof Element && event.target.closest("a")) {
          event.currentTarget.close();
        }
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          event.currentTarget.close();
        }
      }}
    >
      <form method="dialog" className="ss-start-close-form">
        <button className="ss-start-close" aria-label="Close get started dialog">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
        </button>
      </form>
      <h2 id={titleId}>{getStartedCopy.title}</h2>
      <div className="ss-start-options">
        <AppLink placement="get_started_dialog" className="ss-start-card">
          <NavProductArt kind="platform" />
          <h3>{getStartedCopy.platform.title}</h3>
          <p>{getStartedCopy.platform.description}</p>
          <span className="ss-start-arrow"><SkyArrow /></span>
        </AppLink>
        <TrackedLink href={getStartedCopy.build.href} cta="build_platform" placement="get_started_dialog" className="ss-start-card">
          <NavProductArt kind="developers" />
          <h3>{getStartedCopy.build.title}</h3>
          <p>{getStartedCopy.build.description}</p>
          <span className="ss-start-arrow"><SkyArrow /></span>
        </TrackedLink>
      </div>
    </dialog>
  );
}
