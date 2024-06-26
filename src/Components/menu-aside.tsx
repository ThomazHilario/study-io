// import Lucide-icons
import { AlarmClock, PencilLine, NotebookPen, WallpaperIcon, CalendarDays, Kanban } from 'lucide-react'

// context
import { UseMyContext } from '../Context/context'

export const MenuAside = () => {

    // Context
    const {isTimer, setIsTimer} = UseMyContext()
    const {isTask, setIsTask} = UseMyContext()
    const {isNotes, setIsNotes} = UseMyContext()
    const {isThemes, setIsThemes} = UseMyContext()
    const { isCalendar, setIsCalendar } = UseMyContext()

    return(
        <menu className='mt-4 flex flex-col gap-3 *:cursor-pointer'>
            <li className={`flex flex-col justify-center items-center ${isTimer && 'bg-gray-400/10'} hover:bg-gray-400/10 py-[0.15rem] px-1 rounded-md`} onClick={() => setIsTimer(!isTimer)}>
                <AlarmClock color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Timer</p>
            </li>

            <li className={`flex flex-col justify-center items-center ${isTask && 'bg-gray-400/10'} hover:bg-gray-400/10 py-[0.15rem] px-1 rounded-md`} onClick={() => setIsTask(!isTask)}>
                <PencilLine color='white' size={20} />
                <p className='text-white text-[0.8rem] font-semibold font-system'>Task</p>
            </li>

            <li className={`flex flex-col justify-center items-center ${isNotes && 'bg-gray-400/10'} hover:bg-gray-400/10 py-[0.15rem] px-1 rounded-md`} onClick={() => setIsNotes(!isNotes)}>
                <NotebookPen color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Notes</p>
            </li>

            <li className={`flex flex-col justify-center items-center ${isThemes && 'bg-gray-400/10'} hover:bg-gray-400/10 py-[0.15rem] px-1 rounded-md`} onClick={() => setIsThemes(!isThemes)}>
                <WallpaperIcon color='white' size={20}/>
                <p className='text-white text-[0.75rem] font-semibold font-system'>Themes</p>
            </li>

            <li className={`flex flex-col justify-center items-center hover:bg-gray-400/10 py-[0.15rem] px-1 rounded-md ${isCalendar && 'bg-gray-400/10'}`} onClick={() => setIsCalendar(!isCalendar)}>
                <CalendarDays color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Cal</p>
            </li>

            <li className='flex flex-col justify-center items-center hover:bg-gray-200/10 py-[0.15rem] px-1 rounded-md'>
                <Kanban color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Kanban</p>
            </li>
        </menu>
    )
}