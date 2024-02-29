export const Home = () => {
    return (
        <main className=" flex justify-center items-center h-auto lg:h-screen bg-[#1e1e1e]">
            {/* container do formulario de login */}
            <div className=" flex flex-col h-auto justify-center items-center lg:flex-row lg:h-[80vh] w-[75vw] rounded-2xl bg-[#f6f6f6]">

                <div className="w-1/2 flex flex-col justify-center items-center gap-10 ">
                    <h1 className="text-5xl text-wrap w-80 text-center">
                        Bem-vindo ao <strong>Study-io</strong>
                    </h1>
                    <p className="text-xl w-96 text-justify"> O Study IO é um aplicativo de produtividade cuidadosamente projetado para estudantes e trabalhadores de todas as áreas e níveis de ensino.</p>

                    <p className="text-xl w-96 text-justify">Oferecendo uma ampla gama de recursos e funcionalidades, nosso objetivo é aumentar o processo de aprendizado e capacitar você a alcançar todo o seu potencial de aprendizado.</p>

                    <h1  className="text-5xl font-bold text-wrap text-center">Venha Conosco!</h1>
                </div>

                <form className="w-1/2 flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 m-3">
                        <label className="text-lg">Email:</label>
                        <input type="email" className="rounded-sm w-[280px] outline-none pl-2 py-1"/>
                    </div>

                    <div className="flex flex-col gap-2 m-3">
                        <label className="text-lg">Password:</label>
                        <input type="password" className="rounded-sm w-[280px] outline-none pl-2 py-1"/>
                    </div>

                    <div className="flex flex-col gap-2 m-3">
                        <button className="bg-gray-900 w-[280px] py-2 rounded-sm">Entrar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}