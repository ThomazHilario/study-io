// React-dnd
import { Draggable } from "@hello-pangea/dnd"

// Interface
import { CardKanbanProps } from "../interfaces/kanbanTypes"

export const CardKanban = ({index, task}:CardKanbanProps) => {

   return(
        <Draggable draggableId={task.id} index={index}>
            {(provider) => 
                (
                    <div 
                    ref={provider.innerRef} 
                    {...provider.dragHandleProps} 
                    {...provider.draggableProps} 
                    className={`cursor-pointer w-[200px] p-1 rounded-md bg-gray-700 border-2 border-transparent hover:border-cyan-400 mt-2`}>
                        {task.name}
                    </div>
                )
            }
        </Draggable>
   ) 
}