// import Context
import { UseMyContext } from "../Context/context"

// import lucide-icons
import { Minus } from 'lucide-react'

export const Themes = () => {
    
    // Context
    const { isFullscreen, setIsThemes } = UseMyContext()

    return(
        <div className={`absolute h-[88%] w-[20vw] left-[4rem] top-3/4 ${isFullscreen ? '-translate-y-[74%]' : '-translate-y-[75%]'} bg-slate-800 rounded-md p-5`}>
            <div className="p-1 flex justify-end items-center">
                <Minus className="cursor-pointer" color="white" onClick={() => setIsThemes(false)}/>
            </div>

            {/* Titulo */}
            <h1 className="text-white text-2xl font-semibold mb-2">Wallpapers</h1>

            {/* Container Themes */}
            <div className=" flex flex-wrap gap-[0.85rem]">
                <img className="h-20 w-20 object-cover rounded-md cursor-pointer" src="https://res.cloudinary.com/dseywnx5i/image/upload/v1713218220/Themes/boyTheme/gtnl9e4aoxm5s594epps.png" alt="img do theme" />

                <img className="h-20 w-20 object-cover rounded-md cursor-pointer" src="https://res.cloudinary.com/dseywnx5i/image/upload/v1713218220/Themes/boyTheme/gtnl9e4aoxm5s594epps.png" alt="img do theme" />

                <img className="h-20 w-20 object-cover rounded-md cursor-pointer" src="https://res.cloudinary.com/dseywnx5i/image/upload/v1713218220/Themes/boyTheme/gtnl9e4aoxm5s594epps.png" alt="img do theme" />

                <img className="h-20 w-20 object-cover rounded-md cursor-pointer" src="https://res.cloudinary.com/dseywnx5i/image/upload/v1713218220/Themes/boyTheme/gtnl9e4aoxm5s594epps.png" alt="img do theme" />
            </div>
        </div>
    )
}