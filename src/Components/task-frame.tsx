// import react
import { ChangeEvent, FormEvent, useState, useEffect } from "react"

// import lucide-icons
import { CircleFadingPlus, MenuIcon } from 'lucide-react'

// import dialog
import * as Dialog from '@radix-ui/react-dialog'

export default function TaskFrame(){

    // state - taskText
    const [taskText, setTaskText] = useState<string>('')

    // state - task
    const [task, setTask] = useState<string[]>([])

    // addTask
    function addTask(e:FormEvent){
        // Cancelado evento do formulario
        e.preventDefault()

        if(taskText !== ''){
            // Adicionando task ao state task
            setTask([...task,taskText])

            // Limpando state
            setTaskText('')
        }
    }

    // taskComplete
    function taskComplete(e:ChangeEvent){
        if(e.target instanceof HTMLInputElement){
            if(e.target.checked === true){
                e.target.nextElementSibling?.classList.add('line-through')
            } else{
                e.target.nextElementSibling?.classList.remove('line-through')
            }

        }
    }

    // deleteTask
    function deleteTask(idx:number){

        setTask(task.filter((item, index) => index !== idx && item))
    }

    return(
        <div className="bg-slate-600 py-3 px-5 rounded-sm text-white cursor-default">
            <form className="flex items-center gap-2">
                <input className="w-[300px] h-7 rounded-sm outline-none pl-2 font-syste bg-black/10" type="text" value={taskText} placeholder='Add task' onChange={(e) => setTaskText(e.target.value)} />

                <button onClick={addTask}><CircleFadingPlus color="white"/></button>
            </form>

            {/* minhas tarefas*/}
            {task.length > 0 &&(
                <ul className="mt-3 flex flex-col gap-2">
                    {task.map((item, idx) => {
                        return(
                            <li key={idx} className="group flex gap-4 border-2 py-1 px-2 rounded-md w-[330px]">
                                <div className="flex items-center gap-2">
                                    <input className="min-h-4 min-w-4" type="checkbox" onChange={taskComplete}/>
                                    <span className="text-justify whitespace-break-spaces">{item}</span>
                                </div>

                                <div className="w-7">
                                    <Dialog.Root>
                                        <Dialog.Trigger>
                                            <MenuIcon className="hidden group-hover:block cursor-pointer" size={15}/>
                                        </Dialog.Trigger>

                                        
                                        <Dialog.Content className="absolute -right-5">
                                            <div className="bg-slate-800 w-32 flex flex-col">
                                                <button className="py-2 px-2">Edit</button>
                                                <Dialog.Close className="py-2 px-2" onClick={() => deleteTask(idx)}>
                                                    Delete
                                                </Dialog.Close>
                                            </div>
                                        </Dialog.Content>
                                        
                                    </Dialog.Root>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}