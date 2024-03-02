// import from react
import { createContext, useContext ,useState } from 'react'

// import interface
import { UserDataType, ChildrenType } from '../interfaces/contextType'

// Contexto
export const Context = createContext<UserDataType | null>(null)

// Componente UserData
export const UserData = ({children}:ChildrenType) => {

    // context - id
    const [id, setId] = useState<string>('')

    // context - name
    const [dataUser, setDataUser] = useState<object>({})

    return(
        <Context.Provider value={{id, setId ,dataUser, setDataUser}}>
            {children}
        </Context.Provider>
    )
}

// Verificando se tem contexto e o retornando
export function UseMyContext():UserDataType{
    const context = useContext(Context)

    if(!context){
        throw "Não possui contexto";
    }

    return context
}