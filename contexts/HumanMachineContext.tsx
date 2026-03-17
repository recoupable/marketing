"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const STORAGE_KEY = "recoupable-view:v1";

export type ViewMode = "human" | "machine";

type ContextValue = {
  view: ViewMode;
  setView: (view: ViewMode) => void;
};

const HumanMachineContext = createContext<ContextValue | null>(null);

export function HumanMachineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [view, setViewState] = useState<ViewMode>("human");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
      if (stored === "human" || stored === "machine") setViewState(stored);
    } catch {
      // Incognito, quota exceeded, or storage disabled
    }
  }, [mounted]);

  const setView = useCallback((next: ViewMode) => {
    setViewState(next);
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      // Incognito, quota exceeded, or storage disabled
    }
  }, []);

  return (
    <HumanMachineContext.Provider value={{ view, setView }}>
      {children}
    </HumanMachineContext.Provider>
  );
}

export function useHumanMachine() {
  const ctx = useContext(HumanMachineContext);
  if (!ctx) throw new Error("useHumanMachine must be used within HumanMachineProvider");
  return ctx;
}
