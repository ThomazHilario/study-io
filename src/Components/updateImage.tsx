import { CircleUser } from 'lucide-react'
import { ChangeEvent } from 'react'

// import store from zustand
import {user} from '../Store/store'

// import Firebase from storage
import { storage } from '../Services/FirebaseConnection'
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage'

export const UpdateImage = () => {

    // Store
    const dataUser = user(state => state.user)
    const setDataUser = user(state => state.setUserData)

    // Acionando input
    async function clickInput(){
        // Acionando input
        document.getElementById('inputImage')?.click() 
        
    }

    // addImageInFirebase
    async function addImageInStorage(file:File){
        try {
            // Criando a referencia onde a imagem ira ficar
            const storageRef = ref(storage,`imagesUser/${dataUser?.id}/${file.name}`)

            // Salvando a imagem na storage passando a referencia e o file
            await uploadBytes(storageRef, file)

            
        } catch (error) {
            console.log(error)
        }
    }

    // addImageUrlInDataBase
    async function addImageUrlInDataBase(storageRef:StorageReference){
        try {
            // Pegando url
            const url = await getDownloadURL(storageRef)

            
        } catch (error) {
            console.log(error)
        }
    }

    // updateImageUser
    function updateImageUser(e:ChangeEvent){
        if(e.target instanceof HTMLInputElement){
            // Verificando se o input recebeu um arquivo
            if(e.target.files !== null){

                const file = e.target.files[0]

                // Salvando foto na store
                setDataUser(dataUser?.id as string, dataUser?.username as string, dataUser?.email as string,URL.createObjectURL(file))

                // Salvando no banco de dados
                addImageInStorage(file)
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