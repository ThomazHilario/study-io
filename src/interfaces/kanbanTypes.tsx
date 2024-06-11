// taskProps
export interface TaskProps{
    id:string,
    name:string,
    createIn:string 
}

//ColumnKanbanProps
export interface ColumnsKanbanProps{
    task:TaskProps[],
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
        createIn:string
    }
}