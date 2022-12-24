import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import BarbellWallpaper from "../../components/layout/BarbellWallpaper"
import Copyright from "../../components/layout/Copyright"
import { auth } from "../../firebase"

import Login from "./Login"
import Register from "./Register"
import ResetPassword from "./ResetPassword"

export default function AccountApp() {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  useEffect(() => {
    if (user) navigate("/", { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap={12}
      justifyContent="space-between"
      minHeight="100vh"
      minWidth="100vw"
      position="relative"
    >
      <BarbellWallpaper />
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap={6}
        p={4}
      >
        <Typography color="white" fontSize="max(12vmin, 2.5rem)" variant="h1">
          maxWellness
        </Typography>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate replace to="login" />} />
        </Routes>
      </Box>
      <Copyright color="white" />
    </Box>
  )
}
