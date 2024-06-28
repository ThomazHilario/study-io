// import dialog from radix
import * as Dialog from '@radix-ui/react-dialog'
import * as Alert from '@radix-ui/react-alert-dialog'

// import react-router-dom
import { useNavigate } from 'react-router-dom'

// import Store
import { user } from '../Store/store'

// import firebase
import { auth, database } from '../Services/FirebaseConnection'
import { doc, deleteDoc } from 'firebase/firestore'
import { User, deleteUser, signOut } from 'firebase/auth'

export const AccountDialog = () => {

    // navigate
    const navigate = useNavigate()

    // Buscando dados da store
    const data = user(state => state.user)

    // deleteAccount - deletando conta
    async function deleteAccount(){
        try {
            // Deletando usuário
            deleteUser(auth.currentUser as User)
            
            // Excluindo o seu banco de dados
            await deleteDoc(doc(database,'users', data?.id as string))     

            // Navegando para a pagina inicial da aplicação
            navigate('/')

            // Deslogando usuário ainda autenticado
            signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='p-2 text-center text-white w-full'>My Account</Dialog.Trigger>

            <Dialog.Portal>

                <Dialog.Overlay className='fixed inset-0 bg-black/50 transition-opacity'/>

                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <section className='bg-slate-800 h-[50vh] w-[40vw] p-5 rounded-md flex flex-col gap-5 text-white'>
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
                            
                            <Alert.Root>
                              <Alert.Trigger className='bg-red-500 p-2 px-5 rounded-sm'>
                                Delete Account
                              </Alert.Trigger>

                              <Alert.Content className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[30vw] bg-slate-900 p-5 rounded-md'>
                                <Alert.Title className='text-2xl font-bold'>
                                    Delete Account
                                </Alert.Title>

                                <Alert.Description className='mb-3'>
                                    Ao deletar sua conta suas informações armazenadas como as task, notes e kanban não podem ser recuperadas.
                                </Alert.Description>

                                <article className='flex gap-2'>
                                    <Alert.Cancel className='w-32 h-8 bg-gray-600 rounded-sm'>
                                        Cancel
                                    </Alert.Cancel>
                                
                                
                                    <button className='w-32 h-8 bg-red-500 rounded-sm' onClick={deleteAccount}>
                                        Delete Account
                                    </button>
                                    
                                </article>
                              </Alert.Content>
                            </Alert.Root>
                        </section>
                    </section>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}