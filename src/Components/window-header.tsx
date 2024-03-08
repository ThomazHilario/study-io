// import icons lucide
import { Minus, PanelTop, X } from 'lucide-react'

//import window
import { appWindow } from '@tauri-apps/api/window'

// context
import { UseMyContext } from '../Context/context'

export const WindowHeader = () => {

    // context
    const { isFullscreen } = UseMyContext()

    return(
        <>
            {isFullscreen && (
                <div data-tauri-drag-region className="flex fixed top-0 left-0 right-0 h-6 w-full pr-2 gap-2 justify-end items-center bg-zinc-800 select-none">
                    <div className="cursor-pointer" onClick={() => appWindow.minimize()}>
                    <Minus color='white'/>
                    </div>

                    <div className="cursor-pointer" onClick={() => appWindow.toggleMaximize()}>
                        <PanelTop size={18} color='white'/>
                    </div>
                    
                    <div className="cursor-pointer" onClick={() => appWindow.close()}>
                        <X  size={20} color='white'/>
                    </div>
                </div>
            )}        
        </>
    )
}