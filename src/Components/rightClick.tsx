import { ChildrenType } from '../interfaces/contextType'
import { ContextMenu } from '@radix-ui/themes'

// import context
import { UseMyContext } from '@/Context/context'

export const RightClick = ({children}:ChildrenType) => {

    // Context
    const { 
        isLogged, 
        setIsTask, 
        setIsNotes, 
        setIsTimer,
        setIsThemes,
        setIsCalendar,
        isTask,
        isNotes,
        isTimer,
        isThemes,
        isCalendar,
    } = UseMyContext()

    return(
        <ContextMenu.Root>
            <ContextMenu.Trigger>
                {children}
            </ContextMenu.Trigger>
            <ContextMenu.Content color="indigo">

            {isLogged ? (
                <>
                    <ContextMenu.Item shortcut="⌘" color="violet" onClick={() => setIsTask(!isTask)}>
                        {`${isTask ? 'Close' : 'Add'} Task`}
                    </ContextMenu.Item>

                    <ContextMenu.Item shortcut="⌘" color="violet" onClick={() => setIsNotes(!isNotes)}>
                        {`${isNotes ? 'Close' : 'Add'} Notes`}
                    </ContextMenu.Item>

                    <ContextMenu.Item shortcut='⌘' color="violet" onClick={() => setIsTimer(!isTimer)}>
                        {`${isTimer ? 'Close' : 'Open'} Timer`}
                    </ContextMenu.Item>

                    <ContextMenu.Item shortcut='⌘' color="violet" onClick={() => setIsThemes(!isThemes)}>
                        {`${isThemes ? 'Close' : 'Open'} Themes`}
                    </ContextMenu.Item>

                    <ContextMenu.Item shortcut='⌘' color="violet" onClick={() => setIsCalendar(!isCalendar)}>
                        {`${isCalendar ? 'Close' : 'Open'} Calendar`}
                    </ContextMenu.Item>

                </>
            ) : (
                <ContextMenu.Item>Refresh</ContextMenu.Item>
            )}
            
        </ContextMenu.Content>
        </ContextMenu.Root>
    )
}