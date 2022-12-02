import CssBaseline from "@mui/material/CssBaseline"
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import useMediaQuery from "@mui/material/useMediaQuery"

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
      <Typography variant="h1">maxWellness</Typography>
    </ThemeProvider>
  )
}
