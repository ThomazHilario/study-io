// React
import { useState, useEffect } from 'react'

// Components
import { Loading } from '@/Components/loading'

// imports react-router-dom
import { Link, useNavigate } from 'react-router-dom'

// import Context
import { UseMyContext } from '@/Context/context'

// imports firebase
import { auth } from '@/Services/FirebaseConnection'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

// imports hook form and zod
import { useForm } from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// schema form
const schema = z.object({
    email:z.string().min(1,'Preencha o campo acima').regex( /\S+@\S+\.\S+/,'email invalido'),
    password:z.string().min(1,'Preencha o campo acima')
}).required({
    email:true,
    password:true
})

// imports interface
import { LoginType } from '@/interfaces/formType'

// import toast
import {toast} from 'sonner'

// import RightClick component
import { RightClick } from '@/Components/rightClick'

export const Home = () => {

    // navigate
    const navigate = useNavigate()

    // state - loading
    const [loading, setLoading] = useState(true)

    // Context
    const { setIsLogged } = UseMyContext()

    // Verificando se o usuario logado
    useEffect(() => {
        function verifyAutenticationUser(){
            onAuthStateChanged(auth,(user) => {
                if(user){
                    navigate('/study')

                    // Alterando o loading para false
                    setLoading(false)

                    // Alterando o valor de isLoged para true
                    setIsLogged(true)
                }

                // Alterando o loading para false
                setLoading(false)
            })
        }

        verifyAutenticationUser()
    },[])

    // Desestruturando o useForm
    const { register, handleSubmit, formState:{errors} } = useForm<LoginType>({resolver:zodResolver(schema)})

    // sing in
    async function singIn(data:LoginType){
        try {
            // Alterando o valor do loading
            setLoading(true)

            // Autenticando usuario
            const user = await signInWithEmailAndPassword(auth, data.email, data.password)

            // Salvando uid na localStorage
            localStorage.setItem('@DataId',JSON.stringify(user.user.uid) as string)

            // navegando para o study
            navigate('/study')
            

        } catch (error) {

            // Notificando o error com o toast
            toast.error('Email ou senha invalidos',{
                style:{
                    background:'#202124',
                    color:'rgb(239 68 68)',
                    border:0,
                }
            })

        }finally{
            setLoading(false)
        }
    }

    // Container forms style for Tailwind
    const styleContainerInputsForm = 'flex flex-col gap-2'

    // Inputs style for Tailwind
    const styleInputsForms = 'text-white rounded-sm w-[25vw] outline-none pl-2 py-2  bg-transparent bg-gradient-to-r from-gray-700/10 to-gray-300/5 border-2 placeholder:text-white'

    return (
        <RightClick>
            <main className=" flex justify-center items-center h-screen bg-[#5356ad]">
                {/* container do formulario de login */}
                {loading ? <Loading/> : (
                    <section className=" text-white flex justify-center items-center h-[90vh] w-[90vw] rounded-2xl bg-[#202124]">
                        <article className="w-1/2 flex flex-col justify-center items-center gap-10 ">
                            <h1 className="leading-[3.5rem] font-system text-5xl w-80 text-center">
                                Bem-vindo ao <strong className='bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>Study-io</strong>
                            </h1>
                            <p className="font-system text-[1.1rem] w-[36vw] text-justify">👉 O Study-io é um aplicativo de produtividade cuidadosamente projetado para estudantes e trabalhadores de todas as áreas e níveis de ensino.</p>

                            <p className="font-system text-[1.1rem] w-[36vw] text-justify">👉 Com o Study-io, você pode criar, organizar e priorizar suas tarefas de estudo e trabalho em uma interface simples e intuitiva. Nunca mais perca o foco do que realmente importa.</p>

                            <h1  className="font-roboto text-[2.5rem] font-medium text-wrap text-center">🌌Venha Conosco!🌌</h1>
                        </article>
                        
                        <form className="w-1/2 flex flex-col justify-center items-center" 
                        onSubmit={handleSubmit(singIn)}>
                            <legend className='mb-7 font-bold font-roboto text-3xl'>Sing In</legend>

                            <div className={`${styleContainerInputsForm} mb-5`}>
                                <label className="text-lg">Email:</label>
                                <input type="text" 
                                placeholder="Digite seu email..." 
                                className={`${styleInputsForms} ${errors.email ? 'border-red-500' : 'border-zinc-700/40'}`}
                                {...register('email')}/>
                                
                                {/* validação de erros dos inputs */}
                                {errors.email && 
                                    <p className='text-red-500'>
                                        {errors.email.message}
                                    </p>}
                            </div>

                            <div className={`${styleContainerInputsForm} mb-5`}>
                                <label className="text-lg">Password:</label>
                                <input type="password" 
                                placeholder="Digite sua senha" 
                                className={`${styleInputsForms} ${errors.password ? 'border-red-500' : 'border-zinc-700/40'}`}
                                {...register('password')}/>
                                
                                {/* validação de erros dos inputs */}
                                {errors.password && 
                                    <p className='text-red-500'>
                                        {errors.password.message}
                                    </p>}
                            </div>

                            <div className={`${styleContainerInputsForm} mt-2`}>
                                <button className="text-white bg-[#5356ad] w-[25vw] py-2 rounded-sm">
                                    Entrar
                                </button>

                                <p className='text-center'>Não possui uma conta ? <Link to='/register' className='text-violet-600'>Crie agora</Link></p>
                            </div>
                        </form>
                    </section>
                )}
            </main>
        </RightClick>
    )
}