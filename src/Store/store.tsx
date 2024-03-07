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
    })
}))