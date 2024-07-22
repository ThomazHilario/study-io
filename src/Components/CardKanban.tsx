// React-dnd
import { Draggable } from "@hello-pangea/dnd"

// radix-ui
import * as DialogAlert from '@radix-ui/react-alert-dialog'

// Interface
import { CardKanbanProps } from "../interfaces/kanbanTypes"

export const CardKanban = ({index, task}:CardKanbanProps) => {

   return(
        <Draggable draggableId={task.id} index={index}>
            {(provider) => 
                (
                    <article 
                        ref={provider.innerRef} 
                        {...provider.dragHandleProps} 
                        {...provider.draggableProps} 
                        className={`cursor-pointer w-full p-1 rounded-md bg-gray-700 border-2 border-transparent hover:border-cyan-400 mt-2`}>
                        <DialogAlert.Root>
                            <DialogAlert.Trigger asChild>
                                <h1>
                                    {task.name}  
                                </h1>   
                            </DialogAlert.Trigger>  

                            <DialogAlert.Portal>
                            <DialogAlert.Overlay className="fixed inset-0 bg-black/50"/>
                                <DialogAlert.Content className="absolute top-1/2 left-[42%] text-white">
                                    <section className="bg-gray-700 px-5 py-2 rounded-sm">
                                        <p className="bg-black/30 p-2 px-5 rounded-sm">{task.name}</p>

                                        <div className="flex justify-between mt-5">
                                            <DialogAlert.Cancel className="bg-gray-800 px-5 py-1 rounded-sm">
                                                Sair
                                            </DialogAlert.Cancel>
                                            <DialogAlert.Cancel className='bg-red-500 px-5 py-1 rounded-sm'>
                                                Delete
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