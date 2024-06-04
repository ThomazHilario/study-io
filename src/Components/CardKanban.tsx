// React-dnd
import { useState } from "react"

// import useDrag
import { useDrag } from "react-dnd"

// Interface CardKanbanProps
interface CardKanbanProps{
    text:string
}

export const CardKanban = ({text}:CardKanbanProps) => {

    const [{isDragging}, dragRef] = useDrag({
        type:'box',
        item:text,
        collect:(monitor) => ({ 
            isDragging:monitor.isDragging(),  
        })
    })

   return(
        <div ref={dragRef} className={`cursor-pointer w-[200px] p-1 rounded-md ${isDragging ? 'bg-gray-700/10' : 'bg-gray-700'} border-2 border-transparent hover:border-cyan-400`}>{text}</div>
   ) 
}