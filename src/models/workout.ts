export interface Exercise {
  id: string
  lift: string
  sets: number
  reps: number
  weight: number
}

export type Routine = Exercise[]

export interface Workout {
  date: string
  name: string
  routine: Routine
}
