import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import AccountApp from "./features/account/AccountApp"
import WorkoutApp from "./features/workout/WorkoutApp"

export default function App() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")

  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: prefersDark ? "dark" : "light",
      },
      spacing: (factor = 1) => `${0.25 * factor}rem`,
    }),
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="account/*" element={<AccountApp />} />
          <Route path="/" element={<WorkoutApp />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
