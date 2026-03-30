"use client";

import { HumanMachineToggle } from "./HumanMachineToggle";

/**
 * Human/Machine toggle fixed at bottom center of the viewport.
 * Shown on all breakpoints so the control lives in one place.
 */
export function ViewModeBar() {
  return (
    <div className="hidden">
      <HumanMachineToggle />
    </div>
  );
}
