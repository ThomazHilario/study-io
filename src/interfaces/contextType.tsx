import { ReactNode } from "react";

export interface FullScreenProps{
    isFullscreen: boolean,
    setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>
    resizable:boolean,
    setResizable:React.Dispatch<React.SetStateAction<boolean>>,
    isTask:boolean,
    setIsTask: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChildrenType{
    children:ReactNode
}