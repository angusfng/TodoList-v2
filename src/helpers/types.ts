export type TaskType = {
  id: string;
  details: string;
  taskState: string;
};

export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};
