import { renderWithContext } from "../../../../test-utils";
import { screen } from "@testing-library/react";
import TodoInput from "./TodoInput";

test("should render a button", () => {
  renderWithContext(<TodoInput />);
  expect(screen.queryByTestId("todo-open")).toBeDefined();
});
