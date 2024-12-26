// Radix-UI
import * as Dialog from '@radix-ui/react-dialog'

// Lucide-React
import { X } from 'lucide-react'

// import date-fns
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// interface
import { NotesProps } from '@/interfaces/notesType'

interface NotePropsComponent{
    note: NotesProps,
    setIsEditNote:React.Dispatch<React.SetStateAction<boolean>>,
    isEditNote: boolean,
    setEditNote:React.Dispatch<React.SetStateAction<string>>,
    editNote: string,
    editNotes: () => void,
    deleteNote: () => void,
    updateStateEditNotes: () => void,
}

export const Note = ({note, isEditNote, editNote, setEditNote, setIsEditNote, editNotes, deleteNote, updateStateEditNotes}:NotePropsComponent) => {

    // note date create
    const noteDateCreate = formatDistanceToNow(note.date, {locale:ptBR})

    return(
        <Dialog.Root>
            <Dialog.Trigger className='p-1 bg-slate-900/30 rounded-sm text-white'>
                <p className=' px-1 text-justify h-6 overflow-hidden'>
                    {note.item}
                </p>

                <p className='text-start rounded-sm px-1 text-sm'>
                    Criado há {noteDateCreate}
                </p>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Content className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <section className='bg-slate-700 p-2 pt-8 rounded-sm text-white text-justify w-[30vw] overflow-hidden'>
                        <Dialog.Close className='absolute p-1 right-0 top-0 bg-gray-800 rounded-sm'>    
                            <X color='white' size={20}/> 
                        </Dialog.Close>

                        {/* Show text Area or note */}
                        {isEditNote ? (
                            <textarea className='p-1 resize-none outline-none bg-black/20 w-full rounded-sm' rows={3} value={editNote} onChange={(e) => setEditNote(e.target.value)}/>
                        ) : 
                            <article className='bg-black/40 p-2'><p>{note.item}</p></article>
                        }

                        {/* Show buttons */}
                        <article className='mb-4 mt-4 flex gap-3'>
                            {isEditNote ? (
                                <>
                                    <button className='bg-green-500 p-1 px-3 rounded-sm' onClick={editNotes}>
                                        Editar
                                    </button>

                                    <button className='bg-slate-800 p-1 px-3 rounded-sm' onClick={() => setIsEditNote(!isEditNote)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <section className='flex gap-2'>
                                    
                                    <Dialog.Close className='bg-red-500 p-1 px-3 rounded-sm' onClick={deleteNote}>
                                        Delete
                                    </Dialog.Close>
                                    
                                    <button className='bg-green-500 p-1 px-3 rounded-sm' onClick={updateStateEditNotes}>
                                        Editar
                                    </button>
                                
                                </section>
                            )}
                        </article>

                        {!isEditNote && (
                            <span>
                                Criado há {noteDateCreate}
                            </span>
                        )}
                    </section>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}