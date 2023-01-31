import FilterSection from "../../filter/FilterSection";
import { TodoList } from "./TodoList/TodoList";

const MainTodoSection = () => {
  return (
    <>
      <TodoList />
      <FilterSection />
    </>
  );
};

export default MainTodoSection;
