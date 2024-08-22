// Radix Dialog
import * as Dialog from '@radix-ui/react-dialog'

// Lucide-React
import { MessageSquareMore } from 'lucide-react'

export const Report = ({propsIcon}) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col justify-center items-center data-[state="open"]:bg-gray-400/10 hover:bg-gray-400/10 py-[0.15rem] px-[0.35rem] rounded-md'>
                <MessageSquareMore {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Report</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[90vw] h-[90vh]'>
                    hello moto
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}