import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"
import MuiLink from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import Form from "../../components/form/Form"
import { sendPasswordReset } from "../../firebase"
import { validateAccountForm } from "../../utils/formValidators"
import { extractErrorMessage } from "../../utils/parsers"

export default function ResetPassword() {
  const [values, setValues] = useState({
    email: "",
  })
  const { email } = values
  const [inputErrors, setInputErrors] = useState<
    ReturnType<typeof validateAccountForm>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState("")
  const [wasEmailSent, setWasEmailSent] = useState(false)

  if (wasEmailSent)
    return (
      <Form>
        <Typography variant="h4">Email sent</Typography>
        <Typography>
          Please check {email} for instructions on resetting your password
        </Typography>
        <MuiLink component={Link} to="../login">
          Return to Login
        </MuiLink>
      </Form>
    )

  return (
    <Form
      error={authError}
      hideError={() => setAuthError("")}
      onSubmit={resetPassword}
    >
      <TextField
        autoFocus
        error={Boolean(inputErrors.email)}
        helperText={inputErrors.email}
        label="Email"
        name="email"
        onChange={handleChange}
        value={email}
      />
      <LoadingButton loading={isSubmitting} type="submit" variant="contained">
        Reset password
      </LoadingButton>
      <Box>
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

  async function resetPassword() {
    if (isSubmitting) return
    const inputErrors = validateAccountForm(values)
    setInputErrors(inputErrors)
    if (Object.keys(inputErrors).length > 0) return
    setIsSubmitting(true)
    try {
      await sendPasswordReset(email)
      setWasEmailSent(true)
    } catch (error) {
      setAuthError(extractErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }
}
