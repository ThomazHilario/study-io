// import Context
import { UseMyContext } from "@/Context/context"

// import lucide-icons
import { Minus } from 'lucide-react'

// Components
import { LoadingThemes } from "./Summary/loading-themes"

// Themes service
import { getThemes } from "@/Services/themes"

// import React-Query
import { useQuery } from '@tanstack/react-query'

export const Themes = () => {
    
    // Context
    const { isFullscreen, setIsThemes } = UseMyContext()

    // Using useQuery
    const { data, isPending } = useQuery({
        queryKey:['themes'],
        queryFn: getThemes
    })

    // updateTheme
    function updateTheme(value:string){
        // Buscando tag video
        const video = document.querySelector('video') as HTMLVideoElement

        // Adicionando nova source
        video.src = value

        // Salvando na localStorage
        localStorage.setItem('videoUrl', JSON.stringify(value))
    }

    return(
        <section className={`absolute h-[88%] w-[310px] left-[4rem] top-3/4 ${isFullscreen ? '-translate-y-[74%]' : '-translate-y-[75%]'} bg-slate-800 rounded-md p-5`}>
            <div className="p-1 flex justify-end items-center">
                <Minus className="cursor-pointer" color="white" onClick={() => setIsThemes(false)}/>
            </div>

            {/* Titulo */}
            <h1 className="text-white text-2xl font-semibold mb-2">Wallpapers</h1>

            {/* Container Themes */}
            {data && (
                <div className=" flex flex-wrap gap-[0.85rem]">
                    {data.map((item:{id:string, image_url:string, video_url:string}) => (
                        <img className="h-20 w-20 object-cover rounded-md cursor-pointer" 
                            key={item.id} 
                            src={item.image_url} 
                            alt="imagem do wallpaper" 
                            onClick={() => updateTheme(item.video_url)}
                        />
                    ))}
                </div>
            )}

            {/* Loading */}
            {isPending && <LoadingThemes/>}
        </section>
    )
}