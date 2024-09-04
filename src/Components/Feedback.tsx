// React hook form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// message error
const minErrorMessage = 'Preencha este campo'

// Store - user
import { user } from '../Store/store'

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

    // store - user
    const userData = user(state => state)

    async function Feeback({likeApp, explain, implementText, }:SchemaProps){
        try{
            await fetch('https://send-email-study-io.onrender.com/email', {
                method:'post',
                headers: {
                    "Content-Type": "application/json"
               },
                body:JSON.stringify({
                    email:`${userData.user?.username.replace(' ','')}Study-io@resend.dev`,
                    subject:`Feedback from Study-io - ${userData.user?.username}`,
                    html:`
                        <h2>${likeApp}</h2>
                        <br/>
                        <p>${explain}</p>
                        <br/>
                        <p>${implementText}</p>
                    `
                })
            })
        }catch(e){
            console.log(e)
        }
    }

    // Input style for tailwind
    const inputStyleForTailwind = 'outline-none bg-black/20 resize-none p-1 rounded-md'

    // Font family style for tailwind
    const fontFamilyStyleForTailwind = 'font-roboto text-justify'

    return(
        <section className='flex flex-col gap-2'>
            <h2 className='font-roboto font-bold'>Obrigado por um usuário do Study-io!</h2>

            <p className={fontFamilyStyleForTailwind}>Sua opinião é essencial para nós. Para ajudar a melhorar o aplicativo, por favor, compartilhe suas experiências, sugestões e comentários no formulário abaixo sobre o Study-io. Estamos atentos ao seu feedback para aprimorar sua experiência.</p>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit(Feeback)}>
                <div className='flex flex-col gap-2'>
                    <label className={fontFamilyStyleForTailwind}>
                        O que você mais gostou em nosso aplicativo ?
                    </label>

                    <input 
                        className={`${inputStyleForTailwind} ${errors.likeApp ? 'border-2 border-red-500' : 'border-0'}`} 
                        type="text" 
                        {...register('likeApp')}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className={fontFamilyStyleForTailwind}>
                        Explique a sua resposta acima 👆
                    </label>

                    <textarea 
                        className={`${inputStyleForTailwind} ${errors.explain ? 'border-2 border-red-500' : 'border-0'}`} 
                        rows={4} 
                        {...register('explain')}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className={fontFamilyStyleForTailwind}>
                        O que podemos fazer para melhorar ainda mais o Study-io ?
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