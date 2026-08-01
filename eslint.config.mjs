import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// This repo had no ESLint config file at all: `next lint` was resolving one
// implicitly, so when Next 16 removed that command the whole setup went with
// it. This restores linting explicitly, in the flat format Next 16 defaults to
// and ESLint 10 will require.
//
// Same two rule-sets `next lint` applied by default, and the same shape as
// chat/eslint.config.mjs so the two repos stay legible side by side.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next 16 ships the React Compiler era of
    // eslint-plugin-react-hooks. Those rules did not exist under the config
    // `next lint` used to apply here, and they account for every one of the 49
    // errors this repo reports today -- there is not a single violation of a
    // rule that was previously enabled. Each needs a real effect/ref refactor,
    // so they report as warnings rather than blocking, and are burned down
    // separately. Nothing is silenced: they still print on every run.
    // See recoupable/chat#1929.
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([
    // eslint-config-next's own defaults, which must be restated when overriding.
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
