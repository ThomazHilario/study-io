// Radix - Dialog
import * as Dialog from '@radix-ui/react-dialog'

// Lucide React
import { MenuIcon } from 'lucide-react'

// Task Props
import { TaskProps } from '../interfaces/kanbanTypes'

// Interface Task Props Componente
interface TaskPropsComponent{
    task:TaskProps;
    handleActiveEdit: () => void;
    handleDeleteTask: () => void;
    handletTaskComplete: () => void;
}

export const Task = ({task, handleActiveEdit, handleDeleteTask, handletTaskComplete}: TaskPropsComponent) => {

    return(
        <li className="group flex gap-4 border-2 py-1 px-2 rounded-md w-full justify-between">
            <div className="flex items-center gap-2">
                <input className="min-h-4 min-w-4" type="checkbox" onChange={handletTaskComplete}/>
                <span className="text-justify whitespace-break-spaces">{task.name}</span>
            </div>

            <section className="w-7">
                <Dialog.Root>
                    <Dialog.Trigger>
                        <MenuIcon className="hidden group-hover:block cursor-pointer" size={15}/>
                    </Dialog.Trigger>

                    
                    <Dialog.Content className="absolute -right-5">
                        <section className="bg-slate-800 w-32 flex flex-col">
                            <button className="py-2 px-2" onClick={handleActiveEdit}>Editar</button>
                            <Dialog.Close className="py-2 px-2" onClick={handleDeleteTask}>
                                Delete
                            </Dialog.Close>
                        </section>
                    </Dialog.Content>
                    
                </Dialog.Root>
            </section>
        </li>
    )
}