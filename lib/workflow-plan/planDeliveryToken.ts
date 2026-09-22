import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod/v3";
import { answersSchema, planSchema } from "./schema";

const envelope = z.object({ answers: answersSchema, plan: planSchema, expires: z.number() });
export function planDeliveryToken(secret: string) {
  const sign = (payload: string) => createHmac("sha256", secret).update("workflow-plan:" + payload).digest("hex");
  return {
    issue(answers: z.infer<typeof answersSchema>, plan: z.infer<typeof planSchema>) {
      const payload = Buffer.from(JSON.stringify({ answers, plan, expires: Date.now() + 3600000 })).toString("base64url");
      return payload + "." + sign(payload);
    },
    verify(token: string) {
      const [payload, signature] = token.split(".");
      const expected = Buffer.from(sign(payload || ""));
      const actual = Buffer.from(signature || "");
      if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) throw new Error("Invalid token");
      const result = envelope.parse(JSON.parse(Buffer.from(payload, "base64url").toString()));
      if (result.expires < Date.now()) throw new Error("Expired token");
      return result;
    },
  };
}
