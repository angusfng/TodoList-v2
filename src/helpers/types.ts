export type Task = {
  id: string;
  details: string;
  completed: boolean;
};

export type ColumnsType = {
  id: string;
  title: string;
  tasks: string[];
}[];
