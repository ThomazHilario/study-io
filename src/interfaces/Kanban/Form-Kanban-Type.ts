// Others interfaces
import { methodsToAddTaskToKanbanProps } from '@/interfaces/Kanban/MethodsKanban-Type'

export interface KanbanFormProps{
    methodsKanban:methodsToAddTaskToKanbanProps, 
    selectValues:string[]
}