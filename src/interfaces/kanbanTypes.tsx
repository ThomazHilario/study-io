// taskProps
export interface TaskProps{
    id:string,
    name:string,
    createIn:string 
}

//ColumnKanbanProps
export interface ColumnsKanbanProps{
    task:TaskProps[],
    setTask:React.Dispatch<React.SetStateAction<TaskProps[]>>,
    devTask:TaskProps[],
    setDevTask:React.Dispatch<React.SetStateAction<TaskProps[]>>,
    pauseTask:TaskProps[],
    setPauseTask:React.Dispatch<React.SetStateAction<TaskProps[]>>,
    completeTask:TaskProps[],
    setCompleteTask: React.Dispatch<React.SetStateAction<TaskProps[]>>
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