import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import CssBaseline from "@mui/material/CssBaseline"
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import AccountApp from "./features/account/AccountApp"
import Dashboard from "./features/Dashboard"

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            <Route path="account/*" element={<AccountApp />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  )
}
