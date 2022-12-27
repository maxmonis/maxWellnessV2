import { Exercise, Routine, Workout } from "../models/workout"

type Email = `${string}@${string}.${string}`
export function isEmail(email: unknown): email is Email {
  return typeof email === "string" && /^\S+@\S+\.\S+$/.test(email)
}

/**
 * Checks if a value is an Error which includes a non-empty message
 */
export function hasMessage(error: unknown): error is Error {
  return hasChars((error as Error)?.message)
}

/**
 * Checks if a value is a string which includes characters other than spaces,
 * optionally with a minimum length for the trimmed value (1 by default)
 */
export function hasChars(string: unknown, minLength = 1): string is string {
  return typeof string === "string" && string.trim().length >= minLength
}

function isExercise(exercise: unknown): exercise is Exercise {
  return (
    hasChars((exercise as Exercise)?.lift) &&
    ((exercise as Exercise)?.reps > 0 || (exercise as Exercise)?.weight > 0)
  )
}

function isRoutine(routine: unknown): routine is Routine {
  return Array.isArray(routine) && routine.every(isExercise)
}

function isWorkout(workout: unknown): workout is Workout {
  return (
    typeof workout === "object" &&
    workout !== null &&
    "date" in workout &&
    "name" in workout &&
    "routine" in workout &&
    hasChars(workout.name) &&
    hasChars(workout.date) &&
    Boolean(Date.parse(workout.date)) &&
    isRoutine(workout.routine)
  )
}

export function isWorkoutList(workoutList: unknown): workoutList is Workout[] {
  return Array.isArray(workoutList) && workoutList.every(isWorkout)
}
