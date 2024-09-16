// Radix-ui
import * as Dialog from '@radix-ui/react-dialog'

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
        <div className='text-white'>
            <div className='border-b-[1px] flex justify-end px-3 py-1 w-full'>
                <Dialog.Close>
                    <Minus className='cursor-pointer' color='white'/>
                </Dialog.Close>
                
            </div>

            <DayPicker 
            className='px-5' 
            mode="single"
            locale={ptBR}
            modifiersStyles={{
                today: {
                    backgroundColor: '#724fc3',
                    color: 'white',
                },
            }}
            />
        </div>
    )
}