import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { render } from "./test-utils";
import App from "./App";

afterEach(cleanup);

describe("App", () => {
  test("Add task calls correct function on click", () => {
    render(<App />);
    screen.debug();
  });
});

describe("Task", () => {
  test("Task renders with correct text", () => {});
});
