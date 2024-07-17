// import zustand create
import { create } from "zustand";

// import type Props
import { StoreProps } from "./typeStore";

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
    setTask:(task) => set((state) => ({
        task:[...state.task,task]
    })),

    devTask:[],
    setDevTask:(task) => set((state) => ({
      devTask:[...state.devTask, task]  
    })),

    pauseTask:[],
    setPauseTask:(task) => set((state) => ({
        pauseTask:[...state.pauseTask, task]
    })),

    completeTask:[],
    setCompleteTask: (task) => set((state) => ({
        completeTask:[...state.completeTask, task]
    }))
}))