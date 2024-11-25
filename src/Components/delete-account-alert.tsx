// React Router Dom
import { useNavigate } from 'react-router-dom'

// Radix - Alert
import * as Alert from '@radix-ui/react-alert-dialog'

// import Store
import { user } from '@/Store/store'

// import firebase
import { auth, database, storage } from '../Services/FirebaseConnection'
import { doc, deleteDoc } from 'firebase/firestore'
import { User, deleteUser, signOut } from 'firebase/auth'
import { ref, deleteObject, listAll } from 'firebase/storage'


export const DeleteAccountAlert = () => {
    // navigate
    const navigate = useNavigate()

    // Buscando dados da store
    const data = user(state => state.user)

    // deleteStorage - deletando a storage
    async function deleteStorage(){
        try{
            // StorageRef - referencia da storage
            const storageRef = ref(storage, `imagesUser/${data?.id}`)

            // All get files for user
            const storageFiles = await listAll(storageRef)

            // Verify length storageFiles
            if(storageFiles.items.length > 0){
                // Delete all files
                storageFiles.items.map(file => deleteObject(file))
            }

        }catch(error){
            console.log(error)
        }
    }

    // deleteAccount - deletando conta
    async function deleteAccount(){
        try {
            // Deletando usuário
            deleteUser(auth.currentUser as User)
            
            // Excluindo o seu banco de dados
            await deleteDoc(doc(database,'users', data?.id as string))   
            
            // Delete storage
            deleteStorage()

            // Navegando para a pagina inicial da aplicação
            navigate('/')

            // Deslogando usuário ainda autenticado
            signOut(auth)

            localStorage.clear()
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <Alert.Root>
            <Alert.Trigger className='bg-red-500 p-2 px-5 rounded-sm'>
                Delete Account
            </Alert.Trigger>

            <Alert.Content className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[30vw] bg-slate-900 p-5 rounded-md flex flex-col gap-3'>

            {/* Title */}
            <Alert.Title className='text-2xl font-bold'>
                Delete Account
            </Alert.Title>

            <hr/>

            {/* Description */}
            <Alert.Description>
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