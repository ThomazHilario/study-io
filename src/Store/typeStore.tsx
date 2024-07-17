// TaskProps
import { TaskProps } from "../interfaces/kanbanTypes"
interface UserProps{
    id: string,
    username:string,
    email:string,
    img:unknown,
}

export interface StoreProps{
    user: null | UserProps,
    setUserData: (id:string, username:string, email:string, img:unknown) => void,
    task: TaskProps[],
    setTask: (task:TaskProps[]) => void,
    devTask: TaskProps[],
    setDevTask: (task:TaskProps[]) => void,
    pauseTask: TaskProps[],
    setPauseTask: (task:TaskProps[]) => void,
    completeTask: TaskProps[],
    setCompleteTask: (task:TaskProps[]) => void
}