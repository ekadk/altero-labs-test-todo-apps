import { TodoItem } from "@/store/todos-store";
import Image from "next/image";
import { Button } from "./ui/button";

export const TodoListItem = ({
  task,
  markTask,
  deleteTask,
}: {
  task: TodoItem;
  markTask: (id: string) => void;
  deleteTask: (id: string) => void;
}) => {
  return (
    <li className="border-b-[0.5px] flex items-center h-[3rem] px-[1.25rem] border-b-[var(--very-light-grayish-blue)] gap-3 text-xs">
      <span>
        <button
          className={`relative rounded-full h-5 w-5 aspect-square border border-[var(--very-light-grayish-blue)] hover:bg-gradient-to-br hover:from-[var(--gradient-a)] hover:to-[var(--gradient-b)] inline-flex justify-center p-0.5 ${
            task.completed &&
            "bg-gradient-to-br from-[var(--gradient-a)] to-[var(--gradient-b)]"
          }`}
          onClick={() => markTask(task.id)}
        >
          <div
            className={`w-full h-full rounded-full flex items-center justify-center ${
              task.completed ? "bg-transparent" : "bg-white"
            }`}
          >
            <Image
              src="/icon-check.svg"
              height={8}
              width={8}
              alt=""
              className="leading-none"
            />
          </div>
        </button>
      </span>
      <p
        className={`w-full truncate leading-none ${
          task.completed && "line-through text-[var(--dark-grayish-blue)]"
        }`}
      >
        {task.task}
      </p>
      <Button onClick={() => deleteTask(task.id)}>
        <span>
          <Image src="/icon-cross.svg" height={16} width={16} alt="" />
        </span>
      </Button>
    </li>
  );
};
