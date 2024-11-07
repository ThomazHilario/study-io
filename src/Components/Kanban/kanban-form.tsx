// React 
import { useState } from 'react'

// React-hook-form
import { useForm } from 'react-hook-form'

// zod and zodResolver
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// radix-ui
import * as Dialog from '@radix-ui/react-dialog'

// Interface SchemaKanbanProps
interface SchemaKanbanProps{
    column:string,
    taskName:string,
    description?:string,
    subTasks:string[]
}

// schema
const schema = z.object({
    column:z.string(),
    taskName:z.string().min(1,'Preencha o campo'),
    description:z.string().optional(),
    subTasks:z.array(z.string()).optional()
}).required({
    column:true,
    taskName:true
})

// TaskProps
import { TasksKanbanProps } from '@/interfaces/kanbanTypes'

// Interface methodsToAddTaskToKanban
interface methodsToAddTaskToKanban{
    fazer:(task:TasksKanbanProps) => void,
    desenvolvendo:(task:TasksKanbanProps) => void,
    pausado:(task:TasksKanbanProps) => void,
    concluido:(task:TasksKanbanProps) => void
}

// KanbanFormProps
interface KanbanFormProps{
    methodsKanban:methodsToAddTaskToKanban, 
    selectValues:string[]
}

export const KanbanForm = ({methodsKanban, selectValues}:KanbanFormProps) => {

    // Desestruturando o useForm
    const { 
        register, 
        handleSubmit, 
        formState:{errors}, 
        reset, 
        setValue, 
        watch 
    } = useForm<SchemaKanbanProps>({
        resolver:zodResolver(schema), 
        defaultValues:{subTasks:[]}
    })

    // state subTaskName
    const [subTaskName, setSubTaskName] = useState('')

    // Watch input subTasks
    const subTasks = watch('subTasks')

    // handleTaskKanbanSubmit
    function handleTaskKanbanSubmit({ column, taskName }:SchemaKanbanProps){
        // Verificando se o valor do select é igual ao id de uma coluna do kanban.
        if(column in methodsKanban){
            // Adicionando a task na coluna escolhida pelo usuário.
            methodsKanban[column as keyof typeof methodsKanban]({
                id:crypto.randomUUID(),
                name:taskName,
            })

            // Limando o input
            reset({taskName:''})
        }
    }

    // Add new subtasks
    const addSubTask = () => {
        setValue('subTasks', [...subTasks, subTaskName])
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='w-full text-xl text-start text-white bg-slate-900/90 py-1 px-5 rounded-sm mb-3'>
                Create task
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 min-h-80 w-1/2 p-5 rounded-sm'>
                    <form 
                    className='mb-3 gap-3 text-white flex flex-col' 
                    onSubmit={handleSubmit(handleTaskKanbanSubmit)}>
                        
                        {/* Title container */}
                        <div className='flex flex-col gap-2'>

                            {/* Label */}
                            <label htmlFor='itask'>Title for task:</label>

                            {/* Input */}
                            <input 
                                type="text"
                                id='itask' 
                                className={`bg-black/40 ${errors.taskName && 'border-2 border-red-500 placeholder:text-red-500'} p-2 w-full rounded-sm outline-none`}
                                placeholder={errors.taskName ? 'Preencha o campo' : 'Title for task...'}
                                {...register('taskName')}
                            />
                        </div>

                        {/* Select container */}
                        <div className='flex flex-col gap-2'>

                            {/* Label */}
                            <label htmlFor='iSelect'>Select column for task:</label>

                            {/* Select */}
                            <select 
                            id='iSelect'
                            className='cursor-pointer bg-black/40 p-2 rounded-sm outline-none px-2'
                            {...register('column')}>

                                {selectValues.map((value, idx) => (
                                    <option
                                        className="bg-zinc-900" 
                                        key={idx} 
                                        value={value}
                                    >
                                            {value.replace(value[0], value[0].toUpperCase())}
                                    </option>
                                ))}

                            </select>
                        </div>

                        {/* Description container */}
                        <div className='flex flex-col gap-2'>

                            {/* Label */}
                            <label htmlFor='iDescription'>Description (Optional) :</label>

                            {/* TextAreat */}
                            <textarea className='resize-none bg-black/40 h-36 p-1 rounded-sm outline-none' {...register('description')}/>

                        </div>

                        {/* SubTasks Container */}
                        <div className='flex flex-col gap-2'>
                             
                             {/* Label */}
                             <label htmlFor='iSubTask'>Tasks Additional (Optional) :</label>

                             {/* Input */}
                             <input
                                type='text'
                                id='iSubTask'
                                className='bg-black/40 p-2 w-full rounded-sm outline-none'
                                value={subTaskName}
                                onChange={(e) => setSubTaskName(e.target.value)}
                                placeholder='Name for task'
                             />

                            {/* Add subTask */}
                            <button 
                            type='button' 
                            className='max-w-32 bg-slate-900 p-2 rounded-sm' 
                            onClick={addSubTask}>Add subTask</button>

                            {/* section render sub tasks */}
                            {subTasks.length > 0 && <ul className='overflow-y-scroll h-20'>
                                {subTasks.map((task, index) => (
                                    <div key={index}>{task}</div>
                                ))}
                            </ul>}
                        </div>

                        <button className='bg-black/80 w-24 rounded-sm h-7' type='submit'>Send</button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>    
        </Dialog.Root>
    )
}