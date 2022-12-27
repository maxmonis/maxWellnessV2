import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate } from "react-router-dom"

import CircularProgress from "@mui/material/CircularProgress"

import { auth } from "../firebase"

import WorkoutApp from "./workout/WorkoutApp"

export default function Dashboard() {
  const [user, loading] = useAuthState(auth)

  if (loading) return <CircularProgress sx={{ m: 6 }} />

  if (!user) return <Navigate replace to="/account/login" />

  return <WorkoutApp userId={user.uid} />
}
