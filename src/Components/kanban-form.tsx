// React-hook-form
import { useForm } from 'react-hook-form'

// zod and zodResolver
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

// TaskProps
import { TaskProps } from '../interfaces/kanbanTypes'

// methodsToAddTaskToKanban
interface methodsToAddTaskToKanban{
    fazer:(task:TaskProps) => void,
    desenvolvendo:(task:TaskProps) => void,
    pausado:(task:TaskProps) => void,
    concluido:(task:TaskProps) => void
}

// KanbanFormProps
interface KanbanFormProps{
    methodsKanban:methodsToAddTaskToKanban, 
    selectValues:string[]
}

export const KanbanForm = ({methodsKanban, selectValues}:KanbanFormProps) => {

    // Desestruturando o useForm
    const { register, handleSubmit, formState:{errors}, reset } = useForm<SchemaKanbanProps>({resolver:zodResolver(schema)})

    // handleTaskKanbanSubmit
    function handleTaskKanbanSubmit({ column, taskName }:SchemaKanbanProps){
        // Verificando se o valor do select é igual ao id de uma coluna do kanban.
        if(column in methodsKanban){
            // Adicionando a task na coluna escolhida pelo usuário.
            methodsKanban[column as keyof typeof methodsKanban]({
                id:crypto.randomUUID(),
                name:taskName
            })

            // Limando o input
            reset({taskName:''})
        }
    }

    return(
        <form 
            className='mb-3 flex gap-3 w- text-white' 
            onSubmit={handleSubmit(handleTaskKanbanSubmit)}
        >
            <select 
                className='bg-black/40 w-40 rounded-sm outline-none px-2'
                {...register('column')}
            >
                {selectValues.map((value, idx) => (
                    <option 
                        key={idx} 
                        value={value}
                    >
                            {value.replace(value[0], value[0].toUpperCase())}
                    </option>
                ))}
            </select>

            <input 
                type="text" 
                className={`bg-black/40 ${errors.taskName && 'border-2 border-red-500 placeholder:text-red-500'} px-1 w-full rounded-sm outline-none`}
                placeholder={errors.taskName ? 'Preencha o campo' : 'Insira uma task...'}
                {...register('taskName')}
            />

            <button className='bg-black/80 w-24 rounded-sm h-7' type='submit'>Send</button>
        </form>
    )
}