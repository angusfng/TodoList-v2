import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Input, Textarea } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskGroup from "./components/TaskGroup";
import { reorderItems } from "./helpers/reorder";
import { ColumnType } from "./helpers/types";
import { nanoid } from "nanoid";

const App = () => {
  const [taskText, setTaskText] = useState("");
  const [update, setUpdate] = useState(false);
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

  // Get state from localstorage
  useEffect(() => {
    const storageColumns = JSON.parse(localStorage.getItem("tasks")!);
    if (storageColumns) {
      setColumns(storageColumns);
    }
  }, [update]);

  // Dragging a task
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reordered = reorderItems(columns, result.source, result.destination);
    localStorage.setItem("tasks", JSON.stringify(reordered));
    setColumns(reordered);
  };

  // New task
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskText === "") {
      return;
    }
    // Create new task
    const newTask = {
      id: nanoid(),
      details: taskText,
      taskState: "1",
    };
    // Insert new task
    const insertedColumns = [...columns];
    const toDoColumn = insertedColumns.find((c) => c.id === "1")!;
    toDoColumn.tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(insertedColumns));

    setColumns(insertedColumns);
    setTaskText("");
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex
        minHeight="100vh"
        color="gray.600"
        flexWrap="wrap"
        flexDirection="column"
        align="center"
      >
        <Heading as="h1" size="2xl" mt="2%">
          Todo List v2
        </Heading>
        <Flex
          justify="center"
          flexDirection="column"
          align="center"
          mt="1.5rem"
        >
          <Box maxW="40rem" px="1rem" w="100%">
            <form onSubmit={handleSubmit}>
              <Flex align="center" my="1rem">
                <Box>
                  <Textarea
                    onChange={(e) => setTaskText(e.target.value)}
                    value={taskText}
                    placeholder="New task ..."
                    mb="1rem"
                  />
                  <Input type="date" />
                </Box>
                <Button type="submit" w="8rem" ml="1rem" colorScheme="teal">
                  Add task
                </Button>
              </Flex>
            </form>
          </Box>
          <Flex flexWrap="wrap" justifyContent="center">
            {columns.map((col) => (
              <TaskGroup
                key={col.id}
                columnId={col.id}
                title={col.title}
                tasks={col.tasks}
                setUpdate={setUpdate}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </DragDropContext>
  );
};

export default App;
