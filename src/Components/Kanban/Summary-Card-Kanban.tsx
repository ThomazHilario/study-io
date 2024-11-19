// Interfaces
import { SummaryProps } from "@/interfaces/Kanban/Summary-Type"

// Components
import { TaskKanban } from "./Task-Kanban"

export const SummaryCardkanban = ({name, description, subTasks}:SummaryProps) => {

    // Logics
    const subTasksNotIsEmpty = subTasks !== undefined && subTasks.length > 0

    // Css article summary
    const articleSummaryCss = 'flex flex-col gap-2 mb-5'
    const titleArticleSummaryCss = 'text-xl'

    return(
        <section>
            <h1 className="text-4xl mb-3">Summary:</h1>

            {/* Title */}
            <article className={articleSummaryCss}>
                {/* Title */}
                <h2 className={titleArticleSummaryCss}>Title task:</h2>

                {/* Content */}
                <p className="bg-black/30 p-2 px-5 rounded-sm">
                    {name}
                </p>
            </article>


            {/* Description */}
            <article className={articleSummaryCss}>
                {/* Title */}
                <h2 className={titleArticleSummaryCss}>Description</h2>

                {/* Content */}
                <p className="bg-black/30 p-2 px-5 rounded-sm">
                    {description !== '' ? description : 'Not have description'}
                </p>
            </article>


            {/* Tasks */}
            <article className={articleSummaryCss}>
                {/* Title */}
                <h2 className={titleArticleSummaryCss}>Tasks:</h2>

                {/* Content */}
                <ul className="list-none">
                    {subTasksNotIsEmpty ? subTasks?.map((task) => (
                        <TaskKanban 
                            key={task.id}
                            task={task}
                        />
                    )) : (
                        <li>Not have tasks</li>
                    )}
                </ul>
            </article>    
        </section>
    )
}