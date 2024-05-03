import { ChildrenType } from '../interfaces/contextType'
import { ContextMenu } from '@radix-ui/themes'

// import context
import { UseMyContext } from '../Context/context'

export const RightClick = ({children}:ChildrenType) => {

    // Context
    const { isLogged, setIsTask, setIsNotes } = UseMyContext()

    return(
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                {children}
            </ContextMenu.Trigger>
            <ContextMenu.Content color="indigo">

            {isLogged ? (
                <>
                <ContextMenu.Item shortcut="⌘" color="violet">
                    Add Task
                </ContextMenu.Item>

                <ContextMenu.Item shortcut="⌘" color="violet">
                    Add Notes
                </ContextMenu.Item>
                </>
            ) : (
                <ContextMenu.Item>Refresh</ContextMenu.Item>
            )}
            
        </ContextMenu.Content>
        </ContextMenu.Root>
    )
}