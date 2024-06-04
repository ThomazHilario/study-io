import { useState } from 'react'

import { DragDropContext } from '@hello-pangea/dnd'

// interface
import { TaskProps } from '../interfaces/kanbanTypes'

// Component
import { ColumnsKanban } from './ColumnKanban'

export const Kanban = () => {

    const [task, setTask] = useState<TaskProps[]>([
        {
            id:'1',
            name:'Jogar valorant',
            createIn:'28/05/2024'
        },
        {
            id:'2',
            name:'Jogar ',
            createIn:'28/05/2024'
        }
    ])

    const [devTask, setDevTask] = useState<TaskProps[]>([])

    const [pauseTask, setPauseTask] = useState<TaskProps[]>([])

    const [completeTask, setCompleteTask] = useState<TaskProps[]>([])

    return(
        <DragDropContext onDragEnd={() => console.log('oi')} >
            <div className="absolute top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
                <ColumnsKanban 
                    task={task} 
                    setTask={setTask}
                    devTask={devTask}
                    setDevTask={setDevTask}
                    pauseTask={pauseTask}
                    setPauseTask={setPauseTask}
                    completeTask={completeTask}
                    setCompleteTask={setCompleteTask}
                />
            </div>
        </DragDropContext>
    )
}

/*
    
            <div className='h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'>
                <h1 className='mb-2'>Tarefas a fazer</h1>
                {task.map((task, index) => <CardKanban key={index} index={index} text={task.name} />)}
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
       
*/