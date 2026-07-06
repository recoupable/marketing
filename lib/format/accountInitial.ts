/**
 * The single character shown in the header avatar for a signed-in account:
 * the first alphanumeric character of the email, uppercased. "?" when no
 * email is available so the avatar never renders empty.
 */
export function accountInitial(email: string | null | undefined): string {
  const match = email?.match(/[a-z0-9]/i);
  return match ? match[0].toUpperCase() : "?";
}
