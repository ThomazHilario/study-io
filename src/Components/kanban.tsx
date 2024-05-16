import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react'

export const Kanban = () => {

    const [columns, setColumns] = useState([
        {
            id:'A fazer',
            nome:'Tarefas a fazer',
            task:[]
        },
        {
            id:'A Desenvolver',
            nome:'em desenvolvimento',
            task:[]
        },
        {
            id:'Tarefas pausadas',
            nome:'Pausado',
            task:[]
        },
        {
            id:'Tarefas concluidas',
            nome:'Concluido',
            task:[]
        }
    ])
      

    function taskDragEnd(result:any){
        console.log(result)
    }

    return(
        <DragDropContext onDragEnd={taskDragEnd}>
            <div className="absolute flex gap-2 justify-around top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%]  w-[90vw] h-[80vh] bg-black/30 rounded-sm p-1">
                {columns.map((column, idx) => {
                return(
                    <div className="w-[284px] bg-slate-900/95 rounded-md h-min p-2" key={idx}>
                        <p className=" text-white rounded-sm font-system">{column.nome}:</p>
                        <Droppable droppableId={column.id}>
                            {(provider) => (
                                <div ref={provider.innerRef}>
                                    {column.task.map((item, idx) => {
                                        return(
                                            <Draggable key={idx} draggableId={item} index={idx}>
                                                {(provider) => (
                                                    <p ref={provider.innerRef}
                                                    {...provider.draggableProps}
                                                    {...provider.dragHandleProps}>
                                                        {item}
                                                    </p>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                </div>
                            )}
                        </Droppable>
                        <button className="hover:bg-white/5 text-white w-full text-start mt-2 rounded-md p-1">+ Adicionar Tarefa</button>
                </div>
                )
                })}             
            </div>
        </DragDropContext>  
    )
}