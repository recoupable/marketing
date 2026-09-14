"use client";

import { useState } from "react";
import { SkyArrow } from "@/components/sky/arrow";

type Workflow = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  output: { label: string; title: string; rows: { title: string; detail: string }[] };
};

export function PlatformToolsDemo({ title, workflows }: { title: string; workflows: Workflow[] }) {
  const [selected, setSelected] = useState(0);
  const workflow = workflows[selected];

  return (
    <section className="platform-tools" id="tools" aria-labelledby="platform-tools-title">
      <div className="platform-tools-copy">
        <h2 id="platform-tools-title" data-reveal="">{title}</h2>
        <div className="platform-tool-choices" data-reveal-group="" role="group" aria-label="Choose a workflow">
          {workflows.map((item, index) => (
            <button type="button" key={item.id} aria-pressed={selected === index} aria-controls="platform-tool-output" onClick={() => setSelected(index)}>
              <span className="platform-tool-index">0{index + 1}</span>
              <span><span className="platform-tool-name">{item.title}</span><span className="platform-tool-description">{item.description}</span></span>
              <SkyArrow direction="right" />
            </button>
          ))}
        </div>
      </div>
      <div className="platform-tool-stage" data-reveal="" id="platform-tool-output" aria-live="polite" aria-atomic="true">
        <div className="platform-tool-prompt"><span aria-hidden="true">↳</span>{workflow.prompt}</div>
        <div className={`platform-tool-result platform-tool-result-${workflow.id}`} key={workflow.id}>
          <div className="platform-tool-output-label"><span>{workflow.output.label}</span><span aria-hidden="true">↗</span></div>
          <h3>{workflow.output.title}</h3>
          {workflow.id === "content" && <div className="platform-tool-poster-art" aria-hidden="true"><div /><div /><div /></div>}
          <div className="platform-tool-result-rows">
            {workflow.output.rows.map(row => <div key={row.title}><strong>{row.title}</strong><span>{row.detail}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
