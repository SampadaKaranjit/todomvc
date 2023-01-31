import React from "react";
import App from "./App";
import { renderWithContext } from "./test-utils";

test("renders app", () => {
  renderWithContext(<App />);
});
