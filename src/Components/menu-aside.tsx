// import Lucide-icons
import { AlarmClock, PencilLine, NotebookPen, CalendarDays } from 'lucide-react'

export const MenuAside = () => {
    return(
        <menu className='mt-4 flex flex-col gap-3 *:cursor-pointer'>
            <li className='flex flex-col justify-center items-center hover:bg-gray-400/50 py-[0.10rem] px-1 rounded-md'>
                <AlarmClock color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Timer</p>
            </li>

            <li className='flex flex-col justify-center items-center hover:bg-gray-400/50 py-[0.10rem] px-1 rounded-md'>
                <PencilLine color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Task</p>
            </li>

            <li className='flex flex-col justify-center items-center hover:bg-gray-400/50 py-[0.10rem] px-1 rounded-md'>
                <NotebookPen color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Notes</p>
            </li>

            <li className='flex flex-col justify-center items-center hover:bg-gray-400/50 py-[0.10rem] px-1 rounded-md'>
                <CalendarDays color='white' size={20}/>
                <p className='text-white text-[0.8rem] font-semibold font-system'>Cal</p>
            </li>

        </menu>
    )
}