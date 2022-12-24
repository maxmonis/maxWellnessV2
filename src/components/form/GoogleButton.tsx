import { Dispatch, SetStateAction } from "react"

import LoadingButton from "@mui/lab/LoadingButton"
import Box from "@mui/material/Box"

import { logInWithGoogle } from "../../firebase"

interface GoogleButtonProps {
  handleError: (error: unknown) => void
  isSubmitting: boolean
  setIsSubmitting: Dispatch<SetStateAction<boolean>>
}

export default function GoogleButton({
  handleError,
  isSubmitting,
  setIsSubmitting,
}: GoogleButtonProps) {
  return (
    <LoadingButton
      loading={isSubmitting}
      onClick={googleLogin}
      sx={{
        fontSize: "1rem",
        textTransform: "none",
        ":not(:disabled)": {
          background: "white",
          color: "rgb(68, 68, 68)",
          ":hover": {
            boxShadow: "0 0 3px 3px rgb(66 133 244 / 30%)",
          },
        },
      }}
      variant="outlined"
    >
      {!isSubmitting && (
        <Box
          alt="google logo"
          component="img"
          src={
            "https://user-images.githubusercontent.com/51540371/" +
            "209448811-2b88004b-4abd-4b68-9944-9d47b350a735.png"
          }
          sx={{ mr: 3, width: "1.5rem" }}
        />
      )}
      Sign in with Google
    </LoadingButton>
  )

  async function googleLogin() {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await logInWithGoogle()
    } catch (error) {
      handleError(error)
    } finally {
      setIsSubmitting(false)
    }
  }
}
