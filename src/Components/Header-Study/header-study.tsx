// Context
import { UseMyContext } from "@/Context/context"

// Store
import { user } from '@/Store/store'

// Components
import { UpdateImage } from "./updateImage"
import { MenuDialog } from "./Menu/menu-dialog"

// import window from tauri api
import { getCurrentWindow } from '@tauri-apps/api/window'

// Instance getCurrentWindow
const appWindow = getCurrentWindow()

// Radix
import { Skeleton } from "@radix-ui/themes"

// imports lucide
import { Maximize2 } from 'lucide-react'

export const HeaderStudy = ({isLoading}:{isLoading:boolean}) => {

    // Context
    const { isFullscreen, setIsFullscreen } = UseMyContext()
    const { resizable, setResizable } = UseMyContext()

    // Store
    const userData = user(state => state.user)

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
        <header className={`flex items-center justify-between py-1 px-3 bg-[#202224] basis-13 ${isFullscreen ? 'mt-6 pt-1' : 'mt-0'} border-b-[1px] border-b-gray-600`}>
            {/*  what user using app */}
            <Skeleton loading={isLoading}>
                <section className={`flex gap-2 items-center`}>
                    
                    {/* User profile */}
                    <UpdateImage />

                    <p className="bg-neutral-200/5 rounded-sm text-white py-[2px] px-3">
                        {userData?.username}'s Room
                    </p>
                </section>
            </Skeleton>

            {/* Account config */}
            <section className="flex gap-2 mt-1">
                <Maximize2 className="cursor-pointer" size={18} color="white" onClick={() => changeFullScreen()}/>
                
                <MenuDialog/>
            </section>
        </header>
    )
}