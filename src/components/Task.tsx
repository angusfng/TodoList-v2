import React from "react";
import { Box, Text, ListItem, Heading } from "@chakra-ui/react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";

interface Props {
  task: string;
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
    >
      <Text fontSize="1.5em">{props.task}</Text>
    </ListItem>
  );
};

export default Task;
