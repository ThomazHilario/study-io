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

            // Realizando requisição para enviar o email
            await fetch('https://send-email-study-io.onrender.com/email', {
                method:'post',
                headers:{
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailForVerification:userData.user?.email,
                    emailForOrganization:`${userData.user?.username.replace(' ','')}study-io@resend.dev`,
                    subject:`Report Bugs in Study-io from ${userData.user?.username}`,
                    html: `
                        <div style={{backgroundColor:'rgb(168, 181, 255)'}}>
                            <h1>Bug: ${data.bugType}</h1>

                            <h2>Explicação do bug encontrado pelo ${userData.user?.username}</h2>
                            <p>${data.explain}</p>
                        </div>
                    `,
                })
            })

            // Resetando valor do campo explain
            reset({
                explain:''
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Font family style for tailwind
    const fontFamilyStyleForTailwind = 'font-roboto text-justify' 

    return(
        <section className='flex flex-col gap-2'>
            <h2 className='font-roboto font-bold'>Você encontrou um problema no Study-io?</h2>

            <p className={fontFamilyStyleForTailwind}>Por favor, descreva o problema que você encontrou. Detalhes adicionais nos ajudarão a resolver a questão de forma mais eficiente.</p>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit(reportBugs)}>
                <div className='flex flex-col gap-2'>
                    <label className={fontFamilyStyleForTailwind}>What is type bug ?</label>

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
                    <label className={fontFamilyStyleForTailwind}>Explain your answer above?</label>

                    <textarea 
                        className={`border-2 rounded-md outline-none bg-black/20 resize-none p-1 rounded-m ${errors.explain ? 'border-red-500 placeholder:text-red-500' : 'border-transparent'}`} 
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