import React, { useState, useEffect } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskGroup from "./components/TaskGroup";
import { reorderItems } from "./helpers/reorder";
import { ColumnType, TaskType } from "./helpers/types";
import { nanoid } from "nanoid";

const App = () => {
  const [taskText, setTaskText] = useState("");
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "1",
      title: "To do",
      tasks: [],
    },
    {
      id: "2",
      title: "Doing",
      tasks: [],
    },
    {
      id: "3",
      title: "Done",
      tasks: [],
    },
  ]);

  useEffect(() => {
    // Get state from localstorage
    setColumns(JSON.parse(localStorage.getItem("tasks")!));
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reordered = reorderItems(columns, result.source, result.destination);
    localStorage.setItem("tasks", JSON.stringify(reordered));
    setColumns(reordered);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create new task
    const newTask = {
      id: nanoid(),
      details: taskText,
      taskState: "1",
    };
    // Insert new task
    const toDoColumn = columns.find((c) => c.id === "1")!;
    toDoColumn.tasks.push(newTask);
    // Columns format with inserted task
    const inserted = columns.map((c) => {
      if (c.id === "1") {
        return {
          ...c,
          tasks: toDoColumn.tasks,
        };
      }
      return c;
    });
    localStorage.setItem("tasks", JSON.stringify(inserted));
    setColumns(inserted);
    setTaskText("");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex minHeight="100vh" color="gray.600" justify="center" flexWrap="wrap">
        <form onSubmit={handleSubmit}>
          <Flex align="center" my="1rem">
            <Input
              onChange={(e) => setTaskText(e.target.value)}
              value={taskText}
              placeholder="New task ..."
            />
            <Button type="submit" w="10rem" ml="1rem" colorScheme="teal">
              Add task
            </Button>
          </Flex>
        </form>
        <Flex flexWrap="wrap" justifyContent="center">
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
