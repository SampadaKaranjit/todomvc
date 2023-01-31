import { FilterEnum } from "../../../model/filter";
import { FilterState } from "../../filter/store/filterSlice";
import { getCompletedTodos } from "./todoSelectors";
import todoReducer, {
  todoAdded,
  todoUpdated,
  todoDeleted,
  TodoState,
} from "./todoSlice";

describe("todo reducer", () => {
  test("should return the initial state when passed an empty action", () => {
    const initialState = undefined;
    const action = { type: "" };
    const result = todoReducer(initialState, action);
    expect(result).toEqual({ todos: [] });
  });

  test("should add a todo", () => {
    const initialState = undefined;
    const action = todoAdded({
      id: "1",
      title: "Todo 1",
      completed: false,
    });
    let state = todoReducer(initialState, action);
    expect(state).toEqual({
      todos: [{ id: "1", title: "Todo 1", completed: false }],
    });
  });

  test("should remove todo by id", () => {
    const initialState: TodoState = {
      todos: [
        {
          id: "1",
          title: "todo 1",
          completed: false,
          tags: ["home"],
        },
        {
          id: "2",
          title: "todo 2",
          completed: false,
        },
      ],
    };
    const action = todoDeleted("1");
    const state = todoReducer(initialState, action);
    expect(state).toEqual({
      todos: [
        {
          id: "2",
          title: "todo 2",
          completed: false,
        },
      ],
    });
  });

  test("should update a todo", () => {
    const initialState: TodoState = {
      todos: [
        {
          id: "1",
          title: "todo 1",
          completed: false,
          tags: ["home"],
        },
        {
          id: "2",
          title: "todo 2",
          completed: false,
        },
      ],
    };

    const action = todoUpdated({
      id: "1",
      title: "todo 1 edited",
      completed: false,
      tags: ["home", "hobby"],
    });
    const state = todoReducer(initialState, action);
    expect(state).toEqual({
      todos: [
        {
          id: "1",
          title: "todo 1 edited",
          completed: false,
          tags: ["home", "hobby"],
        },
        {
          id: "2",
          title: "todo 2",
          completed: false,
        },
      ],
    });
  });
});

describe("selectors", () => {
  describe("getCompletedTodos", () => {
    it("should return completed todo/s", () => {
      const todoState: TodoState = {
        todos: [
          {
            id: "1",
            title: "todo 1",
            completed: false,
            tags: ["home"],
          },
          {
            id: "2",
            title: "todo 2",
            completed: true,
          },
        ],
      };

      const filterState: FilterState = { filter: FilterEnum.COMPLETED };
      const result = getCompletedTodos({
        filter: filterState,
        todos: todoState,
      });
      expect(result).toEqual([{ completed: true, id: "2", title: "todo 2" }]);
    });
  });
});
