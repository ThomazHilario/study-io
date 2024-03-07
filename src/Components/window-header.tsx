import { Minus, PanelTop, X } from 'lucide-react'

//import window
import { appWindow } from '@tauri-apps/api/window'
export const WindowHeader = () => {
    return(
        <div data-tauri-drag-region className="flex fixed top-0 w-full h-6 pr-2 gap-2 justify-end items-center bg-zinc-800">
            <div className="cursor-pointer">
               <Minus color='white' onClick={() => appWindow.minimize()}/>
            </div>
            <div className="cursor-pointer">
                <PanelTop size={18} color='white' onClick={() => appWindow.toggleMaximize()}/>
            </div>
            <div className="cursor-pointer">
                <X  size={20} color='white' onClick={() => appWindow.close()}/>
            </div>
        </div>
    )
}