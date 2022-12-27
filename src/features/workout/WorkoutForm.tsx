import { useState } from "react"

import dayjs, { Dayjs } from "dayjs"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import Form from "../../components/form/Form"
import { Workout } from "../../models/workout"

interface WorkoutFormProps {
  children: JSX.Element
  saveWorkout: (workout: Workout) => void
  routine: Workout["routine"]
  updateRoutine: (routine: Workout["routine"]) => void
}

export default function WorkoutForm({
  children,
  saveWorkout,
  routine,
  updateRoutine,
}: WorkoutFormProps) {
  const workoutNames = [
    "Full Body",
    "Lower Body",
    "Upper Body",
    "Chest and Back",
  ]
  const [name, setName] = useState(workoutNames[0])

  const [date, setDate] = useState<Dayjs | null>(
    dayjs(new Date().toISOString()),
  )

  return (
    <Box alignItems="center" display="flex" flexDirection="column" py="5vh">
      <Form gap={3}>
        <Typography variant="h5">Name and Date</Typography>
        <Select onChange={e => setName(e.target.value)} value={name}>
          {workoutNames.map(workoutName => (
            <MenuItem key={workoutName} value={workoutName}>
              {workoutName}
            </MenuItem>
          ))}
        </Select>
        <DatePicker
          onChange={setDate}
          renderInput={params => <TextField {...params} />}
          value={date}
        />
        <Typography pt={4} variant="h5">
          Routine
        </Typography>
        {children}
        {routine.length > 0 && (
          <Box display="flex" gap={4} justifyContent="space-between">
            <Button
              sx={{ flexGrow: 1 }}
              onClick={handleSave}
              variant="contained"
            >
              Save Workout
            </Button>
            <Button onClick={() => updateRoutine([])}>Clear</Button>
          </Box>
        )}
      </Form>
    </Box>
  )

  function handleSave() {
    if (date) saveWorkout({ date: date.toISOString(), name, routine })
  }
}
