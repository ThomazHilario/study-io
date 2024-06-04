import { useState } from 'react'

// Component
import { CardKanban } from './CardKanban'

export const Kanban = () => {

    const [task, setTask] = useState([{
        name:'Jogar valorant',
        createIn:'28/05/2024'
    }])

    return(
        <div className="absolute flex gap-2 justify-around top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Tarefas a fazer</h1>
                {task.map((task, index) => <CardKanban key={index} text={task.name} />)}
            </div>

            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Desenvolvimento</h1>
            </div>

            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Pausado / Cansado</h1>
            </div>

            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Concluido</h1>
            </div>
        </div>
    )
}