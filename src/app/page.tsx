"use client";

import { TodoListItem } from "@/components/list";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/providers/todo-store-provider";
import { Input } from "@/components/ui/input";
import { v4 as uuidV4 } from "uuid";
import { TodoItem } from "@/store/todos-store";

export default function Home() {
  const { filter, tasks, updateFilter, updateTodos } = useTodoStore(
    (state) => state
  );

  const markTask = (taskId: string) => {
    const updatedTask = tasks;
    const index = tasks.findIndex((el) => el.id === taskId);
    const newTodoItem = updatedTask.splice(index, 1)[0];

    if (!newTodoItem.completed) {
      newTodoItem.completed = true;
    } else {
      newTodoItem.completed = false;
    }

    updatedTask.splice(index, 0, newTodoItem);

    updateTodos(updatedTask);
  };

  const deleteTask = (taskId: string) => {
    const updatedTask = tasks;
    const index = tasks.findIndex((el) => el.id === taskId);
    updatedTask.splice(index, 1);
    updateTodos(updatedTask);
  };

  const clearCompletedTask = () => {
    const updatedTask = tasks.filter((el) => !el.completed);
    updateTodos(updatedTask);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      todo: { value: string };
    };

    const newTask: TodoItem = {
      id: uuidV4(),
      task: target.todo.value,
      completed: false,
    };

    const updatedTask = [...tasks, newTask];

    updateTodos(updatedTask);

    target.todo.value = "";
  };

  return (
    <div className="w-full min-h-screen font-josefine-sans">
      <div className="absolute top-0 left-0 z-0 w-full h-[12.5rem]">
        <Image
          src={"/bg-mobile-light.jpg"}
          alt=""
          fill
          className="absolute object-cover md:hidden"
        />
        <Image
          src={"/bg-desktop-light.jpg"}
          alt=""
          fill
          className="absolute object-cover hidden md:block"
        />
      </div>

      {/* HEADER */}
      <div className="relative w-full min-h-screen z-20 max-w-[540px] mx-auto px-6 pt-12">
        <div className="mb-10 flex justify-between items-center h-[22px]">
          <div className="text-[26px] md:text-[40px] leading-none tracking-[0.625rem] font-bold text-white h-[22px] md:h-[36px]">
            TODO
          </div>
          <div className="h-[22px] w-[22px] relative">
            <Image src="/icon-moon.svg" alt="" fill />
          </div>
        </div>

        {/* TODO FORM */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 w-full h-[3rem] md:h-[4rem] bg-white rounded md:rounded-md mb-[1.125rem] px-[1.25rem] text-xs md:text-[18px] max-w-[540px]">
            <span>
              <Button variant="styled" size="icon" type="submit">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-white" />
              </Button>
            </span>
            <span className="w-full">
              <Input
                type="text"
                name="todo"
                required
                placeholder="Create a new todo..."
              />
            </span>
          </div>
        </form>

        {/* TODO LIST */}
        <div className="w-full min-h-12 bg-white rounded shadow-2xl mb-4">
          <ul className="">
            {tasks
              .filter((task) => {
                if (filter === "all") return task;
                if (filter === "active") return !task.completed;
                if (filter === "completed") return task.completed;
              })
              .map((task) => (
                <TodoListItem
                  key={task.id}
                  task={task}
                  markTask={markTask}
                  deleteTask={deleteTask}
                />
              ))}
          </ul>

          <div className="flex items-center h-[3rem] justify-between text-xs px-[1.25rem]">
            <div className="">
              {tasks?.filter((el) => !el.completed).length} items left
            </div>
            <div className="hidden md:flex md:justify-center md:gap-4">
              <Button
                variant={filter === "all" ? "active" : "default"}
                onClick={() => updateFilter("all")}
              >
                All
              </Button>
              <Button
                variant={filter === "active" ? "active" : "default"}
                onClick={() => updateFilter("active")}
              >
                Active
              </Button>
              <Button
                variant={filter === "completed" ? "active" : "default"}
                onClick={() => updateFilter("completed")}
              >
                Complete
              </Button>
            </div>
            <Button onClick={() => clearCompletedTask()}>
              clear completed
            </Button>
          </div>
        </div>
        <div className="md:hidden bg-white flex items-center h-[3rem] justify-center px-[1.25rem] gap-4 rounded shadow-xl text-sm mb-10">
          <Button
            variant={filter === "all" ? "active" : "default"}
            onClick={() => updateFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "active" ? "active" : "default"}
            onClick={() => updateFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={filter === "completed" ? "active" : "default"}
            onClick={() => updateFilter("completed")}
          >
            Complete
          </Button>
        </div>
        <div className="text-center text-sm text-[var(--dark-grayish-blue)]">
          Drag and drop to reorder list
        </div>
      </div>
    </div>
  );
}
