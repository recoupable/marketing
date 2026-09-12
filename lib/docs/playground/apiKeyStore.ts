const STORAGE_KEY = "recoup:docs:api-key";
const listeners = new Set<() => void>();

/**
 * Session-scoped api key shared by every reference page. sessionStorage dies with the tab,
 * and the key is never logged, sent to analytics, or placed in a URL. Storage access is
 * wrapped so private windows and blocked storage degrade to an in-memory-only field.
 */
export const apiKeyStore = {
  storageKey: STORAGE_KEY,
  read(): string {
    try {
      return sessionStorage.getItem(STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  },
  write(value: string): void {
    try {
      if (value) sessionStorage.setItem(STORAGE_KEY, value);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable: the in-memory value in the field still works for this page.
    }
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
