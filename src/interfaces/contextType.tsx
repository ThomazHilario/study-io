import { ReactNode } from "react";

export interface FullScreenProps{
    isFullscreen: boolean,
    setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>
    resizable:boolean,
    setResizable:React.Dispatch<React.SetStateAction<boolean>>,
    isTask:boolean,
    setIsTask: React.Dispatch<React.SetStateAction<boolean>>,
    isNotes:boolean,
    setIsNotes:React.Dispatch<React.SetStateAction<boolean>>,
    isTimer:boolean,
    setIsTimer:React.Dispatch<React.SetStateAction<boolean>>,
    isThemes:boolean,
    setIsThemes:React.Dispatch<React.SetStateAction<boolean>>,
    isCalendar:boolean,
    setIsCalendar:React.Dispatch<React.SetStateAction<boolean>>,
    isKanban:boolean,
    setIsKanban:React.Dispatch<React.SetStateAction<boolean>>,
    isLogged:boolean,
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ChildrenType{
    children:ReactNode
}