import { ReactNode } from "react";

export interface UserDataType{
    id:string,
    setId:React.Dispatch<React.SetStateAction<string>>,
    username:string,
    setUsername:React.Dispatch<React.SetStateAction<string>>
}

export interface ChildrenType{
    children:ReactNode
}