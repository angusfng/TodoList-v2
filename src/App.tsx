import React, { useState } from "react";
import {
  Flex,
  Heading,
  Box,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Task from "./components/Task";
import TaskGroup from "./components/TaskGroup";
import { reorderItems } from "./helpers/reorder";
import { ColumnsType } from "./helpers/types";

const App = () => {
  const [columns, setColumns] = useState<ColumnsType>([
    {
      id: "1",
      title: "To do",
      tasks: ["a", "b", "c"],
    },
    {
      id: "2",
      title: "Doing",
      tasks: ["d", "e"],
    },
    {
      id: "3",
      title: "Done",
      tasks: [],
    },
  ]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    console.log(result);
    setColumns(reorderItems(columns, result.source, result.destination));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex minHeight="100vh" color="gray.600" justify="center" flexWrap="wrap">
        <Flex>
          {columns.map((col) => (
            <TaskGroup
              key={col.id}
              columnId={col.id}
              title={col.title}
              tasks={col.tasks}
            />
          ))}
        </Flex>
      </Flex>
    </DragDropContext>
  );
};

export default App;
