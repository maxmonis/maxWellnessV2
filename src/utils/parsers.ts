import { Workout } from "../models/workout"

import { hasChars, hasMessage } from "./validators"

export function extractErrorMessage(error: unknown) {
  if (hasChars(error)) return error
  if (hasMessage(error)) return error.message
  return "An unexpected error occurred"
}

export function getDate(date: string) {
  const [year, month, day] = date.split("-")
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const weekday = days[new Date(date).getDay()]
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  return (
    `${weekday}, ${months[parseInt(month) - 1]} ${
      Math.abs(0 - parseInt(day)) - 1
    }` +
    (parseInt(year) === new Date().getFullYear() ? "" : `, '${year.slice(2)}`)
  )
}

export function chronologizeWorkouts(workouts: Workout[], reverse = true) {
  return workouts.sort((a, b) => {
    const dateA = parseInt(a.date.replace(/-/g, ""))
    const dateB = parseInt(b.date.replace(/-/g, ""))
    return reverse ? dateB - dateA : dateA - dateB
  })
}

export function getPositiveInt(value: string | number) {
  return Math.abs(parseInt(value + "")) || 0
}
