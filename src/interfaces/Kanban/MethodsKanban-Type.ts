// Others interfaces
import { TasksKanbanProps } from "../kanbanTypes"

export interface methodsToAddTaskToKanbanProps{
    fazer:(task:TasksKanbanProps) => void,
    desenvolvendo:(task:TasksKanbanProps) => void,
    pausado:(task:TasksKanbanProps) => void,
    concluido:(task:TasksKanbanProps) => void
}