// React-dnd
import { useState } from "react"

// Interface CardKanbanProps
interface CardKanbanProps{
    index:number,
    text:string
}

export const CardKanban = ({index, text}:CardKanbanProps) => {

   return(
        <div className={`cursor-pointer w-[200px] p-1 rounded-md bg-gray-700 border-2 border-transparent hover:border-cyan-400`}>{text}</div>
   ) 
}