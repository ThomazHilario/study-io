// React
import { useState } from "react"

// React-dnd
import { Draggable } from "@hello-pangea/dnd"

// radix-ui
import * as DialogAlert from '@radix-ui/react-alert-dialog'

// lucide-React
import { X } from "lucide-react"

// Interface
import { CardKanbanProps } from "../interfaces/kanbanTypes"

export const CardKanban = ({index, task, tasks, setTask}:CardKanbanProps) => {

    // state - isEdit
    const [isEditTask, setIsEditTask] = useState<boolean>(false)

    // handleDeleteTask
    function handleDeleteTask(){
        setTask(tasks.filter(taskArray => taskArray.id !== task.id))
    }

   return(
        <Draggable draggableId={task.id} index={index}>
            {(provider) => 
                (
                    <article 
                        ref={provider.innerRef} 
                        {...provider.dragHandleProps} 
                        {...provider.draggableProps} 
                        className={`cursor-grab w-full p-1 rounded-md bg-gray-700 border-2 border-transparent hover:border-cyan-400 mt-2`}
                    >

                        <DialogAlert.Root>
                            <DialogAlert.Trigger asChild>
                                <h1>
                                    {task.name}  
                                </h1>   
                            </DialogAlert.Trigger>  

                            <DialogAlert.Portal>

                                {/* Overlay */}
                                <DialogAlert.Overlay className="fixed inset-0 bg-black/50"/>

                                {/* Content Dialog */}
                                <DialogAlert.Content className="absolute top-1/2 left-[37%] text-white">
                                    <section className="bg-gray-700 px-5 pb-2 rounded-sm w-[30vw]">
                                        <DialogAlert.Cancel className="absolute bg-gray-800 rounded-sm right-0 p-1">
                                            <X color="white" size={20}/>
                                        </DialogAlert.Cancel>

                                        <article className="pt-10">
                                            {isEditTask ? (
                                                <form className="w-full">
                                                    <textarea className="p-2 w-full resize-none bg-black/40"/>
                                                </form>
                                            ):(
                                                <p className="bg-black/30 p-2 px-5 rounded-sm">
                                                    {task.name}
                                                </p>
                                            )}
                                        </article>

                                        {/* Buttons */}
                                        <div className="flex justify-between mt-5">
                                            <button className="bg-green-500 h-8 w-20 rounded-sm" onClick={() => setIsEditTask(!isEditTask)}>Editar</button>

                                            <DialogAlert.Cancel className='bg-red-500 h-8 w-20  rounded-sm' onClick={!isEditTask ? handleDeleteTask : () => setIsEditTask(false)}>
                                                {isEditTask ? 'Cancelar' : 'Delete'}
                                            </DialogAlert.Cancel>
                                        </div>

                                    </section>
                                </DialogAlert.Content>
                            </DialogAlert.Portal>
                        </DialogAlert.Root>          
                    </article>
                )
            }
        </Draggable>
   ) 
}