import { ReactNode } from "react";

export interface UserDataType{
    id:string,
    setId:React.Dispatch<React.SetStateAction<string>>,
    dataUser:object,
    setDataUser:React.Dispatch<React.SetStateAction<object>>
}

export interface ChildrenType{
    children:ReactNode
}