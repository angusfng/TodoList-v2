import React from "react";
import { Text, ListItem, IconButton, Box, Flex } from "@chakra-ui/react";
import { DraggableProvided } from "react-beautiful-dnd";
import { DeleteIcon } from "@chakra-ui/icons";
import { ColumnType, TaskType } from "../helpers/types";
import EditTaskModal from "./EditTaskModal";

interface Props {
  task: TaskType;
  provided: DraggableProvided;
  index: number;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = (props: Props) => {
  // Handle deleting task
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

  const convertDate = () => {
    const dateObj = new Date(props.task.date);
    return `${dateObj.getDate()}/${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
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
      boxShadow="md"
    >
      <Flex justify="space-between" align="center">
        <Text maxW="16rem" fontSize="1.1em" whiteSpace="pre-wrap">
          {props.task.details}
        </Text>
        <Box textAlign="center">
          <Box minW="max-content">
            <EditTaskModal setUpdate={props.setUpdate} task={props.task} />
            <IconButton
              colorScheme="red"
              aria-label="delete-task"
              icon={<DeleteIcon />}
              onClick={handleDelete}
            />
          </Box>
          <Text mt="0.5rem" fontWeight="semibold">
            {convertDate()}
          </Text>
        </Box>
      </Flex>
    </ListItem>
  );
};

export default Task;
