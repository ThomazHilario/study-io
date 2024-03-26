// import react
import { FormEvent, useState } from 'react'

// import context
import { UseMyContext } from '../Context/context'

// import firebase
import { database } from '../Services/FirebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'

// import store
import { user } from '../Store/store'

// dialog react
import * as Dialog from '@radix-ui/react-dialog'

// import rnd
import { Rnd } from 'react-rnd'

// import date-fns
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// import lucide-icons
import { MinusIcon } from 'lucide-react'
import { NotesFrameProps } from '../interfaces/notes-frames-type'

export const NotesFrame = ({notesList, setNotesList}:NotesFrameProps) => {

    // context
    const { setIsNotes } = UseMyContext()

    // store
    const userData = user(state => state.user)

    // state - note
    const [note, setNote] = useState<string>('')

    // state - editNote
    const [editNote, setEditNote] = useState<string>('')

    // state isNote
    const [isAddNote, setIsAddNote] = useState<boolean>(false)

    // state - isEditNote
    const [isEditNote, setIsEditNote] = useState<boolean>(false)

    // addNotes
    async function addNotes(e:FormEvent){
        // Cancelando envio do formulario
        e.preventDefault()

        try {
            if(note !== ''){
                // Alterando o valor do isAddNote
                setIsAddNote(!isAddNote)
    
                setNotesList([...notesList, {
                    item:note,
                    date: Date.now()
                }])

                // docRef
                const docRef = doc(database, 'users', userData?.id as string)

                // Salvando notas no banco de dados
                await updateDoc(docRef,{
                    notes:[...notesList, {
                        item:note,
                        date: Date.now()
                    }]
                })

                // Limpando state
                setNote('')
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    // editNote
    async function editNotes(idx:number){
        try {
            // Buscando nota por meio do indice
            const seachNote = notesList[idx]

            // Editando a nota do item
            seachNote.item = editNote

            // Salvando a lista com o novo item editado
            setNotesList([...notesList])

            // Criando referencia do banco de dados
            const docRef = doc(database, 'users', userData?.id as string)

            // Atualizando notas no banco de dados
            await updateDoc(docRef,{
                notes:[...notesList]
            })

            // Saindo do modo editar
            setIsEditNote(false)
        } catch (error) {
            console.log(error)
        }
    }

    // deleteNote
    async function deleteNote(idx:number){
        try {
            // Filtrando nota por meio do indice
            const newNotesList = notesList.filter((item,index) => index !== idx && item)

            // Criando referencia do banco de dados
            const docRef = doc(database, 'users', userData?.id as string)

            // Atualizando banco de dados com a nova lista de notas
            await updateDoc(docRef, {
                notes: newNotesList
            })

            // Salvando novo array de notas
            setNotesList(newNotesList)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Rnd bounds="window" enableResizing={false}>
            <div className='bg-slate-700 rounded-sm w-full cursor-pointer py-3'>
                <div className='flex items-center justify-end px-3 mb-2'>
                    <MinusIcon color='white' onClick={() => setIsNotes(false)}/>
                </div>

                {isAddNote ? (
                    <form className='px-2 flex flex-col items-center gap-2'>
                        <textarea 
                        className='resize-none outline-none p-1 bg-black/20 w-full text-white rounded-sm'
                        cols={38}
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
                                    <Dialog.Root key={idx}>
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
                                                        <textarea className='p-1 resize-none outline-none bg-black/20 w-full rounded-sm' rows={3} value={editNote} onChange={(e) => setEditNote(e.target.value)}/>
                                                    ) : 
                                                        <div className='bg-black/40 p-2'><span>{item.item}</span></div>
                                                    }

                                                    <div className='mb-4 mt-4 flex gap-3'>
                                                        {isEditNote ? (
                                                            <>
                                                                <button className='bg-green-500 px-2 rounded-sm' onClick={() => editNotes(idx)}>
                                                                    Editar
                                                                </button>

                                                                <button className='bg-slate-800 px-2 rounded-sm' onClick={() => setIsEditNote(!isEditNote)}>
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Dialog.Close className='bg-red-500 px-2 rounded-sm' onClick={() => deleteNote(idx)}>
                                                                    Delete
                                                                </Dialog.Close>
                                                                <button className='bg-green-500 px-2 rounded-sm' onClick={() => setIsEditNote(!isEditNote)}>
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