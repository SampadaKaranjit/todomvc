import { Provider } from "react-redux";
import React from "react";
import { render } from "@testing-library/react";
import { getStoreWithState, RootState } from "./app/store";

export function renderWithContext(
  element: React.ReactElement,
  state?: RootState
) {
  const store = getStoreWithState(state);
  const utils = render(<Provider store={store}></Provider>);
  return { store, ...utils };
}
