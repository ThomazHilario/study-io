// TasksKanbanProps
export interface TasksKanbanProps{
    id:string,
    name:string,
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