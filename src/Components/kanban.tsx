import { useState } from 'react'

export const Kanban = () => {

    

    function taskDragEnd(result:any){
        console.log(result)
    }

    return(
        <div className="absolute flex gap-2 justify-around top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
                        
        </div>
    )
}