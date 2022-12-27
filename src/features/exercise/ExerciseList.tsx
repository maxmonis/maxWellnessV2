import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd"
import { TransitionGroup } from "react-transition-group"

import DeleteIcon from "@mui/icons-material/Delete"
import Collapse from "@mui/material/Collapse"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { Routine } from "../../models/workout"
import getPrintout from "../../utils/getPrintout"

interface ExerciseListProps {
  deleteExercise: (id: string) => void
  handleDragEnd: (result: DropResult) => void
  routine: Routine
}

export default function ExerciseList({
  deleteExercise,
  handleDragEnd,
  routine,
}: ExerciseListProps) {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="ExerciseList">
        {({ droppableProps, innerRef: droppableRef, placeholder }) => (
          <List ref={droppableRef} {...droppableProps}>
            <TransitionGroup>
              {routine.map((exercise, i) => (
                <Collapse key={i}>
                  <Draggable
                    draggableId={exercise.id}
                    index={i}
                    key={exercise.id}
                  >
                    {({
                      draggableProps,
                      dragHandleProps,
                      innerRef: draggableRef,
                    }) => (
                      <ListItem
                        secondaryAction={
                          <IconButton
                            aria-label="delete"
                            edge="end"
                            onClick={() => deleteExercise(exercise.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        ref={draggableRef}
                        {...draggableProps}
                      >
                        <ListItemText
                          primary={`${exercise.lift}: ${getPrintout(exercise)}`}
                          {...dragHandleProps}
                        />
                      </ListItem>
                    )}
                  </Draggable>
                </Collapse>
              ))}
            </TransitionGroup>
            {placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  )
}
