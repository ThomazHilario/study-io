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
        // verificando id na localStorage
        const id = localStorage.getItem(`@DataID`) !== null && JSON.parse(localStorage.getItem('@DataId') as string)

        async function loadUserData(){
            try {
                // Referencia do banco de dados
                const docRef = doc(database,'users',JSON.parse(localStorage.getItem('@DataId') as string))

                // Buscando dados do banco de dados
                const data = await getDoc(docRef)

                if(data.exists()){
                    setUserData(JSON.parse(localStorage.getItem('@DataId') as string), 
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
            <header className="bg-slate-700 h-6 basis-10 mt-5">
                
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