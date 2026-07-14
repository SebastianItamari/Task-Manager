import { describe, it, expect } from "vitest";
import { isTaskLate } from "./taskUtils";

describe("isTaskLate", () => {
  const now = new Date("2026-07-10T12:00:00Z");

  it("returns false when there is no deadline", () => {
    const result = isTaskLate(null, now);
    expect(result).toBe(false);
  });

  it("returns false when deadline is undefined", () => {
    const result = isTaskLate(undefined, now);
    expect(result).toBe(false);
  });

  it("returns true when deadline is in the past", () => {
    const deadline = "2026-07-09T12:00:00Z";
    const result = isTaskLate(deadline, now);
    expect(result).toBe(true);
  });

  it("returns false when deadline is in the future", () => {
    const deadline = "2026-07-11T12:00:00Z";
    const result = isTaskLate(deadline, now);
    expect(result).toBe(false);
  });
});
