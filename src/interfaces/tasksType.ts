import { z } from "zod";

// taskProps
export interface TaskProps {
  id: string;
  name: string;
  checked: boolean;
}

// TaskFrameProps
export interface TaskFrameProps {
  task: TaskProps[];
  setTask: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

export const taskSchema = z.object({
  name: z.string().min(1, "Preencha o campo"),
  tasks: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      checked: z.boolean(),
    }),
  ),
});

export type TaskSchemaProps = z.infer<typeof taskSchema>;
