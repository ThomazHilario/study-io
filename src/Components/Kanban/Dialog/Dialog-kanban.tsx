// Radix
import * as Dialog from '@radix-ui/react-dialog'

// Interface
import { IconPropsComponent } from '@/interfaces/icon-type'

// Lucide React
import { Kanban } from 'lucide-react'

// Components
import { KanbanFrame } from '../kanban-frame'

export const DialogKanban = (propsIcon:IconPropsComponent) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col items-center hover:bg-gray-400/10 py-[0.15rem] px-[0.35rem] rounded-md data-[state="open"]:bg-gray-400/10'>
                <Kanban {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Kanban</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-[50%] left-[52%] -translate-x-1/2 -translate-y-[45%] overflow-hidden'>
                    <KanbanFrame/>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}