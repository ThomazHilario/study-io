// import Context
import { UseMyContext } from "../Context/context"

// import lucide-icons
import { Minus } from 'lucide-react'

export const Themes = () => {
    
    // Context
    const { isFullscreen, setIsThemes } = UseMyContext()

    return(
        <div className={`absolute h-[88%] w-[20vw] left-[4rem] top-3/4 ${isFullscreen ? '-translate-y-[74%]' : '-translate-y-[75%]'} bg-slate-800 rounded-md`}>
            <div className="p-6 flex justify-end items-center">
                <Minus className="cursor-pointer" color="white" onClick={() => setIsThemes(false)}/>
            </div>
        </div>
    )
}