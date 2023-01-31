import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/store/filterSlice";
import todoReducer from "../features/todo/store/todoSlice";

/**
 * Creates a Redux store that holds the complete state tree of the app
 * @param reducers reducer object passed to combineReducer
 */

const reducer = {
  filter: filterReducer,
  todos: todoReducer,
};

export const store = configureStore({ reducer });

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState });
}

export type RootState = ReturnType<typeof store.getState>;
