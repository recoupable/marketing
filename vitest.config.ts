import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/.git/**"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
