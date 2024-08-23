// Radix Dialog
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import * as Tabs from '@radix-ui/react-tabs'

// Lucide-React
import { MessageSquareMore } from 'lucide-react'

// PropsIcon Interface
interface PropsIcon{
    propsIcon:{
        color:string;
        size:number
    }
}

export const Report = ({propsIcon}:PropsIcon) => {

    const inputStyleForTailwind = 'outline-none bg-black/20 resize-none p-1 rounded-md'

    return(
        <Dialog.Root>
            <Dialog.Trigger className='flex flex-col justify-center items-center data-[state="open"]:bg-gray-400/10 hover:bg-gray-400/10 py-[0.15rem] px-[0.35rem] rounded-md'>
                <MessageSquareMore {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Report</p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-[54%] left-[51%] -translate-x-1/2 -translate-y-1/2 bg-slate-900 w-[60vw] min-h-[75vh] py-5 px-8 text-white rounded-md'>
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
                            <p>Hello, here you can send your feedback about the study-io app, we are always listening to our users and always improving our app based on your feedback.</p>

                            <form action="" className='flex flex-col gap-2 mt-5'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="">
                                        What did you like most about our app?
                                    </label>
                                    <input className={inputStyleForTailwind} type="text" />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="">
                                        Explain your answer above 👆
                                    </label>
                                    <textarea className={inputStyleForTailwind} rows={4}/>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor="">
                                        What can we do to improve the study-io even further?
                                    </label>
                                    <textarea className={inputStyleForTailwind} rows={4}/>
                                </div>

                                <button className='mt-1 self-start bg-black/50 p-3 rounded-sm'>Send Your feedback</button>
                            </form>
                        </Tabs.Content>

                        <Tabs.Content value='Bugs'>
                            <p>Did you find a bug in studio-io ?, yes, explain to us what bug you found ?</p>

                            <form className='flex flex-col gap-2 mt-5'>
                                <div className='flex flex-col gap-2'>
                                    <label>What is type bug ?</label>

                                    <Select.Root defaultValue="interface">
                                        <Select.Trigger className='text-start bg-black/20 p-1'>
                                            Interface
                                        </Select.Trigger>

                                        <Select.Content className='relative top-[4.5rem] bg-black/20 w-[20vw]'>
                                            <Select.Item className='cursor-pointer p-1' value="interface">Interface</Select.Item>
                                            <Select.Item className='cursor-pointer p-1' value="components">Components task, notes...</Select.Item>
                                            <Select.Item className='cursor-pointer p-1' value="other">Other</Select.Item>
                                        </Select.Content>
                                    </Select.Root>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label>Explain your answer above?</label>

                                    <textarea 
                                        className='outline-none bg-black/20 resize-none p-1 rounded-md' 
                                        rows={5}
                                    />
                                </div>

                                <button className='mt-1 self-start bg-black/50 p-3 rounded-sm' type='submit'>Send your report</button>
                            </form>
                        </Tabs.Content>
                    </Tabs.Root>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}