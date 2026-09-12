"use client";

import { Fragment, useEffect, useRef } from "react";
import "./sky-statement.css";

const statement = [
  "Our mission is to make AI useful to the people who create, own, and invest in music.",
  "We help music companies and creatives put agents to work across their business, so their teams can do more and their music can earn more.",
];
const words = statement.join(" ").split(" ");
const closingStart = words.length - statement[1].split(" ").length;

export function SkyStatement({ animate = true }: { animate?: boolean }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!animate || !paragraph || !window.IntersectionObserver || !Element.prototype.animate) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timeline = 1300;
    const animations = Array.from(paragraph.querySelectorAll<HTMLElement>(".sky-statement-word"), (word, index) => {
      const animation = word.animate(
        [{ opacity: 0.14, filter: "blur(5px)" }, { opacity: 1, filter: "blur(0px)" }],
        { duration: 300, delay: index / (words.length - 1) * 1000, fill: "both", easing: "ease-out" },
      );
      animation.pause();
      return animation;
    });

    let frame = 0;
    let disposed = false;
    const update = () => {
      frame = 0;
      if (disposed) return;
      const bounds = paragraph.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Begin near the bottom of the screen; finish when the last line reaches
      // the reading area. Include paragraph height so long mobile text gets time.
      const distance = bounds.height + viewport * 0.35;
      const progress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, (viewport * 0.9 - bounds.top) / distance));
      animations.forEach((animation) => { animation.currentTime = progress * timeline; });
    };

    function schedule() {
      if (!frame && !disposed) frame = requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) window.addEventListener("scroll", schedule, { passive: true });
      else window.removeEventListener("scroll", schedule);
      // Also settle the state after a jump above or below the paragraph.
      schedule();
    });
    const resizeObserver = window.ResizeObserver ? new ResizeObserver(schedule) : null;
    observer.observe(paragraph);
    resizeObserver?.observe(paragraph);
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    update();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      animations.forEach((animation) => animation.cancel());
    };
  }, [animate]);

  return (
    <div className="sky-statement" id="transformation">
      <p ref={paragraphRef}>
        <span className="sr-only">{statement.join(" ")}</span>
        <span aria-hidden="true">
          {words.map((word, index) => (
            <Fragment key={index}>
              {index > 0 && " "}
              <span className={`sky-statement-word${index >= closingStart ? " sky-statement-accent" : ""}`}>{word}</span>
            </Fragment>
          ))}
        </span>
      </p>
    </div>
  );
}
