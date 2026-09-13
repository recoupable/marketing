"use client";
import { useState } from "react";
import { PageMark } from "../sky/brand";
import { skillGroups } from "./skillGroups";

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
            <span className="small-logo">
              <PageMark />
            </span>
            <span>Your expertise. An agent that can use it.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
