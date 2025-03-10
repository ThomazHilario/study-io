// import react
import { useEffect, useMemo, useState } from "react"

// import context
import { UseMyContext } from "@/Context/context"

// Audio
import pause from '@/assets/audio/pause.mp3'
import unpause from '@/assets/audio/unpause.mp3'

// import Rnd
import { Rnd } from "react-rnd"

// import from lucide-icons
import { MinusIcon } from "lucide-react"
import { RotateCcw } from 'lucide-react'
import { DraggableData, DraggableEvent } from "react-draggable"

export const Timer = () => {

    // Default position Timer drag
    const timerPositionX = localStorage.getItem('timerDrag') !== null ? JSON.parse(localStorage.getItem('timerDrag') as string).x : 10
    const timerPositionY = localStorage.getItem('timerDrag') !== null ? JSON.parse(localStorage.getItem('timerDrag') as string).y : 10

    // Context
    const {setIsTimer} = UseMyContext()

    // state - startTimer
    const [isStartTimer, setIsStartTimer] = useState<boolean>(false)

    // state - isPauseTimer
    const [isRestartTimer, setIsRestartTimer] = useState<boolean>(false)

    // state shortBreak
    const [shortBreak, setShortBreak] = useState<boolean>(true)

    // state longBreakValue
    const [longBreakValue, setLongBreakValue] = useState<number[]>([])

    // state - minutes
    const [minutes, setMinutes] = useState<number>(20)

    // state - seconds
    const [seconds, setSeconds] = useState<number>(0)

    // Disparando useEffect ao mudar o valor das states seconds e isStartTimer
    useEffect(() => {
        
        if(isStartTimer){
            const pomoTimer = setInterval(() => {
                // Limpando o intervalo de tempo
                clearInterval(pomoTimer)
                
                // Alterando o valor dos segundos a cada 1000ms
                setSeconds(seconds - 1)
        
                if(seconds === 0){
                    // Alterando seconds para 59
                    setSeconds(59)
                    
                    // retirando 1 minuto
                    setMinutes(minutes - 1)

                    

                    // Caso o minuto seja menor 1 e o shortBreak seja true
                    if(shortBreak && minutes < 1 && longBreakValue.length < 4){
                        // audio de pause
                        new Audio(pause).play()

                        // Verify longBreak steps
                        if(longBreakValue.length === 3){
                            // Set Minutes for long break
                            setMinutes(20)

                            // Set Short break for false
                            setShortBreak(false)

                            // Increment long break value
                            setLongBreakValue([...longBreakValue, longBreakValue.length > 0 ? longBreakValue.length + 1 : 1])

                            return
                        }

                        // Alterando o valor de minutes para 4
                        setMinutes(4)

                        // Alterando valor do shortBreak
                        setShortBreak(false)

                        // Increment long break value
                        setLongBreakValue([...longBreakValue, longBreakValue.length > 0 ? longBreakValue.length + 1 : 1])

                    }

                    // Caso o minuto seja menor que 1 e o shortBreak seja falso
                    if(shortBreak === false && minutes < 1){
                        // audio de unpause
                        new Audio(unpause).play()

                        // Clear steps values
                        if(longBreakValue.length === 4){
                            setLongBreakValue([])
                        }

                        // Alterando o valor de minutes para 19
                        setMinutes(19)

                        // Alterando o valor do shortBreak
                        setShortBreak(true)
                    }
                    
                
                }
            }, 1000)

            if(isRestartTimer){
                // Limpando o intervalo de tempo
                clearInterval(pomoTimer)

                // Alterando o valor da state para 20
                setMinutes(20)

                // Alterando o valor da state seconds para 0
                setSeconds(0)

                // Alterando o valor da state isStartTimer para false
                setIsStartTimer(false)

                // Alterando o valor da state isRestartTimer para false
                setIsRestartTimer(false)

                // Clear steps long break
                setLongBreakValue([])
            }

        }
    },[seconds, isStartTimer])

    // Salvando os valores das states de minutes e seconds na memoria
    const minuteMemorize = useMemo(() => minutes < 10 ? '0' + minutes : minutes,[minutes])
    const secondsMemorize = useMemo(() => seconds < 10 ? '0' + seconds : seconds,[seconds])

    // changeStepColor
    function changeStepColor(step:number){
        return longBreakValue.includes(step) && 'bg-indigo-500/90'
    }

    // Salvando valores x e y do Timer na localStorage
    function saveDragTimerPosition(mouse:DraggableEvent, drag:DraggableData){
            // Salvando os valores x e y do componente na localStorage
            localStorage.setItem('timerDrag', JSON.stringify({
                mouse:mouse,
                x:drag.x,
                y:drag.y
            }))
        
    }

    // clearIntervalTimer
    function clearIntervalTimer(){
        if(isStartTimer){
            setIsRestartTimer(true)
        }else{
            setIsStartTimer(true)
            setIsRestartTimer(true)
        }
    }

    return(
        <Rnd bounds='window'
         enableResizing={false}
          default={{x:timerPositionX, y:timerPositionY, height:'', width:''}}
          onDragStop={saveDragTimerPosition}>
            <div className="bg-slate-700 rounded-sm w-full cursor-pointer py-2">

                {/* Section steps container */}
                <section className='flex items-center justify-between px-3 mb-2 border-b-[1px]'>
                    {/* Section Steps */}
                    <section className="flex gap-1">
                        <div className={`h-2 w-2 rounded-full bg-black/50 ${changeStepColor(1)}`}/>
                        <div className={`h-2 w-2 rounded-full bg-black/50 ${changeStepColor(2)}`}/>
                        <div className={`h-2 w-2 rounded-full bg-black/50 ${changeStepColor(3)}`}/>
                        <div className={`h-2 w-2 rounded-full bg-black/50 ${changeStepColor(4)}`}/>
                    </section>

                    {/* Minus icon */}
                    <MinusIcon color='white' onClick={() => setIsTimer(false)}/>
                </section>

                {/* Time Informations for Pomodoro */}
                <section className="text-white flex items-center gap-4 px-2">

                    {/* StopWatch informations */}
                    <h1 className="text-6xl">{minuteMemorize}:{secondsMemorize}</h1>

                    {/* Start or pause timer */}
                    <button className="bg-black/20 rounded-md py-2 px-5" onClick={() => setIsStartTimer(!isStartTimer)}>{!isStartTimer ? 'Start' : 'Pause'}</button>

                    {/* Reset timer */}
                    <RotateCcw color="white" onClick={clearIntervalTimer} />
                </section>
            </div>
        </Rnd>
    )
}