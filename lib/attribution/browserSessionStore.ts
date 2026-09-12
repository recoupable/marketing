import type { SessionStore } from "./acquisitionStorage.ts";

export function browserSessionStore(): SessionStore | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.sessionStorage;
  } catch {
    return undefined;
  }
}
