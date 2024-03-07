import { ChildrenType } from '../interfaces/contextType'
import { ContextMenu } from '@radix-ui/themes'

export const RightClick = ({children}:ChildrenType) => {
    return(
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                {children}
            </ContextMenu.Trigger>
        <ContextMenu.Content color="indigo">
            
            <ContextMenu.Item>Refresh</ContextMenu.Item>

            <ContextMenu.Separator />

            <ContextMenu.Item shortcut="⌘" color="red">
            Delete
            </ContextMenu.Item>
            
        </ContextMenu.Content>
        </ContextMenu.Root>
    )
}