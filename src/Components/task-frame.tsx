// import react
import { ChangeEvent, FormEvent, useState, useEffect, memo } from "react"

// import lucide-icons
import { MenuIcon } from 'lucide-react'

// import Context
import { UseMyContext } from "../Context/context"

// import rnd
import { Rnd } from "react-rnd"

// import lucide-icons
import { MinusIcon } from "lucide-react"

// store
import { user } from '../Store/store'

// firebase
import { database } from '../Services/FirebaseConnection'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

// import dialog
import * as Dialog from '@radix-ui/react-dialog'

// import interface
import { TaskProps } from '../interfaces/notes-frames-type'
import { DraggableData, DraggableEvent } from "react-draggable"

function TaskFrame({task,setTask}:TaskProps){

    // Context
    const { setIsTask } = UseMyContext()

    // variaveis x e y
    const positionXTaskFrame = localStorage.getItem('TaskFrameDrag') !== null ? JSON.parse(localStorage.getItem('TaskFrameDrag') as string).x : 10

    const positionYTaskFrame = localStorage.getItem('TaskFrameDrag') !== null ? JSON.parse(localStorage.getItem('TaskFrameDrag') as string).y : 65

    // store
    const userData = user(state => state.user)

    // state - taskText
    const [taskText, setTaskText] = useState<string>('')

    // state - isAddTask
    const [isAddTask, setIsAddTask] = useState<boolean>(false)

    // state - isEditTask
    const [isEditTask, setIsEditTask] = useState<boolean>(false)

    // state - editTaskText
    const [editTaskText, setEditTaskText] = useState<string>('')

    // state - editIndex
    const [editIndex, setEditIndex] = useState<number | null>(null)

    // state - seach
    const [seach, setSeach] = useState('')

    // taskFilterList
    const taskFilterList = seach !== '' ? task.filter(item => item.toLowerCase().includes(seach.toLocaleLowerCase())) : task

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

        // Executando loadTask
        loadTask()
    },[])

    // addTask
    async function addTask(e:FormEvent){
        try {
            // Cancelado evento do formulario
            e.preventDefault()

            if(taskText !== ''){
                // Alterando o valor do isAddTask
                setIsAddTask(!isAddTask)

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

    // activeEdit
    function activeEdit(idx:number){

        // Alterando o valor da state isEditask
        setIsEditTask(!isEditTask)

        // state editTaskText recebe o valor da task no qual sera editada
        setEditTaskText(task[idx])

        // Passando o index para a state editIndex
        setEditIndex(idx)
    }

    // editTask
    async function editingTask(){
        try {
            // Editando tarefa especifica
            task[editIndex as number] = editTaskText

            // Setando as alterações da state
            setTask([...task])

            // Referencia com o banco de dados
            const docRef = doc(database, 'users', userData?.id as string)

            // Atualizando as task do banco de dados
            await updateDoc(docRef, {
                task:[...task]
            })

            // Alterando valor boleano da state isEditTask
            setIsEditTask(!isEditTask)

            // Limpando state de edição
            setEditTaskText('')

            // Alterando index
            setEditIndex(null)
        } catch (error) {
            console.log(error)
        }
    }

    // cancelTask
    function cancelTask(){
        // Alterando o valor da state isAddTask
        setIsAddTask(false)

        // Limpando input caso esteja com algum valor
        if(taskText !== ''){
            setTaskText('')
        }
    }

    // savingPositionComponentTask
    function savingPositionComponentTask(mouse:DraggableEvent,position:DraggableData){
        // Salvando valaores x e y na localStorage
        localStorage.setItem('TaskFrameDrag',JSON.stringify({
            mouse,
            x:position.x,
            y:position.y
        }))
    }

    // isTaskEmptyAndEditIsFalse
    const isTaskEmptyAndEditIsFalse = !isEditTask && task.length > 0

    // isAddTaskAndEditTaskisFalse
    const isAddTaskAndEditTaskisFalse = !isAddTask && !isEditTask

    // numberOfTaskIsGreaterThanFour
    const numberOfTaskIsGreaterThanFour = task.length > 4

    return(
        <Rnd bounds="window" 
        enableResizing={false} 
        default={{x:positionXTaskFrame, y:positionYTaskFrame, height:'', width:''}}
        onDragStop={savingPositionComponentTask}>
            <div className="bg-slate-700 py-3 px-2 rounded-sm text-white cursor-default w-[330px]">
                <div className='flex items-center justify-end mb-2'>
                        <MinusIcon className="cursor-pointer" color='white' onClick={() => setIsTask(false)}/>
                </div>

                {isAddTask && (
                    <div>
                        <form onSubmit={addTask}>
                            <textarea className="resize-none bg-black/20 rounded-sm w-full p-2" id="" rows={3} value={taskText} onChange={(e) => setTaskText(e.target.value)}></textarea>
                            <button className="w-full text-center rounded-sm border-2">Adicionar Task</button>
                        </form>
                        <button className="w-full bg-red-500 rounded-sm mt-1" onClick={cancelTask}>Cancelar</button>
                    </div>
                )}
                {isAddTaskAndEditTaskisFalse &&(
                    <button className="text-center w-full border-2 rounded-sm" onClick={() => setIsAddTask(!isAddTask)}>
                        Adicionar Task
                    </button>
                )}

                {/* Seach */}
                {numberOfTaskIsGreaterThanFour && (
                    <input className="w-full mt-2 outline-none bg-black/20 pl-1 rounded-sm" type="text" value={seach} onChange={(e) => setSeach(e.target.value)} placeholder="Seach for task..."/>
                )}

                {/* minhas tarefas*/}
                {isTaskEmptyAndEditIsFalse &&(
                    <ul className="mt-3 flex flex-col gap-2">
                        {taskFilterList.map((item, idx) => {
                            return(
                                <li key={idx} className="group flex gap-4 border-2 py-1 px-2 rounded-md w-full justify-between">
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
                                                    <button className="py-2 px-2" onClick={() => activeEdit(idx)}>Editar</button>
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
                {isEditTask &&(
                    <div className="flex flex-col gap-2">
                        <textarea className="resize-none p-1 bg-black/20 outline-none" rows={3} cols={38} value={editTaskText} onChange={(e) => setEditTaskText((e.target.value))}/>

                        <div className="flex gap-2">
                            <button className="bg-green-500 px-2 rounded-sm" onClick={editingTask}>
                                Editar
                            </button>

                            <button className="bg-slate-800 px-2 rounded-sm" onClick={() => setIsEditTask(!isEditTask)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Rnd>    
    )
}

export default memo(TaskFrame)