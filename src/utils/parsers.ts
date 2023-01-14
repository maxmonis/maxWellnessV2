import { hasChars, hasMessage } from "./validators"

export function extractErrorMessage(error: unknown) {
  if (hasChars(error)) return error
  if (hasMessage(error)) return error.message
  return "An unexpected error occurred"
}
