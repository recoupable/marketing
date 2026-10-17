"use client";

import { useState } from "react";
import Link from "next/link";
import { SkyArrow } from "@/components/sky/arrow";
import { aiStrategyCopy as copy } from "@/lib/copy/ai-strategy";
import { formatStrategyExample } from "@/lib/ai-strategy/formatStrategyExample";
import { downloadText } from "@/lib/ai-strategy/downloadText";
import { trackEvent } from "@/lib/analytics/trackEvent";

export function StrategyExplorer() {
  const [selected, setSelected] = useState(0);
  const project = copy.projects[selected];
  return (
    <div className="strategy-explorer" id="examples">
      <div
        className="strategy-choices"
        role="group"
        aria-label={copy.choicesLabel}
      >
        {copy.projects.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={selected === index}
            aria-controls="strategy-example"
            onClick={() => {
              setSelected(index);
              trackEvent("strategy_example_selected", { project: item.id });
            }}
          >
            <span className="strategy-choice-copy">
              <strong>{item.label}</strong>
              <span>{item.pain}</span>
            </span>
            <SkyArrow direction="right" />
          </button>
        ))}
      </div>
      <section
        className="strategy-example"
        id="strategy-example"
        aria-labelledby="strategy-example-title"
      >
        <div className="strategy-output" aria-label={copy.previewLabel}>
          <p className="strategy-eyebrow">{copy.previewLabel}</p>
          <div className="strategy-output-sheet">
            <div className="strategy-sheet-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8l-5-5Zm0 0v5h5M8 12h8M8 16h5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="strategy-output-title">{project.previewTitle}</p>
            <dl>
              {project.rows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd data-attention={row.attention}>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="strategy-review">{project.review}</p>
          </div>
        </div>
        <div className="strategy-example-copy">
          <p className="strategy-eyebrow">{copy.resultLabel}</p>
          <h2 id="strategy-example-title" aria-live="polite" aria-atomic="true">
            {project.title}
          </h2>
          <p className="strategy-result-description">{project.description}</p>
          <Link
            className="sp-button strategy-cta"
            href={`/contact?workflow=Custom%20systems&strategy=${project.id}`}
            onClick={() =>
              trackEvent("cta_clicked", {
                cta: "strategy_inquiry",
                placement: "ai_strategy_example",
                project: project.id,
              })
            }
          >
            {copy.handoff}
            <SkyArrow direction="up-right" />
          </Link>
          <p className="strategy-handoff-note">{copy.handoffNote}</p>
          <button
            type="button"
            className="strategy-save"
            onClick={() => {
              downloadText(
                formatStrategyExample(project),
                `recoup-${project.id}-example.md`,
              );
              trackEvent("strategy_example_downloaded", {
                project: project.id,
              });
            }}
          >
            {copy.download}
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </section>
      <details className="strategy-details" key={project.id}>
        <summary>
          {copy.detailsLabel}
          <span aria-hidden="true">+</span>
        </summary>
        <div className="strategy-details-body">
          <p>{project.firstTest}</p>
          <div>
            <h3>{copy.requirementsLabel}</h3>
            <ul>
              {project.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{copy.measureLabel}</h3>
            <p>{project.measure}</p>
          </div>
        </div>
      </details>
    </div>
  );
}
