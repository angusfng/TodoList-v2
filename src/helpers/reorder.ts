import { DraggableLocation } from "react-beautiful-dnd";
import { ColumnType } from "./types";

// Helper function to reorder an item within the same list
// Returns new list
const reorderList = (list: any[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  // Add element at endIndex
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderItems = (
  columns: ColumnType[],
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const current = columns.find((c) => c.id === source.droppableId)!;
  const next = columns.find((c) => c.id === destination.droppableId)!;
  const target = current.tasks[source.index];

  // Moving within same column
  if (source.droppableId === destination.droppableId) {
    const reordered = reorderList(
      current.tasks,
      source.index,
      destination.index
    );
    return columns.map((c) =>
      c.id === destination.droppableId ? { ...c, tasks: reordered } : c
    );
  }

  // Moving to different column
  // Remove from original
  current.tasks.splice(source.index, 1);
  // Insert into next
  target.taskState = destination.droppableId;
  next.tasks.splice(destination.index, 0, target);

  return columns;
};
