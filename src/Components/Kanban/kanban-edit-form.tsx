// React hook form
import { useForm } from 'react-hook-form'

// zod and zodResolver
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"


// Interfaces
import { FormEditKanbanProps } from '@/interfaces/Kanban/Form-Edit-Kanban'

// interface from schema
interface SchemaProps{
    newTask:string,
    description?:string
}

// schema
const schema = z.object({
    newTask:z.string().min(1, 'Preencha o campo'),
    description:z.string()
}).required({
    newTask:true
})

export const KanbanEditForm = ({task, setTask, allTasks, setIsEditTask}:FormEditKanbanProps) => {

    // Desestruturando o useForm
    const { register, handleSubmit, formState:{errors} } = useForm<SchemaProps>({
        resolver:zodResolver(schema),
        defaultValues:{
            newTask:task.name,
            description:task.description
        }
    })

    // handleEditTask
    function handleEditTask(data:SchemaProps){
        // Title editing
        task.name = data.newTask

        // Description editing
        task.description = data.description

        // Setando alteraçõs na state tasks
        setTask([...allTasks])

        // Alterando o valor da state isEditTask
        setIsEditTask(false)
    }

    // Tailwind style
    const containerInputs = `flex flex-col gap-2 mb-4`
    const textAreaTailwindStyle = `p-2 w-full resize-none bg-black/40 outline-none rounded-sm`
    const textAreaErrorTailwindStyle = errors.newTask && 'border-2 border-red-500'

    return(
        <form 
            className="w-full" 
            onSubmit={handleSubmit(handleEditTask)}
        >

            <div className={containerInputs}>
                {/* Title Label */}
                <label htmlFor="iTitle">Title:</label>

                <textarea id='iTitle' className={`${textAreaTailwindStyle} 
                ${textAreaErrorTailwindStyle}`} 
                {...register("newTask")} />
            </div>

            <div className={containerInputs}>
                {/* Title Label */}
                <label htmlFor="iDescription">Description:</label>

                {/* Text Area */}
                <textarea id='iDescription' className={`
                ${textAreaTailwindStyle}`} 
                {...register("description")} />
            </div>

            <button className="bg-slate-800 px-2 py-1 rounded-sm">Editar tarefa</button>
        </form>
    )
}