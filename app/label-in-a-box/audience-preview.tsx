"use client";

import { useState } from "react";
import Image from "next/image";

const audiences = [
  {
    id: "artist",
    label: "I’m an artist",
    title: "Promote your music.",
    description: "Turn your song into a release plan and campaign ideas.",
    prompt: "Here’s my new single. Help me build the release campaign.",
    outputs: [
      "Release plan",
      "Artwork directions",
      "Social content",
      "Playlist research",
    ],
    result: "A campaign you can shape, review, and make your own.",
  },
  {
    id: "manager",
    label: "I’m a manager",
    title: "Manage your roster.",
    description:
      "Prepare artist briefs, weekly priorities, and outreach drafts.",
    prompt:
      "Build a weekly brief for my roster and flag the opportunities worth a look.",
    outputs: [
      "Artist briefs",
      "Weekly priorities",
      "Contact research",
      "Outreach drafts",
    ],
    result: "A clearer next move for every artist you represent.",
  },
  {
    id: "label",
    label: "I run a label",
    title: "Research your next signing.",
    description:
      "Get artist and catalog research ready for your team to review.",
    prompt:
      "Research this artist and prepare a brief for our next A&R meeting.",
    outputs: [
      "A&R briefs",
      "Catalog reviews",
      "Audience research",
      "Release priorities",
    ],
    result: "Working documents your team can challenge and build on.",
  },
];

export function AudiencePreview() {
  const [active, setActive] = useState(0);
  const item = audiences[active];
  return (
    <section id="for-you" className="kit-section kit-audience">
      <div className="kit-section-intro">
        <p className="kit-eyebrow">YOUR MUSIC. YOUR NEXT MOVE.</p>
        <h2>What do you need done?</h2>
        <p>Start with the job you need done.</p>
      </div>
      <div className="kit-role-tabs" aria-label="Choose your role">
        {audiences.map((audience, index) => (
          <button
            key={audience.id}
            aria-pressed={active === index}
            aria-controls="kit-role-panel"
            onClick={() => setActive(index)}
          >
            {audience.label}
            <span aria-hidden="true">0{index + 1}</span>
          </button>
        ))}
      </div>
      <div id="kit-role-panel" className="kit-role-panel" aria-live="polite">
        <div className="kit-role-copy">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="kit-example-request">
            <span>ASK YOUR AGENT</span>
            <blockquote>“{item.prompt}”</blockquote>
          </div>
          <ul>
            {item.outputs.map((output) => (
              <li key={output}>{output}</li>
            ))}
          </ul>
          <p className="kit-role-result">{item.result}</p>
        </div>
        <div
          className={`kit-role-visual kit-role-${item.id}`}
          aria-label={`${item.label}: illustrative working documents`}
        >
          {active === 0 ? (
            <>
              <div className="kit-role-cover">
                <Image
                  src="/images/label-kit/blue-hour-cover.png"
                  alt="Original silver and cobalt sculptural album artwork concept"
                  width={720}
                  height={720}
                  sizes="(max-width: 760px) 65vw, 320px"
                />
                <span>
                  Cover
                  <br />
                  art
                </span>
                <small>ARTWORK DIRECTION / 01</small>
              </div>
              <div className="kit-release-sheet">
                <div className="kit-sheet-top">
                  RELEASE PLAN <span>↗</span>
                </div>
                <strong>
                  Release
                  <br />
                  calendar.
                </strong>
                <ol>
                  <li>
                    <b>01</b> Introduce the world
                  </li>
                  <li>
                    <b>02</b> Tell the song’s story
                  </li>
                  <li>
                    <b>03</b> Release day
                  </li>
                  <li>
                    <b>04</b> Keep it moving
                  </li>
                </ol>
              </div>
            </>
          ) : (
            <div className="kit-brief-sheet">
              <span className="kit-eyebrow">
                {active === 1 ? "ROSTER / WEEKLY BRIEF" : "A&R / ARTIST BRIEF"}
              </span>
              <h4>
                {active === 1
                  ? "Every artist. A next step."
                  : "Go into the room prepared."}
              </h4>
              {(active === 1
                ? [
                    [
                      "RELEASE",
                      "Campaign needs a creative direction",
                      "Review artwork concepts and select an approach.",
                    ],
                    [
                      "OPPORTUNITY",
                      "Build the next outreach list",
                      "Research relevant contacts and draft the pitch.",
                    ],
                    [
                      "NEXT MEETING",
                      "Get the artist context together",
                      "Summarize updates and decisions needed.",
                    ],
                  ]
                : [
                    [
                      "THE ARTIST",
                      "Sound, story, and positioning",
                      "A sourced overview of the artist and their work.",
                    ],
                    [
                      "THE AUDIENCE",
                      "Where listeners are showing up",
                      "Relevant audience signals with source links.",
                    ],
                    [
                      "THE DECISION",
                      "Questions worth asking next",
                      "Separate known facts from open questions.",
                    ],
                  ]
              ).map(([tag, title, body]) => (
                <div key={tag}>
                  <span>{tag}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              ))}
              <footer>EXAMPLE STRUCTURE · FOR YOUR REVIEW</footer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
