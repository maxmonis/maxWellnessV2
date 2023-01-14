import { FormEvent } from "react"

import Alert from "@mui/material/Alert"
import type { BoxProps } from "@mui/material/Box"
import Box from "@mui/material/Box"

type FormProps = BoxProps & {
  onSubmit?: () => void
} & (
    | {
        error: string
        hideError?: () => void
      }
    | {
        error?: never
        hideError?: never
      }
  )

export default function Form({
  children,
  error,
  hideError,
  onSubmit,
  ...props
}: FormProps) {
  return (
    <Box
      bgcolor="background.paper"
      border={1}
      borderRadius={2}
      component={onSubmit ? "form" : "div"}
      display="flex"
      flexDirection="column"
      gap={6}
      maxWidth="20rem"
      p={6}
      width="100%"
      {...(onSubmit ? { onSubmit: submitForm } : {})}
      {...props}
    >
      {error && (
        <Alert onClose={hideError} severity="error">
          {error}
        </Alert>
      )}
      {children}
    </Box>
  )

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSubmit?.()
  }
}
