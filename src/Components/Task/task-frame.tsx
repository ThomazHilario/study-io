// import react
import { FormEvent, useState, useEffect, memo } from "react";

// import lucide-icons
import { MinusIcon, PlusIcon } from "lucide-react";

// import Context
import { UseMyContext } from "@/Context/context";

// store
import { user } from "@/Store/store";

// firebase
import { database } from "@/Services/FirebaseConnection";
import { doc, updateDoc, getDoc } from "firebase/firestore";

// Components
import { Task } from "./task";
import { ActiveDrag } from "@/Components/UI/active-drag";

// import interface
import {
  TaskFrameProps,
  TaskSchemaProps,
  taskSchema,
} from "@/interfaces/tasksType";
import { TaskProps } from "@/interfaces/tasksType";

// utils
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  Drag,
  useDrag,
} from "@/Components/commons";
import { TaskButton } from "./TaskButton";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function TaskFrame({ task, setTask }: TaskFrameProps) {
  const { isDragging, updateCheckedValue } = useDrag({
    key: "isDragginTaskFrame",
  });
  // Context
  const { setIsTask } = UseMyContext();

  const { control, register, reset, handleSubmit } = useForm<TaskSchemaProps>({
    resolver: zodResolver(taskSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  // store
  const userData = user((state) => state.user);

  // state - isAddTask
  const [isAddTask, setIsAddTask] = useState<boolean>(false);

  // state - isEditTask
  const [isEditTask, setIsEditTask] = useState<boolean>(false);

  // state - editTaskText
  const [editTaskText, setEditTaskText] = useState<string>("");

  // state - editIndex
  const [editId, setEditId] = useState<string | null>(null);

  // state - seach
  const [seach, setSeach] = useState("");

  // taskFilterList
  const taskFilterList =
    seach !== ""
      ? fields.filter((task) =>
          task.name.toLowerCase().includes(seach.toLowerCase()),
        )
      : fields;

  useEffect(() => {
    // Buscando task
    async function loadTask() {
      try {
        // docRef
        const docRef = doc(database, "users", userData?.id as string);

        // Buscando task
        const data = await getDoc(docRef);

        if (data.exists()) {
          // Setando as task do banco de dados na state task
          setTask(data.data().task);
        }
      } catch (error) {
        console.log(error);
      }
    }

    // Executando loadTask
    loadTask();
  }, []);
  console.log(taskFilterList);
  // updateTaskDataBase
  async function updateTaskDataBase(taskArray: TaskProps[]) {
    try {
      // Refenrencia do banco de dados do usuario
      const docRef = doc(database, "users", userData?.id as string);

      // Atualizando as tasks no banco de dados
      await updateDoc(docRef, {
        task: taskArray,
      });
    } catch (e) {
      console.log(e);
    }
  }

  // addTask
  function addTask({ name }: TaskSchemaProps) {
    // Alterando o valor do isAddTask
    setIsAddTask(!isAddTask);

    // Estrutura da task.
    const taskCreated = {
      id: crypto.randomUUID(),
      name: name,
      checked: false,
    };

    // Adicionando task ao state task
    append([...task, taskCreated]);

    // Atualizando a coleção de tasks no banco de dados do usuário
    updateTaskDataBase([...task, taskCreated]);

    reset({ name: "" });
  }

  // taskComplete
  function taskComplete(taskValue: TaskProps) {
    // Alterando o valor do checked da task.
    taskValue.checked === false
      ? (taskValue.checked = true)
      : (taskValue.checked = false);

    // Setando alterações na state task.
    setTask([...task]);

    // Salvando as alterações no banco de dados.
    updateTaskDataBase([...task]);
  }

  // deleteTask
  function deleteTask(idx: number) {
    remove(idx);
  }

  // activeEdit
  function activeEdit(id: string) {
    // Buscando a task do array de task
    const taskForEditing = task.find((task) => task.id === id) as TaskProps;

    // Alterando o valor da state isEditask
    setIsEditTask(!isEditTask);

    // state editTaskText recebe o valor da task no qual sera editada
    setEditTaskText(taskForEditing.name);

    // Passando o index para a state editIndex
    setEditId(id);
  }

  // editTask
  function editingTask() {
    // Buscando tarefa
    const taskEditing = task.find((task) => task.id === editId) as TaskProps;

    // Editando tarefa especifica
    taskEditing.name = editTaskText;

    // Setando as alterações da state
    setTask([...task]);

    // Atualizando a coleção de tasks no banco de dados do usuário
    updateTaskDataBase([...task]);

    // Alterando valor boleano da state isEditTask
    setIsEditTask(!isEditTask);

    // Limpando state de edição
    setEditTaskText("");

    // Alterando index
    setEditId(null);
  }

  // cancelTask
  function cancelTask() {
    // Alterando o valor da state isAddTask
    setIsAddTask(false);

    // Limpando input caso esteja com algum valor
    reset({ name: "" });
  }

  // isTaskEmptyAndEditIsFalse
  const isTaskEmptyAndEditIsFalse = !isEditTask && taskFilterList.length > 0;

  // isAddTaskAndEditTaskisFalse
  const isAddTaskAndEditTaskisFalse = !isAddTask && !isEditTask;

  // numberOfTaskIsGreaterThanFour
  const numberOfTaskIsGreaterThanFour = task.length > 4 && !isEditTask;

  return (
    <Drag
      isDragging={isDragging}
      nameDragComponent="TaskFrameDrag"
      positionXDefault={10}
      positionYDefault={65}
    >
      <section className="bg-[#0f1117]/95 rounded-xl text-white cursor-default w-[330px]">
        <DialogHeader className="mb-2 cursor-pointer">
          <ActiveDrag
            checkedValue={isDragging}
            updateCheckedValue={updateCheckedValue}
          />

          <MinusIcon
            className="cursor-pointer"
            color="white"
            onClick={() => setIsTask(false)}
          />
        </DialogHeader>

        <DialogBody className="min-h-2">
          {/* Seach */}
          {numberOfTaskIsGreaterThanFour && (
            <input
              className="w-full mt-2 outline-none bg-black/20 pl-1 rounded-sm"
              type="text"
              value={seach}
              onChange={(e) => setSeach(e.target.value)}
              placeholder="Seach for task..."
            />
          )}

          {/* minhas tarefas*/}
          {isTaskEmptyAndEditIsFalse && (
            <ul className="mt-3 flex flex-col gap-2">
              {taskFilterList.map((task, idx) => {
                return (
                  <Task
                    key={idx}
                    task={task}
                    handleActiveEdit={() => activeEdit(task.id)}
                    handleDeleteTask={() => deleteTask(idx)}
                    handletTaskComplete={() => taskComplete(task)}
                  />
                );
              })}
            </ul>
          )}
        </DialogBody>

        {/* Form add task */}
        <DialogFooter>
          {isAddTask && (
            <form onSubmit={handleSubmit(addTask)} className="space-y-3">
              <textarea
                className="resize-none bg-black/20 rounded-lg w-full p-2"
                rows={3}
                {...register("name")}
              ></textarea>
              <div className="flex gap-2">
                <TaskButton className="text-center border-2">
                  Adicionar Task
                </TaskButton>

                <TaskButton
                  className="flex-1"
                  type="reset"
                  onClick={cancelTask}
                >
                  Cancelar
                </TaskButton>
              </div>
            </form>
          )}

          {/* Show button add task */}
          {isAddTaskAndEditTaskisFalse && (
            <TaskButton className="gap-2" onClick={() => setIsAddTask(true)}>
              <PlusIcon />
              <span>Nova Tarefa</span>
            </TaskButton>
          )}

          {/* Form edit task */}
          {isEditTask && (
            <section className="flex flex-col gap-2">
              <textarea
                className="resize-none p-1 bg-black/20 outline-none rounded-lg"
                rows={3}
                cols={38}
                value={editTaskText}
                onChange={(e) => setEditTaskText(e.target.value)}
              />

              <div className="flex gap-2">
                <TaskButton onClick={editingTask}>Editar</TaskButton>

                <TaskButton
                  className="flex-1"
                  onClick={() => setIsEditTask(!isEditTask)}
                >
                  Cancelar
                </TaskButton>
              </div>
            </section>
          )}
        </DialogFooter>
      </section>
    </Drag>
  );
}

export default memo(TaskFrame);
