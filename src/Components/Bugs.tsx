// React hook form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// Radix-ui
import * as Select from '@radix-ui/react-select'

// store
import { user } from '../Store/store'

// interface BugProps
interface BugProps{
    bugType:string,
    explain:string
}

// Schema
const schema = z.object({
    bugType:z.string(),
    explain:z.string().min(20, "O campo tem que ter no minimo 20 caracteres! Escreva com detalhes o bug acima!")
})

export const Bugs = () => {
    
    // Desestructure useform
    const { register, handleSubmit, formState:{errors}, setValue, reset } = useForm<BugProps>({resolver:zodResolver(schema), defaultValues:{bugType:'Interface'}})

    // Store
    const userData = user(state => state)

    // updateHookValue
    const updateHookValue = (value:string) => setValue('bugType',value)

    // reportBugs
    async function reportBugs(data:BugProps){
        try {

            console.log(data)

            // Resetando valor do campo explain
            reset({
                explain:''
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <section>
            <p>Did you find a bug in studio-io ?, yes, explain to us what bug you found ?</p>

            <form className='flex flex-col gap-2 mt-5' onSubmit={handleSubmit(reportBugs)}>
                <div className='flex flex-col gap-2'>
                    <label>What is type bug ?</label>

                    <Select.Root defaultValue="Interface" onValueChange={updateHookValue}>
                        <Select.Trigger className='text-start bg-black/20 p-1'>
                            <Select.Value />
                        </Select.Trigger>

                        <Select.Content position='popper'
                            className='top-[4.5rem] bg-slate-800 w-[20vw]'
                        >
                            <Select.Item className='cursor-pointer p-1' value="Interface">
                                <Select.ItemText>Interface</Select.ItemText>
                            </Select.Item>
                            <Select.Item className='cursor-pointer p-1' value="Components">
                                <Select.ItemText>Components task, notes...</Select.ItemText>
                            </Select.Item>
                            <Select.Item className='cursor-pointer p-1' value="Other">
                                <Select.ItemText>Other</Select.ItemText>
                            </Select.Item>
                        </Select.Content>
                    </Select.Root>
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Explain your answer above?</label>

                    <textarea 
                        className={`border-2 border-transparent outline-none bg-black/20 resize-none p-1 rounded-m ${errors.explain && 'border-red-500 placeholder:text-red-500'}`} 
                        rows={5}
                        placeholder={`${errors.explain ? errors.explain.message : 'Explain bug in top!'}`}
                        {...register('explain')}
                    />
                </div>

                <button className='mt-1 self-start bg-black/50 p-3 rounded-sm' type='submit'>Send your report</button>
            </form>
        </section>
    )
}