import { createStore } from "zustand";

export interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

type Filter = "all" | "active" | "completed";

export type TodoState = {
  filter: Filter;
  tasks: TodoItem[];
};

export type TodoAction = {
  updateTodos: (todos: TodoItem[]) => void;
  updateFilter: (newFilter: Filter) => void;
  filteredTodos: () => TodoItem[] | undefined;
};

export type TodoStore = TodoState & TodoAction;

export const defaultInitState: TodoState = {
  filter: "all",
  tasks: [],
};

export const createTodoStore = (initState: TodoState = defaultInitState) => {
  return createStore<TodoStore>()((set) => ({
    ...initState,
    updateTodos(todos) {
      set((state) => ({ ...state, tasks: todos }));
    },
    updateFilter(newFilter) {
      set((state) => ({ ...state, filter: newFilter }));
    },
    filteredTodos() {
      if (this.filter === "all") return this.tasks;
      if (this.filter === "active")
        return this.tasks.filter((task) => !task.completed);
      if (this.filter === "completed")
        return this.tasks.filter((task) => task.completed);
    },
  }));
};
