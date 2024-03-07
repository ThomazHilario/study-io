import { useState } from 'react'

// import recat-router-dom
import { Link, useNavigate } from 'react-router-dom'

// import Store
import {user} from '../Store/store'

// import toast from sonner
import { toast } from 'sonner'

// import firebase
import { auth, database } from '../Services/FirebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { FirebaseError } from 'firebase/app'


// import interfaces
import { RegisterType } from '../interfaces/formType'

// react-hook-form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// import RightClick component
import { RightClick } from './rightClick'

// schema from form
const schema = z.object({
    username:z.string().min(1,'Preencha o campo acima'),
    email:z.string().min(1,'Preencha o campo acima').regex( /\S+@\S+\.\S+/,'email invalido'),
    password:z.string().min(1,"Preencha o campo acima").min(8,'A senha deve conter 8 caracteres')
}).required({
    username:true,
    email:true,
    password:true
})

export const Register = () => {
    // navigate
    const navigate = useNavigate()

    // Desestruturando o useForm
    const { register, handleSubmit, formState:{errors} } = useForm<RegisterType>(
        {resolver:zodResolver(schema)
    })

    // Store - zustand
    const userData = user((state) => state.setUserData)

    // state - loading
    const [loading, setLoading] = useState(false)

    // sing Up
    async function singUp(data:RegisterType){
        try {
            // Alterando o valor do loading
            setLoading(true)

            // Criando autenticacao do usuario
            const user = await createUserWithEmailAndPassword(auth, data.email, data.password)

            // Salvando informacoes do usuario na store
            userData(user.user.uid, data.username, data.email, null)           

            // Salvando dados no banco de dados do usuario
            await setDoc(doc(database,'users',user.user.uid),{
                dataUser:{
                    username:data.username,
                    img:null,
                }
            })

            // navegando ate o componente study
            navigate('/study')

        } catch (error) {
            if(error instanceof FirebaseError){
                if(error.message == 'Firebase: Error (auth/email-already-in-use).'){
                    toast.error(
                        'Email ja esta cadastrado',{style:{
                            background:'#202124',
                            color:'rgb(239 68 68)',
                            border:0,
                        }}
                    )
                }
            }
        }finally{
            setLoading(false)
        }
    }

    return(
        <RightClick>
            <main className=" flex justify-center items-center h-screen bg-[#5356ad]">
                {/* container do formulario de login */}
                {loading ? (
                    <div className=" text-white flex justify-center items-center h-[90vh] w-[90vw] rounded-2xl bg-[#202124]">
                        <button type="button" className="bg-indigo-600 flex justify-center items-center px-7 py-3" disabled>
                            <svg className="border-[9px] rounded-full border-dotted border-white animate-spin size-9 mr-3 " viewBox="0 0 24 24"/>
                            <h1 className='text-2xl font-system'>Carregando...</h1>
                        </button>
                    </div>
                ) : (
                    <div className=" text-white flex justify-center items-center h-[90vh] w-[90vw] rounded-2xl bg-[#202124]">

                        <div className="w-1/2 flex flex-col justify-center items-center gap-10 ">
                            <h1 className=" leading-[3.5rem] font-system text-5xl text-wrap w-80 text-center">
                                Bem-vindo ao <strong className='bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>Study-io</strong>
                            </h1>
                            <p className="font-system text-[1.1rem] w-[36vw] text-justify">👉 O Study-io é um aplicativo de produtividade cuidadosamente projetado para estudantes e trabalhadores de todas as áreas e níveis de ensino.</p>

                            <p className="font-system text-[1.1rem] w-[36vw] text-justify">👉 Com o Study-io, você pode criar, organizar e priorizar suas tarefas de estudo e trabalho em uma interface simples e intuitiva. Nunca mais perca o foco do que realmente importa.</p>

                            <h1  className="font-roboto text-[2.5rem] font-medium text-wrap text-center">🌌Venha Conosco!🌌</h1>
                        </div>

                        <form className="w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(singUp)}>
                            <legend className='mb-7 font-bold font-roboto text-3xl'>Sing Up</legend>
                            
                            <div className="flex flex-col gap-2 mb-5">
                                <label className="text-lg">Username:</label>
                                <input type="text" 
                                placeholder="Digite seu nome..." 
                                className={`text-black rounded-sm w-[25vw] outline-none pl-2 py-2 ${errors.username ? 'border-2 border-red-500' : 'border-none'}`} 
                                {...register("username")}
                                />

                                {/* validação de erro dos inputs */}
                                {errors.username && 
                                    <p className='text-red-500'>
                                        {errors.username.message}
                                    </p>
                                }
                            </div>

                            <div className="flex flex-col gap-2 mb-5">
                                <label className="text-lg">Email:</label>
                                <input 
                                type="text" 
                                placeholder="Digite seu email..." 
                                className={`text-black rounded-sm w-[25vw] outline-none pl-2 py-2 ${errors.email ? 'border-2 border-red-500' : 'border-none'}`} 
                                {...register("email")}/>

                                {/* validação de erro dos inputs */}
                                {errors.email && 
                                    <p className='text-red-500 text-wrap'>
                                        {errors.email.message}
                                    </p>}
                            </div>

                            <div className="flex flex-col gap-2 mb-5">
                                <label className="text-lg">Password:</label>
                                <input 
                                type="password" 
                                placeholder="Digite sua senha" 
                                className={`text-black rounded-sm w-[25vw] outline-none pl-2 py-2 ${errors.password ? 'border-2 border-red-500' : 'border-none'}`}  
                                {...register("password")}
                                />

                                {/* validação de erro dos inputs */}
                                {errors.password && 
                                    <p className='text-red-500 text-wrap'>
                                        {errors.password.message}
                                    </p>}
                            </div>

                            <div className="flex flex-col gap-2 mt-2">
                                <button className="text-white bg-[#5356ad] w-[25vw] py-2 rounded-sm">
                                    Cadastrar
                                </button>

                                <p className='text-center'>Ja possui uma conta ? <Link to='/' className='text-violet-600'>Entrar agora</Link></p>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </RightClick>
    )
}