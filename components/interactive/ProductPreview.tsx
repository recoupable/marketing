"use client";
import { useState } from "react";
import { productPreviewContent } from "./productPreviewContent";
import { ProductPreviewCompact } from "./ProductPreviewCompact";
import "./product-preview.css";

export function ProductPreview({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState("Research");
  const value = productPreviewContent[mode];
  if (compact) return <ProductPreviewCompact />;
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
        {Object.keys(productPreviewContent).map((name) => (
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
        Explore this preview with a fictional artist. Open Recoup to work with
        your own.
      </p>
    </div>
  );
}
