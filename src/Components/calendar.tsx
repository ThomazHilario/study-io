// import DayPicker
import { DayPicker } from 'react-day-picker'

// import locale from date-fns
import { ptBR } from 'date-fns/locale'

// import css from datePicker Calendar
import 'react-day-picker/dist/style.css';

// import lucide-icons
import { Minus } from 'lucide-react'

export const Calendar = () => {

    return(
        <div className='absolute bg-slate-800/95 top-80 left-16 rounded-md text-white'>
            <div className='border-b-[1px] flex justify-end px-3 py-1'>
                <Minus className='cursor-pointer' color='white'/>
            </div>

            <DayPicker 
            className='px-5' 
            mode="single"
            locale={ptBR}
            modifiersStyles={{
                today: {
                    backgroundColor: 'rgba(59, 130, 246, 1)',
                    color: 'white',
                },
            }}
            />
        </div>
    )
}