'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SkyArrow } from '@/components/sky/arrow';
import { saveReviewedDraft } from '@/lib/agent-draft';
import type { AgentDraft } from '@/lib/agent-browser';

export function InquiryHandoff({ draft, label }: { draft: AgentDraft; label: string }) {
  const router = useRouter();
  const [storageError, setStorageError] = useState(false);
  return <div className="mm-handoff">
    <details open={storageError || undefined}>
      <summary>Review the inquiry summary</summary>
      <pre>{draft.message}</pre>
    </details>
    <button type="button" className="sp-button" onClick={() => {
      if (saveReviewedDraft(draft)) router.push('/contact');
      else setStorageError(true);
    }}>{label}<span><SkyArrow /></span></button>
    <p>Carry this summary to the inquiry form. You can edit it before sending.</p>
    {storageError && <p role="alert">Your browser couldn’t carry the summary over. Copy the text above and <a href="/contact">open the inquiry form</a>. Nothing has been sent.</p>}
  </div>;
}
