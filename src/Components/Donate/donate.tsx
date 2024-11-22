// Components
import { DonateTabs } from "./donate-tabs"

export const Donate = () => {
    return(
        <section className="h-[80vh] w-[60vw] bg-slate-800 rounded-md p-5 font-roboto text-white">
            <article className="flex flex-col gap-3">
                {/* Title */}
                <h2 className="text-3xl">Donate</h2>

                {/* Description */}
                <p className="text-justify">Sua jornada de aprendizado é a nossa maior motivação. Estamos felizes em fazer parte do seu crescimento e em ajudar a tornar seus estudos e ambiente de trabalho mais eficiente e organizados.</p>

                <p className="text-justify">Se você gosta do Study-io e deseja apoiar o nosso projeto, considere fazer uma doação de qualquer valor. Sua contribuição nos ajuda a manter o aplicativo, adicionar novas funcionalidades e continuar proporcionando a melhor experiência possível.</p>
            </article>

            {/* Payments methods */}
            <DonateTabs/>
        </section>
    )
}