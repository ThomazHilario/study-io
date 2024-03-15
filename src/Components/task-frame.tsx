// import react
import { ChangeEvent, FormEvent, useState } from "react"

// import lucide-icons
import { CircleFadingPlus } from 'lucide-react'

export default function TaskFrame(){

    // state - taskText
    const [taskText, setTaskText] = useState<string>('')

    // state - task
    const [task, setTask] = useState<string[]>([])

    // addTask
    function addTask(e:FormEvent){
        // Cancelado evento do formulario
        e.preventDefault()

        // Adicionando task ao state task
        setTask([...task,taskText])

        // Limpando state
        setTaskText('')
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

    return(
        <div className="bg-slate-600 py-3 px-5 rounded-sm text-white">
            <form className="flex items-center gap-2">
                <input className="w-[300px] h-7 rounded-sm outline-none pl-2 font-syste bg-black/10" type="text" value={taskText} placeholder='Add task' onChange={(e) => setTaskText(e.target.value)} />

                <button onClick={addTask}><CircleFadingPlus color="white"/></button>
            </form>

            {/* minhas tarefas*/}
            {task.length > 0 &&(
                <ul className="mt-3 flex flex-col gap-2">
                    {task.map((item, idx) => {
                        return(
                            <li key={idx} className="border-2 py-1 px-2 rounded-md w-[330px] flex items-center gap-2">
                                <input className="min-h-4 min-w-4" type="checkbox" onChange={taskComplete}/>
                                <span className="text-justify text-wrap break-words tracking-tighter">{item}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}