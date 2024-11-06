export const LoadingThemes = () => {
    return(
        <section className="flex justify-center items-center w-full h-2/4 font-roboto">
            <button type="button" className="flex justify-center items-center px-7 py-3" disabled>
                <svg className="border-[9px] rounded-full border-dotted border-white animate-spin size-9 mr-3 " viewBox="0 0 24 24"/>
                <h1 className='text-3xl text-white'>Loading...</h1>
            </button>
        </section>
    )
}