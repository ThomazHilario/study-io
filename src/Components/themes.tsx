// import Context
import { UseMyContext } from "../Context/context"

export const Themes = () => {
    
    // Context
    const { isFullscreen } = UseMyContext()

    return(
        <div className={`absolute h-[88%] w-[20vw] left-[4rem] top-3/4 ${isFullscreen ? '-translate-y-[74%]' : '-translate-y-[75%]'} bg-slate-800 rounded-md`}>

        </div>
    )
}