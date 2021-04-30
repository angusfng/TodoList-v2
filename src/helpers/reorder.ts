import { DraggableLocation } from "react-beautiful-dnd";

// Helper function to reorder an item within the same list
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  // Add element at endIndex
  result.splice(endIndex, 0, removed);

  return result;
};
