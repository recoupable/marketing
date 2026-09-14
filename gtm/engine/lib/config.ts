import { config as loadEnv } from "dotenv";
import { fileURLToPath } from "node:url";

let loaded = false;

export function getConfig() {
  if (!loaded) {
    loadEnv({ path: fileURLToPath(new URL("../.env", import.meta.url)) });
    loaded = true;
  }
  return {
    recoupApiUrl: process.env.RECOUP_API_URL || "https://recoup-api.vercel.app/api",
    recoupAdminToken: process.env.RECOUP_ADMIN_TOKEN || "",
    attioApiKey: process.env.ATTIO_API_KEY || "",
    plausibleApiKey: process.env.PLAUSIBLE_API_KEY || "",
    plausibleSiteId: process.env.PLAUSIBLE_SITE_ID || "recoupable.com",
  } as const;
}

export function requireEnv(key: keyof ReturnType<typeof getConfig>): string {
  const value = getConfig()[key];
  if (!value) {
    console.error(`Missing required env var: ${key}`);
    console.error(`Copy .env.example to .env and fill in the values.`);
    process.exit(1);
  }
  return value;
}
