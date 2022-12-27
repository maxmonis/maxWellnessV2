export default function getPrintout({
  reps,
  sets,
  weight,
}: {
  reps: number
  sets: number
  weight: number
}) {
  if (sets > 1 && reps && weight) return `${sets}(${reps}x${weight})`
  if (sets > 1 && reps) return `${sets}(${reps})`
  if (reps && weight) return `${reps}x${weight}`
  if (reps) return `${reps}`
  return `${weight}`
}
