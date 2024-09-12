// React Router Dom
import { useNavigate } from 'react-router-dom'

// Radix - Alert
import * as Alert from '@radix-ui/react-alert-dialog'

// import Store
import { user } from '@/Store/store'

// import firebase
import { auth, database } from '../Services/FirebaseConnection'
import { doc, deleteDoc } from 'firebase/firestore'
import { User, deleteUser, signOut } from 'firebase/auth'


export const DeleteAccountAlert = () => {
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


    return(
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
    )
}