// Hello Pangea
import { Droppable } from "@hello-pangea/dnd"

// Components
import { CardKanban } from "../Card/CardKanban"

// Interfaces
import { ColumnsKanbanProps } from "@/interfaces/kanbanTypes"

export const ColumnsKanban = ({columns}:ColumnsKanbanProps) => {

    // sectionColumnStyle
    const sectionColumnStyle = 'h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'

    return(
        <div className="flex gap-2 justify-between">
            {columns.map((column, index) => {
                return(
                    <Droppable key={index} droppableId={column.idColumn} direction="vertical">
                        {(provider) => {
                            return(
                                <section 
                                    ref={provider.innerRef} 
                                    {...provider.droppableProps} 
                                    className={sectionColumnStyle}>

                                    {/* Title column */}
                                    <h1 className='mb-2'>{column.titleColumn}</h1>

                                    {/* Tasks from column */}
                                    {column.tasks.map((task,index) => (
                                        <CardKanban 
                                            key={task.id} 
                                            index={index} 
                                            task={task} 
                                            tasks={column.tasks}
                                            setTask={column.setTask}
                                        />
                                    ))}

                                    {provider.placeholder}
                                </section>    
                            )   
                        }}
                    </Droppable>
                )
            })}
        </div>
    )
}