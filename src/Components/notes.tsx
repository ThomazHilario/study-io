// Radix-UI
import * as Dialog from '@radix-ui/react-dialog'

// import date-fns
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const Note = ({isEditNote, editNote, setEditNote, setIsEditNote, editNotes, deleteNote, updateStateEdtiNotes}) => {
    return(
        <Dialog.Root>
            <Dialog.Trigger className='p-1 bg-slate-900/30 rounded-sm text-white'>
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
                                    <button className='bg-green-500 px-2 rounded-sm' onClick={() => updateStateEdtiNotes(item.item)}>
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
}