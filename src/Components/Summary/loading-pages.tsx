export const Loading = () => {
    return (
        <div className=" text-white flex justify-center items-center h-[90vh] w-[90vw] rounded-2xl bg-[#202124]">
            <button type="button" className="bg-indigo-600 flex justify-center items-center px-7 py-3" disabled>
                <svg className="border-[9px] rounded-full border-dotted border-white animate-spin size-9 mr-3 " viewBox="0 0 24 24"/>
                <h1 className='text-2xl font-system'>Carregando...</h1>
            </button>
        </div>
    )
}