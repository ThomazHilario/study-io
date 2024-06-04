import { Droppable } from "@hello-pangea/dnd"

import { CardKanban } from "./CardKanban"

// Interfaces
import { ColumnsKanbanProps } from "../interfaces/kanbanTypes"

export const ColumnsKanban = ({task, setTask, devTask, setDevTask, pauseTask, setPauseTask, completeTask, setCompleteTask}:ColumnsKanbanProps) => {
    return(
        <div className="flex gap-2 justify-around">
            <Droppable droppableId="fazer" direction="vertical">
                {(provider) => {
                    return(
                        <div ref={provider.innerRef} {...provider.droppableProps} className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Tarefas a fazer:</h1>

                            {task.map((taskUser,index) => <CardKanban key={index} index={index} task={taskUser} />)}

                            {provider.placeholder}
                        </div>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="desenvolvendo" direction="horizontal">
                {(provider) => {
                    return(
                        <div ref={provider.innerRef} {...provider.droppableProps} className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Em desenvolvendo:</h1>

                            {provider.placeholder}
                        </div>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="pausado" direction="horizontal">
                {(provider) => {
                    return(
                        <div 
                        ref={provider.innerRef} 
                        {...provider.droppableProps} 
                        className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Pausado:</h1>

                            {provider.placeholder}
                        </div>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="concluido" direction="horizontal">
                {(provider) => {
                    return(
                        <div ref={provider.innerRef} {...provider.droppableProps} className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Concluido:</h1>

                            {provider.placeholder}
                        </div>    
                    )   
                }}
            </Droppable>
        </div>
    )
}