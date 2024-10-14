// taskProps interface
import { TaskProps } from '@/interfaces/tasksType'


// TasksKanbanProps
export interface TasksKanbanProps{
    id:string,
    name:string
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
    task:{
        id:string,
        name:string,
    },
    tasks:TaskProps[],
    setTask: (task: TaskProps[]) => void
}