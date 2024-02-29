// imports react-router-dom
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <main className=" flex justify-center items-center h-screen bg-[#5356ad]">
            {/* container do formulario de login */}
            <div className=" text-white flex justify-center items-center h-[90vh] w-[90vw] rounded-2xl bg-[#202124]">

                <div className="w-1/2 flex flex-col justify-center items-center gap-10 ">
                    <h1 className=" font-roboto text-5xl text-wrap w-80 text-center">
                        Bem-vindo ao <strong>Study-io</strong>
                    </h1>
                    <p className="font-roboto text-xl w-[37vw] text-justify">👉 O Study-io é um aplicativo de produtividade cuidadosamente projetado para estudantes e trabalhadores de todas as áreas e níveis de ensino.</p>

                    <p className="font-roboto text-xl w-[37vw] text-justify">👉 Oferecendo uma ampla gama de recursos e funcionalidades, nosso objetivo é aumentar o processo de aprendizado e capacitar você a alcançar todo o seu potencial.</p>

                    <h1  className="font-roboto text-5xl font-medium text-wrap text-center">🌌Venha Conosco!🌌</h1>
                </div>

                <form className="w-1/2 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-lg">Email:</label>
                        <input type="email" placeholder="Digite seu email..." className=" text-black rounded-sm w-[25vw] outline-none pl-2 py-2"/>
                    </div>

                    <div className="flex flex-col gap-2 mb-5">
                        <label className="text-lg">Password:</label>
                        <input type="password" placeholder="Digite sua senha" className=" text-black rounded-sm w-[25vw] outline-none pl-2 py-2"/>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <button className="text-white bg-[#5356ad] w-[25vw] py-2 rounded-sm">
                            Entrar
                        </button>

                        <p className='text-center'>Não possui uma conta ? <Link to='/register' className='text-violet-600'>Crie agora</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}