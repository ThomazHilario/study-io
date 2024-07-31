import { CircleUser } from 'lucide-react'
import { ChangeEvent } from 'react'

// import store from zustand
import {user} from '../Store/store'

// import Firebase from storage
import { database, storage } from '../Services/FirebaseConnection'
import { ref, uploadBytes, getDownloadURL, StorageReference } from 'firebase/storage'
import { doc, updateDoc } from 'firebase/firestore'

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

            // Salvando a url da foto no banco de dados do firebase
            addImageUrlInDataBase(storageRef)

        } catch (error) {
            console.log(error)
        }
    }

    // addImageUrlInDataBase
    async function addImageUrlInDataBase(storageRef:StorageReference){
        try {
            // Pegando url
            const url = await getDownloadURL(storageRef)

            // Referencia do banco de dados
            const docRef = doc(database,'users',dataUser?.id as string)

            // Salvando a url da imagem no banco de dados do firebase
            await updateDoc(docRef,{
                "dataUser.img": url
            })
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

    // IsthereValueForTheImage
    const imageValueNotIsNull = dataUser?.img !== null

    return(
        <div className='cursor-pointer'>
            {/* Input file */}
            <input className="hidden" type="file" id='inputImage' onChange={updateImageUser}/>

            {/* Logic Html */}
            {imageValueNotIsNull ? (
                <img 
                    className='h-8 w-8 object-cover rounded-full' 
                    src={dataUser?.img as string} 
                    alt={`Foto de perfil do ${dataUser?.username}`}
                    onClick={clickInput}
                />

                ) : (
                <CircleUser color='white' size={30} onClick={clickInput}/>
            )}
        </div>
    )
}