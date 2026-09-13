import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import {
  subscribeToRecoup,
  type SubscribeSource,
} from "@/lib/marketing-subscribe";
import { currentReferralAttribution } from "@/lib/attribution/currentReferralAttribution";
import { trackEvent } from "@/lib/analytics/trackEvent";

const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
const unexpectedFailure =
  "We couldn\u2019t confirm your signup. Your details are still here. Please try again.";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

/**
 * Shared state machine behind every subscribe surface: the hydration guard,
 * a single in-flight submit, the status and error state, the lead call, and
 * the subscribe_submitted funnel event. Surfaces own their markup and focus.
 */
export function useSubscribeForm(source: SubscribeSource) {
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientReady,
    serverReady,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [error, setError] = useState("");
  const pending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || pending.current) return;
    pending.current = true;
    setStatus("loading");
    setError("");
    try {
      const result = await subscribeToRecoup({
        name,
        email,
        source,
        attribution: currentReferralAttribution(),
      });
      if (result.ok) {
        setStatus("success");
        trackEvent("subscribe_submitted", { source });
      } else {
        setError(result.error);
        setStatus("error");
      }
    } catch {
      setError(unexpectedFailure);
      setStatus("error");
    } finally {
      pending.current = false;
    }
  }

  return {
    busy: !hydrated || status === "loading",
    email,
    error,
    name,
    setEmail,
    setName,
    status,
    submit,
  };
}
