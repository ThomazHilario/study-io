// React
import { useState } from "react"

// React hook form
import { useForm } from 'react-hook-form'

// zod and zodResolver
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import { SummaryCardkanban } from "./Summary-Card-Kanban"

// interface from schema
interface SchemaProps{
    newTask:string
}

// schema
const schema = z.object({
    newTask:z.string().min(1, 'Preencha o campo')
}).required({
    newTask:true
})

// React-dnd
import { Draggable } from "@hello-pangea/dnd"

// radix-ui
import * as DialogAlert from '@radix-ui/react-alert-dialog'

// lucide-React
import { X } from "lucide-react"

// Interface
import { CardKanbanProps } from "@/interfaces/kanbanTypes"

export const CardKanban = ({index, task, tasks, setTask}:CardKanbanProps) => {

    // Desestruturando o useForm
    const { register, handleSubmit, formState:{errors} } = useForm<SchemaProps>({
        resolver:zodResolver(schema),
        defaultValues:{
            newTask:task.name
        }
    })

    // state - isEdit
    const [isEditTask, setIsEditTask] = useState<boolean>(false)

    // handleEditTask
    function handleEditTask(data:SchemaProps){
        // Editando a task
        task.name = data.newTask

        // Setando alteraçõs na state tasks
        setTask([...tasks])

        // Alterando o valor da state isEditTask
        setIsEditTask(false)
    }

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
                                <DialogAlert.Content className="absolute top-1/2 -translate-y-1/2 left-[37%] text-white">
                                    <section className="bg-gray-700 px-5 pb-2 rounded-sm w-[30vw]">
                                        <DialogAlert.Cancel className="absolute bg-gray-800 rounded-sm right-0 p-1">
                                            <X color="white" size={20} />
                                        </DialogAlert.Cancel>

                                        <section className="pt-10">
                                            {isEditTask ? (
                                                <form 
                                                    className="w-full" 
                                                    onSubmit={handleSubmit(handleEditTask)}
                                                >

                                                    <textarea className={`p-2 w-full resize-none bg-black/40 outline-none rounded-sm ${errors.newTask && 'border-2 border-red-500'}`} 
                                                    {...register("newTask")} />

                                                    <button className="bg-slate-800 px-2 py-1 rounded-sm">Editar tarefa</button>
                                                </form>
                                            ): (
                                                <SummaryCardkanban
                                                    name={task.name}
                                                    description={task.description}
                                                    subTasks={task.subTasks}
                                                />
                                            )}
                                        </section>

                                        {/* Buttons */}
                                        <div className="flex justify-between mt-5">
                                            <button className="bg-green-500 h-8 w-20 rounded-sm" onClick={() => setIsEditTask(!isEditTask)}>{isEditTask ? 'Cancelar' : 'Editar'}</button>

                                            {!isEditTask && (
                                                <DialogAlert.Cancel className='bg-red-500 h-8 w-20  rounded-sm' onClick={handleDeleteTask}>
                                                    Delete
                                                </DialogAlert.Cancel>
                                            )}
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