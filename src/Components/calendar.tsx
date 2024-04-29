// import DayPicker
import { ptBR } from 'date-fns/locale'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';
export const Calendar = () => {

    return(
            <DayPicker 
            className='absolute bg-slate-800 top-60 rounded-md py-2 px-5 text-white' 
            mode="single"
            locale={ptBR}
            modifiersStyles={{
                today: {
                    backgroundColor: 'rgba(59, 130, 246, 1)',
                    color: 'white',
                },
            }}
            />
    )
}