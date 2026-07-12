"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Invoke `onOutside` on a mousedown outside the referenced element. */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  onOutside: () => void,
) {
  const cb = useRef(onOutside);
  cb.current = onOutside;
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb.current();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [ref]);
}
