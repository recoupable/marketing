import { describe, expect, it } from "vitest";
import { formatTasksBullet } from "../formatTasksBullet";

describe("formatTasksBullet", () => {
  it("names Free as one weekly scheduled task", () => {
    expect(formatTasksBullet("free")).toBe("1 scheduled task, weekly at most");
  });

  it("names Starter as three daily scheduled tasks", () => {
    expect(formatTasksBullet("starter")).toBe("3 scheduled tasks, daily at most");
  });

  it("names Pro as unlimited hourly scheduled tasks", () => {
    expect(formatTasksBullet("pro")).toBe("Unlimited scheduled tasks, hourly at most");
  });
});
