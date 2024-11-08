import { TaskProps } from "./tasksType"

// TasksKanbanProps
export interface TasksKanbanProps{
    id:string,
    name:string,
    description?:string
    subTasks?: TaskProps[]
}

//ColumnKanbanProps
export interface ColumnsKanbanProps{
    tasks:TasksKanbanProps[],
    devTask:TasksKanbanProps[],
    pauseTask:TasksKanbanProps[],
    completeTask:TasksKanbanProps[]
}

// CardKanbanProps
export interface CardKanbanProps{
    index:number,
    task:TasksKanbanProps,
    tasks:TasksKanbanProps[],
    setTask: (task: TasksKanbanProps[]) => void,
}