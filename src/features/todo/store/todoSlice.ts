import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodoTag } from "../../../model/todo";

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const areAllTodosCompleted = (todos: Todo[]) => {
  return (
    todos.length > 0 &&
    todos.filter((todo) => todo.completed).length === todos.length
  );
};

/**
 * Generates action creators and actions types
 * @param initialState Initial state
 * @param reducers object with reducer functions
 */

export const todosSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {
    todoAdded: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },

    todoUpdated: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    },

    todoDeleted: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    todoTagDeleted: (state, action: PayloadAction<TodoTag>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.todoId
          ? {
              ...todo,
              tags: todo.tags?.filter((tag) => tag !== action.payload.tagName),
            }
          : todo
      );
    },

    allTodosCompleted: (state) => {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        ...{ completed: !areAllTodosCompleted(state.todos) },
      }));
    },

    completedTodosCleared: (state) => {
      const completedIds = state.todos
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      state.todos = state.todos.filter(({ id }) => !completedIds.includes(id));
    },

    storeInitializedFromStorage: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  todoAdded,
  todoUpdated,
  todoDeleted,
  todoTagDeleted,
  allTodosCompleted,
  completedTodosCleared,
  storeInitializedFromStorage,
} = todosSlice.actions;

export default todosSlice.reducer;
