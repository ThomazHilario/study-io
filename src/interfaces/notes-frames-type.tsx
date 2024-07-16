import { NotesProps } from '../interfaces/notesType'
import { TaskProps } from './kanbanTypes'

export interface NotesFrameProps{
    notesList:NotesProps[],
    setNotesList:React.Dispatch<React.SetStateAction<NotesProps[]>>
}

export interface TaskFrameProps{
    task:TaskProps[],
    setTask:React.Dispatch<React.SetStateAction<TaskProps[]>>
}