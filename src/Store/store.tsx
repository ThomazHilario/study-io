// import zustand create
import { create } from "zustand";

// import type Props
import { StoreProps } from "./typeStore";

export const user = create<StoreProps>((set) => ({
    user:null,

    setUserData: (id:string, name:string, email:string, img:unknown) => set({
        user:{
            id:id,
            name:name,
            email:email,
            img:img
        }
    })
}))