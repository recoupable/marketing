"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ChatDemo() {
  const figureRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [complete, setComplete] = useState(false);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    if (figureRef.current) observer.observe(figureRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <figure
      className="kit-chat-demo kit-chat-motion"
      ref={figureRef}
      key={replay}
      data-running={started && !paused}
      data-complete={complete}
      aria-label="Illustrative Claude conversation with the Recoup plugin"
    >
      <div className="kit-chat-top">
        <span className="kit-chat-brand">
          <Image
            src="/images/label-kit/brands/claude.svg"
            alt=""
            width={22}
            height={22}
          />
          Claude
        </span>
        <span className="kit-chat-plugin">+ Recoup</span>
      </div>
      <div className="kit-chat-project">
        <span aria-hidden="true">↳</span> Your record label{" "}
        <span> / Release planning</span>
      </div>
      <div className="kit-chat-body">
        <p className="kit-chat-question">
          My single drops in 4 weeks. Build my release plan.
        </p>
        <div className="kit-chat-answer">
          <Image
            src="/images/label-kit/brands/claude.svg"
            alt="Claude response"
            width={24}
            height={24}
          />
          <div>
            <p>Here’s your rollout. Let’s give every week a job.</p>
            <div className="kit-chat-plan">
              <div>
                <span>01</span>
                <p>
                  <strong>Get ready</strong>
                  <small>Finalize artwork. Prepare your artist pitch.</small>
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  <strong>Build anticipation</strong>
                  <small>Announce the single. Share the first teaser.</small>
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  <strong>Bring people in</strong>
                  <small>Share the story. Remind fans to pre-save.</small>
                </p>
              </div>
              <div>
                <span>04</span>
                <p>
                  <strong>Release week</strong>
                  <small>Share the track. Follow up with your audience.</small>
                </p>
              </div>
            </div>
            <div
              className="kit-chat-file"
              onAnimationEnd={() => setComplete(true)}
            >
              <span aria-hidden="true">▤</span>
              <div>
                <strong>Your release plan</strong>
                <small>4 weeks · Tasks & content ideas</small>
              </div>
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </div>
      <div className="kit-chat-playback">
        <span>
          {complete
            ? "Your release plan is ready"
            : started
              ? "Building your release plan"
              : "Watch a release take shape"}
        </span>
        <div>
          {!complete && (
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Play demo" : "Pause demo"}
            >
              {paused ? "Play" : "Pause"}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setReplay(replay + 1);
              setStarted(true);
              setPaused(false);
              setComplete(false);
            }}
            aria-label="Replay demo"
          >
            ↻ Replay
          </button>
        </div>
      </div>
      <figcaption>Animated example · Illustrative output</figcaption>
    </figure>
  );
}
