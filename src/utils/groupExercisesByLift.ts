import { Routine } from "../models/workout"

export default function groupExercisesByLift(routine: Routine) {
  const organizedRoutine: Routine[] = []
  for (const exercise of routine) {
    const previous = organizedRoutine.at(-1)
    if (previous && previous[0].lift === exercise.lift) {
      previous.push(exercise)
    } else {
      organizedRoutine.push([exercise])
    }
  }
  return organizedRoutine
}
