// Radix Dialog
import * as Dialog from '@radix-ui/react-dialog'
import * as Tabs from '@radix-ui/react-tabs'

// Lucide-React
import { MessageSquareMore, X } from 'lucide-react'

// Components
import { Feedback } from './Feedback'
import { Bugs } from './Bugs'

// PropsIcon Interface
interface PropsIcon{
    propsIcon:{
        color:string;
        size:number
    }
}

export const Report = ({propsIcon}:PropsIcon) => {

    return(
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col justify-center items-center data-[state="open"]:bg-gray-400/10 hover:bg-gray-400/10 py-[0.15rem] px-[0.35rem] rounded-md'>
                <MessageSquareMore {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Report</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-[54%] left-[51%] -translate-x-1/2 -translate-y-1/2 bg-slate-800 w-[60vw] min-h-[75vh] py-5 px-8 text-white rounded-md overflow-hidden'>
                    <Dialog.Close className='absolute top-0 right-0 p-1 bg-slate-900/80 rounded-sm'>
                        <X/>
                    </Dialog.Close>

                    <Tabs.Root defaultValue='FeedBack'>
                        <Tabs.List className='flex gap-10 mb-5'>
                            <Tabs.Trigger className='text-2xl border-b-2 border-transparent data-[state="active"]:border-purple-500' value='FeedBack'>
                                FeedBack
                            </Tabs.Trigger>

                            <Tabs.Trigger className='text-2xl border-b-2 border-transparent data-[state="active"]:border-purple-500' value='Bugs'>
                                Bugs
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value='FeedBack'>
                            <Feedback/>
                        </Tabs.Content>

                        <Tabs.Content value='Bugs'>
                            <Bugs/>
                        </Tabs.Content>
                    </Tabs.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}