// import react
import { useEffect, useState } from "react"

// import Context
import { UseMyContext } from "@/Context/context"

// Radix
import { Skeleton } from "@radix-ui/themes"

// interface
import { NotesProps } from '@/interfaces/notesType'
import { TaskProps } from "@/interfaces/kanbanTypes"

// Components
import { RightClick } from "@/Components/rightClick"
import { MenuDialog } from "@/Components/menu-dialog"
import { UpdateImage } from "@/Components/updateImage"
import { MenuAside } from "@/Components/menu-aside"
import TaskFrame from "@/Components/task-frame"
import { NotesFrame } from "@/Components/notes-frame"
import { Timer } from '@/Components/timer'
import { Themes } from "@/Components/themes"
import { Gemini } from "@/Components/gemini"

// import Firebase
import { database } from "@/Services/FirebaseConnection"
import { getDoc, doc } from "firebase/firestore"

// import store
import { user } from "@/Store/store"

// imports lucide
import { Maximize2 } from 'lucide-react'

// import window from tauri
import { appWindow } from '@tauri-apps/api/window'

export const Study = () => {

    // Context
    const { isFullscreen, setIsFullscreen } = UseMyContext()
    const { resizable, setResizable } = UseMyContext()
    const { isTask, isNotes, isTimer, isThemes ,setIsLogged } = UseMyContext()

    // store
    const setUserData = user(state => state.setUserData)
    const userData = user(state => state.user)

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

    // ChangeFullScreen
    function changeFullScreen(){

        // Deixando a tela no estado inicial de height e width
        appWindow.unmaximize()

        // Alterando o fullScreen do app
        appWindow.setFullscreen(isFullscreen)

        // Deixando a window nao redimensionavel
        appWindow.setResizable(resizable)

        // Salvar valor do isFullScreen na localStorage
        localStorage.setItem('isFullScreen', JSON.stringify(isFullscreen ? false : true))

        // Salvar valor do isResizable na localStorage
        localStorage.setItem('isResizable', JSON.stringify(resizable === false ? true : false))

        // Alterando valor booleano do estado
        setIsFullscreen(isFullscreen ? false : true)

        // Alterando valor boooleano de resizable
        setResizable(resizable === false ? true : false)

        
    }

    return(
        <RightClick>
            <main className="flex flex-col bg-slate-900 h-screen">
                {/* header */}
                <header className={`flex items-center justify-between py-1 px-2 bg-[#202224] basis-13 ${isFullscreen ? 'mt-6 pt-1' : 'mt-0'} border-b-[1px] border-b-gray-600`}>
                    {/*  what user using app */}
                    <Skeleton loading={isLoading}>
                        <div className={`flex gap-2 items-center`}>
                            
                            {/* User profile */}
                            <UpdateImage />

                            <p className="bg-neutral-200/5 rounded-sm text-white py-[2px] px-3">
                                {userData?.username}'s Room
                            </p>
                        </div>
                    </Skeleton>

                    {/* Account config */}
                    <div className="flex gap-2 mt-1">
                        <Maximize2 className="cursor-pointer" size={18} color="white" onClick={() => changeFullScreen()}/>
                        
                        <MenuDialog/>
                    </div>
                </header>

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