import { useState } from "react"

import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import type { TextFieldProps } from "@mui/material/TextField"
import TextField from "@mui/material/TextField"

type PasswordProps = Omit<TextFieldProps, "type">

export default function Password({ InputProps, ...props }: PasswordProps) {
  const [isPlainText, setIsPlainText] = useState(false)

  return (
    <TextField
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              onClick={() => setIsPlainText(!isPlainText)}
              sx={{ ml: -1.5 }}
            >
              {isPlainText ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={isPlainText ? "text" : "password"}
      {...props}
    />
  )
}
