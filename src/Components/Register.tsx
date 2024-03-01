// import recat-router-dom
import { Link } from 'react-router-dom'

// react-hook-form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// import interfaces
import { RegisterType } from '../interfaces/formType'

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

    // Desestruturando o useForm
    const { register, handleSubmit, formState:{errors} } = useForm<RegisterType>({resolver:zodResolver(schema)})

    // sing Up
    async function singUp({username,email,password}:RegisterType){
        try {
            console.log(username, email, password)
        } catch (error) {
            console.log(error)
        }
    }

    console.log(errors.email)
    return(
        <main className=" flex justify-center items-center h-screen bg-[#5356ad]">
            {/* container do formulario de login */}
            <div className=" text-white flex justify-center items-center h-[90vh] w-[90vw] rounded-2xl bg-[#202124]">

                <div className="w-1/2 flex flex-col justify-center items-center gap-10 ">
                    <h1 className=" font-roboto text-5xl text-wrap w-80 text-center">
                        Bem-vindo ao <strong>Study-io</strong>
                    </h1>
                    <p className="font-roboto text-[1.1rem] w-[37vw] text-justify">👉 O Study-io é um aplicativo de produtividade cuidadosamente projetado para estudantes e trabalhadores de todas as áreas e níveis de ensino.</p>

                    <p className="font-roboto text-[1.1rem] w-[37vw] text-justify">👉 Com o Study-io, você pode criar, organizar e priorizar suas tarefas de estudo e trabalho em uma interface simples e intuitiva. Nunca mais perca o foco do que realmente importa.</p>

                    <h1  className="font-roboto text-[2.5rem] font-medium text-wrap text-center">🌌Venha Conosco!🌌</h1>
                </div>

                <form className="w-1/2 flex flex-col justify-center items-center" onSubmit={handleSubmit(singUp)}>
                    <legend className='mb-7 font-bold font-roboto text-3xl'>Sing Up</legend>
                    
                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-lg">Username:</label>
                        <input type="text" placeholder="Digite seu nome..." className=" text-black rounded-sm w-[25vw] outline-none pl-2 py-2" {...register("username")}
                        />

                        {errors.username && 
                            <p className='text-red-500 text-wrap'>
                                {errors.username.message}
                            </p>
                        }
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-lg">Email:</label>
                        <input type="email" placeholder="Digite seu email..." className=" text-black rounded-sm w-[25vw] outline-none pl-2 py-2" {...register("email")}/>

                        {errors.email && <p className='text-red-500 text-wrap'>{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-lg">Password:</label>
                        <input type="password" placeholder="Digite sua senha" className=" text-black rounded-sm w-[25vw] outline-none pl-2 py-2" {...register("password")}
                        />

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
        </main>
    )
}