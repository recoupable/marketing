/** "1 task", "3 tasks", or "Unlimited tasks" for an uncapped plan. */
export function formatTaskLimit(taskLimit: number | null): string {
  if (taskLimit === null) return "Unlimited tasks";
  return `${taskLimit} ${taskLimit === 1 ? "task" : "tasks"}`;
}
