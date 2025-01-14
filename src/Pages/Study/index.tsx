// import react
import { useEffect, useState } from "react"

// import Context
import { UseMyContext } from "@/Context/context"

// interface
import { NotesProps } from '@/interfaces/notesType'
import { TaskProps } from "@/interfaces/tasksType"

// Components
import { RightClick } from "@/Components/rightClick"
import { HeaderStudy } from '@/Components/Header-Study/header-study'
import { MenuAside } from "@/Components/menu-aside"
import TaskFrame from "@/Components/Task/task-frame"
import { NotesFrame } from "@/Components/Notes/notes-frame"
import { Timer } from '@/Components/timer'
import { Themes } from "@/Components/themes"
import { Gemini } from "@/Components/Gemini/gemini"

// import Firebase
import { database } from "@/Services/FirebaseConnection"
import { getDoc, doc } from "firebase/firestore"

// import store
import { user } from "@/Store/store"

export const Study = () => {

    // Context
    const { isTask, isNotes, isTimer, isThemes ,setIsLogged } = UseMyContext()

    // store
    const setUserData = user(state => state.setUserData)

    // state - task
    const [task, setTask] = useState<TaskProps[]>([])

    // state - notesList
    const [notesList, setNotesList] = useState<NotesProps[]>([])

    // state - isLoading
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const videoUrl = localStorage.getItem('videoUrl') != null ? JSON.parse(localStorage.getItem('videoUrl') as string) : "https://res.cloudinary.com/dseywnx5i/video/upload/v1713217730/Themes/boyTheme/p1urxw8smjx5gc3bfcnr.mp4"

    useEffect(() => {

        // localStorage
        const Storage = JSON.parse(localStorage.getItem(`@DataId`) as string)

        // verificando id na localStorage
        const id = Storage !== null ? Storage : false

        // Alterando o valor do contexto isLogged
        setIsLogged(true)

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

                    // Salvando task
                    setTask(data.data().task)

                    // Salvando notas
                    setNotesList(data.data().notes)

                }
            } catch (error) {
                console.log(error)
            } finally{
                // Changing state value loading for false
                setIsLoading(false)
            }
        }

        // executando loadUser
        loadUserData()
    },[])

    return(
        <RightClick>
            <main className="flex flex-col bg-slate-900 h-screen font-roboto">
                {/* header */}
                <HeaderStudy isLoading={isLoading}/>

                {/* area de trabalho */}
                <section className='flex basis-full'>
                    <aside className="bg-[#202224] w-14 border-r-gray-600 border-r-[1px] flex justify-center">
                        <MenuAside/>
                    </aside>

                    {/* Wallpaper */}
                    <section className="bg-slate-900 w-full">
                        <video className="w-full h-full object-cover" autoPlay muted loop>
                            <source src={videoUrl}/>
                        </video>
                        {/* Timer */}
                        {isTimer && <Timer/>}
                        
                        {/* Task */}
                        {isTask &&   <TaskFrame task={task} setTask={setTask}/>  }

                        {/* Notes */}
                        {isNotes && <NotesFrame notesList={notesList} setNotesList={setNotesList}/>}

                        {/* Themes */}
                        {isThemes && <Themes/>}

                        <Gemini/>
                        
                    </section>
                </section>
            </main>
        </RightClick>
    )
}