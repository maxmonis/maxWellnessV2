import { nanoid } from "nanoid"

import { Exercise } from "../models/workout"

import { getPositiveInt } from "./parsers"

interface ExerciseData {
  lift: string
  reps: string | number
  sets: string | number
  weight: string | number
}

export default function createNewExercise(exerciseData: ExerciseData) {
  const sets = getPositiveInt(exerciseData.sets)
  const reps = getPositiveInt(exerciseData.reps)
  const weight = getPositiveInt(exerciseData.weight)

  if (!reps && !weight) return null

  const newExercise: Exercise = {
    id: nanoid(10),
    lift: exerciseData.lift,
    sets: sets > 1 ? sets : 1,
    reps: reps > 1 ? reps : 1,
    weight,
  }

  return newExercise
}
