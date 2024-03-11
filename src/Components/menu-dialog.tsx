// import Dialog from radix
import * as Dialog from '@radix-ui/react-dialog'

// import user from lucide
import { User } from 'lucide-react'

export const MenuDialog = () => {
    return(
        <Dialog.Root>

            <Dialog.Trigger>
                <User className="cursor-pointer" size={18} color="white"/>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute right-2 top-[4.5rem]'>
                    <menu className='py-2 w-[13vw] bg-slate-800 rounded-sm'>
                        <li><button className='p-2 text-center text-white w-full'>My Account</button></li>
                        <li><button className='p-2 text-center text-white w-full'>Log Out</button></li>
                    </menu>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}