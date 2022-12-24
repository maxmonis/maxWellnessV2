import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import MuiLink from "@mui/material/Link"
import TextField from "@mui/material/TextField"

import Form from "../../components/form/Form"
import GoogleButton from "../../components/form/GoogleButton"
import Password from "../../components/form/Password"
import { registerWithEmail } from "../../firebase"
import { validateAccountForm } from "../../utils/formValidators"
import { extractErrorMessage } from "../../utils/parsers"

export default function Register() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  })
  const { email, password, username } = values
  const [inputErrors, setInputErrors] = useState<
    ReturnType<typeof validateAccountForm>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState("")

  return (
    <Form
      error={authError}
      hideError={() => setAuthError("")}
      onSubmit={register}
    >
      <TextField
        autoFocus
        error={Boolean(inputErrors.username)}
        helperText={inputErrors.username}
        label="Username"
        name="username"
        onChange={handleChange}
        value={username}
      />
      <TextField
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
        Register
      </LoadingButton>
      <GoogleButton {...{ handleError, isSubmitting, setIsSubmitting }} />
      <Box>
        Already have an account?{" "}
        <MuiLink component={Link} to={isSubmitting ? "#" : "../login"}>
          Login
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

  async function register() {
    if (isSubmitting) return
    const inputErrors = validateAccountForm(values)
    setInputErrors(inputErrors)
    if (Object.keys(inputErrors).length > 0) return
    setIsSubmitting(true)
    try {
      await registerWithEmail(username, email, password)
    } catch (error) {
      handleError(error)
    } finally {
      setIsSubmitting(false)
    }
  }
}
