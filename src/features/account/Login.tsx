import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import MuiLink from "@mui/material/Link"
import TextField from "@mui/material/TextField"

import Form from "../../components/form/Form"
import GoogleButton from "../../components/form/GoogleButton"
import Password from "../../components/form/Password"
import { logInWithEmail } from "../../firebase"
import { validateAccountForm } from "../../utils/formValidators"
import { extractErrorMessage } from "../../utils/parsers"

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const { email, password } = values
  const [inputErrors, setInputErrors] = useState<
    ReturnType<typeof validateAccountForm>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState("")

  return (
    <Form error={authError} hideError={() => setAuthError("")} onSubmit={login}>
      <TextField
        autoFocus
        error={Boolean(inputErrors.email)}
        helperText={inputErrors.email}
        label="Email"
        name="email"
        onChange={handleChange}
        value={email}
      />
      <Password
        error={Boolean(inputErrors.password)}
        helperText={inputErrors.password}
        label="Password"
        name="password"
        onChange={handleChange}
        value={password}
      />
      <LoadingButton loading={isSubmitting} type="submit" variant="contained">
        Login
      </LoadingButton>
      <GoogleButton {...{ handleError, isSubmitting, setIsSubmitting }} />
      <MuiLink component={Link} to={isSubmitting ? "#" : "../reset-password"}>
        Forgot Password
      </MuiLink>
      <Box mt={-3}>
        Don't have an account?{" "}
        <MuiLink component={Link} to={isSubmitting ? "#" : "../register"}>
          Register
        </MuiLink>
      </Box>
    </Form>
  )

  function handleChange({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [name]: value })
    setInputErrors({})
  }

  function handleError(error: unknown) {
    setAuthError(extractErrorMessage(error))
  }

  async function login() {
    if (isSubmitting) return
    const inputErrors = validateAccountForm(values)
    setInputErrors(inputErrors)
    if (Object.keys(inputErrors).length > 0) return
    setIsSubmitting(true)
    try {
      await logInWithEmail(email, password)
    } catch (error) {
      handleError(error)
    } finally {
      setIsSubmitting(false)
    }
  }
}
