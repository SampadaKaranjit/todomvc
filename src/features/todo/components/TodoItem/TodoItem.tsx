import { FC, useState } from "react";
import classNames from "classnames";
import { Todo } from "../../../../model/todo";
import TodoModal from "../TodoInput/TodoModal";
import { useDispatch } from "react-redux";
import { todoUpdated, todoTagDeleted } from "../../store/todoSlice";
import TagItem from "../TagItem/TagItem";

type TodoItemProps = {
  todo: Todo;
  onDestroy: (id: string) => void;
  onToggle: (todo: Todo) => void;
};

const TodoItem: FC<TodoItemProps> = ({ todo, onDestroy, onToggle }) => {
  const [editing, setEditing] = useState(false);

  const { completed, tags } = todo;

  const dispatch = useDispatch();

  const handleCompleted = () => {
    onToggle({ ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    onDestroy(todo.id);
  };

  const handleDeleteTag = (tag: string) =>
    dispatch(todoTagDeleted({ tagName: tag, todoId: todo.id }));

  const handleSubmit = (updated: Todo) => {
    dispatch(todoUpdated(updated));
  };

  const handleClose = () => setEditing(false);
  const handleShow = () => setEditing(true);

  return (
    <div
      onDoubleClick={(e) => {
        handleShow();
      }}
    >
      <li
        className={classNames({ completed, editing })}
        data-testid="todo-item"
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompleted}
          />
          <label data-testid="todo-name">{todo.title}</label>
          <div className="badge-container">
            {tags &&
              tags.map((tag, index) => (
                <TagItem key={index} tag={tag} onDestroy={handleDeleteTag} />
              ))}
          </div>
          <button
            className="destroy"
            onClick={handleDelete}
            data-testid="todo-remove"
          />
        </div>
        <TodoModal
          onHide={handleClose}
          showModal={editing}
          onSave={handleSubmit}
          currentTodo={todo}
        />
      </li>
    </div>
  );
};

export default TodoItem;
