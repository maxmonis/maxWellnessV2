import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate } from "react-router-dom"

import { collection, getDocs, query, where } from "firebase/firestore"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

import Copyright from "../../components/layout/Copyright"
import { auth, db, logOut } from "../../firebase"

export default function WorkoutApp() {
  const [user, loading, error] = useAuthState(auth)

  const [name, setName] = useState("")

  useEffect(() => {
    if (error) console.error(error)
    if (user) fetchUserName()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, user])

  if (!user && !loading) return <Navigate replace to="/account/login" />

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="100vh"
      justifyContent="space-between"
      pt={12}
    >
      {!user ? (
        <CircularProgress />
      ) : (
        <Box display="flex" flexDirection="column" gap={6} mt="20vh">
          <Typography>
            {name ? `Logged in as ${name}` : "Loading name..."}
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Button onClick={logOut} variant="contained">
            Logout
          </Button>
        </Box>
      )}
      <Copyright color={"text.secondary"} />
    </Box>
  )

  async function fetchUserName() {
    try {
      const { docs } = await getDocs(
        query(collection(db, "users"), where("uid", "==", user?.uid)),
      )
      setName(docs[0]?.data().name)
    } catch (error) {
      console.error(error)
    }
  }
}
