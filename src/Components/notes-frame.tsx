// import react
import { FormEvent, useState, memo } from 'react'

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

// import interfaces
import { NotesProps } from '../interfaces/notesType'
import { DraggableData, DraggableEvent } from 'react-draggable'

export const NotesFrame = memo(({notesList, setNotesList}:NotesFrameProps) => {

    // Valores x e y
    const xDrag = localStorage.getItem('notesDrag') ? JSON.parse(localStorage.getItem('notesDrag') as string).x : 10
    const yDrag = localStorage.getItem('notesDrag') ? JSON.parse(localStorage.getItem('notesDrag') as string).y : 125

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

    // updateNotesDataBase
    async function updateNotesDataBase(notes:NotesProps[]){
        try{
            // Referencia do banco de dados do usuário
            const docRef = doc(database, 'users', userData?.id as string)

            // Atualizando as notas no banco de dados do usuário
            await updateDoc(docRef, {
                notes
            })
        }catch(e){
            console.log(e)
        }
    }

    // addNotes
    function addNotes(e:FormEvent){
        // Cancelando envio do formulario
        e.preventDefault()

        try {
            if(note !== ''){
                // Alterando o valor do isAddNote
                setIsAddNote(!isAddNote)

                // Criando a estrutura da nota
                const noteUser = {
                    id:crypto.randomUUID(),
                    item:note,
                    date: Date.now()
                }
    
                // Salvando a lista de notas com o novo item.
                setNotesList([...notesList, noteUser])

                // Atualizar notas no banco de dados do usuário
                updateNotesDataBase([...notesList, noteUser])

                // Limpando state
                setNote('')
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    // editNote
    function editNotes(noteId:string){
        try {
            // Buscando nota por meio do indice
            const seachNote = notesList.find(note => note.id === noteId) as NotesProps

            // Editando a nota do item
            seachNote.item = editNote

            // Salvando a lista com o novo item editado
            setNotesList([...notesList])

            // Atualizar notas no banco de dados do usuário
            updateNotesDataBase([...notesList])

            // Saindo do modo editar
            setIsEditNote(false)
        } catch (error) {
            console.log(error)
        }
    }

    // updateStateEdtiNotes
    function updateStateEditNotes(note:string){
        // Alterando o valor da state isEditNotes
        setIsEditNote(true)

        // colocando o valor da nota na state
        setEditNote(note)
    }

    // deleteNote
    function deleteNote(noteId:string){
        try {
            // Filtrando nota por meio do indice
            const newNotesList = notesList.filter(note => note.id !== noteId)

            // Atualizar notas no banco de dados do usuário
            updateNotesDataBase(newNotesList)

            // Salvando novo array de notas
            setNotesList(newNotesList)
        } catch (error) {
            console.log(error)
        }
    }

    // savePositionNotesDrag
    function savePositionNotesDrag(mouse:DraggableEvent,drag:DraggableData){
        localStorage.setItem('notesDrag',JSON.stringify({
            x:drag.x,
            y:drag.y,
            mouse
        }))
    }

    // cancelTask
    function cancelTask(){
        // Alterando o valor da state isAddNote
        setIsAddNote(false)

        // Limpando o input caso tenha algo
        if(note !== ''){
            setNote('')
        }
    }

    // notesListisEmpty
    const notesListisEmpty = notesList.length > 0

    return(
        <Rnd bounds="window" 
        enableResizing={false} 
        default={{x:xDrag, y:yDrag, height:'', width:''}}
        onDragStop={savePositionNotesDrag}>
            <section className='bg-slate-700 rounded-sm w-full cursor-pointer py-3'>
                <div className='flex items-center justify-end px-3 mb-2'>
                    <MinusIcon color='white' onClick={() => setIsNotes(false)}/>
                </div>

                {isAddNote ? (
                    <section className='px-2'>
                        <form className='flex flex-col items-center gap-2'>
                            <textarea 
                            className='resize-none outline-none p-1 bg-black/20 w-full text-white rounded-sm'
                            cols={38}
                            rows={3} 
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            />

                            <button className='border-2 w-full text-white' 
                            type='submit' onClick={addNotes}>Adicionar nota</button>
                        </form>

                        <button className="w-full bg-red-500 rounded-sm mt-1 text-white" onClick={cancelTask}>Cancelar</button>
                    </section>
                ) : 
                <section className='px-2 w-[330px]'>
                    <button className='w-full rounded-sm border-2 text-center text-white'  
                    onClick={() => setIsAddNote(!isAddNote)}>Adicionar nota</button>

                    {notesListisEmpty && (
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
                                                <section className='bg-slate-700 p-2 rounded-sm text-white text-justify w-[20vw]'>
                                                    {isEditNote ? (
                                                        <textarea className='p-1 resize-none outline-none bg-black/20 w-full rounded-sm' rows={3} value={editNote} onChange={(e) => setEditNote(e.target.value)}/>
                                                    ) : 
                                                        <article className='bg-black/40 p-2'><p>{item.item}</p></article>
                                                    }

                                                    <article className='mb-4 mt-4 flex gap-3'>
                                                        {isEditNote ? (
                                                            <>
                                                                <button className='bg-green-500 px-2 rounded-sm' onClick={() => editNotes(item.id)}>
                                                                    Editar
                                                                </button>

                                                                <button className='bg-slate-800 px-2 rounded-sm' onClick={() => setIsEditNote(!isEditNote)}>
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Dialog.Close className='bg-red-500 px-2 rounded-sm' onClick={() => deleteNote(item.id)}>
                                                                    Delete
                                                                </Dialog.Close>
                                                                <button className='bg-green-500 px-2 rounded-sm' onClick={() => updateStateEditNotes(item.item)}>
                                                                    Editar
                                                                </button>
                                                            </>
                                                        )}
                                                    </article>

                                                    {!isEditNote && (
                                                        <span>
                                                            Criado há {formatDistanceToNow(item.date,{locale:ptBR})}
                                                        </span>
                                                    )}
                                                </section>
                                            </Dialog.Content>
                                        </Dialog.Portal>
                                    </Dialog.Root>
                                )
                            })}
                        </div>
                    )}
                </section>
                }
            </section>
        </Rnd>
    )
})