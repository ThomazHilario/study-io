// React
import { useState } from "react";

// Interface
import { TaskProps } from "@/interfaces/tasksType"

interface TaskKanbanProps{
    task:TaskProps;
    subTasks:TaskProps[]
}

export const TaskKanban = ({task, subTasks}:TaskKanbanProps) => {

    const [checked, setChecked] = useState<boolean>(task.checked)

    // Checked value
    const isChecked = {checked:checked}

    // Update checked
    function updateChecked(){
        // Change state checked
        setChecked(checked ? task.checked = false : task.checked = true)
    }

    return(
        <li className="flex items-center gap-5 bg-black/40 p-3 rounded-sm">
            {/* Input checkbox */}
            <input className="h-4 w-4" type="checkbox" {...isChecked} onChange={updateChecked}/>

            {/* Task name */}
            <p className="text-sm font-roboto font-medium">{task.name}</p>
        </li>
    )
}