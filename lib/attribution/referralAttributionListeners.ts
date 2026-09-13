/** Called after the session store changes, so mounted app links re-read their tags. */
export const referralAttributionListeners = new Set<() => void>();
