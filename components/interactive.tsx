"use client";
import { useState } from "react";
import { PageMark } from "./sky/brand";
import "./product-preview.css";
export function CopyCode({
  code,
  label = "Install with one command",
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  async function copy() {
    try {
      await Promise.race([
        navigator.clipboard.writeText(code),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Clipboard unavailable")), 1800),
        ),
      ]);
      setCopied(true);
      setError(false);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setError(true);
    }
  }
  return (
    <div className="copy-code">
      <div>
        <span className="mono">{label}</span>
        <button onClick={copy} aria-label="Copy code">
          {copied ? "Copied ✓" : "Copy"}
          <span className="sr-only" role="status">
            {copied ? "Code copied to clipboard" : ""}
          </span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
      {error && <p role="status">Select the command above to copy it.</p>}
    </div>
  );
}
const skillGroups = [
  {
    name: "Research",
    title: "Know the artist. Find the opportunity.",
    prompt:
      "Build an artist brief and find relevant playlist targets for the next release.",
    items: [
      "Artist overview",
      "Talent scouting",
      "Playlist research",
      "Weekly briefs",
    ],
  },
  {
    name: "Content",
    title: "Turn one idea into a campaign.",
    prompt: "Create a set of campaign assets that fits this artist’s identity.",
    items: [
      "Captions and copy",
      "Graphics and artwork",
      "Short-form video",
      "Release asset packs",
    ],
  },
  {
    name: "Releases",
    title: "Give every release a clear plan.",
    prompt:
      "Plan a rollout for the next single, from announcement to release week.",
    items: [
      "Rollout planning",
      "Release tracking",
      "Launch verification",
      "Audience research",
    ],
  },
  {
    name: "Catalog",
    title: "Bring structure to the catalog.",
    prompt:
      "Organize these catalog materials and prepare an evidence-backed deal review.",
    items: [
      "Catalog organization",
      "Deal review",
      "Valuation workflows",
      "Royalty analysis",
    ],
  },
  {
    name: "Operations",
    title: "Give your agent the music playbook.",
    prompt:
      "Set up a shared workspace for our artist roster and recurring team workflows.",
    items: [
      "Roster management",
      "Artist onboarding",
      "Company workspaces",
      "Platform connections",
    ],
  },
];
export function SkillBrowser() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  return (
    <div className="skill-browser">
      <div className="skill-tabs" role="tablist" aria-label="Skill categories">
        {skillGroups.map((s, i) => (
          <button
            key={s.name}
            id={`skill-tab-${i}`}
            role="tab"
            aria-selected={i === active}
            aria-controls="skill-panel"
            tabIndex={i === active ? 0 : -1}
            onKeyDown={(e) => {
              if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
                const next =
                  (active +
                    (e.key === "ArrowRight" ? 1 : -1) +
                    skillGroups.length) %
                  skillGroups.length;
                setActive(next);
                document.getElementById(`skill-tab-${next}`)?.focus();
              }
            }}
            onClick={() => setActive(i)}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div
        className="skill-panel"
        id="skill-panel"
        role="tabpanel"
        aria-labelledby={`skill-tab-${active}`}
      >
        <div>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>
                <span aria-hidden="true">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="skill-prompt">
          <span className="mono">START WITH A REQUEST</span>
          <p>“{group.prompt}”</p>
          <div>
            <span className="small-logo"><PageMark /></span>
            <span>Your expertise. An agent that can use it.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ProductPreview({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState("Research");
  const content: Record<
    string,
    {
      prompt: string;
      label: string;
      title: string;
      summary: string;
      details: { label: string; text: string }[];
    }
  > = {
    Research: {
      prompt: "Build an artist brief for Mara Vale.",
      label: "ARTIST BRIEF",
      title: "Mara Vale, in focus.",
      summary:
        "Late-night synth-pop. Intimate vocals. A new single called Blue Hour.",
      details: [
        {
          label: "Creative angle",
          text: "Build the release around the ride home: city lights, voice notes, and the feeling of a night winding down.",
        },
        {
          label: "Question for the artist",
          text: "What made you want to write Blue Hour? A short voice note could become the first teaser.",
        },
      ],
    },
    Content: {
      prompt: "Give Blue Hour a campaign direction.",
      label: "CAMPAIGN DRAFT",
      title: "Take the long way home.",
      summary:
        "A campaign built around the moments between the last song and the front door.",
      details: [
        {
          label: "Caption draft",
          text: "“For the ride home when you’re not quite ready for the night to end. Blue Hour.”",
        },
        {
          label: "Visual direction",
          text: "A passing streetlight. A close-up through a car window. Bring in the song title as the chorus begins.",
        },
      ],
    },
    Tasks: {
      prompt: "Plan a weekly release check-in.",
      label: "RECURRING TASK DRAFT",
      title: "Monday, with a clear next step.",
      summary: "A proposed weekly brief for the Blue Hour release.",
      details: [
        {
          label: "Every Monday",
          text: "Review the latest artist notes and release plan. Flag missing assets and decisions waiting on the team.",
        },
        {
          label: "Release check-in",
          text: "Teaser concept drafted. Cover artwork still needed. Next: ask Mara to choose the visual direction.",
        },
      ],
    },
  };
  const value = content[mode];

  if (compact) {
    return (
      <div className="product-preview music-preview compact">
        <div className="mp-compact-header">
          <span className="mp-wordmark">
            Recoup<span>●</span>
          </span>

        </div>
        <div className="mp-compact-prompt">{content.Research.prompt}</div>
        <div className="mp-compact-answer">
          <span className="mp-result-label">{content.Research.label}</span>
          <h4>{content.Research.title}</h4>
          <p>{content.Research.summary}</p>
          <div className="mp-compact-angle">
            <strong>Creative angle</strong>
            <span>{content.Research.details[0].text}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-preview music-preview">
      <div className="mp-header">
        <span className="mp-wordmark">
          Recoup<span>●</span>
        </span>

      </div>
      <div className="mp-artist">
        <div className="mp-artist-mark" aria-hidden="true">
          MV
        </div>
        <div>
          <strong>Mara Vale</strong>
          <span>Blue Hour release</span>
        </div>
      </div>
      <div
        className="mp-modes"
        role="group"
        aria-label="Choose an illustrative workflow"
      >
        {Object.keys(content).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setMode(name)}
            aria-pressed={mode === name}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="mp-result" aria-live="polite" aria-atomic="true">
        <div className="mp-prompt">
          <span>YOUR REQUEST</span>
          <p>{value.prompt}</p>
        </div>
        <span className="mp-result-label">{value.label}</span>
        <h3>{value.title}</h3>
        <p className="mp-summary">{value.summary}</p>
        <dl className="mp-details">
          {value.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>{detail.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mp-disclosure">
        Explore this preview with a fictional artist. Open Recoup to work with your own.
      </p>
    </div>
  );
}
