import { Droppable } from "@hello-pangea/dnd"

import { CardKanban } from "./CardKanban"

// Interfaces
import { ColumnsKanbanProps } from "../interfaces/kanbanTypes"

export const ColumnsKanban = ({task, devTask, pauseTask, completeTask}:ColumnsKanbanProps) => {
    return(
        <div className="flex gap-2 justify-around">
            <Droppable droppableId="fazer" direction="vertical">
                {(provider) => {
                    return(
                        <section ref={provider.innerRef} {...provider.droppableProps} className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Tarefas a fazer:</h1>

                            {task.map((taskUser,index) => <CardKanban key={index} index={index} task={taskUser} />)}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="desenvolvendo" direction="vertical">
                {(provider) => {
                    return(
                        <section ref={provider.innerRef} {...provider.droppableProps} className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Em desenvolvendo:</h1>

                            {devTask.length > 0 && devTask.map((task, index) => (
                                <CardKanban key={index} index={index} task={task}/>
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="pausado" direction="vertical">
                {(provider) => {
                    return(
                        <section 
                        ref={provider.innerRef} 
                        {...provider.droppableProps} 
                        className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Pausado:</h1>

                            {pauseTask.length > 0 && pauseTask.map((task, index) => (
                                <CardKanban key={index} index={index} task={task}/>
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="concluido" direction="vertical">
                {(provider) => {
                    return(
                        <section ref={provider.innerRef} {...provider.droppableProps} className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                            <h1 className='mb-2'>Concluido:</h1>

                            {completeTask.length > 0 && completeTask.map((task,index) => (
                                <CardKanban key={index} index={index} task={task}/>
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>
        </div>
    )
}