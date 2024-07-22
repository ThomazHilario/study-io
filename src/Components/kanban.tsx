// Store
import { user } from '../Store/store'

// Hello pangea
import { DragDropContext } from '@hello-pangea/dnd'

// interface
import { TaskProps } from '../interfaces/kanbanTypes'

// Component
import { ColumnsKanban } from './ColumnKanban'
import { KanbanForm } from './kanban-form'

export const Kanban = () => {

    // Store
    const {
        task, 
        setTask, 
        devTask, 
        setDevTask, 
        pauseTask, 
        setPauseTask, 
        completeTask, 
        setCompleteTask
    } = user(state => state)

    // Destinos das task no quadro
    const methodsToAddTaskToKanban = {
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

    // handleDragEnd - mover uma task de uma coluna a outra
    function handleDragEnd(e:any){
        if(e.destination !== null){
            if(e.source.droppableId === 'fazer'){
                // Buscado a task do array com base no index do evento
                const taskUser = task.find((task, index) => index === e.source.index && task) as TaskProps

                // Pego o destino / coluna em que a task ira ficar.
                const destino:keyof typeof methodsToAddTaskToKanban = e.destination.droppableId

                // Verificando se eu estou movendo para uma coluna diferente da que está
                if(e.source.droppableId !== destino){
                    // Retiro a task do array dele.
                    setTask(task.filter((task:TaskProps) => task.id !== taskUser.id && task))

                    // de acordo com o destino / coluna, salvo as alterações no novo array.
                    methodsToAddTaskToKanban[destino](taskUser)
                }
            }

            if(e.source.droppableId === 'desenvolvendo'){
                 // Buscado a task do array com base no index do evento
                 const taskUser = devTask.find((task, index) => index === e.source.index && task) as TaskProps

                 // Pego o destino / coluna em que a task ira ficar.
                 const destino:keyof typeof methodsToAddTaskToKanban = e.destination.droppableId
 
                 // Verificando se eu estou movendo para uma coluna diferente da que está
                 if(e.source.droppableId !== destino){
                     // Retiro a task do array dele.
                     setDevTask(devTask.filter((task:TaskProps) => task.id !== taskUser.id))
 
                     // de acordo com o destino / coluna, salvo as alterações no novo array.
                     methodsToAddTaskToKanban[destino](taskUser)
                 }
            }

            if(e.source.droppableId === 'pausado'){
                // Buscado a task do array com base no index do evento
                const taskUser = pauseTask.find((task, index) => index === e.source.index && task) as TaskProps

                // Pego o destino / coluna em que a task ira ficar.
                const destino:keyof typeof methodsToAddTaskToKanban = e.destination.droppableId

                // Verificando se eu estou movendo para uma coluna diferente da que está
                if(e.source.droppableId !== destino){
                    // Retiro a task do array dele.
                    setPauseTask(pauseTask.filter(task => task.id !== taskUser.id))

                    // de acordo com o destino / coluna, salvo as alterações no novo array.
                    methodsToAddTaskToKanban[destino](taskUser)
                }
            }

            if(e.source.droppableId === 'concluido'){
                // Buscado a task do array com base no index do evento
                const taskUser = completeTask.find((task, index) => index === e.source.index && task) as TaskProps

                // Pego o destino / coluna em que a task ira ficar.
                const destino:keyof typeof methodsToAddTaskToKanban = e.destination.droppableId

                // Verificando se eu estou movendo para uma coluna diferente da que está
                if(e.source.droppableId !== destino){
                    // Retiro a task do array dele.
                    setCompleteTask(completeTask.filter(task => task.id !== taskUser.id))

                    // de acordo com o destino / coluna, salvo as alterações no novo array.
                    methodsToAddTaskToKanban[destino](taskUser)
                }
            }
        }
    }

    return(
        <DragDropContext onDragEnd={handleDragEnd} >
            <section className="absolute top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[85vw] h-[80vh] bg-black/30 rounded-sm p-3">

                <KanbanForm 
                    methodsKanban={methodsToAddTaskToKanban}
                    selectValues={['fazer', 'desenvolvendo', 'pausado', 'concluido']}
                />

                {/* Colunas do kanban */}
                <ColumnsKanban 
                    tasks={task} 
                    devTask={devTask}
                    pauseTask={pauseTask}
                    completeTask={completeTask}
                />
            </section>
        </DragDropContext>
    )
}