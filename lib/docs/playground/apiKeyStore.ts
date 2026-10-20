const STORAGE_KEY = "recoup:docs:api-key";
const listeners = new Set<() => void>();
// Shadow of the last written value, so a blocked sessionStorage (private window, disabled
// storage) still leaves the key usable for the current page.
let memory = "";

/**
 * Session-scoped api key shared by every reference page. sessionStorage dies with the tab,
 * and the key is never logged, sent to analytics, or placed in a URL.
 */
export const apiKeyStore = {
  storageKey: STORAGE_KEY,
  read(): string {
    try {
      return sessionStorage.getItem(STORAGE_KEY) ?? "";
    } catch {
      return memory;
    }
  },
  write(value: string): void {
    memory = value;
    try {
      if (value) sessionStorage.setItem(STORAGE_KEY, value);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable: read() falls back to the in-memory shadow above.
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
