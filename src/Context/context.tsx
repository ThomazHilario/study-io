// import from react
import { createContext, useContext ,useState } from 'react'

// import interface
import { FullScreenProps, ChildrenType } from '../interfaces/contextType'

// Contexto
export const Context = createContext<FullScreenProps | null>(null)

// Componente UserData
export const UserData = ({children}:ChildrenType) => {

    // context - fullscreen
    const [isFullscreen, setIsFullscreen] = useState<boolean>(localStorage.getItem('isFullScreen') !== null ? JSON.parse(localStorage.getItem('isFullScreen') as string) : true)

    // resizable
    const [resizable, setResizable] = useState<boolean>(localStorage.getItem('isResizable') !== null ? JSON.parse(localStorage.getItem('isResizable') as string) : false)

    // isLogged
    const [isLogged, setIsLogged] = useState<boolean>(false)

    // isTask
    const [isTask, setIsTask] = useState<boolean>(false)

    // isNotes
    const [isNotes, setIsNotes] = useState<boolean>(false)

    // isTimer
    const [isTimer, setIsTimer] = useState<boolean>(false)

    // isThemes
    const [isThemes, setIsThemes] = useState<boolean>(false)

    return(
        <Context.Provider value={{isFullscreen, setIsFullscreen, resizable, setResizable, isTask, setIsTask, isNotes, setIsNotes, isTimer, setIsTimer, isThemes, setIsThemes, isLogged, setIsLogged}}>
            {children}
        </Context.Provider>
    )
}

// Verificando se tem contexto e o retornando
export function UseMyContext():FullScreenProps{
    const context = useContext(Context)

    if(!context){
        throw "Não possui contexto";
    }

    return context
}