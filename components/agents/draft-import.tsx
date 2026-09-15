'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { getReviewedDraft, subscribeToReviewedDraft, clearReviewedDraft } from '@/lib/agent-draft';
import type { AgentDraft } from '@/lib/agent-browser';

export function AgentDraftImport({ onApply, autoApply = false }: { onApply: (draft: AgentDraft) => void; autoApply?: boolean }) {
  const draft = useSyncExternalStore(subscribeToReviewedDraft, getReviewedDraft, () => null);
  useEffect(() => {
    // Only the explicit readiness handoff opts into applying the browser draft.
    if (autoApply && draft) {
      onApply(draft);
      clearReviewedDraft();
    }
  }, [autoApply, draft, onApply]);
  if (autoApply) return <div className="agent-draft-import" role="status">
    {draft ? <p>Adding your readiness answers…</p> : <p>We couldn’t restore your readiness answers. <a href="/audit">Take the check again</a>, or describe your workflow in the form below.</p>}
  </div>;
  if (!draft) return null;
  return <div className="agent-draft-import">
    <strong>Your prepared brief is ready.</strong>
    <p>Add it to the form, review your details, and send when you’re ready.</p>
    <button type="button" onClick={() => { onApply(draft); clearReviewedDraft(); }}>Use prepared brief</button>
    <button type="button" onClick={clearReviewedDraft}>Discard draft</button>
  </div>;
}
