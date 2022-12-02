import { useEffect, useState } from "react"
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
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inputErrors, setInputErrors] = useState<
    ReturnType<typeof validateAccountForm>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState("")

  useEffect(() => {
    setInputErrors({})
  }, [email, name, password])

  return (
    <Form
      error={authError}
      hideError={() => setAuthError("")}
      onSubmit={register}
    >
      <TextField
        autoFocus
        error={Boolean(inputErrors.name)}
        helperText={inputErrors.name}
        label="Username"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <TextField
        error={Boolean(inputErrors.email)}
        helperText={inputErrors.email}
        label="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <Password
        error={Boolean(inputErrors.password)}
        helperText={inputErrors.password}
        label="Password"
        onChange={e => setPassword(e.target.value)}
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
        <MuiLink component={Link} to="../login">
          Login
        </MuiLink>
      </Box>
    </Form>
  )

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
    const inputErrors = validateAccountForm({ email, name, password })
    setInputErrors(inputErrors)
    if (Object.keys(inputErrors).length > 0) return
    setIsSubmitting(true)
    try {
      await registerWithEmail(name, email, password)
    } catch (error) {
      setAuthError(extractErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }
}
