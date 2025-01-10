import { NotesProps } from './notesType

export interface NotesFrameProps{
    notesList:NotesProps[],
    setNotesList:React.Dispatch<React.SetStateAction<NotesProps[]>>
}