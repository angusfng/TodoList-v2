import React from "react";
import { Text, ListItem, IconButton, Box } from "@chakra-ui/react";
import { DraggableProvided } from "react-beautiful-dnd";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { TaskType } from "../helpers/types";

interface Props {
  task: TaskType;
  provided: DraggableProvided;
}

const Task = (props: Props) => {
  return (
    <ListItem
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      bg="white"
      mb="0.5rem"
      borderRadius="5px"
      p="0.5rem"
      d="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Text mr={3} fontSize="1.1em">
        {props.task.details}
      </Text>
      <Box minW="max-content">
        <IconButton
          colorScheme="red"
          aria-label="delete-task"
          icon={<DeleteIcon />}
          mr={2}
        />
        <IconButton
          colorScheme="teal"
          aria-label="delete-task"
          icon={<EditIcon />}
        />
      </Box>
    </ListItem>
  );
};

export default Task;
