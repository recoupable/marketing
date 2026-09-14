import { PageMark } from "@/components/sky/brand";
import { platformCopy } from "@/lib/copy/platform";
import "./platform-chat-preview.css";

export function PlatformChatPreview() {
  const preview = platformCopy.preview;
  return (
    <figure className="platform-chat-preview" aria-label="Recoup workspace preview">
      <div className="pc-window">
        <aside className="pc-sidebar" aria-hidden="true">
          <div className="pc-brand"><PageMark /><span>Recoup</span></div>
          <div className="pc-new-chat"><span>+</span> New chat</div>
          <div className="pc-navigation">
            <div className="pc-nav-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="10" cy="6" r="3" /><path d="M4 17v-2a6 6 0 0 1 12 0v2" /></svg>Artists</div>
            <div className="pc-nav-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="5" width="14" height="12" rx="2" /><path d="M6 2h8M7 9h6m-6 4h4" /></svg>Catalogs</div>
            <div className="pc-nav-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="14" height="14" rx="3" /><path d="m6 10 3 3 5-6" /></svg>Tasks</div>
          </div>
          <div className="pc-team"><span>MV</span>{preview.artist}</div>
        </aside>
        <div className="pc-conversation">
          <div className="pc-release-header">
            <span className="pc-cover" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M9 17V7l10-2v10M9 9l10-2" /><ellipse cx="6" cy="18" rx="3" ry="2" /><ellipse cx="16" cy="16" rx="3" ry="2" /></svg></span>
            <div><strong>{preview.release}</strong><span>{preview.artist} · {preview.format}</span></div>
          </div>
          <div className="pc-messages">
            <p className="pc-user-message">{preview.prompt}</p>
            <div className="pc-answer">
              <div className="pc-answer-author"><PageMark /><strong>Recoup</strong></div>
              <p>{preview.response}</p>
              <div className="pc-document">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6" /></svg>
                <div><strong>{preview.document}</strong><span>{preview.documentType}</span></div>
              </div>
            </div>
          </div>
          <div className="pc-composer" aria-hidden="true">
            <span className="pc-attach">+</span><span className="pc-placeholder">{preview.placeholder}</span>
            <span className="pc-send"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 15V5m-4 4 4-4 4 4" /></svg></span>
          </div>
        </div>
      </div>
    </figure>
  );
}
