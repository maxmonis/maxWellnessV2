import { ChangeEvent, ReactNode, useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import TextField from "@mui/material/TextField"

import Form from "../../components/form/Form"
import { Exercise } from "../../models/workout"
import createNewExercise from "../../utils/createNewExercise"

interface ExerciseFormProps {
  addExercise: (exercise: Exercise) => void
  children: ReactNode
  liftNames?: string[]
}

export default function ExerciseForm({
  addExercise,
  children,
  liftNames = ["Bench Press", "Deadlift", "Squat"],
}: ExerciseFormProps) {
  const defaultValues = {
    lift: liftNames[0],
    reps: "",
    sets: "",
    weight: "",
  }
  const [values, setValues] = useState(defaultValues)
  const { lift, reps, sets, weight } = values
  const [error, setError] = useState("")

  return (
    <Form
      border={0}
      gap={3}
      hideError={() => setError("")}
      px={0}
      py={0}
      {...{ error, onSubmit }}
    >
      <Select name="lift" onChange={handleChange} value={lift}>
        {liftNames.map(liftName => (
          <MenuItem key={liftName} value={liftName}>
            {liftName}
          </MenuItem>
        ))}
      </Select>
      <Box display="grid" gap={1} gridTemplateColumns="1fr 1fr 1.2fr">
        {[
          { label: "Sets", name: "sets", value: sets },
          { label: "Reps", name: "reps", value: reps },
          { label: "Weight", name: "weight", value: weight },
        ].map((field, i) => (
          <TextField
            autoFocus={i === 0}
            key={i}
            onChange={handleChange}
            type="number"
            {...field}
          />
        ))}
      </Box>
      <Box display="flex" gap={4} justifyContent="space-between">
        <Button sx={{ flexGrow: 1 }} type="submit" variant="outlined">
          Add Exercise
        </Button>
        {(reps || sets || weight) && (
          <Button onClick={() => setValues({ ...defaultValues, lift })}>
            Reset
          </Button>
        )}
      </Box>
      {children}
    </Form>
  )

  function handleChange({
    target: { name, value },
  }:
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent<string>) {
    setValues({ ...values, [name]: value })
    setError("")
  }

  function onSubmit() {
    const exercise = createNewExercise(values)
    if (exercise) {
      addExercise(exercise)
    } else {
      setError("Invalid exercise")
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }
}
