// import react
import { FormEvent, useState } from 'react'

// dialog react
import * as Dialog from '@radix-ui/react-dialog'

// import rnd
import { Rnd } from 'react-rnd'

// import type
import { NotesProps } from '../interfaces/notesType'

// import date-fns
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const NotesFrame = () => {

    // state - notesList
    const [notesList, setNotesList] = useState<NotesProps[]>([])

    // state - note
    const [note, setNote] = useState<string>('')

    // state - editNote
    const [editNote, setEditNote] = useState<string>('')

    // state isNote
    const [isAddNote, setIsAddNote] = useState<boolean>(false)

    // state - isEditNote
    const [isEditNote, setIsEditNote] = useState<boolean>(false)

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

    // editNote
    function editNotes(idx:number){
        // Buscando nota por meio do indice
        const seachNote = notesList[idx]

        // Editando a nota do item
        seachNote.item = editNote

        // Salvando a lista com o novo item editado
        setNotesList([...notesList])

        // Saindo do modo editar
        setIsEditNote(false)
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
                        <div className='mt-2 flex flex-col gap-2'>
                            {notesList.map((item, idx) => {
                                return(
                                    <Dialog.Root>
                                        <Dialog.Trigger key={idx} className='p-1 bg-slate-900/30 rounded-sm text-white'>
                                            <p className=' px-1 text-justify h-6 overflow-hidden'>
                                                {item.item}
                                            </p>

                                            <p className='text-start rounded-sm px-1 text-sm'>
                                                Criado há {formatDistanceToNow(item.date,{locale:ptBR})}
                                            </p>
                                        </Dialog.Trigger>

                                        <Dialog.Portal>
                                            <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                <div className='bg-slate-700 p-2 rounded-sm text-white text-justify w-[20vw]'>
                                                    {isEditNote ? (
                                                        <textarea className='text-black' rows={3} cols={38} value={editNote} onChange={(e) => setEditNote(e.target.value)}/>
                                                    ) : 
                                                        <div className='bg-black/40 p-2'><span>{item.item}</span></div>
                                                    }

                                                    <div className='mb-4 mt-4 flex gap-3'>
                                                        {isEditNote ? (
                                                            <button className='bg-green-500 px-2' onClick={() => editNotes(idx)}>Editar</button>
                                                        ) : (
                                                            <>
                                                                <button className='bg-red-500 px-2 rounded-sm'>
                                                                    Delete
                                                                </button>
                                                                <button className='bg-green-500 px-2' onClick={() => setIsEditNote(!isEditNote)}>
                                                                    Editar
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>

                                                    {!isEditNote && (
                                                        <span>
                                                            Criado há {formatDistanceToNow(item.date,{locale:ptBR})}
                                                        </span>
                                                    )}
                                                </div>
                                            </Dialog.Content>
                                        </Dialog.Portal>
                                    </Dialog.Root>
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