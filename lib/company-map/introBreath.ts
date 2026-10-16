/** A complete network inhales, opens, then rests; card dimensions never change. */
export function introBreath(elapsed: number, peak = 0.12, inhale = 0.06) {
  const ease = (t: number) =>
    (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, t)))) / 2;
  if (elapsed < 1100) return -inhale * ease(elapsed / 1100);
  if (elapsed < 3200)
    return -inhale + (inhale + peak) * ease((elapsed - 1100) / 2100);
  return peak * (1 - ease((elapsed - 3200) / 2200));
}
