"use client";

import { useState } from "react";

const audiences = [
  {
    id: "artist",
    label: "Artists",
    title: "Get your next release moving.",
    prompt: "My single drops in a month. Help me plan the release.",
    jobs: [
      ["A release calendar", "What to do before, during, and after launch."],
      [
        "Campaign drafts",
        "Social posts, your release story, and artwork direction.",
      ],
      ["Outreach research", "Relevant playlists and contacts to review."],
    ],
  },
  {
    id: "manager",
    label: "Managers",
    title: "Know what needs your attention.",
    prompt: "Review my roster. What should we focus on this week?",
    jobs: [
      [
        "A weekly roster brief",
        "Artist updates, priorities, and open decisions.",
      ],
      ["Release checklists", "Upcoming deadlines and tasks for each artist."],
      [
        "Outreach drafts",
        "Relevant contacts and pitches ready for your review.",
      ],
    ],
  },
  {
    id: "label",
    label: "Labels",
    title: "Make your next move informed.",
    prompt: "Review this artist and catalog. Where are the opportunities?",
    jobs: [
      [
        "Artist research",
        "Sound, audience, and positioning with source links.",
      ],
      ["Catalog reviews", "Metadata gaps and potential revenue opportunities."],
      [
        "Campaign priorities",
        "Which releases to focus on and what to do next.",
      ],
    ],
  },
];

export function AudiencePreview() {
  const [active, setActive] = useState(0);
  const item = audiences[active];
  return (
    <section id="for-you" className="kit-section kit-use-cases">
      <div className="kit-use-heading">
        <h2>Put it to work.</h2>
        <div className="kit-use-switch" aria-label="Choose your role">
          {audiences.map((audience, index) => (
            <button
              key={audience.id}
              type="button"
              aria-pressed={active === index}
              aria-controls="kit-use-panel"
              onClick={() => setActive(index)}
            >
              {audience.label}
            </button>
          ))}
        </div>
      </div>
      <div id="kit-use-panel" className="kit-use-panel" aria-live="polite">
        <div className="kit-use-request">
          <span>TRY ASKING YOUR AI</span>
          <blockquote>“{item.prompt}”</blockquote>
          <small>Your context in. A working draft out.</small>
        </div>
        <div className="kit-use-deliverables">
          <h3>{item.title}</h3>
          <ul>
            {item.jobs.map(([title, description], index) => (
              <li key={title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
