// Hello Pangea
import { Droppable } from "@hello-pangea/dnd"

// Components
import { CardKanban } from "./CardKanban"

// Store
import { user } from '@/Store/store'

// Interfaces
import { ColumnsKanbanProps } from "@/interfaces/kanbanTypes"

export const ColumnsKanban = ({tasks, devTask, pauseTask, completeTask}:ColumnsKanbanProps) => {

    // store - methods
    const { setTask, setDevTask, setPauseTask, setCompleteTask } = user(state => state)

    // sectionColumnStyle
    const sectionColumnStyle = 'h-min w-[290px] bg-slate-900/90 rounded-sm px-5 py-2 text-white'

    return(
        <div className="flex gap-2 justify-between">
            <Droppable droppableId="fazer" direction="vertical">
                {(provider) => {
                    return(
                        <section 
                            ref={provider.innerRef} 
                            {...provider.droppableProps} 
                            className={sectionColumnStyle}>

                            <h1 className='mb-2'>Tarefas a fazer:</h1>

                            {tasks.map((task,index) => (
                                <CardKanban 
                                    key={task.id} 
                                    index={index} 
                                    task={task} 
                                    tasks={tasks}
                                    setTask={setTask}
                                />
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="desenvolvendo" direction="vertical">
                {(provider) => {
                    return(
                        <section 
                            ref={provider.innerRef} 
                            {...provider.droppableProps} 
                            className={sectionColumnStyle}>

                            <h1 className='mb-2'>Em desenvolvendo:</h1>

                            {devTask.length > 0 && devTask.map((task, index) => (
                                <CardKanban 
                                    key={task.id} 
                                    index={index} 
                                    task={task}
                                    tasks={devTask}
                                    setTask={setDevTask}
                                />
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="pausado" direction="vertical">
                {(provider) => {
                    return(
                        <section 
                        ref={provider.innerRef} 
                        {...provider.droppableProps} 
                        className={sectionColumnStyle}>
                            
                            <h1 className='mb-2'>Pausado:</h1>

                            {pauseTask.length > 0 && pauseTask.map((task, index) => (
                                <CardKanban 
                                    key={task.id} 
                                    index={index} 
                                    task={task}
                                    tasks={pauseTask}
                                    setTask={setPauseTask}
                                />
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>

            <Droppable droppableId="concluido" direction="vertical">
                {(provider) => {
                    return(
                        <section 
                            ref={provider.innerRef} 
                            {...provider.droppableProps} 
                            className={sectionColumnStyle}>

                            <h1 className='mb-2'>Concluido:</h1>

                            {completeTask.length > 0 && completeTask.map((task,index) => (
                                <CardKanban 
                                    key={task.id} 
                                    index={index} 
                                    task={task}
                                    tasks={completeTask}
                                    setTask={setCompleteTask}
                                />
                            ))}

                            {provider.placeholder}
                        </section>    
                    )   
                }}
            </Droppable>
        </div>
    )
}