import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from "@mui/material/Typography"

import Form from "../../components/form/Form"
import { Exercise, Workout } from "../../models/workout"
import getPrintout from "../../utils/getPrintout"
import groupExercisesByLift from "../../utils/groupExercisesByLift"
import { chronologizeWorkouts, getDate } from "../../utils/parsers"

interface WorkoutListProps {
  handleExerciseClick: (exercise: Exercise) => void
  workouts: Workout[]
}

export default function WorkoutList({
  handleExerciseClick,
  workouts,
}: WorkoutListProps) {
  if (workouts.length === 0) return <></>

  return (
    <Box alignItems="center" display="flex" flexDirection="column" py="5vh">
      <Form maxHeight="80vh" overflow="scroll">
        {chronologizeWorkouts(workouts).map(({ date, name, routine }, i) => (
          <Box key={i}>
            <Typography variant="h6">
              {name} - {getDate(date)}
            </Typography>
            <List>
              {groupExercisesByLift(routine).map((exerciseList, j) => (
                <ListItem key={j} sx={{ display: "flex", flexWrap: "wrap" }}>
                  {exerciseList[0].lift}:
                  {exerciseList.map((exercise, k) => (
                    <Box component="span" key={k}>
                      &nbsp;
                      <Box
                        component="span"
                        onClick={() => handleExerciseClick(exercise)}
                        sx={{ cursor: "pointer" }}
                      >
                        {getPrintout(exercise)}
                      </Box>
                      {k !== exerciseList.length - 1 && ","}
                    </Box>
                  ))}
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Form>
    </Box>
  )
}
