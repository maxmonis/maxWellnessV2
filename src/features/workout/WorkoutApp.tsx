import { useEffect, useState } from "react"
import { DropResult } from "react-beautiful-dnd"

import { addDoc, collection, getDocs, query, where } from "firebase/firestore"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import Copyright from "../../components/layout/Copyright"
import { db, logOut } from "../../firebase"
import { Exercise, Routine, Workout } from "../../models/workout"
import eliminateRedundancy from "../../utils/eliminateRedundancy"
import LocalStorage from "../../utils/LocalStorage"
import { isWorkoutList } from "../../utils/validators"
import ExerciseForm from "../exercise/ExerciseForm"
import ExerciseList from "../exercise/ExerciseList"

import WorkoutForm from "./WorkoutForm"
import WorkoutList from "./WorkoutList"

interface WorkoutAppProps {
  userId: string
}

export default function WorkoutApp({ userId }: WorkoutAppProps) {
  const localRoutine = new LocalStorage(`routine_${userId}`)
  const [routine, setRoutine] = useState<Routine>(localRoutine.get() || [])

  const [workouts, setWorkouts] = useState<Workout[]>([])
  useEffect(() => {
    getWorkoutList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      gap={20}
      height="100vh"
      justifyContent="space-between"
      pt={4}
      px={4}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap="5rem 2rem"
        justifyContent="center"
      >
        <WorkoutForm {...{ routine, saveWorkout, updateRoutine }}>
          <ExerciseForm {...{ addExercise }}>
            <ExerciseList {...{ deleteExercise, routine, handleDragEnd }} />
          </ExerciseForm>
        </WorkoutForm>
        <WorkoutList {...{ handleExerciseClick, workouts }} />
      </Box>
      <Button onClick={logOut}>Logout</Button>
      <Copyright color="text.secondary" />
    </Box>
  )

  function handleExerciseClick(exercise: Exercise) {
    console.info(exercise)
  }

  function updateRoutine(newRoutine: Routine) {
    const routine = eliminateRedundancy(newRoutine)
    setRoutine(routine)
    localRoutine.set(routine)
  }

  function addExercise(newExercise: Exercise) {
    updateRoutine([...routine, newExercise])
  }

  function deleteExercise(exerciseId: string) {
    updateRoutine(routine.filter(({ id }) => id !== exerciseId))
  }

  function handleDragEnd({ destination, source, draggableId }: DropResult) {
    if (destination && destination.index !== source.index) {
      const exerciseIds = routine.map(({ id }) => id)
      exerciseIds.splice(source.index, 1)
      exerciseIds.splice(destination.index, 0, draggableId)
      const reorderedRoutine = []
      for (const exerciseId of exerciseIds) {
        for (const exercise of routine) {
          if (exercise.id === exerciseId) {
            reorderedRoutine.push(exercise)
            break
          }
        }
      }
      updateRoutine(reorderedRoutine)
    }
  }

  async function getWorkoutList() {
    const { docs } = await getDocs(
      query(collection(db, "workouts"), where("userId", "==", userId)),
    )
    const workoutsData = docs.map(doc => doc.data())
    if (isWorkoutList(workoutsData)) setWorkouts(workoutsData)
  }

  async function saveWorkout(workout: Workout) {
    await addDoc(collection(db, "workouts"), {
      ...workout,
      userId,
    })
    updateRoutine([])
    getWorkoutList()
  }
}
