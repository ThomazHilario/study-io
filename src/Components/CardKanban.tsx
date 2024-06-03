
// Interface CardKanbanProps
interface CardKanbanProps{
    text:string
}

export const CardKanban = ({text}:CardKanbanProps) => {
    return(
        <div className='cursor-pointer p-1 rounded-md bg-gray-700 border-2 border-transparent hover:border-cyan-400'>{text}</div>
    )
}