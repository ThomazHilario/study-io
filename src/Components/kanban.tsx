// React-hook-form
import { useForm } from 'react-hook-form'

// zod and zzodResolver
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// SchemaKanbanProps
interface SchemaKanbanProps{
    column:string,
    taskName:string
}

// schema
const schema = z.object({
    column:z.string(),
    taskName:z.string().min(1,'Preencha o campo')
}).required({
    column:true,
    taskName:true
})

// Store
import { user } from '../Store/store'

// Hello pangea
import { DragDropContext } from '@hello-pangea/dnd'

// interface
import { TaskProps } from '../interfaces/kanbanTypes'

// Component
import { ColumnsKanban } from './ColumnKanban'

export const Kanban = () => {

    const { register, handleSubmit, formState:{errors} } = useForm<SchemaKanbanProps>({resolver:zodResolver(schema)})

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

    // handleTaskKanbanSubmit
    function handleTaskKanbanSubmit({ column, taskName }:SchemaKanbanProps){

    }

    // handleDragEnd - mover uma task de uma coluna a outra
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
            <section className="absolute top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[85vw] h-[80vh] bg-black/30 rounded-sm p-3">

                {/* Formulario para a adicionar tarefas ao kanban */}
                <form 
                className='mb-3 flex gap-3 w- text-white' 
                onSubmit={handleSubmit(handleTaskKanbanSubmit)}
                >
                    <select 
                        className='bg-black/40 w-40 rounded-sm outline-none px-2'
                        {...register('column')}
                    >
                        <option value="fazer">Fazer</option>
                        <option value="desenvolvendo">Desenvolvendo</option>
                        <option value="pausado">Pausado</option>
                        <option value="concluido">Concluido</option>
                    </select>

                    <input 
                        type="text" 
                        className={`bg-black/40 ${errors.taskName && 'border-2 border-red-500 placeholder:text-red-500'} px-1 w-full rounded-sm outline-none`}
                        placeholder={errors.taskName ? 'Preencha o campo' : 'Insira uma task...'}
                        {...register('taskName')}
                    />

                    <button className='bg-black/80 w-24 rounded-sm h-7' type='submit'>Send</button>
                </form>

                {/* Colunas do kanban */}
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