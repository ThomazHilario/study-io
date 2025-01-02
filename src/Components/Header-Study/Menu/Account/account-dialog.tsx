// import dialog from radix
import * as Dialog from '@radix-ui/react-dialog'

// import Store
import { user } from '@/Store/store'

// Lucide-React
import { X } from 'lucide-react'

// Components
import { DeleteAccountAlert } from './delete-account-alert'

export const AccountDialog = () => {

    // Buscando dados da store
    const data = user(state => state.user)

    return (
        <Dialog.Root>
            <Dialog.Trigger className='p-2 text-center text-white w-full'>My Account</Dialog.Trigger>

            <Dialog.Portal>

                <Dialog.Overlay className='fixed inset-0 bg-black/50 transition-opacity'/>

                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <section className='bg-slate-800 h-[50vh] w-[40vw] p-5 rounded-md flex flex-col gap-5 text-white overflow-hidden'>
                        <Dialog.Close className='absolute right-0 top-0 p-1 rounded-sm bg-slate-900'>
                            <X color='white' size={20}/>
                        </Dialog.Close>

                        <form className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <label>Username:</label>
                                <input className='h-8 rounded-md w-[220px] pl-2 hover:cursor-not-allowed' type='text' value={data?.username} disabled/>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label>Email:</label>
                                <input className='h-8 rounded-md w-[220px] pl-2 hover:cursor-not-allowed' type='text' value={data?.email} disabled/>
                            </div>
                        </form>

                        <hr/>

                        {/* Button delete account */}
                        <section className='w-[37vw]'>
                            <p className='font-light mb-5'>Ao deletar sua conta suas informações armazenadas como as task, notes e kanban não podem ser recuperadas:</p>
                            
                            {/* Component DeleteAccount */}
                            <DeleteAccountAlert/>
                        </section>
                    </section>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}