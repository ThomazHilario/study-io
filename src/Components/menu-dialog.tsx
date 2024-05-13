// import Dialog from radix
import * as Dialog from '@radix-ui/react-dialog'

// react-router-dom
import { useNavigate } from 'react-router-dom'

// import Context
import { UseMyContext } from '../Context/context'

// import user from lucide
import { User } from 'lucide-react'

// import firebase
import { auth } from '../Services/FirebaseConnection'
import { signOut } from 'firebase/auth'

// import Components
import { AccountDialog } from './account-dialog'

export const MenuDialog = () => {

    // Context
    const { isFullscreen } = UseMyContext()

    // navigate
    const navigate = useNavigate()

    // Saindo da conta
    async function LogOut(){
        try {
            // Retirando autenticacao
            await signOut(auth)

            // Retirando id da localStorage
            localStorage.removeItem('@DataId')

            // Removendo o timerDrag da localStorage
            localStorage.removeItem('timerDrag')

            // Removendo o TaskFrameDrag da localStorage
            localStorage.removeItem('TaskFrameDrag')

            // Removendo a url do video da localStorage
            localStorage.removeItem('videoUrl')

            // Navegando a rota inicial
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Dialog.Root>

            <Dialog.Trigger>
                <User className="cursor-pointer" size={18} color="white"/>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className={`absolute right-2 ${isFullscreen ? 'top-[4.5rem]' : 'top-[3.1rem]'}`}>
                    <menu className='py-2 w-[13vw] bg-slate-800 rounded-sm'>
                        <li><AccountDialog/></li>
                        <li><button className='p-2 text-center text-white w-full' onClick={LogOut}>Log Out</button></li>
                    </menu>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}