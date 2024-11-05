// import icons lucide
import { Minus, PanelTop, X } from 'lucide-react'

// Imports from tauri api
import { getCurrentWindow, PhysicalSize } from '@tauri-apps/api/window';

// Instance getCurrentWindow
const appWindow = getCurrentWindow()

// context
import { UseMyContext } from '@/Context/context'

export const WindowHeader = () => {

    // context
    const { isFullscreen } = UseMyContext()

    async function changeMaximizeApplication(){
        try {
            // Verify window maximized
            const isMaximized = await appWindow.isMaximized()

            // Change logic for window
            if(!isMaximized){
                // Maximize window
                appWindow.maximize()
                return
            }else{
                // Unmiximize window
                appWindow.unmaximize()

                // Change size window
                appWindow.setSize(new PhysicalSize(1450,900))

                // Change position window
                appWindow.center()
            }

        } catch (error) {
            console.log(error)
        }
    }

    // style iconsWindowHeader
    const iconsWindowHeaderFromTailwindCss = `cursor-pointer`
    return(
        <>
            {isFullscreen && (
                <header data-tauri-drag-region className="flex fixed top-0 left-0 right-0 h-6 w-full pr-2 gap-2 justify-end items-center bg-zinc-800 select-none">
                    <div className={iconsWindowHeaderFromTailwindCss} onClick={() => appWindow.minimize()}>
                        <Minus color='white'/>
                    </div>

                    <div className={iconsWindowHeaderFromTailwindCss} onClick={changeMaximizeApplication}>
                        <PanelTop size={18} color='white'/>
                    </div>
                    
                    <div className={iconsWindowHeaderFromTailwindCss} onClick={() => appWindow.close()}>
                        <X  size={20} color='white'/>
                    </div>
                </header>
            )}        
        </>
    )
}