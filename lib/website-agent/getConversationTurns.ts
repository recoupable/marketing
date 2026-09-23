import type {
  EveMessage,
  EveMessagePart,
  MessageStreamEvent,
} from "eve/client";

export type ConversationTurn = {
  id: string;
  user?: EveMessage;
  assistants: EveMessage[];
};

/** A user message owns one stable scroll anchor, including its pending reply. */
export function getConversationTurns(
  messages: readonly EveMessage[],
  events: readonly MessageStreamEvent[] = [],
) {
  const turns: ConversationTurn[] = [];
  const latestUserByRun = new Map<string, ConversationTurn>();
  const pendingAssistants: {
    message: EveMessage;
    position: ConversationTurn;
  }[] = [];
  for (const message of messages) {
    if (message.role === "user") {
      const turn: ConversationTurn = {
        id: message.id,
        user: message,
        assistants: [],
      };
      turns.push(turn);
      if (message.metadata?.turnId)
        latestUserByRun.set(message.metadata.turnId, turn);
    } else {
      let turn = turns.at(-1);
      if (!turn) {
        turn = { id: message.id, assistants: [] };
        turns.push(turn);
      }
      pendingAssistants.push({ message, position: turn });
    }
  }
  const turnsById = new Map(turns.map((turn) => [turn.id, turn]));
  const userAtStep = new Map<string, ConversationTurn>();
  const receivedUserByRun = new Map<string, ConversationTurn>();
  for (const event of events) {
    if (event.type === "message.received") {
      if (event.data.kind === "execution.background_task") continue;
      const id = event.meta.id ?? `${event.data.turnId}:${event.data.sequence}`;
      const turn = turnsById.get(`${id}:user`);
      if (turn) receivedUserByRun.set(event.data.turnId, turn);
    } else if (event.type === "step.started") {
      const turn = receivedUserByRun.get(event.data.turnId);
      if (turn)
        userAtStep.set(`${event.data.turnId}:${event.data.stepIndex}`, turn);
    }
  }
  for (const { message, position } of pendingAssistants) {
    const run = message.metadata?.turnId;
    const fallback = (run && latestUserByRun.get(run)) || position;
    const grouped = new Map<ConversationTurn, EveMessagePart[]>();
    let stepIndex = -1;
    for (const part of message.parts) {
      if (part.type === "step-start") stepIndex++;
      const step =
        "stepIndex" in part ? (part.stepIndex ?? stepIndex) : stepIndex;
      // Eve reuses one assistant message for a steered run. Its earlier steps
      // still belong before the answer, even when a tool finishes afterward.
      const target = (run && userAtStep.get(`${run}:${step}`)) || fallback;
      const parts = grouped.get(target) ?? [];
      parts.push(part);
      grouped.set(target, parts);
    }
    for (const [target, parts] of grouped)
      target.assistants.push({ ...message, parts });
  }
  return turns;
}
