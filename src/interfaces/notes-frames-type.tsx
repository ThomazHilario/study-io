import { NotesProps } from '../interfaces/notesType'

export interface NotesFrameProps{
    notesList:NotesProps[],
    setNotesList:React.Dispatch<React.SetStateAction<NotesProps[]>>
}

export interface TaskProps{
    task:string[],
    setTask:React.Dispatch<React.SetStateAction<string[]>>
}