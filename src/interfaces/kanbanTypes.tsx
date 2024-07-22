// taskProps
export interface TaskProps{
    id:string,
    name:string,
}

//ColumnKanbanProps
export interface ColumnsKanbanProps{
    tasks:TaskProps[],
    devTask:TaskProps[],
    pauseTask:TaskProps[],
    completeTask:TaskProps[]
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