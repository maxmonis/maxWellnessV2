type Email = `${string}@${string}.${string}`
export function isEmail(email: unknown): email is Email {
  return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email)
}

/**
 * Checks if a value is an Error which includes a non-empty message
 */
export function hasMessage(error: unknown): error is Error {
  return hasChars((error as Error)?.message)
}

/**
 * Checks if a value is a string which includes characters other than spaces,
 * optionally with a minimum length for the trimmed value (1 by default)
 */
export function hasChars(string: unknown, minLength = 1): string is string {
  return typeof string === "string" && string.trim().length >= minLength
}
