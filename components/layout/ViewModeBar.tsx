"use client";

import { HumanMachineToggle } from "./HumanMachineToggle";

/**
 * Human/Machine toggle fixed at bottom center of the viewport.
 * Shown on all breakpoints so the control lives in one place.
 */
export function ViewModeBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 pointer-events-none z-40">
      <div className="pointer-events-auto">
        <HumanMachineToggle />
      </div>
    </div>
  );
}
