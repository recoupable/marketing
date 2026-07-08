/**
 * Map-backed Storage stand-in so the pending-intent helpers can be tested in
 * Node (vitest runs without a DOM, so there is no real `sessionStorage`).
 */
export function fakeSessionStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    key: (index: number) => [...store.keys()][index] ?? null,
    get length() {
      return store.size;
    },
  };
}
