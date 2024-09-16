// import Lucide-icons
import { AlarmClock, PencilLine, NotebookPen, WallpaperIcon} from 'lucide-react'

// context
import { UseMyContext } from '@/Context/context'

// Components
import { Report } from './Report'
import { DialogKanban } from './Dialog-kanban'
import { DialogCalendar } from './Dialog-calendar'

export const MenuAside = () => {

    // Context
    const { isTimer, setIsTimer } = UseMyContext()
    const { isTask, setIsTask } = UseMyContext()
    const { isNotes, setIsNotes } = UseMyContext()
    const { isThemes, setIsThemes } = UseMyContext()

    // Styled list
    const liStyledWithTailwind = 'flex flex-col justify-center items-center hover:bg-gray-400/10 py-[0.15rem] px-1 rounded-md'

    // Styled Icon
    const propsIcon:{color:string, size:number} = {
        color:'white',
        size:20
    }

    return(
        <menu className='h-full mt-4 flex flex-col  gap-3 *:cursor-pointer'>
            <li className={`${liStyledWithTailwind} ${isTimer && 'bg-gray-400/10'}`} onClick={() => setIsTimer(!isTimer)}>
                <AlarmClock {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Timer</p>
            </li>

            <li className={`${liStyledWithTailwind} ${isTask && 'bg-gray-400/10'}`} onClick={() => setIsTask(!isTask)}>
                <PencilLine {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Task</p>
            </li>

            <li className={`${liStyledWithTailwind} ${isNotes && 'bg-gray-400/10'}`} onClick={() => setIsNotes(!isNotes)}>
                <NotebookPen {...propsIcon} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Notes</p>
            </li>

            <li className={`${liStyledWithTailwind} ${isThemes && 'bg-gray-400/10'}`} onClick={() => setIsThemes(!isThemes)}>
                <WallpaperIcon {...propsIcon} />
                <p className='text-white text-[0.75rem] font-semibold font-system'>Themes</p>
            </li>

            <li>
                <DialogCalendar propsIcon={propsIcon}/>
            </li>

            <li>
                <DialogKanban propsIcon={propsIcon}/>
            </li>

            <li className={`absolute bottom-2`}>
                <Report propsIcon={propsIcon}/>
            </li>
        </menu>
    )
}