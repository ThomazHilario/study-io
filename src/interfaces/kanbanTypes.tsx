// taskProps
export interface TaskProps{
    id:string,
    name:string,
    checked:boolean
}

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