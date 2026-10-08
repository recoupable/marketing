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
      className="kit-chat-demo kit-business-motion"
      ref={figureRef}
      key={replay}
      data-running={started && !paused}
      data-complete={complete}
      aria-label="Animated example: drag an audio file into Claude, ask Recoup to build your music business, and reveal research, release, campaign and catalog plans"
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
      <div className="kit-business-stage">
        <div className="kit-launch-flash" aria-hidden="true" />
        <div className="kit-launch-ring" aria-hidden="true" />
        <div className="kit-launch-sparks" aria-hidden="true">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <i key={angle} style={{ transform: `rotate(${angle}deg)` }} />
          ))}
        </div>
        <div className="kit-drag-file" aria-hidden="true">
          <span className="kit-audio-icon kit-waveform">
            {[9, 19, 28, 16, 24, 11].map((height, index) => (
              <i key={index} style={{ height }} />
            ))}
          </span>
          <div>
            <strong>your-single.wav</strong>
            <small>WAV · Your next release</small>
          </div>
          <svg
            className="kit-drag-cursor"
            width="25"
            height="30"
            viewBox="0 0 25 30"
          >
            <path
              d="M2 2v23l6-6 5 9 5-3-5-8h9Z"
              fill="#fff"
              stroke="#172e27"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className="kit-drop-hint" aria-hidden="true">
          Start with your music.
        </div>
        <div className="kit-demo-composer" aria-hidden="true">
          <div className="kit-attached-audio">
            <span>♫</span> your-single.wav <small>✓</small>
          </div>
          <div className="kit-typed-prompt">Build my music business.</div>
          <div className="kit-composer-bottom">
            <span>
              + <small>Recoup enabled</small>
            </span>
            <span className="kit-demo-send">↑</span>
          </div>
        </div>
        <div className="kit-business-origin" aria-hidden="true">
          <span>♫</span>
          <div>
            <strong>your-single.wav</strong>
            <small>ONE SONG. YOUR WHOLE OPERATION.</small>
          </div>
        </div>
        <div className="kit-business-connectors" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="kit-business-results">
          <article className="kit-result kit-result-research">
            <span className="kit-result-label">ARTIST RESEARCH</span>
            <strong>Your artist brief</strong>
            <div className="kit-brief-lines">
              <i />
              <i />
              <i />
            </div>
            <small>Audience · Sound · Positioning</small>
          </article>
          <article className="kit-result kit-result-release">
            <span className="kit-result-label">RELEASE PLAN</span>
            <strong>Your next 4 weeks</strong>
            <div className="kit-mini-calendar">
              {Array.from({ length: 14 }, (_, index) => (
                <i key={index} />
              ))}
            </div>
            <small>Pitch · Announce · Release</small>
          </article>
          <article className="kit-result kit-result-campaign">
            <span className="kit-result-label">CAMPAIGN CONTENT</span>
            <div className="kit-campaign-preview">
              <Image
                src="/images/label-kit/blue-hour-cover.png"
                alt="Illustrative artwork concept"
                width={64}
                height={64}
              />
              <div>
                <strong>Your campaign</strong>
                <small>
                  Artwork directions
                  <br />
                  Social posts
                  <br />
                  Release story
                </small>
              </div>
            </div>
          </article>
          <article
            className="kit-result kit-result-revenue"
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) setComplete(true);
            }}
          >
            <span className="kit-result-label">CATALOG REVENUE</span>
            <strong>Find opportunities</strong>
            <ul>
              <li>Review metadata</li>
              <li>Explore sync fits</li>
              <li>Plan catalog campaigns</li>
            </ul>
          </article>
        </div>
        <div className="kit-business-ready">Your label. In motion.</div>
      </div>
      <div className="kit-chat-playback">
        <span>
          {complete
            ? "From one song to your next moves"
            : started
              ? "Your music → your music business"
              : "Watch your music get to work"}
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
