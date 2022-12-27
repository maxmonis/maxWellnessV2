import { Routine } from "../models/workout"

import createNewExercise from "./createNewExercise"

export default function eliminateRedundancy(routine: Routine) {
  const updatedRoutine: Routine = []
  for (const exercise of routine) {
    const previousExercise = updatedRoutine.at(-1)
    if (
      previousExercise &&
      exercise.lift === previousExercise.lift &&
      exercise.reps === previousExercise.reps &&
      exercise.weight === previousExercise.weight
    ) {
      const updatedExercise = createNewExercise({
        ...exercise,
        sets: exercise.sets + previousExercise.sets,
      })
      if (updatedExercise) updatedRoutine.pop()
      updatedRoutine.push(updatedExercise ?? exercise)
    } else {
      updatedRoutine.push(exercise)
    }
  }
  return updatedRoutine
}
