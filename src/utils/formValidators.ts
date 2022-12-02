import { hasChars, isEmail } from "./validators"

interface InputValues {
  email?: string
  name?: string
  password?: string
}
interface InputErrors {
  email?: string
  name?: string
  password?: string
}
export function validateAccountForm({ email, name, password }: InputValues) {
  const inputErrors: InputErrors = {}
  if (email !== undefined) {
    if (!hasChars(email)) {
      inputErrors.email = "Email is required"
    } else if (!isEmail(email)) {
      inputErrors.email = "Invalid email"
    }
  }
  if (password !== undefined) {
    if (!hasChars(password)) {
      inputErrors.password = "Password is required"
    } else if (!hasChars(password, 6)) {
      inputErrors.password = "Minimum password length is 6"
    }
  }
  if (name !== undefined) {
    if (!hasChars(name)) {
      inputErrors.name = "Username is required"
    }
  }
  return inputErrors
}
