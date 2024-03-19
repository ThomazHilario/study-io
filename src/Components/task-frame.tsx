// import react
import { ChangeEvent, FormEvent, useState, useEffect } from "react"

// import lucide-icons
import { CircleFadingPlus, MenuIcon } from 'lucide-react'

// store
import { user } from '../Store/store'

// firebase
import { database } from '../Services/FirebaseConnection'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

// import dialog
import * as Dialog from '@radix-ui/react-dialog'

export default function TaskFrame(){

    // store
    const userData = user(state => state.user)

    // state - taskText
    const [taskText, setTaskText] = useState<string>('')

    // state - task
    const [task, setTask] = useState<string[]>([])

    useEffect(() => {

        // Buscando task
        async function loadTask(){
            try {

                // docRef
                const docRef = doc(database, 'users', userData?.id as string)

                // Buscando task
                const data = await getDoc(docRef)

                if(data.exists()){
                    // Setando as task do banco de dados na state task
                    setTask(data.data().task)
                }
            } catch (error) {
                console.log(error)
            }
        }

        loadTask()
    },[])

    // addTask
    async function addTask(e:FormEvent){
        try {
            // Cancelado evento do formulario
            e.preventDefault()

            if(taskText !== ''){
                // Adicionando task ao state task
                setTask([...task,taskText])

                // docref
                const docRef = doc(database,'users',userData?.id as string)

                // Atualizando array no banco de dados
                await updateDoc(docRef,{
                    task:[...task,taskText]
                })

                // Limpando state
                setTaskText('')
            }
        } catch (error) {
            console.log(error)
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
    async function deleteTask(idx:number){
        try {
            // Filtrando array sem o elemento especifico
            const newTaskList = task.filter((item, index) => index !== idx && item)

            // Salvando na state task a nova lista de task
            setTask(newTaskList)

            // docref
            const docRef = doc(database,'users',userData?.id as string)

            // Atualizando array no banco de dados
            await updateDoc(docRef,{
                task:newTaskList
            })

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="bg-slate-600 py-3 px-5 rounded-sm text-white cursor-default">
            <form className="flex items-center gap-2" onSubmit={addTask}>
                <input className="w-[300px] h-7 rounded-sm outline-none pl-2 font-syste bg-black/10" type="text" value={taskText} placeholder='Add task' onChange={(e) => setTaskText(e.target.value)} />

                <button type="submit"><CircleFadingPlus color="white"/></button>
            </form>

            {/* minhas tarefas*/}
            {task.length > 0 &&(
                <ul className="mt-3 flex flex-col gap-2">
                    {task.map((item, idx) => {
                        return(
                            <li key={idx} className="group flex gap-4 border-2 py-1 px-2 rounded-md w-[330px] justify-between">
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