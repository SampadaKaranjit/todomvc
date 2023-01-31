export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  tags?: string[];
}

export interface TodoTag {
  todoId: string;
  tagName: string;
}
