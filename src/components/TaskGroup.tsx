import React from "react";
import {
  Box,
  Heading,
  Text,
  Divider,
  UnorderedList,
  ListItem,
  Flex,
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
    <Box m="1rem">
      <Heading
        as="h2"
        size="md"
        p="0.5rem"
        bg="gray.200"
        borderTopRadius="5px"
        fontWeight="semibold"
        textAlign="center"
      >
        {props.title}
      </Heading>
      <Droppable droppableId={props.columnId}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            bg={snapshot.isDraggingOver ? "orange.100" : "gray.200"}
            w="25rem"
            maxW="100%"
            minH="30rem"
            p="0.5rem"
            borderBottomRadius="5px"
          >
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
    </Box>
  );
};

export default TaskGroup;
