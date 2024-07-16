import { useState } from 'react'

import { DragDropContext } from '@hello-pangea/dnd'

// interface
import { TaskProps } from '../interfaces/kanbanTypes'

// Component
import { ColumnsKanban } from './ColumnKanban'

export const Kanban = ( {taskForUser}:{taskForUser:TaskProps[]} ) => {

    const [task, setTask] = useState<TaskProps[]>(taskForUser)

    const [devTask, setDevTask] = useState<TaskProps[]>([])

    const [pauseTask, setPauseTask] = useState<TaskProps[]>([])

    const [completeTask, setCompleteTask] = useState<TaskProps[]>([])

    const destinationObject = {
        fazer:(taskUser:TaskProps):void => {
            setTask([...task, taskUser])
        },
        desenvolvendo:(taskUser:TaskProps):void => {
            setDevTask([...devTask, taskUser])
        },
        pausado:(taskUser:TaskProps):void => {
            setPauseTask([...pauseTask, taskUser])
        },
        concluido:(taskUser:TaskProps):void => {
            setCompleteTask([...completeTask, taskUser])
        }
    }

    function handleDragEnd(e:any){
        if(e.destination !== null){
            if(e.source.droppableId === 'fazer'){
                // Buscado a task do array com base no index do evento
                const taskUser = task.find((task, index) => index === e.source.index && task) as TaskProps

                // Pego o destino / coluna em que a task ira ficar.
                const destino:keyof typeof destinationObject = e.destination.droppableId

                // Verificando se eu estou movendo para uma coluna diferente da que está
                if(e.source.droppableId !== destino){
                    // Retiro a task do array dele.
                    setTask(task.filter((item:TaskProps, index) => index !== e.source.index && item))

                    // de acordo com o destino / coluna, salvo as alterações no novo array.
                    destinationObject[destino](taskUser)
                }
            }

            if(e.source.droppableId === 'desenvolvendo'){
                 // Buscado a task do array com base no index do evento
                 const taskUser = devTask.find((task, index) => index === e.source.index && task) as TaskProps

                 // Pego o destino / coluna em que a task ira ficar.
                 const destino:keyof typeof destinationObject = e.destination.droppableId
 
                 // Verificando se eu estou movendo para uma coluna diferente da que está
                 if(e.source.droppableId !== destino){
                     // Retiro a task do array dele.
                     setDevTask(devTask.filter((task:TaskProps) => task.id !== taskUser.id))
 
                     // de acordo com o destino / coluna, salvo as alterações no novo array.
                     destinationObject[destino](taskUser)
                 }
            }

            if(e.source.droppableId === 'pausado'){
                // Buscado a task do array com base no index do evento
                const taskUser = pauseTask.find((task, index) => index === e.source.index && task) as TaskProps

                // Pego o destino / coluna em que a task ira ficar.
                const destino:keyof typeof destinationObject = e.destination.droppableId

                // Verificando se eu estou movendo para uma coluna diferente da que está
                if(e.source.droppableId !== destino){
                    // Retiro a task do array dele.
                    setPauseTask(pauseTask.filter(task => task.id !== taskUser.id))

                    // de acordo com o destino / coluna, salvo as alterações no novo array.
                    destinationObject[destino](taskUser)
                }
            }

            if(e.source.droppableId === 'concluido'){
                // Buscado a task do array com base no index do evento
                const taskUser = completeTask.find((task, index) => index === e.source.index && task) as TaskProps

                // Pego o destino / coluna em que a task ira ficar.
                const destino:keyof typeof destinationObject = e.destination.droppableId

                // Verificando se eu estou movendo para uma coluna diferente da que está
                if(e.source.droppableId !== destino){
                    // Retiro a task do array dele.
                    setCompleteTask(completeTask.filter(task => task.id !== taskUser.id))

                    // de acordo com o destino / coluna, salvo as alterações no novo array.
                    destinationObject[destino](taskUser)
                }
            }
        }
    }

    return(
        <DragDropContext onDragEnd={handleDragEnd} >
            <section className="absolute top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
                <ColumnsKanban 
                    task={task} 
                    devTask={devTask}
                    pauseTask={pauseTask}
                    completeTask={completeTask}
                />
            </section>
        </DragDropContext>
    )
}

/*
    
            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Tarefas a fazer</h1>
                {task.map((task, index) => <CardKanban key={index} index={index} text={task.name} />)}
            </div>

            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Desenvolvimento</h1>
            </div>

            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Pausado / Cansado</h1>
            </div>

            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Concluido</h1>
            </div>
       
*/