// taskProps
export interface TaskProps{
    id:string,
    name:string,
    checked:boolean
}

// TaskFrameProps
export interface TaskFrameProps{
    task:TaskProps[],
    setTask:React.Dispatch<React.SetStateAction<TaskProps[]>>
}