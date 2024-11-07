interface Task{
    id:string,
    name:string,
    isChecked:boolean
}

// TasksKanbanProps
export interface TasksKanbanProps{
    id:string,
    name:string,
    description?:string
    tasks?: Task[]
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