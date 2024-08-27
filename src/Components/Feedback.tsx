// React hook form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// message error
const minErrorMessage = 'Preencha este campo'

// interface schema
interface SchemaProps{
    likeApp:string,
    explain:string,
    implementText:string
}

// Schema form
const schema = z.object({
    likeApp:z.string().min(1,minErrorMessage),
    explain:z.string().min(1, minErrorMessage),
    implementText:z.string().min(1, minErrorMessage)
}).required({
    likeApp:true,
    explain:true,
    implementText:true
})

export const Feedback = () => {

    // Desestructure useForm
    const { register, handleSubmit, formState:{errors} } = useForm<SchemaProps>({resolver:zodResolver(schema)})

    function Feeback(data:SchemaProps){
        console.log(data)
    }

    // Input style for tailwind
    const inputStyleForTailwind = 'outline-none bg-black/20 resize-none p-1 rounded-md'

    return(
        <section>
            <p>Hello, here you can send your feedback about the study-io app, we are always listening to our users and always improving our app based on your feedback.</p>

            <form action="" className='flex flex-col gap-2 mt-5' onSubmit={handleSubmit(Feeback)}>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="">
                        What did you like most about our app?
                    </label>

                    <input 
                        className={`${inputStyleForTailwind} ${errors.likeApp ? 'border-2 border-red-500' : 'border-0'}`} 
                        type="text" 
                        {...register('likeApp')}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="">
                        Explain your answer above 👆
                    </label>

                    <textarea 
                        className={`${inputStyleForTailwind} ${errors.explain ? 'border-2 border-red-500' : 'border-0'}`} 
                        rows={4} 
                        {...register('explain')}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="">
                        What can we do to improve the study-io even further?
                    </label>

                    <textarea 
                        className={`${inputStyleForTailwind} ${errors.implementText ? 'border-2 border-red-500' : 'border-0'}`} 
                        rows={4} 
                        {...register('implementText')}
                    />
                </div>

                <button className='mt-1 self-start bg-black/50 p-3 rounded-sm'>Send Your feedback</button>
            </form>
        </section>
    )
}