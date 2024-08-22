// import zustand create
import { create } from "zustand";

// import type Props
import { StoreProps } from "./typeStore";

// import type global state props
import { GlobalStatesProps } from "./typeStore";

export const user = create<StoreProps>((set) => ({
    user:null,
    setUserData: (id:string, username:string, email:string, img:unknown) => set({
        user:{
            id:id,
            username:username,
            email:email,
            img:img
        }
    }),
    task:[],
    setTask:(tasks) => set(({
        task:tasks
    })),

    devTask:[],
    setDevTask:(tasks) => set(({
      devTask:tasks  
    })),

    pauseTask:[],
    setPauseTask:(tasks) => set(({
        pauseTask:tasks
    })),

    completeTask:[],
    setCompleteTask: (tasks) => set(({
        completeTask:tasks
    }))
}))

export const globalStatesComponents = create<GlobalStatesProps>((set) => ({
    isReport:false,
    setIsReport:(value:boolean) => set({
        isReport:value
    })
}))