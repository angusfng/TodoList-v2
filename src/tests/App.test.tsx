import { screen, cleanup } from "@testing-library/react";
import { render } from "../test-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { LocalStorageMock } from "@react-mock/localstorage";

afterEach(cleanup);

test("Typing into the textarea changes text", () => {
  render(<App />);
  const textArea = screen.getByPlaceholderText("New task ...");
  expect(textArea).toBeInTheDocument();
  userEvent.type(textArea, "new todo");
  expect(textArea).toHaveValue("new todo");
});

test("Changing date updates the date", () => {
  render(<App />);
  const dateString = new Date().toISOString().slice(0, 10);
  const dateInput = screen.getByDisplayValue(dateString);
  expect(dateInput).toBeInTheDocument();
  userEvent.type(dateInput, "2021-07-10");
  expect(dateInput).toHaveValue("2021-07-10");
});

test("Clicking add task button adds a task", () => {
  render(<App />);
  const addTaskButton = screen.getByText("Add task");
  expect(addTaskButton).toBeInTheDocument();
  const todoColumn = screen.getByTestId("col-1");
  expect(todoColumn).toBeInTheDocument();
  // Initially empty
  expect(todoColumn).toBeEmptyDOMElement();
  // Empty textarea does not add task
  userEvent.click(addTaskButton);
  // Non empty textarea renders task
  const textArea = screen.getByPlaceholderText("New task ...");
  const dateString = new Date().toISOString().slice(0, 10);
  const dateInput = screen.getByDisplayValue(dateString);
  userEvent.type(textArea, "new todo");
  expect(textArea).toHaveValue("new todo");
  userEvent.type(dateInput, "2021-07-10");
  userEvent.click(addTaskButton);
  expect(todoColumn).not.toBeEmptyDOMElement();
  // Task text changes to ""
  expect(textArea).toHaveValue("");
  // Date gets set to current date
  expect(dateInput).toHaveValue(dateString);
});

test("Localstorage task renders", () => {
  render(
    <LocalStorageMock
      items={{
        tasks: JSON.stringify([
          {
            id: "1",
            title: "To do",
            tasks: [
              {
                id: "FpViM3kqXRcqh69kH7iCD",
                details: "test",
                taskState: "1",
                date: "2021-07-15",
              },
            ],
          },
          { id: "2", title: "Doing", tasks: [] },
          { id: "3", title: "Done", tasks: [] },
        ]),
      }}
    >
      <App />
    </LocalStorageMock>
  );
  const todoColumn = screen.getByTestId("col-1");
  expect(todoColumn).not.toBeEmptyDOMElement();
});

test("Dragging task", () => {
  render(
    <LocalStorageMock
      items={{
        tasks: JSON.stringify([
          {
            id: "1",
            title: "To do",
            tasks: [
              {
                id: "FpViM3kqXRcqh69kH7iCD",
                details: "test",
                taskState: "1",
                date: "2021-07-15",
              },
            ],
          },
          { id: "2", title: "Doing", tasks: [] },
          { id: "3", title: "Done", tasks: [] },
        ]),
      }}
    >
      <App />
    </LocalStorageMock>
  );
  // Focus on the todo
  const todoColumn = screen.getByTestId("col-1");
  expect(todoColumn).not.toBeEmptyDOMElement();
  const todo = screen.getByTestId("FpViM3kqXRcqh69kH7iCD");
  expect(todo).toBeInTheDocument();
  userEvent.tab({ focusTrap: todoColumn });
  expect(todo).toHaveFocus();
  // userEvent.keyboard doesn't exist
});

test("Deleting task", () => {
  render(
    <LocalStorageMock
      items={{
        tasks: JSON.stringify([
          {
            id: "1",
            title: "To do",
            tasks: [
              {
                id: "FpViM3kqXRcqh69kH7iCD",
                details: "test",
                taskState: "1",
                date: "2021-07-15",
              },
            ],
          },
          { id: "2", title: "Doing", tasks: [] },
          { id: "3", title: "Done", tasks: [] },
        ]),
      }}
    >
      <App />
    </LocalStorageMock>
  );
  // Focus on the todo
  const todoColumn = screen.getByTestId("col-1");
  expect(todoColumn).not.toBeEmptyDOMElement();
  const todo = screen.getByTestId("FpViM3kqXRcqh69kH7iCD");
  expect(todo).toBeInTheDocument();
  const deleteTaskButton = screen.getByLabelText("delete-task");
  userEvent.click(deleteTaskButton);
  expect(todoColumn).toBeEmptyDOMElement();
});
// Edit task modal
