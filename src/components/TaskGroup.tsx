import React from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import Task from "./Task";

interface Props {
  title: string;
  tasks: string[];
  columnId: string;
}

const TaskGroup = (props: Props) => {
  return (
    <Droppable droppableId={props.columnId}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          bg={snapshot.isDraggingOver ? "pink.200" : "red.100"}
          w="25rem"
          p="1rem"
          m="1rem"
        >
          <Heading as="h2" size="md" mb="1rem">
            {props.title}
          </Heading>
          <UnorderedList m={0} listStyleType="none">
            {props.tasks.map((task, idx) => (
              <Draggable key={task} draggableId={task} index={idx}>
                {(provided) => <Task task={task} provided={provided} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </UnorderedList>
        </Box>
      )}
    </Droppable>
  );
};

export default TaskGroup;
