import { TaskProps } from "./tasksType"

// TasksKanbanProps
export interface TasksKanbanProps{
    id:string,
    name:string,
    description?:string
    subTasks?: TaskProps[]
}

//ColumnKanbanProps
export interface ColumnsProps{
    idColumn:string;
    titleColumn:string;
    tasks:TasksKanbanProps[];
    setTask:(tasks:TasksKanbanProps[]) => void  
}

export interface ColumnsKanbanProps{
    columns:ColumnsProps[]
}

// CardKanbanProps
export interface CardKanbanProps{
    index:number,
    task:TasksKanbanProps,
    tasks:TasksKanbanProps[],
    setTask: (task: TasksKanbanProps[]) => void,
}