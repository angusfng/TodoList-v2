import React from "react";
import { Box, Heading, UnorderedList } from "@chakra-ui/react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { TaskType } from "../helpers/types";

interface Props {
  title: string;
  tasks: TaskType[];
  columnId: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskGroup = (props: Props) => {
  return (
    <Box m="1rem">
      <Heading
        as="h2"
        size="md"
        p="0.7rem"
        bg="teal.500"
        borderTopRadius="5px"
        fontWeight="semibold"
        textAlign="center"
        color="white"
      >
        {props.title}
      </Heading>
      <Droppable droppableId={props.columnId}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            bg={snapshot.isDraggingOver ? "blue.50" : "gray.100"}
            w="25rem"
            maxW="100%"
            minH="30rem"
            p="0.5rem"
            borderBottomRadius="5px"
          >
            <UnorderedList m={0} listStyleType="none">
              {props.tasks.map((task, idx) => (
                <Draggable key={task.id} draggableId={task.id} index={idx}>
                  {(provided) => (
                    <Task
                      task={task}
                      provided={provided}
                      index={idx}
                      setUpdate={props.setUpdate}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </UnorderedList>
          </Box>
        )}
      </Droppable>
    </Box>
  );
};

export default TaskGroup;
