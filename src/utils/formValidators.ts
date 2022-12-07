import { hasChars, isEmail } from "./validators"

interface InputValues {
  email?: string
  password?: string
  username?: string
}
interface InputErrors {
  email?: string
  password?: string
  username?: string
}
export function validateAccountForm(inputValues: InputValues) {
  const { email, password, username } = inputValues
  const inputErrors: InputErrors = {}
  if ("email" in inputValues) {
    if (!hasChars(email)) {
      inputErrors.email = "Email is required"
    } else if (!isEmail(email)) {
      inputErrors.email = "Invalid email"
    }
  }
  if ("password" in inputValues) {
    if (!hasChars(password)) {
      inputErrors.password = "Password is required"
    } else if (!hasChars(password, 6)) {
      inputErrors.password = "Minimum password length is 6"
    }
  }
  if ("username" in inputValues) {
    if (!hasChars(username)) {
      inputErrors.username = "Username is required"
    }
  }
  return inputErrors
}
