import { TasksKanbanProps } from '@/interfaces/kanbanTypes'

export interface FormEditKanbanProps{
    task:TasksKanbanProps,
    setTask: (task: TasksKanbanProps[]) => void
    allTasks:TasksKanbanProps[],
    setIsEditTask:React.Dispatch<React.SetStateAction<boolean>>
}