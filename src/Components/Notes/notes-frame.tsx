// import react
import { FormEvent, useState, memo } from 'react'

// import context
import { UseMyContext } from '@/Context/context'

// import firebase
import { database } from '@/Services/FirebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'

// import store
import { user } from '@/Store/store'

// import rnd
import { Rnd, Props } from 'react-rnd'

// import lucide-icons
import { MinusIcon } from 'lucide-react'
import { NotesFrameProps } from '@/interfaces/notes-frames-type'

// import interfaces
import { NotesProps } from '@/interfaces/notesType'
import { DraggableData, DraggableEvent } from 'react-draggable'

// Components
import { Note } from './notes'
import { ActiveDrag } from '@/Components/UI/active-drag'

export const NotesFrame = memo(({notesList, setNotesList}:NotesFrameProps) => {

    // Valores x e y
    const xDrag = localStorage.getItem('notesDrag') ? JSON.parse(localStorage.getItem('notesDrag') as string).x : 10
    const yDrag = localStorage.getItem('notesDrag') ? JSON.parse(localStorage.getItem('notesDrag') as string).y : 125

    // isDraggingNotes
    const isDraggingNotesInLocalStorage = localStorage.getItem('isDraggingNotesInLocalStorage') !== null ? JSON.parse(localStorage.getItem('isDraggingNotesInLocalStorage') as string) : false

    // context
    const { setIsNotes } = UseMyContext()

    // store
    const userData = user(state => state.user)

    // state - isDraggingNotes
    const [isDraggingNotes, setIsDraggingNotes] = useState(isDraggingNotesInLocalStorage)

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

    // updateDraggingNotes
    function updateDraggingNotes(){
        const draggingNotesInLocalStorage = JSON.parse(localStorage.getItem('isDraggingNotesInLocalStorage') as string)

        const newValueDraggingNotes = draggingNotesInLocalStorage === true ? false : true

        setIsDraggingNotes(newValueDraggingNotes)

        // save in localStorage
        localStorage.setItem('isDraggingNotesInLocalStorage', JSON.stringify(newValueDraggingNotes))
    }

    // notesListisEmpty
    const notesListisEmpty = notesList.length > 0

    // props Rnd
    const propsRnd:Props = {
        bounds:'window',
        enableResizing:false,
        default:{x:xDrag, y:yDrag, height:'', width:''},
        onDragStop:savePositionNotesDrag,
        disableDragging:isDraggingNotes
    }

    return(
        <Rnd {...propsRnd}>
            <section className='bg-slate-700 rounded-sm w-full cursor-pointer py-3'>
                <div className='flex items-center justify-between px-3 mb-2'>
                    <ActiveDrag 
                        checkedValue={isDraggingNotes}
                        updateCheckedValue={updateDraggingNotes}
                    />

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
                            {notesList.map((note) => {
                                return(
                                    <Note 
                                        key={note.id}
                                        note={note}
                                        editNote={editNote}
                                        setEditNote={setEditNote}
                                        isEditNote={isEditNote}
                                        setIsEditNote={setIsEditNote}
                                        editNotes={() => editNotes(note.id)}
                                        deleteNote={() => deleteNote(note.id)}
                                        updateStateEditNotes={() => updateStateEditNotes(note.item)}
                                    />
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