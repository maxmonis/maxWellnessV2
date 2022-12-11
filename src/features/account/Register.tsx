import { ChangeEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import MuiLink from "@mui/material/Link"
import TextField from "@mui/material/TextField"

import Form from "../../components/form/Form"
import Password from "../../components/form/Password"
import { logInWithGoogle, registerWithEmail } from "../../firebase"
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

  useEffect(() => {
    setInputErrors({})
  }, [values])

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
      <LoadingButton
        loading={isSubmitting}
        onClick={googleLogin}
        variant="contained"
      >
        Register with Google
      </LoadingButton>
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
  }

  async function googleLogin() {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await logInWithGoogle()
    } catch (error) {
      setAuthError(extractErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
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
      setAuthError(extractErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }
}
