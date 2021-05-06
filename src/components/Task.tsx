import React from "react";
import {
  Text,
  ListItem,
  IconButton,
  Box,
  TabList,
  Divider,
} from "@chakra-ui/react";
import { DraggableProvided } from "react-beautiful-dnd";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ColumnType, TaskType } from "../helpers/types";

interface Props {
  task: TaskType;
  provided: DraggableProvided;
  index: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = (props: Props) => {
  const handleDelete = () => {
    const storageColumns = JSON.parse(localStorage.getItem("tasks")!);
    // Pointer to tasks
    const deleteColumn = storageColumns.find(
      (c: ColumnType) => c.id === props.task.taskState
    );
    // Delete task
    deleteColumn.tasks.splice(props.index, 1);
    localStorage.setItem("tasks", JSON.stringify(storageColumns));
    props.setUpdate((update) => !update);
  };

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
      <Text maxW="16.5rem" fontSize="1.1em">
        {props.task.details}
      </Text>
      <Divider orientation="vertical" />
      <Box minW="max-content">
        <IconButton
          colorScheme="red"
          aria-label="delete-task"
          icon={<DeleteIcon />}
          mr={2}
          onClick={handleDelete}
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
