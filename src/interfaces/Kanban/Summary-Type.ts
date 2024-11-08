// Others interfaces
import { TaskProps } from "../tasksType"

export interface SummaryProps{
    name:string,
    description?:string,
    subTasks?: TaskProps[]
}