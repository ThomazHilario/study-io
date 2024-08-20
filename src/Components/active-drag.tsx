// Radix
import { Badge } from "@radix-ui/themes"

export const ActiveDrag = ({ checkedValue, updateCheckedValue }:{checkedValue:boolean, updateCheckedValue: () => void}) => {

    // Tailwind css button
    const buttonActiveDragStyleDrag = !checkedValue ? 'bg-green-500' : 'bg-red-500'

    return(
        <article className="flex items-center gap-2">
            <Badge variant="solid" color="indigo">
                <p className="text-sm text-white">Drag:</p>
            </Badge>

            <button 
            className={`${buttonActiveDragStyleDrag} w-12 h-6 rounded-sm`} 
            onClick={updateCheckedValue}>
                    {!checkedValue ? 'On' : 'Off'}
            </button>
        </article>
    )
}