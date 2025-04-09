"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type TodoStore, createTodoStore } from "@/store/todos-store";

export type TodoStoreApi = ReturnType<typeof createTodoStore>;

export const TodoStoreContext = createContext<TodoStoreApi | undefined>(
  undefined
);

export interface TodoStoreProviderProps {
  children: ReactNode;
}

export const TodoStoreProvider = ({ children }: TodoStoreProviderProps) => {
  const storeRef = useRef<TodoStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createTodoStore();
  }

  return (
    <TodoStoreContext.Provider value={storeRef.current}>
      {children}
    </TodoStoreContext.Provider>
  );
};

export const useTodoStore = <T,>(selector: (store: TodoStore) => T): T => {
  const todoStoreContext = useContext(TodoStoreContext);
  if (!todoStoreContext) {
    throw new Error(`useTodoStore must be used within CounterStoreProvider`);
  }
  return useStore(todoStoreContext, selector);
};
