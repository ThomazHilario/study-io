// import react
import { useEffect, useState } from "react"

// import Context
import { UseMyContext } from "../Context/context"

// interface
import { NotesProps } from '../interfaces/notesType'

// Components
import { MenuDialog } from "./menu-dialog"
import { UpdateImage } from "./updateImage"
import { MenuAside } from "./menu-aside"
import TaskFrame from "./task-frame"
import { NotesFrame } from "./notes-frame"

// draggable 
import { Rnd } from "react-rnd"


// import Firebase
import { database } from "../Services/FirebaseConnection"
import { getDoc, doc } from "firebase/firestore"

// import store
import { user } from "../Store/store"

// imports lucide
import { Maximize2 } from 'lucide-react'

// import window from tauri
import { appWindow } from '@tauri-apps/api/window'

export const Study = () => {

    // Context
    const { isFullscreen, setIsFullscreen } = UseMyContext()
    const { resizable, setResizable } = UseMyContext()
    const { isTask, isNotes } = UseMyContext()

    // store
    const setUserData = user(state => state.setUserData)
    const userData = user(state => state.user)

    // state - task
    const [task, setTask] = useState<string[]>([])

    // state - notesList
    const [notesList, setNotesList] = useState<NotesProps[]>([])

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

                    // Salvando task
                    setTask(data.data().task)

                    // Salvando notas
                    setNotesList(data.data().notes)
                }
            } catch (error) {
                console.log(error)
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

        // Alterando valor booleano do estado
        setIsFullscreen(isFullscreen ? false : true)

        // Alterando valor boooleano de resizable
        setResizable(resizable === false ? true : false)

        
    }

    return(
        <main className="flex flex-col bg-slate-900 h-screen">
            {/* header */}
            <header className={`flex items-center justify-between px-2 bg-[#202224] basis-12 ${isFullscreen ? 'mt-5 pt-1' : 'mt-0'} border-b-[1px] border-b-gray-600`}>
                {/*  what user using app */}
                <div className={`flex gap-2 items-center`}>
                    {userData?.img !== null ? (
                    <img className="h-8 w-8 rounded-full object-fill" src={userData?.img as string}/>
                    ) : (
                        <UpdateImage/>
                    )}

                    <p className="bg-neutral-300/20 rounded-sm text-white py-[2px] px-3">
                        {userData?.username}'s Room
                    </p>
                </div>

                {/* Account config */}
                <div className="flex gap-2 mt-1">
                    <Maximize2 className="cursor-pointer" size={18} color="white" onClick={() => changeFullScreen()}/>
                    
                    <MenuDialog/>
                </div>
            </header>

            {/* area de trabalho */}
            <div className='flex basis-full'>
                <aside className="bg-[#202224] w-14 border-r-gray-600 border-r-[1px] flex justify-center">
                    <MenuAside/>
                </aside>

                {/* Wallpaper */}
                <div className="bg-slate-900 w-full">
                    {isTask && (
                        <Rnd bounds="window" enableResizing={false} default={{x:10, y:65, height:'', width:''}}>
                            <TaskFrame task={task} setTask={setTask}/>
                        </Rnd>
                    )}

                    {isNotes && <NotesFrame notesList={notesList} setNotesList={setNotesList}/>}
                </div>
            </div>
        </main>
    )
}