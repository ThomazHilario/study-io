import { TasksKanbanProps } from "@/interfaces/kanbanTypes"
interface UserProps{
    id: string,
    username:string,
    email:string,
    img:unknown,
}

export interface StoreProps{
    user: null | UserProps,
    setUserData: (id:string, username:string, email:string, img:unknown) => void,
    task: TasksKanbanProps[],
    setTask: (task:TasksKanbanProps[]) => void,
    devTask: TasksKanbanProps[],
    setDevTask: (task:TasksKanbanProps[]) => void,
    pauseTask: TasksKanbanProps[],
    setPauseTask: (task:TasksKanbanProps[]) => void,
    completeTask: TasksKanbanProps[],
    setCompleteTask: (task:TasksKanbanProps[]) => void
}

export interface GlobalStatesProps{
    isReport:boolean;
    setIsReport: (value:boolean) => void;
}