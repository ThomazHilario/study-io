import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react'

export const Kanban = () => {

    const [taskKanban, setTaskKanban] = useState([{
        tasl:'fazer tal coisa'
    }])

    function taskDragEnd(result:any){
        console.log(result)
    }

    return(
        
            <div className="absolute flex gap-2 justify-around top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
                <div className="w-[284px] bg-slate-900/95 rounded-md h-min p-2">
                    <p className=" text-white rounded-sm font-system ">Tarefas a fazer:</p>
                    
                    <button className="hover:bg-white/5 text-white w-full text-start mt-2 rounded-md p-1">+ Adicionar Tarefa</button>
                </div>

                <div className="w-[284px] bg-slate-900/95 rounded-md h-min p-2">
                    <p className=" text-white rounded-sm font-system">Em Desenvolvimento:</p>
                    <button className="hover:bg-white/5 text-white w-full text-start mt-2 rounded-md p-1">+ Adicionar Tarefa</button>
                </div>

                <div className="w-[284px] bg-slate-900/95 rounded-md h-min p-2">
                    <p className=" text-white rounded-sm font-system">Pausado:</p>
                    <button className="hover:bg-white/5 text-white w-full text-start mt-2 rounded-md p-1">+ Adicionar Tarefa</button>
                </div>
                <div className="w-[284px] bg-slate-900/95 rounded-md h-min p-2">
                <p className=" text-white rounded-sm font-system">Concluidos:</p>
                <button className="hover:bg-white/5 text-white w-full text-start mt-2 rounded-md p-1">+ Adicionar Tarefa</button>
                </div>
            </div>
          
    )
}