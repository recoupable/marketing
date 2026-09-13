import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiKeyStore } from "@/lib/docs/playground/apiKeyStore";

function fakeStorage() {
  const map = new Map<string, string>();
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
    removeItem: (key: string) => void map.delete(key),
    map,
  };
}

describe("apiKeyStore", () => {
  let storage: ReturnType<typeof fakeStorage>;
  beforeEach(() => {
    storage = fakeStorage();
    vi.stubGlobal("sessionStorage", storage);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("reads an empty string before anything is stored", () => {
    expect(apiKeyStore.read()).toBe("");
  });
  it("persists under recoup:docs:api-key and notifies subscribers", () => {
    const listener = vi.fn();
    const unsubscribe = apiKeyStore.subscribe(listener);
    apiKeyStore.write("sk-1");
    expect(storage.map.get("recoup:docs:api-key")).toBe("sk-1");
    expect(apiKeyStore.read()).toBe("sk-1");
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
    apiKeyStore.write("sk-2");
    expect(listener).toHaveBeenCalledTimes(1);
  });
  it("removes the entry when the key is cleared", () => {
    apiKeyStore.write("sk-1");
    apiKeyStore.write("");
    expect(storage.map.has("recoup:docs:api-key")).toBe(false);
  });
  it("survives a storage that throws", () => {
    vi.stubGlobal("sessionStorage", { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } });
    expect(apiKeyStore.read()).toBe("");
    expect(() => apiKeyStore.write("x")).not.toThrow();
  });
});
