import { aiStrategyCopy as copy } from "../copy/ai-strategy";

export function formatStrategyExample(
  project: (typeof copy.projects)[number],
): string {
  return [
    `# ${copy.downloadTitle}: ${project.label}`,
    copy.exampleNote,
    `## ${project.title}\n${project.description}`,
    project.review,
    `## ${copy.detailsLabel}\n${project.firstTest}`,
    `## ${copy.requirementsLabel}\n${project.requirements.map((item) => `- ${item}`).join("\n")}`,
    `## ${copy.measureLabel}\n${project.measure}`,
    copy.handoffNote,
  ].join("\n\n");
}
