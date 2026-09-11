'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerRecoupBrowserTools, type AgentDraft, type BrowserModelContext } from '@/lib/agent-browser';
import { saveReviewedDraft } from '@/lib/agent-draft';
import './agent-handoff.css';

export function BrowserAgentTools() {
  const router = useRouter();
  const [draft, setDraft] = useState<AgentDraft | null>(null);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    if (window.top !== window) return;
    const context = (document as Document & { modelContext?: BrowserModelContext }).modelContext;
    if (!context?.registerTool) return;
    const registration = new AbortController();
    void registerRecoupBrowserTools(context, {
      fetch: window.fetch.bind(window),
      onDraft: value => { setDraft(value); setStorageError(false); },
      signal: registration.signal,
    }).catch(() => { registration.abort(); });
    return () => registration.abort();
  }, []);

  if (!draft) return null;
  return <aside className="agent-brief-panel" aria-label="Project brief prepared with your agent">
    <div className="agent-brief-panel-top"><span>YOUR PROJECT BRIEF</span><button type="button" onClick={() => setDraft(null)} aria-label="Dismiss project brief">×</button></div>
    <h2>Ready for your review.</h2>
    <p>Nothing has been sent. Review this draft, then choose whether to add it to your inquiry.</p>
    <label htmlFor="agent-brief-review">Project brief</label>
    <textarea id="agent-brief-review" value={draft.message} onChange={event => setDraft({ ...draft, message: event.target.value })} maxLength={5000} rows={7} />
    <button className="agent-primary-button" type="button" disabled={draft.message.trim().length < 20} onClick={() => {
      if (saveReviewedDraft(draft)) { setDraft(null); router.push('/contact'); }
      else setStorageError(true);
    }}>Continue to your inquiry →</button>
    {storageError && <p role="alert">Your browser couldn’t carry the draft over. Copy the text above and <a href="/contact">open the contact form</a>.</p>}
  </aside>;
}
