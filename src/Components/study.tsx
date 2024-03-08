// import react
import { useEffect } from "react"

// import Firebase
import { database } from "../Services/FirebaseConnection"
import { getDoc, doc } from "firebase/firestore"

// import store
import { user } from "../Store/store"

export const Study = () => {

    
    const setUserData = user(state => state.setUserData)
    const userData = user(state => state.user)

    useEffect(() => {

        // localStorage
        const Storage = JSON.parse(localStorage.getItem(`@DataId`) as string)

        // verificando id na localStorage
        const id = Storage !== null ? Storage : false

        // Inserindo dados na store do zustand
        async function loadUserData(){
            try {
                // Referencia do banco de dados
                const docRef = doc(database,'users',id)

                // Buscando dados do banco de dados
                const data = await getDoc(docRef)

                if(data.exists()){
                    // Inserindo dados na store
                    setUserData(id, 
                    data.data().dataUser.username, 
                    data.data().dataUser.email, 
                    data.data().dataUser.img
                    )

                }
            } catch (error) {
                console.log(error)
            }
        }

        // executando loadUser
        loadUserData()
    },[])

    return(
        <main className="flex flex-col bg-slate-900 h-screen">
            {/* header */}
            <header className="bg-slate-700 h-6 basis-8 mt-5">
                {userData?.id}
            </header>

            {/* area de trabalho */}
            <div className='flex basis-full'>
                <aside className="bg-slate-500 w-14">
                    
                </aside>

                {/* Wallpaper */}
                <div className="bg-slate-400 w-full">

                </div>
            </div>
        </main>
    )
}