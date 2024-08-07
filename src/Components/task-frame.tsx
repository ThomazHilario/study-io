// import react
import { FormEvent, useState, useEffect, memo } from "react"

// import lucide-icons
import { MinusIcon } from 'lucide-react'

// import Context
import { UseMyContext } from "../Context/context"

// import rnd
import { Rnd } from "react-rnd"

// store
import { user } from '../Store/store'

// firebase
import { database } from '../Services/FirebaseConnection'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

// Components
import { Task } from "./task"

// import interface
import { TaskFrameProps } from '../interfaces/notes-frames-type'
import { TaskProps } from "../interfaces/kanbanTypes"
import { DraggableData, DraggableEvent } from "react-draggable"

function TaskFrame({task,setTask}:TaskFrameProps){

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
    const [editId, setEditId] = useState<string | null>(null)

    // state - seach
    const [seach, setSeach] = useState('')

    // taskFilterList
    const taskFilterList = seach !== '' ? task.filter(task => task.name.toLowerCase().includes(seach.toLowerCase())) : task

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

    // updateTaskDataBase
    async function updateTaskDataBase(taskArray:TaskProps[]){
        try{
            // Refenrencia do banco de dados do usuario
            const docRef = doc(database, 'users', userData?.id as string)

            // Atualizando as tasks no banco de dados
            await updateDoc(docRef, {
                task:taskArray
            })
        }catch(e){
            console.log(e)
        }
    }

    // addTask
    function addTask(e:FormEvent){
        
        // Cancelado evento do formulario
        e.preventDefault()

        if(taskText !== ''){
            // Alterando o valor do isAddTask
            setIsAddTask(!isAddTask)

            // Estrutura da task.
            const taskCreated = {
                id:crypto.randomUUID(),
                name:taskText,
                checked:false
            }

            // Adicionando task ao state task
            setTask([...task, taskCreated])

            // Atualizando a coleção de tasks no banco de dados do usuário
            updateTaskDataBase([...task, taskCreated])

            // Limpando state
            setTaskText('')
        }
    
    }

    // taskComplete
    function taskComplete(taskValue:TaskProps){
        // Alterando o valor do checked da task.
        taskValue.checked === false ? taskValue.checked = true : taskValue.checked = false

        // Setando alterações na state task.
        setTask([...task])

        // Salvando as alterações no banco de dados.
        updateTaskDataBase([...task])
    }

    // deleteTask
    function deleteTask(idx:number){
        
        // Filtrando array sem o elemento especifico
        const newTaskList = task.filter((item, index) => index !== idx && item)

        // Salvando na state task a nova lista de task
        setTask(newTaskList)

        // Atualizando a coleção de tasks no banco de dados do usuário
        updateTaskDataBase(newTaskList)
        
    }

    // activeEdit
    function activeEdit(id:string){

        // Buscando a task do array de task
        const taskForEditing = task.find(task => task.id === id) as TaskProps

        // Alterando o valor da state isEditask
        setIsEditTask(!isEditTask)

        // state editTaskText recebe o valor da task no qual sera editada
        setEditTaskText(taskForEditing.name)

        // Passando o index para a state editIndex
        setEditId(id)
    }

    // editTask
    function editingTask(){
        
        // Buscando tarefa
        const taskEditing = task.find(task => task.id === editId) as TaskProps

        // Editando tarefa especifica
        taskEditing.name = editTaskText

        // Setando as alterações da state
        setTask([...task])

        // Atualizando a coleção de tasks no banco de dados do usuário
        updateTaskDataBase([...task])

        // Alterando valor boleano da state isEditTask
        setIsEditTask(!isEditTask)

        // Limpando state de edição
        setEditTaskText('')

        // Alterando index
        setEditId(null)
        
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
    const numberOfTaskIsGreaterThanFour = task.length > 4 && !isEditTask

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
                    <section>
                        <form onSubmit={addTask}>
                            <textarea className="resize-none bg-black/20 rounded-sm w-full p-2" id="" rows={3} value={taskText} onChange={(e) => setTaskText(e.target.value)}></textarea>
                            <button className="w-full text-center rounded-sm border-2">Adicionar Task</button>
                        </form>
                        <button className="w-full bg-red-500 rounded-sm mt-1" onClick={cancelTask}>Cancelar</button>
                    </section>
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
                        {taskFilterList.map((task, idx) => {
                            return(
                                <Task 
                                    key={idx} 
                                    task={task} 
                                    handleActiveEdit={() => activeEdit(task.id)}
                                    handleDeleteTask={() => deleteTask(idx)}
                                    handletTaskComplete={() => taskComplete(task)}
                                />
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