// Components
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/Components/commons";

// Lucide React
import { MenuIcon } from "lucide-react";

// Task Props
import { TaskProps } from "@/interfaces/tasksType";

// Interface Task Props Componente
interface TaskPropsComponent {
  task: TaskProps;
  handleActiveEdit: () => void;
  handleDeleteTask: () => void;
  handletTaskComplete: () => void;
}

export const Task = ({
  task,
  handleActiveEdit,
  handleDeleteTask,
  handletTaskComplete,
}: TaskPropsComponent) => {
  const inputProps = {
    checked: task.checked,
  };

  return (
    <li className="group flex gap-4 border-2 py-1 px-2 rounded-md w-full justify-between">
      <div className="flex items-center gap-2">
        <input
          className="min-h-4 min-w-4"
          type="checkbox"
          {...inputProps}
          onChange={handletTaskComplete}
        />
        <span
          className={`text-justify whitespace-break-spaces ${task.checked && "line-through"}`}
        >
          {task.name}
        </span>
      </div>

      <section className="w-7">
        <Dialog>
          <DialogTrigger>
            <MenuIcon
              className="hidden group-hover:block cursor-pointer"
              size={15}
            />
          </DialogTrigger>

          <DialogContent className="absolute -right-5">
            <section className="bg-slate-800 w-32 flex flex-col">
              <button className="py-2 px-2" onClick={handleActiveEdit}>
                Editar
              </button>
              <DialogClose className="py-2 px-2" onClick={handleDeleteTask}>
                Delete
              </DialogClose>
            </section>
          </DialogContent>
        </Dialog>
      </section>
    </li>
  );
};
