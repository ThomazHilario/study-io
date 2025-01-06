// Others interfaces
import { methodsToAddTaskToKanbanProps } from '@/interfaces/Kanban/MethodsKanban-Type'
import { TaskProps } from '@/interfaces/tasksType'

// SchemaKanbanProps
export interface SchemaKanbanProps{
    column:string,
    taskName:string,
    description?:string,
    subTasks:TaskProps[]
}


// KanbanFormProps
export interface KanbanFormProps{
    methodsKanban:methodsToAddTaskToKanbanProps, 
    selectValues:string[]
}