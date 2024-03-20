// import react
import { FormEvent, useState } from 'react'

// import rnd
import { Rnd } from 'react-rnd'

// import type
import { NotesProps } from '../interfaces/notesType'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const NotesFrame = () => {

    // state - notesList
    const [notesList, setNotesList] = useState<NotesProps[]>([])

    // state - note
    const [note, setNote] = useState<string>('')

    // state isNote
    const [isAddNote, setIsAddNote] = useState<boolean>(false)

    // addNotes
    function addNotes(e:FormEvent){
        // Cancelando envio do formulario
        e.preventDefault()

        if(note !== ''){
            // Alterando o valor do isAddNote
            setIsAddNote(!isAddNote)

            setNotesList([...notesList, {
                item:note,
                date: new Date()
            }])

            // Limpando state
            setNote('')
        }

        
    }

    return(
        <Rnd bounds="window" enableResizing={false}>
            <div className='bg-slate-700 rounded-sm w-full cursor-pointer py-2'>
                {isAddNote ? (
                    <form className='px-2 flex flex-col items-center gap-2'>
                        <textarea 
                        className='resize-none rounded-sm' 
                        cols={35} 
                        rows={3} 
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        />

                        <button className='border-2 w-full text-white' 
                        type='submit' onClick={addNotes}>Add note</button>
                    </form>
                ) : 
                <div className='px-2 w-[330px]'>
                    <button className='w-full rounded-sm border-2 text-center text-white'  
                    onClick={() => setIsAddNote(!isAddNote)}>Add note</button>

                    {notesList.length > 0 && (
                        <div className='mt-2 flex flex-col'>
                            {notesList.map((item, idx) => {
                                return(
                                    <button key={idx} className='p-1 bg-slate-900/30 rounded-sm text-white'>
                                        <p className=' px-1 text-justify h-6 overflow-hidden'>
                                            {item.item}
                                        </p>

                                        <p className='text-start rounded-sm px-1 text-sm'>
                                            Criado há {formatDistanceToNow(item.date,{locale:ptBR})}
                                        </p>
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
                }
            </div>
        </Rnd>
    )
}