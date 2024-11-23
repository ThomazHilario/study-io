// Radix
import * as Dialog from '@radix-ui/react-dialog'

// Interface
import { IconPropsComponent } from '@/interfaces/icon-type'

// Lucide React
import { CalendarDays } from 'lucide-react'

// Components 
import { Calendar } from './calendar'

export const DialogCalendar = (propsIcon:IconPropsComponent) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger className={`flex flex-col items-center hover:bg-gray-400/10 py-[0.15rem] px-[0.35rem] rounded-md data-[state="open"]:bg-gray-400/10 w-full`}>
                <CalendarDays {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Cal</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute bg-slate-800/95 top-80 left-16 rounded-md'>
                  <Calendar />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}