/**
 * One description of one wait.
 *
 * These strings are kept character-identical to chat's
 * `lib/catalog/measuringCopy.ts`. Marketing and chat deploy separately, so the
 * contract is that the text matches, not that the module is shared — a customer
 * can see both within the same minute (run a valuation here, land in chat), and
 * the estimate they are given should not depend on which one they are looking
 * at (chat#1912 row 10).
 *
 * If you change the estimate, change it in both repos.
 */
export const MEASURING_TITLE = "Measuring your catalog";

export const MEASURING_ESTIMATE =
  "This usually takes about a minute, and longer for large catalogs.";

export const MEASURING_BODY = `We are pulling live play counts for every track. ${MEASURING_ESTIMATE}`;
