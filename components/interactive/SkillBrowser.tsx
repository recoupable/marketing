"use client";
import { useState } from "react";
import { PageMark } from "../sky/brand";
import { skillGroups } from "./skillGroups";

const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];

export function SkillBrowser() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  function move(key: string) {
    const last = skillGroups.length - 1;
    const next =
      key === "Home"
        ? 0
        : key === "End"
          ? last
          : (active + (key === "ArrowRight" ? 1 : -1) + skillGroups.length) %
            skillGroups.length;
    setActive(next);
    document.getElementById(`skill-tab-${next}`)?.focus();
  }
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
              if (!keys.includes(e.key)) return;
              e.preventDefault();
              move(e.key);
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
                <span aria-hidden="true">\u00b7</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="skill-prompt">
          <span className="mono">START WITH A REQUEST</span>
          <p>\u201c{group.prompt}\u201d</p>
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
