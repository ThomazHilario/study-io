// import Rnd
import { Rnd } from "react-rnd";

// import datefns
import { format } from "date-fns";

// import DayPicker
import { DayPicker } from 'react-day-picker'

export const Calendar = () => {

    return(
        <Rnd>
            <DayPicker mode="single"/>
        </Rnd>
    )
}