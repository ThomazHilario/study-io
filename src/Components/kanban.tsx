export const Kanban = () => {
    return(
        <div className="absolute flex gap-2 justify-around top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
            <div className="w-[284px] bg-slate-900/95 rounded-md h-[10%] p-2">
                <p className=" text-white rounded-sm ">Tarefas a fazer:</p>
            </div>

            <div className="w-[284px] bg-slate-900/95 rounded-md h-[10%] p-2">
                <p className=" text-white rounded-sm">Em Desenvolvimento:</p>
            </div>

            <div className="w-[284px] bg-slate-900/95 rounded-md h-[10%] p-2">
                <p className=" text-white rounded-sm ">Pausado:</p>
            </div>
            <div className="w-[284px] bg-slate-900/95 rounded-md h-[10%] p-2">
            <p className=" text-white rounded-sm">Concluidos:</p>
            </div>
        </div>
    )
}