import { CircleUser } from 'lucide-react'
import { ChangeEvent } from 'react'

// import store from zustand
import {user} from '../Store/store'

export const UpdateImage = () => {

    // Store
    const dataUser = user(state => state.user)
    const setDataUser = user(state => state.setUserData)

    // Acionando input
    async function clickInput(){
        // Acionando input
        document.getElementById('inputImage')?.click() 
        
    }

    // updateImageUser
    function updateImageUser(e:ChangeEvent){
        if(e.target instanceof HTMLInputElement){
            // Verificando se o input recebeu um arquivo
            if(e.target.files !== null){
                // Salvando foto na store
                setDataUser(dataUser?.id as string, dataUser?.username as string, dataUser?.email as string, URL.createObjectURL(e.target.files[0]))
            }
        }
    }

    return(
        <div className='cursor-pointer'>
            {/* Input file */}
            <input className="hidden" type="file" id='inputImage' onChange={updateImageUser}/>

            {/* icon Lucide */}
            <CircleUser color='white' size={30} onClick={clickInput}/>
        </div>
    )
}