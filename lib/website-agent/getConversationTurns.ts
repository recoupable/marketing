import type { EveMessage } from "eve/client";

export type ConversationTurn = {
  id: string;
  user?: EveMessage;
  assistants: EveMessage[];
};

/** A user message owns one stable scroll anchor, including its pending reply. */
export function getConversationTurns(messages: readonly EveMessage[]) {
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
  for (const { message, position } of pendingAssistants) {
    // Eve updates an existing assistant in place when a live turn is steered.
    // Display its answer after the latest accepted user message for that run.
    const target = message.metadata?.turnId
      ? (latestUserByRun.get(message.metadata.turnId) ?? position)
      : position;
    target.assistants.push(message);
  }
  return turns;
}
