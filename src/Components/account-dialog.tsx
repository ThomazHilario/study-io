// import dialog from radix
import * as Dialog from '@radix-ui/react-dialog'

// import Store
import { user } from '../Store/store'

export const AccountDialog = () => {

    // Buscando dados da store
    const data = user(state => state.user)

    return (
        <Dialog.Root>
            <Dialog.Trigger className='p-2 text-center text-white w-full'>My Account</Dialog.Trigger>

            <Dialog.Portal>

                <Dialog.Overlay className='fixed inset-0 bg-black/50 transition-opacity'/>

                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='bg-slate-800 h-[50vh] w-[40vw] p-5 rounded-md flex flex-col gap-5 text-white'>
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
                        <div className='w-[37vw]'>
                            <p className='font-light mb-5'>Ao deletar sua conta suas informações armazenadas como as task, notes e kanban não podem ser recuperadas:</p>
                            <button className='bg-red-500 p-2 px-5 rounded-sm'>Delete Account</button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}