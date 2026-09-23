"use client";

import { useEffect, useMemo, useState } from "react";
import type { EveMessage } from "eve/client";
import { parseStreamingInput } from "@/lib/website-agent/parseStreamingInput";

type Snapshot = NonNullable<Awaited<ReturnType<typeof parseStreamingInput>>>;

export function useStreamingMessages(messages: readonly EveMessage[]) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  useEffect(() => {
    let current = true;
    const parts = messages
      .flatMap((message) => message.parts)
      .filter(
        (part) =>
          part.type === "dynamic-tool" && part.state === "input-streaming",
      );
    if (parts.length) {
      void Promise.all(parts.map(parseStreamingInput)).then((values) => {
        if (current)
          setSnapshots(values.filter((value) => value !== undefined));
      });
    }
    return () => {
      current = false;
    };
  }, [messages]);

  return useMemo(
    () =>
      messages.map((message) => ({
        ...message,
        parts: message.parts.map((part) => {
          if (part.type !== "dynamic-tool" || part.state !== "input-streaming")
            return part;
          const snapshot = snapshots.find(
            (item) => item.id === part.toolCallId,
          );
          // Never replace a completed result or reuse data from a different/restarted call.
          return snapshot && part.inputText.startsWith(snapshot.text)
            ? { ...part, input: snapshot.input }
            : part;
        }),
      })),
    [messages, snapshots],
  );
}
