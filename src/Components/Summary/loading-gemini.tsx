export const LoadingGemini = () => {
    return(
        <article className='flex justify-center items-center'>
            <svg className=" rounded-full animate-spin h-10 w-10 mr-3 border-[10px] border-dotted" viewBox="0 0 24 24"/>
            <span className='text-2xl'>Processando a sua pergunta...</span>
        </article>
    )
}