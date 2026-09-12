"use client";
import { useSyncExternalStore } from "react";
import { apiKeyStore } from "@/lib/docs/playground/apiKeyStore";

/** The session-scoped api key; the server snapshot is empty so hydration never sees storage. */
export function useStoredApiKey(): [string, (value: string) => void] {
  const value = useSyncExternalStore(apiKeyStore.subscribe, apiKeyStore.read, () => "");
  return [value, apiKeyStore.write];
}
