export function isTaskLate(deadline: string | null | undefined, now: Date = new Date()): boolean {
  if (!deadline) return false;
  return new Date(deadline) < now;
}