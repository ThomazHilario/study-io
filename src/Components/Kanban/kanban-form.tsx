// React 
import { useState } from 'react'

// React-hook-form
import { useForm } from 'react-hook-form'

// zod and zodResolver
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Components
import { ScrollAreaForm } from '../UI/scroll-area-radix'

// Interfaces
import { TaskProps } from '@/interfaces/tasksType'
import { KanbanFormProps } from '@/interfaces/Kanban/Form-Kanban-Type'

// radix-ui
import * as Dialog from '@radix-ui/react-dialog'

// Lucide 
import { X, Plus } from 'lucide-react'

// SchemaKanbanProps
import { SchemaKanbanProps } from '@/interfaces/Kanban/Form-Kanban-Type'

// schema
const schema = z.object({
    column:z.string(),
    taskName:z.string().min(1,'Preencha o campo'),
    description:z.string().optional(),
    subTasks:z.array(z.object({
        id:z.string().default(crypto.randomUUID()),
        name:z.string(),
        checked:z.boolean()
    })).optional()
}).required({
    column:true,
    taskName:true
})

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
    function handleTaskKanbanSubmit({ column, taskName, description, subTasks }:SchemaKanbanProps){
        // Verificando se o valor do select é igual ao id de uma coluna do kanban.
        if(column in methodsKanban){
            // Adicionando a task na coluna escolhida pelo usuário.
            methodsKanban[column as keyof typeof methodsKanban]({
                id:crypto.randomUUID(),
                name:taskName,
                description,
                subTasks
            })

            // Reset input
            reset({taskName:'', subTasks:[]})

            // Reset state - SubTaskName
            setSubTaskName('')
        }
    }

    // Add new subtasks
    const addSubTask = () => {
        // Case subTaskName not is empty
        if(subTaskName !== ''){
            setValue('subTasks', [...subTasks, {
                id:crypto.randomUUID(),
                name: subTaskName,
                checked:false
            }])
        }

        // Reset state - SubTaskName
        setSubTaskName('')
    }

    // Delete subtask
    const deleteSubTask = (id:string) => {
        setValue('subTasks', subTasks.filter(subTask => subTask.id !== id))
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger className='text-xl text-start text-white bg-slate-900/90 px-3 min-h-12 min-w-12 rounded-full mb-3 flex justify-center items-center gap-3 group'>
                {/* Icon */}
                <Plus/> 

                {/* Text */}
                <p className='hidden text-lg group-hover:block'>Create Task</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 min-h-80 w-1/2 p-5 rounded-sm overflow-hidden'>
                    {/* Dialog Close */}
                    <Dialog.Close className='absolute top-0 right-0 p-1 bg-slate-900'>
                        <X color='white'/>
                    </Dialog.Close>

                    {/* Form */}
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
                            <ScrollAreaForm>
                                {subTasks.length > 0 && (
                                    <ul className='h-20 flex flex-col gap-2'>
                                        {subTasks.map((task, index) => (
                                            <li key={index} className='bg-black/20 p-2 rounded-sm flex items-center justify-between'>

                                                {/* Task name */}
                                                <h1>{task.name}</h1>

                                                {/* Button delete subtask */}
                                                <button 
                                                    type='button' 
                                                    className='flex items-center' 
                                                    onClick={() => deleteSubTask(task.id)}>
                                                        <X size={20}/>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>)
                                }
                            </ScrollAreaForm>
                        </div>

                        
                        {/* Button submit */}
                        <button className='bg-black/40 w-auto rounded-sm h-10' type='submit'>Create Task in Kanban</button>
                        
                    </form>
                </Dialog.Content>
            </Dialog.Portal>    
        </Dialog.Root>
    )
}