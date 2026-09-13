import { productPreviewContent } from "./productPreviewContent";

export function ProductPreviewCompact() {
  const research = productPreviewContent.Research;
  return (
    <div className="product-preview music-preview compact">
      <div className="mp-compact-header">
        <span className="mp-wordmark">
          Recoup<span>●</span>
        </span>
      </div>
      <div className="mp-compact-prompt">{research.prompt}</div>
      <div className="mp-compact-answer">
        <span className="mp-result-label">{research.label}</span>
        <h4>{research.title}</h4>
        <p>{research.summary}</p>
        <div className="mp-compact-angle">
          <strong>Creative angle</strong>
          <span>{research.details[0].text}</span>
        </div>
      </div>
    </div>
  );
}
