import { PageMark } from "@/components/sky/brand";
import "./platform-chat-preview.css";

export function PlatformChatPreview() {
  return (
    <figure className="platform-chat-preview" aria-label="Illustrative artist chat workspace">
      <div className="pc-window">
        <aside className="pc-sidebar" aria-hidden="true">
          <div className="pc-brand"><PageMark /><span>Recoup</span></div>
          <div className="pc-new-chat"><span>+</span> New chat</div>
          <div className="pc-sidebar-label">Workspace</div>
          <div className="pc-nav-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="10" cy="6" r="3" /><path d="M4 17v-2a6 6 0 0 1 12 0v2" /></svg>Artists</div>
          <div className="pc-nav-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 5h5l2 2h7v10H3Z" /></svg>Files</div>
          <div className="pc-nav-item"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="14" height="14" rx="3" /><path d="m6 10 3 3 5-6" /></svg>Tasks</div>
          <div className="pc-sidebar-label pc-chats-label">Recent chats</div>
          <div className="pc-chat-active">Blue Hour release</div>
          <div className="pc-chat-history">Artist research</div>
          <div className="pc-team"><span>MV</span><div>Mara’s team<small>Artist workspace</small></div></div>
        </aside>
        <div className="pc-conversation">
          <div className="pc-artist-header">
            <span className="pc-avatar" aria-hidden="true">MV</span>
            <div><strong>Mara Vale</strong><span>Artist context</span></div>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg>
          </div>
          <div className="pc-context"><span>Artist notes</span><span>Release plan</span></div>
          <div className="pc-messages">
            <p className="pc-user-message">What should we focus on for Mara’s release this week?</p>
            <div className="pc-answer">
              <div className="pc-answer-author"><PageMark /><strong>Recoup</strong></div>
              <p>Based on her artist notes and release plan, I’d start here:</p>
              <ol>
                <li>Choose the artwork for <strong>Blue Hour.</strong></li>
                <li>Turn Mara’s voice note into a teaser.</li>
                <li>Draft the release announcement.</li>
              </ol>
              <span className="pc-answer-source">Using 2 context files</span>
            </div>
          </div>
          <div className="pc-composer" aria-hidden="true">
            <span>Ask about your artist…</span>
            <div><span className="pc-attach">+</span><span className="pc-send"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 15V5m-4 4 4-4 4 4" /></svg></span></div>
          </div>
        </div>
      </div>
      <figcaption>Illustrative workspace · fictional artist</figcaption>
    </figure>
  );
}
